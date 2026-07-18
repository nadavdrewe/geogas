import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoPageRenderer from "@/components/seo/SeoPageRenderer";
import SeoSiteShell from "@/components/seo/SeoSiteShell";
import { buildSeoCompanyInfo } from "@/lib/seo/company";
import { getAllSeoPages, getSeoPageBySlug } from "@/lib/seo/content";
import { getSiteContent } from "@/lib/siteContent";

type SeoPageRouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const pages = await getAllSeoPages();
  return pages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: SeoPageRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getSeoPageBySlug(slug);

  if (!page) {
    return {};
  }

  const content = await getSiteContent();
  const company = buildSeoCompanyInfo(content);
  const canonical = `${company.siteUrl}/${page.slug}`;

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical,
    },
    robots: page.noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: canonical,
      type: "website",
      siteName: company.name,
    },
    twitter: {
      card: "summary",
      title: page.metaTitle,
      description: page.metaDescription,
    },
  };
}

const SeoPageRoute = async ({ params }: SeoPageRouteProps) => {
  const { slug } = await params;
  const [page, content] = await Promise.all([getSeoPageBySlug(slug), getSiteContent()]);

  if (!page) {
    notFound();
  }

  const company = buildSeoCompanyInfo(content);

  return (
    <SeoSiteShell>
      <SeoPageRenderer company={company} page={page} />
    </SeoSiteShell>
  );
};

export default SeoPageRoute;

