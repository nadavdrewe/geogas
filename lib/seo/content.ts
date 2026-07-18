import { cache } from "react";
import {
  getSeoContentRecords,
  getSeoDefaultsByType,
} from "@/lib/contentDatabase";
import { SEO_COMPANY } from "@/lib/seo/company";
import {
  BrandServicePage,
  GuidePage,
  LocationServicePage,
  PartGuidePage,
  ProblemPage,
  SeoLink,
  SeoLinkIntent,
  SeoPage,
  SeoPageIndex,
  SeoPageType,
  ServicePage,
} from "@/lib/seo/types";

type PlainObject = Record<string, unknown>;

const isPlainObject = (value: unknown): value is PlainObject => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

const mergeDeep = <T>(base: T, incoming: unknown): T => {
  if (Array.isArray(base)) {
    return (Array.isArray(incoming) ? incoming : base) as T;
  }

  if (!isPlainObject(base)) {
    if (incoming === undefined) {
      return base;
    }
    return incoming as T;
  }

  const next = { ...base } as PlainObject;
  const incomingObject = isPlainObject(incoming) ? incoming : {};

  for (const key of Object.keys(incomingObject)) {
    const baseValue = next[key];

    if (baseValue === undefined) {
      next[key] = incomingObject[key];
      continue;
    }

    next[key] = mergeDeep(baseValue, incomingObject[key]);
  }

  return next as T;
};

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function assertString(
  value: unknown,
  message: string,
  minimumLength = 1
): asserts value is string {
  assert(typeof value === "string" && value.trim().length >= minimumLength, message);
}

function assertStringArray(
  value: unknown,
  message: string,
  minimumLength = 1
): asserts value is string[] {
  assert(Array.isArray(value) && value.length >= minimumLength, message);
  value.forEach((item: unknown, index: number) => {
    assertString(item, `${message} (item ${index + 1})`);
  });
}

const intentByType: Record<SeoPageType, SeoLinkIntent> = {
  service: "service",
  location_service: "location",
  problem: "problem",
  part_guide: "part",
  brand_service: "brand",
  guide: "guide",
};

const buildLinkFromPage = (page: SeoPage): SeoLink => {
  return {
    label: page.linkTitle,
    href: `/${page.slug}`,
    intent: intentByType[page.type],
  };
};

const dedupeLinks = (links: SeoLink[]): SeoLink[] => {
  const seen = new Set<string>();
  const deduped: SeoLink[] = [];

  for (const link of links) {
    if (!link.href.startsWith("/") && !link.href.startsWith("http")) {
      continue;
    }

    if (seen.has(link.href)) {
      continue;
    }

    seen.add(link.href);
    deduped.push(link);
  }

  return deduped;
};

const validateSectionList = (page: SeoPage) => {
  assert(page.sections.length >= 3, `${page.slug}: at least 3 sections are required`);
  page.sections.forEach((section, index) => {
    assertString(
      section.heading,
      `${page.slug}: section ${index + 1} must have a heading`
    );

    const hasBody = typeof section.body === "string" && section.body.trim().length > 0;
    const hasBullets =
      Array.isArray(section.bullets) &&
      section.bullets.some((item) => typeof item === "string" && item.trim().length > 0);

    assert(
      hasBody || hasBullets,
      `${page.slug}: section ${index + 1} must include body text or bullets`
    );
  });
};

const validateFaqList = (page: SeoPage) => {
  assert(page.faq.length >= 3, `${page.slug}: at least 3 FAQ items are required`);
  page.faq.forEach((item, index) => {
    assertString(item.question, `${page.slug}: FAQ ${index + 1} needs a question`);
    assertString(item.answer, `${page.slug}: FAQ ${index + 1} needs an answer`, 8);
  });
};

const validateCommonPageFields = (page: SeoPage) => {
  assertString(page.slug, "Page slug is required");
  assertString(page.linkTitle, `${page.slug}: linkTitle is required`);
  assertString(page.metaTitle, `${page.slug}: metaTitle is required`, 10);
  assertString(page.metaDescription, `${page.slug}: metaDescription is required`, 20);
  assertString(page.h1, `${page.slug}: h1 is required`, 4);
  assertString(page.intro, `${page.slug}: intro is too short`, 60);
  assertString(page.cta.heading, `${page.slug}: CTA heading is required`, 8);
  assertString(page.cta.text, `${page.slug}: CTA text is required`, 12);
  validateSectionList(page);
  validateFaqList(page);

  const serialized = JSON.stringify(page);
  assert(
    !/\[(?:area|brand|location|phone|service)[^\]]*\]|todo|placeholder|lorem ipsum/i.test(
      serialized
    ),
    `${page.slug}: placeholder copy detected`
  );
};

const validateTypedPageFields = (page: SeoPage) => {
  switch (page.type) {
    case "service":
      assertString(page.serviceKey, `${page.slug}: serviceKey is required`);
      assertString(page.primaryLocation, `${page.slug}: primaryLocation is required`);
      assertStringArray(page.areasCovered, `${page.slug}: areasCovered is required`, 3);
      assertString(page.localProof, `${page.slug}: localProof is required`, 16);
      assertString(page.pricingGuidance, `${page.slug}: pricingGuidance is required`, 10);
      assertStringArray(page.trustSignals, `${page.slug}: trustSignals are required`, 3);
      break;
    case "location_service":
      assertString(page.serviceKey, `${page.slug}: serviceKey is required`);
      assertString(page.location, `${page.slug}: location is required`);
      assertString(page.parentServiceSlug, `${page.slug}: parentServiceSlug is required`);
      assertStringArray(page.nearbyAreas, `${page.slug}: nearbyAreas are required`, 2);
      assertString(page.localProof, `${page.slug}: localProof is required`, 16);
      break;
    case "problem":
      assertString(page.problemKey, `${page.slug}: problemKey is required`);
      assertString(page.parentServiceSlug, `${page.slug}: parentServiceSlug is required`);
      assertStringArray(page.symptoms, `${page.slug}: symptoms are required`, 2);
      assertStringArray(page.safeChecks, `${page.slug}: safeChecks are required`, 2);
      assertStringArray(page.doNotDiy, `${page.slug}: doNotDiy is required`, 2);
      assertString(page.safetyWarning, `${page.slug}: safetyWarning is required`, 12);
      assertStringArray(page.typicalFixes, `${page.slug}: typicalFixes are required`, 2);
      break;
    case "part_guide":
      assertString(page.partKey, `${page.slug}: partKey is required`);
      assertString(page.parentServiceSlug, `${page.slug}: parentServiceSlug is required`);
      assertStringArray(page.symptoms, `${page.slug}: symptoms are required`, 2);
      assertString(page.replacementCost, `${page.slug}: replacementCost is required`, 8);
      assert(typeof page.diyAllowed === "boolean", `${page.slug}: diyAllowed is required`);
      assertString(page.safetyWarning, `${page.slug}: safetyWarning is required`, 12);
      break;
    case "brand_service":
      assertString(page.brand, `${page.slug}: brand is required`);
      assertString(page.serviceKey, `${page.slug}: serviceKey is required`);
      assertString(page.parentServiceSlug, `${page.slug}: parentServiceSlug is required`);
      assertString(page.primaryLocation, `${page.slug}: primaryLocation is required`);
      assertStringArray(page.areasCovered, `${page.slug}: areasCovered are required`, 3);
      assertStringArray(page.commonFaults, `${page.slug}: commonFaults are required`, 3);
      assertString(page.localProof, `${page.slug}: localProof is required`, 16);
      break;
    case "guide":
      assertString(page.guideKey, `${page.slug}: guideKey is required`);
      assertString(page.targetKeyword, `${page.slug}: targetKeyword is required`);
      break;
  }
};

const enrichLinks = (page: SeoPage, bySlug: Map<string, SeoPage>): SeoPage => {
  const links: SeoLink[] = [...(page.internalLinks ?? [])];

  const addBySlug = (slug?: string) => {
    if (!slug) {
      return;
    }

    const target = bySlug.get(slug);

    if (!target || target.slug === page.slug) {
      return;
    }

    links.push(buildLinkFromPage(target));
  };

  const addMany = (slugs?: string[]) => {
    slugs?.forEach((slug) => addBySlug(slug));
  };

  if (page.parentServiceSlug) {
    addBySlug(page.parentServiceSlug);
  }

  switch (page.type) {
    case "service":
      addMany(page.relatedProblemSlugs);
      addMany(page.relatedLocationSlugs);
      addMany(page.relatedBrandSlugs);
      addMany(page.relatedGuideSlugs);
      break;
    case "location_service":
      addMany(page.relatedProblemSlugs);
      addMany(page.relatedLocationSlugs);
      addMany(page.relatedBrandSlugs);
      break;
    case "problem":
      addMany(page.relatedPartSlugs);
      addMany(page.relatedLocationSlugs);
      addMany(page.relatedBrandSlugs);
      break;
    case "part_guide":
      addMany(page.relatedProblemSlugs);
      addMany(page.relatedLocationSlugs);
      break;
    case "brand_service":
      addMany(page.relatedProblemSlugs);
      addMany(page.relatedLocationSlugs);
      addMany(page.relatedPartSlugs);
      break;
    case "guide":
      addMany(page.relatedProblemSlugs);
      addMany(page.relatedPartSlugs);
      addMany(page.relatedLocationSlugs);
      addMany(page.relatedBrandSlugs);
      break;
  }

  return {
    ...page,
    internalLinks: dedupeLinks(links),
  };
};

const validateInternalLinks = (page: SeoPage) => {
  assert(
    (page.internalLinks?.length ?? 0) >= 3,
    `${page.slug}: at least 3 internal links are required`
  );

  page.internalLinks?.forEach((link, index) => {
    assertString(link.label, `${page.slug}: internal link ${index + 1} needs a label`);
    assertString(link.href, `${page.slug}: internal link ${index + 1} needs an href`);
  });
};

const loadRawPages = async (): Promise<SeoPage[]> => {
  const [defaultsByType, records] = await Promise.all([
    getSeoDefaultsByType(),
    getSeoContentRecords(),
  ]);

  return records.map((record) => {
    const merged = mergeDeep(
      defaultsByType.get(record.type) ?? {},
      record.content
    ) as SeoPage;
    validateCommonPageFields(merged);
    validateTypedPageFields(merged);
    return merged;
  });
};

const buildSeoIndex = async (): Promise<SeoPageIndex> => {
  const pages = await loadRawPages();
  const bySlug = new Map<string, SeoPage>();
  const locationProofs = new Set<string>();

  for (const page of pages) {
    assert(!bySlug.has(page.slug), `Duplicate SEO slug detected: ${page.slug}`);
    bySlug.set(page.slug, page);

    if (page.type === "location_service") {
      assert(
        !locationProofs.has(page.localProof),
        `${page.slug}: localProof must be unique across location pages`
      );
      locationProofs.add(page.localProof);
    }
  }

  const enrichedPages = pages.map((page) => enrichLinks(page, bySlug));
  const enrichedBySlug = new Map(enrichedPages.map((page) => [page.slug, page] as const));

  enrichedPages.forEach((page) => {
    validateInternalLinks(page);

    if (page.parentServiceSlug) {
      assert(
        enrichedBySlug.has(page.parentServiceSlug),
        `${page.slug}: parent service ${page.parentServiceSlug} does not exist`
      );
    }
  });

  return {
    pages: enrichedPages,
    bySlug: enrichedBySlug,
    byType: {
      service: enrichedPages.filter((page): page is ServicePage => page.type === "service"),
      location_service: enrichedPages.filter(
        (page): page is LocationServicePage => page.type === "location_service"
      ),
      problem: enrichedPages.filter((page): page is ProblemPage => page.type === "problem"),
      part_guide: enrichedPages.filter(
        (page): page is PartGuidePage => page.type === "part_guide"
      ),
      brand_service: enrichedPages.filter(
        (page): page is BrandServicePage => page.type === "brand_service"
      ),
      guide: enrichedPages.filter((page): page is GuidePage => page.type === "guide"),
    },
  };
};

const getSeoIndex = cache(buildSeoIndex);

export const getAllSeoPages = async (): Promise<SeoPage[]> => {
  const index = await getSeoIndex();
  return index.pages;
};

export const getSeoPageBySlug = async (slug: string): Promise<SeoPage | null> => {
  const index = await getSeoIndex();
  return index.bySlug.get(slug) ?? null;
};

export const getSeoPagesByType = async <T extends SeoPageType>(
  type: T
): Promise<SeoPageIndex["byType"][T]> => {
  const index = await getSeoIndex();
  return index.byType[type];
};

export const getSeoHubSections = async () => {
  const index = await getSeoIndex();

  return [
    {
      title: "Core Services",
      description:
        "Lead-focused service pages covering repairs, installs, servicing, landlord checks and urgent call-outs.",
      pages: index.byType.service,
    },
    {
      title: "Location Pages",
      description:
        "Local landing pages for the areas you want to win more boiler and gas leads from.",
      pages: index.byType.location_service,
    },
    {
      title: "Problem Guides",
      description:
        "High-intent fault pages that answer what the issue means, what is safe to check and when to book an engineer.",
      pages: index.byType.problem,
    },
    {
      title: "Parts & Components",
      description:
        "Component guides that explain signs of failure, likely repair costs and when replacement is needed.",
      pages: index.byType.part_guide,
    },
    {
      title: "Boiler Brand Support",
      description:
        "Brand-specific repair pages that connect common fault types to your wider repair and location pages.",
      pages: index.byType.brand_service,
    },
    {
      title: "Guides",
      description:
        "Supportive education content linked back to the core money pages and local service pages.",
      pages: index.byType.guide,
    },
  ].filter((section) => section.pages.length > 0);
};

export const getSeoPageUrl = (slug: string) => `${SEO_COMPANY.siteUrl}/${slug}`;
