import type { Metadata } from "next";
import Link from "next/link";
import SeoSiteShell from "@/components/seo/SeoSiteShell";
import SeoStructuredData from "@/components/seo/SeoStructuredData";
import { SEO_COMPANY } from "@/lib/seo/company";
import { getSeoHubSections } from "@/lib/seo/content";
import { buildGuidesHubSchemas } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Boiler Repair Guides | Geo Gas Services London Ltd",
  description:
    "Problem guides, parts guides and supporting service pages for boiler repair, gas safety and local call-outs across London.",
  alternates: {
    canonical: `${SEO_COMPANY.siteUrl}/guides`,
  },
  openGraph: {
    title: "Boiler Repair Guides | Geo Gas Services London Ltd",
    description:
      "Problem guides, parts guides and supporting service pages for boiler repair, gas safety and local call-outs across London.",
    url: `${SEO_COMPANY.siteUrl}/guides`,
    type: "website",
    siteName: SEO_COMPANY.name,
  },
};

const GuidesPage = async () => {
  const sections = await getSeoHubSections();

  return (
    <SeoSiteShell>
      <main className="seo-page seo-page--hub section-padding-three">
        <SeoStructuredData items={buildGuidesHubSchemas()} />
        <div className="container">
          <section className="seo-page__hero">
            <div className="seo-page__hero-card">
              <div className="seo-page__hero-copy">
                <span className="seo-page__eyebrow">Guides hub</span>
                <h1>Boiler, heating and gas safety guides</h1>
                <p>
                  This hub groups the high-intent pages built to support boiler repair,
                  gas safety and local service leads. Use it as the internal linking
                  centre for problem pages, parts guides and supporting service pages.
                </p>
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

