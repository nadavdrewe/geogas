import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import type { SiteContent } from "@/data/siteContent";
import { getSiteContent } from "@/lib/siteContent";
import { getAllSeoPages } from "@/lib/seo/content";
import type { SeoPage } from "@/lib/seo/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type SourceKind = "pricing" | "brochure" | "contracts" | "seo";

type KnowledgeChunk = {
  id: string;
  source: SourceKind;
  href: string;
  text: string;
  normalized: string;
};

type KnowledgeBase = {
  chunks: KnowledgeChunk[];
};

type ChatRole = "user" | "assistant";

type ChatHistoryItem = {
  role: ChatRole;
  text: string;
};

type ChatStreamChunkEvent = {
  type: "chunk";
  delta: string;
};

type ChatStreamFinalEvent = {
  type: "final";
  sources: string[];
  suggestions: string[];
  confidence: "low" | "medium" | "high";
  sourceKinds: SourceKind[];
};

type ChatStreamErrorEvent = {
  type: "error";
  error: string;
};

type ChatStreamEvent =
  | ChatStreamChunkEvent
  | ChatStreamFinalEvent
  | ChatStreamErrorEvent;

type GuardrailResult =
  | {
      kind: "emergency";
      answer: string;
      suggestions: string[];
    }
  | {
      kind: "business_info";
      answer: string;
      suggestions: string[];
    }
  | {
      kind: "out_of_scope";
      answer: string;
      suggestions: string[];
    }
  | {
      kind: "none";
    };

const STOP_WORDS = new Set([
  "the",
  "and",
  "for",
  "with",
  "this",
  "that",
  "from",
  "into",
  "about",
  "your",
  "you",
  "are",
  "can",
  "pls",
  "please",
  "what",
  "when",
  "where",
  "which",
  "have",
  "does",
  "need",
  "want",
  "just",
  "tell",
  "me",
  "our",
  "all",
  "any",
]);

let staticKnowledgePromise: Promise<KnowledgeChunk[]> | null = null;
let openaiClient: OpenAI | null = null;

const normalize = (value: string): string =>
  value
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[^\w\s£/+-]/g, " ")
    .trim();

const tokenize = (value: string): string[] => {
  return normalize(value)
    .split(" ")
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token));
};

const splitIntoChunks = (
  source: SourceKind,
  href: string,
  text: string,
  maxChars = 360
): KnowledgeChunk[] => {
  const lines = text
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const chunks: KnowledgeChunk[] = [];
  let bucket = "";
  let index = 0;

  for (const line of lines) {
    const candidate = bucket ? `${bucket} ${line}` : line;
    if (candidate.length > maxChars && bucket) {
      chunks.push({
        id: `${source}-${index}`,
        source,
        href,
        text: bucket,
        normalized: normalize(bucket),
      });
      index += 1;
      bucket = line;
      continue;
    }
    bucket = candidate;
  }

  if (bucket) {
    chunks.push({
      id: `${source}-${index}`,
      source,
      href,
      text: bucket,
      normalized: normalize(bucket),
    });
  }

  return chunks;
};

const scoreToConfidence = (score: number): "low" | "medium" | "high" => {
  if (score >= 8) return "high";
  if (score >= 4) return "medium";
  return "low";
};

const hasServiceKeywords = (question: string): boolean => {
  return (
    /(gas|boiler|heating|plumbing|drain|contract|cover|call[- ]?out|landlord|inspection|certificate|service|repair|install|installation|price|pricing|quote|vat|helpline|engineer|leak)/i.test(
      question
    )
  );
};

const getGuardrail = (
  question: string,
  globalContent: SiteContent["global"]
): GuardrailResult => {
  const text = question.trim();
  const emergencyPhone = globalContent.emergencyPhoneDisplay;
  const regularHours = [globalContent.contactHours.regularDays, globalContent.contactHours.regularHours]
    .filter(Boolean)
    .join(", ");

  if (
    /(smell of gas|gas smell|gas leak|carbon monoxide|co alarm|boiler fumes|hissing gas|gas emergency)/i.test(
      text
    )
  ) {
    return {
      kind: "emergency",
      answer:
        `If you can smell gas or suspect carbon monoxide, leave the property immediately, avoid switches/flames, and call the UK Gas Emergency Service on 0800 111 999 now. For urgent Geo Gas attendance, call ${emergencyPhone}.`,
      suggestions: [
        "Repeat emergency phone numbers",
        "What details should I give on the emergency call?",
        "Can I still book an urgent engineer visit now?",
      ],
    };
  }

  if (
    /(no heating|no hot water|major leak|burst pipe|boiler stopped|boiler not working|urgent call[- ]?out)/i.test(
      text
    )
  ) {
    return {
      kind: "emergency",
      answer:
        `This sounds urgent. Call our 24/7 emergency line on ${emergencyPhone} now. If you also suspect a gas leak, leave the property and call 0800 111 999 immediately.`,
      suggestions: [
        "What should I do before the engineer arrives?",
        "How quickly can an emergency engineer attend?",
        "Can you explain emergency call-out pricing?",
      ],
    };
  }

  if (
    /(opening hours|contact hours|business hours|when are you open|what time.*open|what time.*close|opening times)/i.test(
      text
    )
  ) {
    return {
      kind: "business_info",
      answer: `We are available ${regularHours}.`,
      suggestions: [
        "What areas do you cover?",
        "How do I book a call-out?",
        "What is your emergency number?",
      ],
    };
  }

  if (
    /(areas do you cover|where do you cover|what areas.*cover|operating locations|coverage area|service area|do you cover.*(london|sussex|surrey))/i.test(
      text
    )
  ) {
    return {
      kind: "business_info",
      answer: `We operate across ${globalContent.operatingLocations} and provide ${regularHours}.`,
      suggestions: [
        "How do I request a quote?",
        "What are your current call-out rates?",
        "Do you offer landlord gas safety inspections?",
      ],
    };
  }

  if (
    /(weather|football|soccer|nba|nfl|stock|crypto|bitcoin|recipe|restaurant|movie|song|lyrics|travel|flight|hotel|politics|election|coding|programming)/i.test(
      text
    ) &&
    !hasServiceKeywords(text)
  ) {
    return {
      kind: "out_of_scope",
      answer:
        "I can only help with Geo Gas services: current pricing, contracts, boiler/heating/plumbing support, landlord checks, and service cover terms.",
      suggestions: [
        "Show current call-out pricing",
        "What is included in Home Rescue contracts?",
        "How much is a landlord gas safety inspection?",
      ],
    };
  }

  return { kind: "none" };
};

const parseBrochureText = async (pdfBuffer: Buffer): Promise<string> => {
  const { PDFParse } = await import("pdf-parse");
  const parser = new PDFParse({ data: new Uint8Array(pdfBuffer) });

  try {
    const parsed = await parser.getText();
    return parsed.text
      .replace(/\s+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  } finally {
    await parser.destroy();
  }
};

const readBrochureText = async (): Promise<string> => {
  const brochureTextPath = path.join(
    process.cwd(),
    "public/info/GEO Gas Brochure 2026.txt"
  );

  try {
    return await readFile(brochureTextPath, "utf8");
  } catch {
    const brochurePdfPath = path.join(
      process.cwd(),
      "public/info/GEO Gas Brochure 2026.pdf"
    );
    const brochureBuffer = await readFile(brochurePdfPath);
    return parseBrochureText(brochureBuffer);
  }
};

const buildPricingKnowledgeText = (content: SiteContent): string[] => {
  const pricing = content.pricingPage;

  return [
    `${pricing.title}. ${pricing.description} ${pricing.note}`,
    `Pricing call-out rules: ${pricing.calloutRules.join(" ")}`,
    ...pricing.hourlyCategories.map(
      (category) =>
        `${category.title}. ${category.rates
          .map((rate) => `${rate.period}: ${rate.price}`)
          .join(". ")}`
    ),
    `Service pricing. ${pricing.serviceItems
      .map((item) => `${item.label}: ${item.value}`)
      .join(". ")}`,
    `Installation pricing. ${pricing.installationItems
      .map((item) => `${item.label}: ${item.value}`)
      .join(". ")}`,
    `Sales and upgrades pricing. ${pricing.salesItems
      .map((item) => `${item.label}: ${item.value}`)
      .join(". ")}`,
    `Electrical pricing. ${pricing.electricalItems
      .map((item) => `${item.label}: ${item.value}`)
      .join(". ")}`,
    pricing.ctaText,
  ];
};

const detectIntent = (question: string) => {
  const pricingIntent =
    /(price|pricing|cost|quote|how much|vat|hour|call[- ]?out|service fee|installation)/i.test(
      question
    );
  const contractIntent =
    /(cover|covered|include|included|exclude|contract|terms|service|helpline|response|claims)/i.test(
      question
    );
  const seoIntent =
    /(boiler|radiator|pressure|heating|water|leak|noise|fault|thermostat|engineer|camden|hackney|islington|london|certificate|servic|repair|install|guide|landlord)/i.test(
      question
    );
  const greeting = /^(hi|hello|hey|yo|good morning|good evening)\b/i.test(
    question.trim()
  );

  return { pricingIntent, contractIntent, seoIntent, greeting };
};

const buildContractsKnowledgeText = (content: SiteContent): string[] => {
  const contracts = content.contractsPage;

  return [
    `${contracts.introHeading}. ${contracts.introSubheading} ${contracts.currentPricingNotice}`,
    `${contracts.packageBenefitsTitle}. ${contracts.packageBenefits.join(". ")}`,
    ...contracts.packages.map((pkg) =>
      [
        `${pkg.name}. ${pkg.subtitle} ${pkg.monthlyFrom}.`,
        `Includes: ${pkg.includes.join(". ")}.`,
        pkg.extraCover?.length ? `Extra cover: ${pkg.extraCover.join(". ")}.` : "",
      ]
        .filter(Boolean)
        .join(" ")
    ),
    `${contracts.landlordTitle}. ${contracts.landlordBody} ${contracts.landlordHighlights.join(
      ". "
    )} ${contracts.landlordNote}`,
    `${contracts.atAGlanceTitle}. ${contracts.atAGlance.join(". ")}`,
    `${contracts.annualServiceChecksTitle}. ${contracts.annualServiceChecks.join(
      ". "
    )} ${contracts.annualServiceChecksNote}`,
    `${contracts.exclusionsTitle}. ${contracts.sharedExclusions.join(". ")}`,
    `${contracts.termsHighlightsTitle}. ${contracts.termsHighlights.join(". ")}`,
    ...contracts.faq.map((item) => `FAQ. ${item.question} ${item.answer}`),
  ];
};

const buildSeoKnowledgeText = (page: SeoPage): string => {
  const sectionText = page.sections
    .slice(0, 3)
    .map((section) =>
      [section.heading, section.body, section.bullets?.slice(0, 4).join(". ")]
        .filter(Boolean)
        .join(". ")
    )
    .join(" ");
  const faqText = page.faq
    .slice(0, 2)
    .map((item) => `${item.question} ${item.answer}`)
    .join(" ");

  return [
    `${page.h1}. ${page.intro}`,
    page.pricingGuidance ? `Pricing guidance: ${page.pricingGuidance}` : "",
    page.localProof ? `Local coverage: ${page.localProof}` : "",
    sectionText,
    faqText,
  ]
    .filter(Boolean)
    .join(" ");
};

const getStaticKnowledgeChunks = async (): Promise<KnowledgeChunk[]> => {
  if (!staticKnowledgePromise) {
    staticKnowledgePromise = (async () => {
      const pricingPath = path.join(process.cwd(), "public/info/price.txt");

      const [pricingRaw, brochureRaw] = await Promise.all([
        readFile(pricingPath, "utf8"),
        readBrochureText(),
      ]);

      return [
        ...splitIntoChunks("pricing", "/pricing", pricingRaw, 300),
        ...splitIntoChunks("brochure", "/info/geo-gas-brochure-2026.pdf", brochureRaw, 430),
      ];
    })();
  }

  return staticKnowledgePromise;
};

const getKnowledgeBase = async (content: SiteContent): Promise<KnowledgeBase> => {
  const [staticChunks, seoPages] = await Promise.all([
    getStaticKnowledgeChunks(),
    getAllSeoPages(),
  ]);

  const contractChunks = buildContractsKnowledgeText(content).flatMap((text, index) =>
    splitIntoChunks("contracts", "/contracts", text, 420).map((chunk) => ({
      ...chunk,
      id: `contracts-${index}-${chunk.id}`,
    }))
  );

  const seoChunks = seoPages
    .filter((page) => !page.noindex)
    .flatMap((page) =>
      splitIntoChunks("seo", `/${page.slug}`, buildSeoKnowledgeText(page), 420).map(
        (chunk) => ({
          ...chunk,
          id: `seo-${page.slug}-${chunk.id}`,
        })
      )
    );

  const pricingChunks = buildPricingKnowledgeText(content).flatMap((text, index) =>
    splitIntoChunks("pricing", "/pricing", text, 320).map((chunk) => ({
      ...chunk,
      id: `pricing-structured-${index}-${chunk.id}`,
    }))
  );

  return {
    chunks: [...staticChunks, ...pricingChunks, ...contractChunks, ...seoChunks],
  };
};

const rankChunks = (question: string, knowledge: KnowledgeBase) => {
  const { pricingIntent, contractIntent, seoIntent } = detectIntent(question);
  const tokens = tokenize(question);

  return knowledge.chunks
    .map((chunk) => {
      let score = 0;

      for (const token of tokens) {
        if (chunk.normalized.includes(token)) {
          score += token.length > 5 ? 2 : 1;
        }
      }

      if (pricingIntent && chunk.source === "pricing") score += 3;
      if (pricingIntent && chunk.source === "contracts") score += 1;
      if (contractIntent && chunk.source === "contracts") score += 3;
      if (contractIntent && chunk.source === "brochure") score += 2;
      if (seoIntent && chunk.source === "seo") score += 2;
      if (/landlord|inspection|certificate|gas safe/i.test(question)) {
        if (/landlord|inspection|certificate|gas safe/i.test(chunk.text)) score += 2;
      }

      return { chunk, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);
};

const buildSuggestions = (question: string): string[] => {
  const { pricingIntent, contractIntent, seoIntent, greeting } = detectIntent(question);
  const tokens = tokenize(question);

  if (greeting || tokens.length === 0) {
    return [
      "What are your current gas and boiler call-out rates?",
      "How much is a landlord gas inspection?",
      "What is included in your home rescue contracts?",
    ];
  }

  if (pricingIntent) {
    return [
      "Break this down by daytime vs evening rates",
      "What is the starting price for boiler installation?",
      "Show landlord bundle pricing",
    ];
  }

  if (contractIntent) {
    return [
      "Explain what is included in every contract",
      "What is excluded from contract cover?",
      "What is the response time and helpline detail?",
    ];
  }

  if (seoIntent) {
    return [
      "Do you cover this service in Camden or Islington?",
      "What checks are safe before I book an engineer?",
      "Show the closest matching service or guide page",
    ];
  }

  return [
    "Show boiler servicing prices",
    "What are your drain call-out rates?",
    "What does the contract include and exclude?",
  ];
};

const getOpenAI = (): OpenAI => {
  if (!openaiClient) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "OPENAI_API_KEY is not set. Add it to your environment to use the chatbot."
      );
    }
    openaiClient = new OpenAI({ apiKey });
  }
  return openaiClient;
};

const SYSTEM_PROMPT = `You are the Geo Gas website assistant.
You must answer ONLY using the supplied context.
Rules:
1) If the context does not contain the answer, clearly say you cannot confirm from current Geo Gas files.
2) Do not invent prices, terms, names or policies.
3) Keep responses concise, practical, and customer-friendly.
4) When giving prices, keep currency/time windows exactly as written.
5) Mention if details appear to come from live pricing text, structured contract content, brochure terms or SEO guidance pages.
6) If user follow-up depends on previous turns, use the provided conversation excerpt.
7) You may also use the supplied static Geo Gas business facts for operating locations and contact hours.`;

const encodeStreamEvent = (event: ChatStreamEvent): Uint8Array => {
  return new TextEncoder().encode(`${JSON.stringify(event)}\n`);
};

const sanitizeHistory = (history: unknown): ChatHistoryItem[] => {
  if (!Array.isArray(history)) return [];

  return history
    .slice(-8)
    .map((item) => {
      const role = item?.role === "assistant" ? "assistant" : "user";
      const text = typeof item?.text === "string" ? item.text.trim() : "";
      return text ? { role, text } : null;
    })
    .filter((item): item is ChatHistoryItem => item !== null);
};

const buildStaticBusinessFacts = (globalContent: SiteContent["global"]): string => {
  const { operatingLocations, contactHours } = globalContent;
  const contactHoursLine = [contactHours.regularDays, contactHours.regularHours]
    .filter(Boolean)
    .join(", ");

  return [
    `Operating locations: ${operatingLocations}.`,
    `Contact hours: ${contactHoursLine}.`,
    contactHours.emergency
      ? `${contactHours.emergency} emergency support is available.`
      : "Emergency support is available.",
  ].join(" ");
};

const createReply = async (
  question: string,
  history: ChatHistoryItem[],
  knowledge: KnowledgeBase,
  globalContent: SiteContent["global"],
  staticBusinessFacts: string,
  signal: AbortSignal
): Promise<ReadableStream<Uint8Array>> => {
  const ranked = rankChunks(question, knowledge).slice(0, 8);
  const guardrail = getGuardrail(question, globalContent);
  const suggestions =
    guardrail.kind === "none" ? buildSuggestions(question) : guardrail.suggestions;
  const encoder = new TextEncoder();

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: ChatStreamEvent) => {
        controller.enqueue(encodeStreamEvent(event));
      };

      try {
        if (guardrail.kind !== "none") {
          send({ type: "chunk", delta: guardrail.answer });
          send({
            type: "final",
            sources: [],
            suggestions,
            confidence: "high",
            sourceKinds: [],
          });
          return;
        }

        if (!ranked.length) {
          const fallback =
            "I could not find a clear match in the current price list or brochure text. Please ask with a specific service, contract term, or time window.";
          send({ type: "chunk", delta: fallback });
          send({
            type: "final",
            sources: ["/pricing", "/contracts", "/guides", "/info/geo-gas-brochure-2026.pdf"],
            suggestions,
            confidence: "low",
            sourceKinds: ["pricing", "contracts", "seo", "brochure"],
          });
          return;
        }

        const context = ranked
          .map((item, index) => {
            return `[${index + 1}] (${item.chunk.source}) ${item.chunk.text}`;
          })
          .join("\n");

        const sources = Array.from(new Set(ranked.map((item) => item.chunk.href)));
        const sourceKinds = Array.from(
          new Set(ranked.map((item) => item.chunk.source))
        );
        const confidence = scoreToConfidence(ranked[0]?.score ?? 0);
        const conversationExcerpt =
          history.length > 0
            ? history
                .map((item) =>
                  `${item.role === "assistant" ? "Assistant" : "User"}: ${item.text}`
                )
                .join("\n")
            : "No prior conversation.";

        const client = getOpenAI();
        const responseStream = client.responses.stream({
          model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
          temperature: 0.1,
          max_output_tokens: 500,
          instructions: SYSTEM_PROMPT,
          input:
            `Conversation excerpt:\n${conversationExcerpt}\n\n` +
            `Current user question:\n${question}\n\n` +
            `Static Geo Gas business facts:\n${staticBusinessFacts}\n\n` +
            `Context from Geo Gas files:\n${context}\n\n` +
            "Answer using only this context.",
        });

        const onAbort = () => responseStream.abort();
        signal.addEventListener("abort", onAbort, { once: true });

        let hasText = false;

        try {
          for await (const event of responseStream) {
            if (event.type !== "response.output_text.delta") continue;
            if (!event.delta) continue;
            hasText = true;
            controller.enqueue(
              encoder.encode(
                `${JSON.stringify({ type: "chunk", delta: event.delta })}\n`
              )
            );
          }
          await responseStream.finalResponse();
        } finally {
          signal.removeEventListener("abort", onAbort);
        }

        if (!hasText) {
          send({
            type: "chunk",
            delta:
              "I could not generate a response from the current Geo Gas context.",
          });
        }

        send({
          type: "final",
          sources,
          suggestions,
          confidence,
          sourceKinds,
        });
      } catch (error) {
        send({
          type: "error",
          error:
            error instanceof Error
              ? error.message
              : "Chatbot request failed unexpectedly.",
        });
      } finally {
        controller.close();
      }
    },
  });
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      message?: string;
      history?: unknown;
    };
    const question = body.message?.trim();
    const history = sanitizeHistory(body.history);

    if (!question) {
      return NextResponse.json(
        { error: "A message is required." },
        { status: 400 }
      );
    }

    const content = await getSiteContent();
    const knowledge = await getKnowledgeBase(content);
    const staticBusinessFacts = buildStaticBusinessFacts(content.global);
    const stream = await createReply(
      question,
      history,
      knowledge,
      content.global,
      staticBusinessFacts,
      request.signal
    );

    return new Response(stream, {
      headers: {
        "Content-Type": "application/x-ndjson; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Chatbot request failed unexpectedly.",
      },
      { status: 500 }
    );
  }
}
