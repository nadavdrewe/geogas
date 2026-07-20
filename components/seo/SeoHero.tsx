import Image from "next/image";
import { SeoCompanyInfo } from "@/lib/seo/company";
import { getSeoPageVisuals } from "@/lib/seo/pageVisuals";
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
  const { heroImage } = getSeoPageVisuals(page);
  const hasHeroImage = Boolean(heroImage);
  const contactMetaSignals = new Set([
    "whatsapp support available",
    "gas safe registered",
  ]);
  const trustSignals = page.trustSignals?.filter(
    (signal) => !contactMetaSignals.has(signal.trim().toLowerCase())
  );

  return (
    <section className="seo-page__hero">
      <div
        className={`seo-page__hero-card${
          hasHeroImage ? " seo-page__hero-card--with-visual" : ""
        }`}
      >
        <div className="row g-4 align-items-stretch">
          <div className={hasHeroImage ? "col-lg-7" : "col-lg-8"}>
            <div className="seo-page__hero-copy">
              <span className="seo-page__eyebrow">
                {page.heroEyebrow || company.name}
              </span>
              <h1>{page.h1}</h1>
              <p>{page.intro}</p>
              {hasHeroImage ? (
                <div className="seo-page__hero-signals">
                  <span>
                    <i className="fa-solid fa-shield-check"></i>
                    Gas Safe registered
                  </span>
                  <span>
                    <i className="fa-solid fa-location-dot"></i>
                    London &amp; Sussex coverage
                  </span>
                  <span>
                    <i className="fa-brands fa-whatsapp"></i>
                    WhatsApp support available
                  </span>
                </div>
              ) : (
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
              )}
              {trustSignals?.length ? (
                <div className="seo-page__chips">
                  {trustSignals.map((signal) => (
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
                {!hasHeroImage ? (
                  <SeoActionLink
                    className="button-2"
                    href={company.sussexOfficePhoneHref}
                    label={`Call Sussex office ${company.sussexOfficePhoneDisplay}`}
                  />
                ) : null}
              </div>
            </div>
          </div>
          <div className={hasHeroImage ? "col-lg-5" : "col-lg-4"}>
            {hasHeroImage && heroImage ? (
              <div className="seo-page__hero-visual">
                <Image
                  src={heroImage.src}
                  alt={heroImage.alt}
                  fill
                  priority
                  sizes="(max-width: 991px) calc(100vw - 72px), 42vw"
                />
                <div className="seo-page__hero-visual-caption">
                  {heroImage.label ? <span>{heroImage.label}</span> : null}
                  {heroImage.title ? <strong>{heroImage.title}</strong> : null}
                </div>
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeoHero;
