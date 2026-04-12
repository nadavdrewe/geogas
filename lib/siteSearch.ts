import type { SiteContent } from "@/data/siteContent";
import {
  annualServiceChecks,
  contractPackages,
  contractsFaq,
  currentPricingNotice,
  packageBenefits,
  sharedExclusions,
  termsHighlights,
} from "@/data/contractsContent";
import { helpAdviceItems } from "@/data/helpAdviceContent";

export type SearchResult = {
  id: string;
  title: string;
  href: string;
  category: string;
  snippet: string;
  score: number;
};

type SearchEntry = Omit<SearchResult, "score"> & {
  keywords?: string[];
};

const normalize = (value: string): string =>
  value.toLowerCase().replace(/[^\w\s£/&-]/g, " ").replace(/\s+/g, " ").trim();

const tokenize = (value: string): string[] =>
  Array.from(
    new Set(
      normalize(value)
    .split(" ")
    .map((token) => token.trim())
        .filter((token) => token.length > 1)
        .flatMap((token) => {
          const variants = [token];
          if (token.endsWith("ies") && token.length > 4) {
            variants.push(`${token.slice(0, -3)}y`);
          }
          if (token.endsWith("es") && token.length > 4) {
            variants.push(token.slice(0, -2));
          }
          if (token.endsWith("s") && token.length > 3) {
            variants.push(token.slice(0, -1));
          }
          if (token.endsWith("ing") && token.length > 5) {
            variants.push(token.slice(0, -3));
          }
          return variants;
        })
    )
  );

const truncate = (value: string, length = 180): string => {
  if (value.length <= length) return value;
  return `${value.slice(0, length).trimEnd()}...`;
};

const toAnchorSlug = (value: string): string =>
  value.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");

const buildEntries = (content: SiteContent): SearchEntry[] => {
  const entries: SearchEntry[] = [
    {
      id: "page-home",
      title: "Home",
      href: "/",
      category: "Page",
      snippet:
        "Geo Gas homepage with services, pricing overview, contracts, FAQs, contact form and chatbot.",
      keywords: ["homepage", "main page", "chatbot", "contact"],
    },
    {
      id: "page-about",
      title: "About Geo Gas Services",
      href: "/about",
      category: "Page",
      snippet:
        "Company overview, contract rescue brochure summary, founder message and customer reputation details.",
      keywords: ["about", "founder", "aaron stewart", "reputation"],
    },
    {
      id: "page-services",
      title: "Services",
      href: "/services",
      category: "Page",
      snippet:
        "Gas, boiler, plumbing and drainage services including call-outs, inspections and installation support.",
      keywords: ["boiler repair", "plumbing", "drainage", "landlord checks"],
    },
    {
      id: "page-contracts",
      title: "Home Service Contracts",
      href: "/contracts",
      category: "Page",
      snippet:
        "GEO Starter and GEO Complete cover, contract benefits, exclusions and terms highlights.",
      keywords: ["contracts", "cover", "homecare", "starter", "complete"],
    },
    {
      id: "page-pricing",
      title: "Pricing",
      href: "/pricing",
      category: "Page",
      snippet:
        "Current call-out rates, service pricing and works charges shown directly on the site.",
      keywords: ["pricing", "cost", "rates", "call-out", "quote"],
    },
    {
      id: "page-faq",
      title: "FAQ",
      href: "/faq",
      category: "Page",
      snippet:
        "Frequently asked questions about contracts, call-outs, annual boiler service and exclusions.",
      keywords: ["faq", "questions", "answers", "helpline", "response time"],
    },
    {
      id: "page-help-advice",
      title: "Help & Advice",
      href: "/help-and-advice",
      category: "Page",
      snippet:
        "Boiler troubleshooting advice for pressure, controls, noise, power and cold radiators.",
      keywords: ["help", "advice", "boiler problems", "troubleshooting"],
    },
    {
      id: "page-contact",
      title: "Contact",
      href: "/contact",
      category: "Page",
      snippet:
        "Book a call-out or request a quote, direct contact numbers, operating locations and contact hours.",
      keywords: ["contact", "phone", "email", "locations", "hours"],
    },
    {
      id: "contact-hours",
      title: "Contact Hours",
      href: "/contact",
      category: "Contact Info",
      snippet: `${content.home.contact.contactHours.regularDays} ${content.home.contact.contactHours.regularHours}. ${content.home.contact.contactHours.emergency}.`,
      keywords: ["opening hours", "business hours", "opening times", "emergency"],
    },
    {
      id: "contact-locations",
      title: "Operating Locations",
      href: "/contact",
      category: "Contact Info",
      snippet: `Geo Gas operates in ${content.home.contact.operatingLocations}.`,
      keywords: ["areas", "coverage", "service area", "london", "sussex", "surrey"],
    },
    {
      id: "contracts-pricing-notice",
      title: "Contract Pricing Notice",
      href: "/pricing",
      category: "Pricing",
      snippet: currentPricingNotice,
      keywords: ["contract pricing", "current rates", "prices"],
    },
  ];

  content.home.services.cards.forEach((card, index) => {
    entries.push({
      id: `service-card-${index}`,
      title: card.title,
      href: "/services",
      category: "Service",
      snippet: `${card.kicker}. ${card.description}`,
      keywords: [card.title, card.kicker],
    });
  });

  content.home.faq.items.forEach((item, index) => {
    entries.push({
      id: `faq-item-${index}`,
      title: item.question,
      href: `/faq#faq-item-${item.number}`,
      category: "FAQ",
      snippet: item.answer,
      keywords: ["faq", "question", item.number],
    });
  });

  packageBenefits.slice(0, 12).forEach((item, index) => {
    entries.push({
      id: `contract-benefit-${index}`,
      title: `Contract Benefit: ${item}`,
      href: "/contracts",
      category: "Contracts",
      snippet: item,
      keywords: ["contract benefit", "cover", "included"],
    });
  });

  annualServiceChecks.slice(0, 10).forEach((item, index) => {
    entries.push({
      id: `service-check-${index}`,
      title: `Annual Service Check: ${item}`,
      href: "/services",
      category: "Service",
      snippet: `Included in annual boiler service checks: ${item}.`,
      keywords: ["annual service", "boiler service", "check"],
    });
  });

  sharedExclusions.slice(0, 10).forEach((item, index) => {
    entries.push({
      id: `contract-exclusion-${index}`,
      title: `Contract Exclusion: ${item}`,
      href: "/contracts",
      category: "Contracts",
      snippet: item,
      keywords: ["excluded", "exclusion", "not covered"],
    });
  });

  termsHighlights.slice(0, 8).forEach((item, index) => {
    entries.push({
      id: `terms-highlight-${index}`,
      title: `Terms Highlight: ${item}`,
      href: "/contracts",
      category: "Contracts",
      snippet: item,
      keywords: ["terms", "conditions", "contract"],
    });
  });

  contractPackages.forEach((pkg, index) => {
    entries.push({
      id: `contract-package-${index}`,
      title: pkg.name,
      href: "/contracts",
      category: "Contracts",
      snippet: `${pkg.subtitle} ${pkg.monthlyFrom}`,
      keywords: ["starter", "complete", "monthly", "contract cover"],
    });
  });

  contractsFaq.forEach((faq, index) => {
    entries.push({
      id: `contracts-faq-${index}`,
      title: faq.question,
      href: "/contracts",
      category: "Contracts FAQ",
      snippet: faq.answer,
      keywords: ["contracts faq", "contracts", "pricing", "cover"],
    });
  });

  helpAdviceItems.forEach((item, index) => {
    entries.push({
      id: `help-advice-${index}`,
      title: item.title,
      href: `/help-and-advice#help-advice-${toAnchorSlug(item.title)}`,
      category: "Help & Advice",
      snippet: item.body,
      keywords: ["boiler", "help", "advice", "troubleshooting"],
    });
  });

  return entries;
};

const scoreEntry = (entry: SearchEntry, query: string, tokens: string[]): number => {
  const haystack = normalize(
    [entry.title, entry.snippet, ...(entry.keywords ?? [])].join(" ")
  );
  const title = normalize(entry.title);
  let score = 0;

  if (!query) return 0;
  if (title.includes(query)) score += 12;
  if (haystack.includes(query)) score += 8;
  if (entry.href === "/services" && /(boiler|plumb|drain|service|repair|install)/.test(query)) {
    score += 1;
  }
  if (entry.href === "/contracts" && /(contract|cover|terms|exclude|included?)/.test(query)) {
    score += 1;
  }
  if (entry.href === "/pricing" && /(price|pricing|rate|cost|quote)/.test(query)) {
    score += 1;
  }
  if (entry.category === "Page") score += 1;

  for (const token of tokens) {
    if (title.includes(token)) score += 5;
    if (haystack.includes(token)) score += token.length >= 5 ? 3 : 2;
  }

  return score;
};

const dedupeAndDiversify = (results: SearchResult[]): SearchResult[] => {
  const seenExact = new Set<string>();
  const titleCount = new Map<string, number>();
  const hrefCount = new Map<string, number>();
  const finalResults: SearchResult[] = [];

  for (const result of results) {
    const exactKey = `${result.href}::${normalize(result.title)}::${normalize(result.snippet)}`;
    if (seenExact.has(exactKey)) continue;
    seenExact.add(exactKey);

    const titleKey = normalize(result.title);
    const titleSeen = titleCount.get(titleKey) ?? 0;
    if (titleSeen >= 2) continue;

    const hrefSeen = hrefCount.get(result.href) ?? 0;
    const hrefLimit = result.category === "Page" ? 4 : 8;
    if (hrefSeen >= hrefLimit) continue;

    titleCount.set(titleKey, titleSeen + 1);
    hrefCount.set(result.href, hrefSeen + 1);
    finalResults.push(result);
  }

  return finalResults;
};

export const searchSiteContent = (
  queryInput: string,
  content: SiteContent
): SearchResult[] => {
  const query = normalize(queryInput);
  if (!query) return [];

  const tokens = tokenize(queryInput);
  const entries = buildEntries(content);

  const rankedResults = entries
    .map((entry) => ({
      ...entry,
      score: scoreEntry(entry, query, tokens),
      snippet: truncate(entry.snippet),
    }))
    .filter((entry) => entry.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        a.href.localeCompare(b.href) ||
        a.title.length - b.title.length ||
        a.title.localeCompare(b.title)
    )
    ;

  return dedupeAndDiversify(rankedResults).slice(0, 24);
};
