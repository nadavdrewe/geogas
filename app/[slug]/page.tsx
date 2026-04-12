import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoPageRenderer from "@/components/seo/SeoPageRenderer";
import SeoSiteShell from "@/components/seo/SeoSiteShell";
import { SEO_COMPANY } from "@/lib/seo/company";
import { getAllSeoPages, getSeoPageBySlug } from "@/lib/seo/content";

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

  const url = `${SEO_COMPANY.siteUrl}/${page.slug}`;

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical: url,
    },
    robots: page.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url,
      type: "website",
      siteName: SEO_COMPANY.name,
    },
  };
}

const SeoPageRoute = async ({ params }: SeoPageRouteProps) => {
  const { slug } = await params;
  const page = await getSeoPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <SeoSiteShell>
      <SeoPageRenderer page={page} />
    </SeoSiteShell>
  );
};

export default SeoPageRoute;

