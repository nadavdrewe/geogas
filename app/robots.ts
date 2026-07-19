import type { MetadataRoute } from "next";
import { getSiteContent } from "@/lib/siteContent";

const robots = async (): Promise<MetadataRoute.Robots> => {
  const content = await getSiteContent();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/"],
    },
    sitemap: `${content.global.siteUrl}/sitemap.xml`,
    host: content.global.siteUrl,
  };
};

export default robots;
