import type { Metadata } from "next";
import { getSiteContent } from "@/lib/siteContent";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();

  return buildPageMetadata({
    title: `Admin | ${content.global.companyName}`,
    description: "Internal admin content tools.",
    path: "/admin",
    noindex: true,
    siteUrl: content.global.siteUrl,
    siteName: content.global.companyName,
  });
}

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default AdminLayout;
