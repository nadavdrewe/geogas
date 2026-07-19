import type { Metadata } from "next";
import { SEO_COMPANY } from "@/lib/seo/company";

type BuildPageMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noindex?: boolean;
  siteUrl?: string;
  siteName?: string;
};

export const legacyPageMetadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export const buildPageMetadata = ({
  title,
  description,
  path,
  keywords,
  noindex = false,
  siteUrl = SEO_COMPANY.siteUrl,
  siteName = SEO_COMPANY.name,
}: BuildPageMetadataInput): Metadata => {
  const canonical = `${siteUrl}${path}`;

  return {
    title,
    description,
    ...(keywords && keywords.length ? { keywords } : {}),
    alternates: {
      canonical,
    },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      siteName,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
};
