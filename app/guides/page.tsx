import type { Metadata } from "next";
import Link from "next/link";
import SeoSiteShell from "@/components/seo/SeoSiteShell";
import SeoStructuredData from "@/components/seo/SeoStructuredData";
import { buildSeoCompanyInfo } from "@/lib/seo/company";
import { getSeoHubSections } from "@/lib/seo/content";
import { buildGuidesHubSchemas } from "@/lib/seo/schema";
import { getSiteContent } from "@/lib/siteContent";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  const company = buildSeoCompanyInfo(content);
  const guidesContent = content.guidesPage;
  const canonical = `${company.siteUrl}/guides`;

  return {
    title: guidesContent.metaTitle,
    description: guidesContent.metaDescription,
    alternates: {
      canonical,
    },
    openGraph: {
      title: guidesContent.metaTitle,
      description: guidesContent.metaDescription,
      url: canonical,
      type: "website",
      siteName: company.name,
    },
    twitter: {
      card: "summary",
      title: guidesContent.metaTitle,
      description: guidesContent.metaDescription,
    },
  };
}

const GuidesPage = async () => {
  const [sections, content] = await Promise.all([getSeoHubSections(), getSiteContent()]);
  const company = buildSeoCompanyInfo(content);
  const guidesContent = content.guidesPage;

  return (
    <SeoSiteShell>
      <main className="seo-page seo-page--hub section-padding-three">
        <SeoStructuredData items={buildGuidesHubSchemas(company)} />
        <div className="container">
          <section className="seo-page__hero">
            <div className="seo-page__hero-card">
              <div className="seo-page__hero-copy">
                <span className="seo-page__eyebrow">{guidesContent.eyebrow}</span>
                <h1>{guidesContent.title}</h1>
                <p>{guidesContent.description}</p>
              </div>
            </div>
          </section>

          <div className="seo-page__stack">
            {sections.map((section) => (
              <section key={section.title} className="seo-page__card">
                <h2>{section.title}</h2>
                <p>{section.description}</p>
                <div className="seo-page__links-grid">
                  {section.pages.map((page) => (
                    <Link
                      key={page.slug}
                      href={`/${page.slug}`}
                      className="seo-page__link"
                    >
                      <span>{page.linkTitle}</span>
                      <i className="fa-regular fa-arrow-right"></i>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
    </SeoSiteShell>
  );
};

export default GuidesPage;
