import type { SeoPage, SeoVisualAsset } from "@/lib/seo/types";

type SeoPageVisuals = {
  heroImage?: SeoVisualAsset;
  featureImage?: SeoVisualAsset;
};

const boilerRepairVisuals: SeoPageVisuals = {
  heroImage: {
    src: "/images/seo/boiler-repair/boiler-repair-hero-v1.png",
    alt: "Gas engineer using a diagnostic meter while inspecting a domestic boiler",
    label: "Boiler repair response",
    title: "Diagnosis before the repair",
  },
  featureImage: {
    src: "/images/seo/boiler-repair/boiler-repair-diagnostics-v1.png",
    alt: "Engineer using diagnostic equipment on a domestic boiler with copper pipework",
    label: "A proper repair visit",
    title: "We test first, then explain the best repair route",
    description: "Clear fault finding gives you a practical recommendation before any major work is approved.",
  },
};

const fallbackVisualsBySlug: Record<string, SeoPageVisuals> = {
  "boiler-repair": boilerRepairVisuals,
};

export const getSeoPageVisuals = (page: SeoPage): SeoPageVisuals => {
  const fallback = fallbackVisualsBySlug[page.slug];

  return {
    heroImage: page.heroImage ?? fallback?.heroImage,
    featureImage: page.featureImage ?? fallback?.featureImage,
  };
};
