import type { MetadataRoute } from "next";
import { getAllSeoPages } from "@/lib/seo/content";
import { getSiteContent } from "@/lib/siteContent";

const STATIC_ROUTES = [
  "",
  "/about",
  "/services",
  "/contracts",
  "/pricing",
  "/faq",
  "/contact",
  "/help-and-advice",
  "/guides",
];

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const content = await getSiteContent();
  const siteUrl = content.global.siteUrl;
  const seoPages = await getAllSeoPages();
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const seoEntries: MetadataRoute.Sitemap = seoPages.map((page) => ({
    url: `${siteUrl}/${page.slug}`,
    lastModified: now,
    changeFrequency: page.type === "service" ? "weekly" : "monthly",
    priority:
      page.type === "service"
        ? 0.9
        : page.type === "location_service"
          ? 0.8
          : 0.7,
  }));

  return [...staticEntries, ...seoEntries];
};

export default sitemap;
