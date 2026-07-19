import type { SiteContent } from "@/data/siteContent";
import { getAllSeoPages } from "@/lib/seo/content";
import type { SeoPage } from "@/lib/seo/types";

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

const seoCategoryLabel: Record<SeoPage["type"], string> = {
  service: "Service Page",
  location_service: "Location Page",
  problem: "Problem Guide",
  part_guide: "Part Guide",
  brand_service: "Brand Page",
  guide: "Guide",
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

const buildSeoEntries = (pages: SeoPage[]): SearchEntry[] => {
  return pages
    .filter((page) => !page.noindex)
    .map((page) => {
      const typeKeywords =
        page.type === "guide"
          ? [page.targetKeyword, page.guideKey]
          : page.type === "brand_service"
            ? [page.brand, page.serviceKey, page.primaryLocation]
            : page.type === "service"
              ? [page.serviceKey, page.primaryLocation]
              : page.type === "location_service"
                ? [page.serviceKey, page.location]
                : page.type === "problem"
                  ? [page.problemKey]
                  : [page.partKey];

      const areaKeywords =
        page.type === "service" || page.type === "brand_service"
          ? page.areasCovered
          : page.type === "location_service"
            ? page.nearbyAreas
            : [];

      const snippetParts = [
        page.intro,
        page.pricingGuidance,
        page.localProof,
        page.sections[0]?.heading,
      ].filter(Boolean);

      const keywords = [
        page.linkTitle,
        page.metaTitle,
        page.h1,
        ...typeKeywords,
        ...areaKeywords,
        ...page.sections.slice(0, 3).map((section) => section.heading),
        ...page.faq.slice(0, 3).map((item) => item.question),
      ].filter((value): value is string => typeof value === "string" && value.trim().length > 0);

      return {
        id: `seo-${page.slug}`,
        title: page.h1,
        href: `/${page.slug}`,
        category: seoCategoryLabel[page.type],
        snippet: snippetParts.join(" "),
        keywords,
      };
    });
};

const buildEntries = async (content: SiteContent): Promise<SearchEntry[]> => {
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
      keywords: ["contracts", "cover", "home rescue", "starter", "complete"],
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
      keywords: ["areas", "coverage", "service area", "london", "surrey"],
    },
    {
      id: "contracts-pricing-notice",
      title: "Contract Pricing Notice",
      href: "/pricing",
      category: "Pricing",
      snippet: content.contractsPage.currentPricingNotice,
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

  content.contractsPage.packageBenefits.slice(0, 12).forEach((item, index) => {
    entries.push({
      id: `contract-benefit-${index}`,
      title: `Contract Benefit: ${item}`,
      href: "/contracts",
      category: "Contracts",
      snippet: item,
      keywords: ["contract benefit", "cover", "included"],
    });
  });

  content.contractsPage.annualServiceChecks.slice(0, 10).forEach((item, index) => {
    entries.push({
      id: `service-check-${index}`,
      title: `Annual Service Check: ${item}`,
      href: "/services",
      category: "Service",
      snippet: `Included in annual boiler service checks: ${item}.`,
      keywords: ["annual service", "boiler service", "check"],
    });
  });

  content.contractsPage.sharedExclusions.slice(0, 10).forEach((item, index) => {
    entries.push({
      id: `contract-exclusion-${index}`,
      title: `Contract Exclusion: ${item}`,
      href: "/contracts",
      category: "Contracts",
      snippet: item,
      keywords: ["excluded", "exclusion", "not covered"],
    });
  });

  content.contractsPage.termsHighlights.slice(0, 8).forEach((item, index) => {
    entries.push({
      id: `terms-highlight-${index}`,
      title: `Terms Highlight: ${item}`,
      href: "/contracts",
      category: "Contracts",
      snippet: item,
      keywords: ["terms", "conditions", "contract"],
    });
  });

  content.contractsPage.packages.forEach((pkg, index) => {
    entries.push({
      id: `contract-package-${index}`,
      title: pkg.name,
      href: "/contracts",
      category: "Contracts",
      snippet: `${pkg.subtitle} ${pkg.monthlyFrom}`,
      keywords: ["starter", "complete", "monthly", "contract cover"],
    });
  });

  content.contractsPage.faq.forEach((faq, index) => {
    entries.push({
      id: `contracts-faq-${index}`,
      title: faq.question,
      href: "/contracts",
      category: "Contracts FAQ",
      snippet: faq.answer,
      keywords: ["contracts faq", "contracts", "pricing", "cover"],
    });
  });

  content.pricingPage.hourlyCategories.forEach((category, index) => {
    entries.push({
      id: `pricing-hourly-${index}`,
      title: `${category.title} Hourly Rates`,
      href: "/pricing",
      category: "Pricing",
      snippet: category.rates
        .map((rate) => `${rate.period}: ${rate.price}`)
        .join(" | "),
      keywords: [category.title, "hourly rates", "pricing", "call-out"],
    });
  });

  [
    ...content.pricingPage.serviceItems,
    ...content.pricingPage.installationItems,
    ...content.pricingPage.salesItems,
    ...content.pricingPage.electricalItems,
  ].forEach((item, index) => {
    entries.push({
      id: `pricing-item-${index}`,
      title: item.label,
      href: "/pricing",
      category: "Pricing",
      snippet: `${item.label}: ${item.value}`,
      keywords: [item.label, item.value, "pricing", "cost", "quote"],
    });
  });

  content.helpAdvicePage.items.forEach((item, index) => {
    entries.push({
      id: `help-advice-${index}`,
      title: item.title,
      href: `/help-and-advice#help-advice-${toAnchorSlug(item.title)}`,
      category: "Help & Advice",
      snippet: item.body,
      keywords: ["boiler", "help", "advice", "troubleshooting"],
    });
  });

  entries.push(...buildSeoEntries(await getAllSeoPages()));

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

export const searchSiteContent = async (
  queryInput: string,
  content: SiteContent
): Promise<SearchResult[]> => {
  const query = normalize(queryInput);
  if (!query) return [];

  const tokens = tokenize(queryInput);
  const entries = await buildEntries(content);

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
