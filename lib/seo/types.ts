export type SeoPageType =
  | "service"
  | "location_service"
  | "problem"
  | "part_guide"
  | "brand_service"
  | "guide";

export type SeoLinkIntent =
  | "service"
  | "location"
  | "problem"
  | "brand"
  | "part"
  | "guide";

export type SeoLink = {
  label: string;
  href: string;
  intent?: SeoLinkIntent;
};

export type SeoFaqItem = {
  question: string;
  answer: string;
};

export type SeoSection = {
  heading: string;
  body?: string;
  bullets?: string[];
};

export type SeoCtaBlock = {
  eyebrow?: string;
  heading: string;
  text: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export type SeoReview = {
  name: string;
  quote: string;
  location?: string;
};

export type SeoPageBase = {
  type: SeoPageType;
  slug: string;
  linkTitle: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  heroEyebrow?: string;
  pricingGuidance?: string;
  trustSignals?: string[];
  localProof?: string;
  sections: SeoSection[];
  faq: SeoFaqItem[];
  cta: SeoCtaBlock;
  reviews?: SeoReview[];
  internalLinks?: SeoLink[];
  parentServiceSlug?: string;
  relatedProblemSlugs?: string[];
  relatedPartSlugs?: string[];
  relatedLocationSlugs?: string[];
  relatedBrandSlugs?: string[];
  relatedGuideSlugs?: string[];
  noindex?: boolean;
};

export type ServicePage = SeoPageBase & {
  type: "service";
  serviceKey: string;
  primaryLocation: string;
  areasCovered: string[];
  pricingGuidance: string;
  localProof: string;
  trustSignals: string[];
};

export type LocationServicePage = SeoPageBase & {
  type: "location_service";
  serviceKey: string;
  location: string;
  nearbyAreas: string[];
  areasCovered?: string[];
  parentServiceSlug: string;
  localProof: string;
};

export type ProblemPage = SeoPageBase & {
  type: "problem";
  problemKey: string;
  parentServiceSlug: string;
  symptoms: string[];
  safeChecks: string[];
  doNotDiy: string[];
  safetyWarning: string;
  typicalFixes: string[];
  urgency: "low" | "medium" | "high";
};

export type PartGuidePage = SeoPageBase & {
  type: "part_guide";
  partKey: string;
  parentServiceSlug: string;
  symptoms: string[];
  replacementCost: string;
  diyAllowed: boolean;
  safetyWarning: string;
};

export type BrandServicePage = SeoPageBase & {
  type: "brand_service";
  brand: string;
  serviceKey: string;
  primaryLocation: string;
  areasCovered: string[];
  commonFaults: string[];
  parentServiceSlug: string;
  pricingGuidance: string;
  localProof: string;
};

export type GuidePage = SeoPageBase & {
  type: "guide";
  guideKey: string;
  targetKeyword: string;
  guideCategory: "problem" | "part" | "general";
};

export type SeoPage =
  | ServicePage
  | LocationServicePage
  | ProblemPage
  | PartGuidePage
  | BrandServicePage
  | GuidePage;

export type SeoPageIndex = {
  pages: SeoPage[];
  bySlug: Map<string, SeoPage>;
  byType: Record<SeoPageType, SeoPage[]>;
};
