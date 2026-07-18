import { SeoCompanyInfo } from "@/lib/seo/company";
import { SeoFaqItem, SeoPage } from "@/lib/seo/types";

const absoluteUrl = (href: string, company: SeoCompanyInfo) => {
  if (href.startsWith("http://") || href.startsWith("https://")) {
    return href;
  }

  return `${company.siteUrl}${href}`;
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

const buildBreadcrumbSchema = (page: SeoPage, company: SeoCompanyInfo) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: company.siteUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: page.h1,
      item: `${company.siteUrl}/${page.slug}`,
    },
  ],
});

const buildBusinessSchema = (page: SeoPage, company: SeoCompanyInfo) => ({
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  name: company.name,
  url: company.siteUrl,
  telephone: company.primaryPhoneDisplay,
  email: company.email,
  areaServed: company.serviceAreas,
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
          areaServed: company.serviceAreas,
          url: `${company.siteUrl}/${page.slug}`,
        },
      },
    ],
  },
});

const buildPageSchema = (page: SeoPage, company: SeoCompanyInfo) => ({
  "@context": "https://schema.org",
  "@type":
    page.type === "problem" || page.type === "part_guide" || page.type === "guide"
      ? "Article"
      : "Service",
  name: page.h1,
  headline: page.h1,
  description: page.metaDescription,
  url: `${company.siteUrl}/${page.slug}`,
  about: page.linkTitle,
  provider: {
    "@type": "Organization",
    name: company.name,
    url: company.siteUrl,
    telephone: company.primaryPhoneDisplay,
  },
  offers: page.pricingGuidance
    ? {
        "@type": "Offer",
        description: page.pricingGuidance,
      }
    : undefined,
});

export const buildSeoSchemas = (page: SeoPage, company: SeoCompanyInfo) => {
  return [
    buildBusinessSchema(page, company),
    buildPageSchema(page, company),
    buildBreadcrumbSchema(page, company),
    buildFaqSchema(page.faq),
  ];
};

export const buildGuidesHubSchemas = (company: SeoCompanyInfo) => {
  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Geo Gas Guides",
      description:
        "Guides, problem pages and parts pages for boiler repair, gas safety and local call-outs across London and Sussex.",
      url: absoluteUrl("/guides", company),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: company.siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Guides",
          item: absoluteUrl("/guides", company),
        },
      ],
    },
  ];
};
