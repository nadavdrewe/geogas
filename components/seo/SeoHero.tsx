import { SeoCompanyInfo } from "@/lib/seo/company";
import { SeoPage } from "@/lib/seo/types";
import SeoActionLink from "@/components/seo/SeoActionLink";

type SummaryItem = {
  label: string;
  value: string;
};

type SeoHeroProps = {
  company: SeoCompanyInfo;
  page: SeoPage;
  summaryTitle: string;
  summaryItems: SummaryItem[];
};

const SeoHero = ({ company, page, summaryTitle, summaryItems }: SeoHeroProps) => {
  return (
    <section className="seo-page__hero">
      <div className="seo-page__hero-card">
        <div className="row g-4 align-items-stretch">
          <div className="col-lg-8">
            <div className="seo-page__hero-copy">
              <span className="seo-page__eyebrow">
                {page.heroEyebrow || company.name}
              </span>
              <h1>{page.h1}</h1>
              <p>{page.intro}</p>
              <div className="seo-page__contact-meta">
                <a href={company.londonOfficePhoneHref}>
                  <i className="fa-solid fa-phone-volume"></i>
                  London office {company.londonOfficePhoneDisplay}
                </a>
                <a href={company.sussexOfficePhoneHref}>
                  <i className="fa-solid fa-phone-volume"></i>
                  Sussex office {company.sussexOfficePhoneDisplay}
                </a>
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
                  href={company.londonOfficePhoneHref}
                  label={`Call London office ${company.londonOfficePhoneDisplay}`}
                />
                <SeoActionLink
                  className="button-2"
                  href={company.sussexOfficePhoneHref}
                  label={`Call Sussex office ${company.sussexOfficePhoneDisplay}`}
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
                  href={company.whatsappHref}
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
                <a href={company.emergencyPhoneHref}>
                  {company.emergencyPhoneDisplay}
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

