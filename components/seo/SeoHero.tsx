import { SEO_COMPANY } from "@/lib/seo/company";
import { SeoPage } from "@/lib/seo/types";
import SeoActionLink from "@/components/seo/SeoActionLink";

type SummaryItem = {
  label: string;
  value: string;
};

type SeoHeroProps = {
  page: SeoPage;
  summaryTitle: string;
  summaryItems: SummaryItem[];
};

const SeoHero = ({ page, summaryTitle, summaryItems }: SeoHeroProps) => {
  return (
    <section className="seo-page__hero">
      <div className="seo-page__hero-card">
        <div className="row g-4 align-items-stretch">
          <div className="col-lg-8">
            <div className="seo-page__hero-copy">
              <span className="seo-page__eyebrow">
                {page.heroEyebrow || SEO_COMPANY.name}
              </span>
              <h1>{page.h1}</h1>
              <p>{page.intro}</p>
              <div className="seo-page__contact-meta">
                <span>
                  <i className="fa-solid fa-phone-volume"></i>
                  {SEO_COMPANY.primaryPhoneDisplay}
                </span>
                <span>
                  <i className="fa-brands fa-whatsapp"></i>
                  WhatsApp support available
                </span>
                <span>
                  <i className="fa-solid fa-shield-check"></i>
                  Gas Safe registered
                </span>
              </div>
              {page.trustSignals?.length ? (
                <div className="seo-page__chips">
                  {page.trustSignals.map((signal) => (
                    <span key={signal}>{signal}</span>
                  ))}
                </div>
              ) : null}
              <div className="seo-page__actions">
                <SeoActionLink
                  className="button-1"
                  href={SEO_COMPANY.primaryPhoneHref}
                  label={`Call ${SEO_COMPANY.primaryPhoneDisplay}`}
                />
                {page.cta.primaryHref && page.cta.primaryLabel ? (
                  <SeoActionLink
                    className="button-2"
                    href={page.cta.primaryHref}
                    label={page.cta.primaryLabel}
                  />
                ) : null}
                <SeoActionLink
                  className="button-2"
                  href={SEO_COMPANY.whatsappHref}
                  label="WhatsApp us"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <aside className="seo-page__summary-card">
              <h2>{summaryTitle}</h2>
              <ul className="seo-page__summary-list">
                {summaryItems.map((item) => (
                  <li key={`${item.label}-${item.value}`}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </li>
                ))}
              </ul>
              <div className="seo-page__summary-note">
                <span>Emergency line</span>
                <a href={SEO_COMPANY.emergencyPhoneHref}>
                  {SEO_COMPANY.emergencyPhoneDisplay}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeoHero;

