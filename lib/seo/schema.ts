import { SEO_COMPANY } from "@/lib/seo/company";
import { SeoFaqItem, SeoPage } from "@/lib/seo/types";

const absoluteUrl = (href: string) => {
  if (href.startsWith("http://") || href.startsWith("https://")) {
    return href;
  }

  return `${SEO_COMPANY.siteUrl}${href}`;
};

const buildFaqSchema = (faq: SeoFaqItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
});

const buildBreadcrumbSchema = (page: SeoPage) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SEO_COMPANY.siteUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: page.h1,
      item: `${SEO_COMPANY.siteUrl}/${page.slug}`,
    },
  ],
});

const buildBusinessSchema = (page: SeoPage) => ({
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  name: SEO_COMPANY.name,
  url: SEO_COMPANY.siteUrl,
  telephone: SEO_COMPANY.primaryPhoneDisplay,
  email: SEO_COMPANY.email,
  areaServed: SEO_COMPANY.serviceAreas,
  description: page.metaDescription,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: page.h1,
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: page.h1,
          description: page.intro,
          areaServed: SEO_COMPANY.serviceAreas,
          url: `${SEO_COMPANY.siteUrl}/${page.slug}`,
        },
      },
    ],
  },
});

const buildPageSchema = (page: SeoPage) => ({
  "@context": "https://schema.org",
  "@type":
    page.type === "problem" || page.type === "part_guide" || page.type === "guide"
      ? "Article"
      : "Service",
  name: page.h1,
  headline: page.h1,
  description: page.metaDescription,
  url: `${SEO_COMPANY.siteUrl}/${page.slug}`,
  about: page.linkTitle,
  provider: {
    "@type": "Organization",
    name: SEO_COMPANY.name,
    url: SEO_COMPANY.siteUrl,
    telephone: SEO_COMPANY.primaryPhoneDisplay,
  },
  offers: page.pricingGuidance
    ? {
        "@type": "Offer",
        description: page.pricingGuidance,
      }
    : undefined,
});

export const buildSeoSchemas = (page: SeoPage) => {
  return [
    buildBusinessSchema(page),
    buildPageSchema(page),
    buildBreadcrumbSchema(page),
    buildFaqSchema(page.faq),
  ];
};

export const buildGuidesHubSchemas = () => {
  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Geo Gas Guides",
      description:
        "Guides, problem pages and parts pages for boiler repair, gas safety and local call-outs across London.",
      url: absoluteUrl("/guides"),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SEO_COMPANY.siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Guides",
          item: absoluteUrl("/guides"),
        },
      ],
    },
  ];
};
