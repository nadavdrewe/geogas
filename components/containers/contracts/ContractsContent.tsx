"use client";

import Link from "next/link";
import Image from "next/image";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

const ContractsContent = () => {
  const { content } = useSiteContent();
  const contractsContent = content.contractsPage;
  const globalContent = content.global;
  const headerContact = content.header.contactItems;

  return (
    <section className="contracts__page section-padding">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="contracts__page-title">
              <h2>{contractsContent.introHeading}</h2>
              <p>{contractsContent.introSubheading}</p>
            </div>
          </div>
        </div>

        <div className="row mt-30">
          <div className="col-xl-12">
            <div className="contracts__page-reference">
              <i className="fa-solid fa-circle-info"></i>
              <p>{contractsContent.currentPricingNotice}</p>
              <div className="contracts__page-reference-links">
                <Link href="/pricing">View Current Pricing</Link>
                <Link href="/pricing">Open Pricing Page</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-40">
          <div className="col-xl-7 lg-mb-30">
            <div className="contracts__page-intro-card">
              <h3>Peace Of Mind Home Contracts</h3>
              <p>{contractsContent.founderNote}</p>
              <span>{contractsContent.founderName}</span>
            </div>
          </div>
          <div className="col-xl-5">
            <div className="contracts__page-contact-card">
              <h3>{contractsContent.contactCardTitle}</h3>
              <ul>
                {headerContact.map((item) => (
                  <li key={`${item.label}-${item.href}`}>
                    <i className={item.icon || "fa-solid fa-circle-info"}></i>
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    >
                      {item.value}
                      {item.label === "Email" || item.label === "Website"
                        ? ""
                        : ` (${item.label})`}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="contracts__page-price-tag">
                <span>{contractsContent.priceTagLabel}</span>
                <h4>{contractsContent.priceTagValue}</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-60">
          <div className="col-xl-12">
            <div className="contracts__page-benefits">
              <h3>{contractsContent.packageBenefitsTitle}</h3>
              <div className="contracts__page-benefits-grid">
                {contractsContent.packageBenefits.map((benefit) => (
                  <div className="contracts__page-benefits-item" key={benefit}>
                    <i className="fa-solid fa-check"></i>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-60">
          {contractsContent.packages.map((pkg) => (
            <div className="col-xl-6 mt-30" key={pkg.name}>
              <article className="contracts__page-package">
                <div className="contracts__page-package-head">
                  <div>
                    <h3>{pkg.name}</h3>
                    <p>{pkg.subtitle}</p>
                  </div>
                  <span>{pkg.monthlyFrom}</span>
                </div>
                <h5>What&apos;s Covered</h5>
                <ul>
                  {pkg.includes.map((item) => (
                    <li key={item}>
                      <i className="fa-solid fa-check"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {pkg.extraCover ? (
                  <>
                    <h5>Extra Cover In This Package</h5>
                    <ul>
                      {pkg.extraCover.map((item) => (
                        <li key={item}>
                          <i className="fa-solid fa-plus"></i>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}
              </article>
            </div>
          ))}
        </div>

        <div className="row mt-60">
          <div className="col-xl-6 lg-mb-30">
            <div className="contracts__page-block">
              <h3>{contractsContent.landlordTitle}</h3>
              <p>{contractsContent.landlordBody}</p>
              <ul>
                {contractsContent.landlordHighlights.map((item) => (
                  <li key={item}>
                    <i className="fa-solid fa-house-user"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="contracts__page-note">{contractsContent.landlordNote}</p>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="contracts__page-block">
              <h3>{contractsContent.atAGlanceTitle}</h3>
              <ul>
                {contractsContent.atAGlance.map((item) => (
                  <li key={item}>
                    <i className="fa-solid fa-scale-balanced"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="row mt-60">
          <div className="col-xl-7 lg-mb-30">
            <div className="contracts__page-block">
              <h3>{contractsContent.annualServiceChecksTitle}</h3>
              <ul>
                {contractsContent.annualServiceChecks.map((item) => (
                  <li key={item}>
                    <i className="fa-solid fa-check"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="contracts__page-note">
                {contractsContent.annualServiceChecksNote}
              </p>
            </div>
          </div>
          <div className="col-xl-5">
            <div className="contracts__page-block contracts__page-block--warning">
              <h3>{contractsContent.exclusionsTitle}</h3>
              <ul>
                {contractsContent.sharedExclusions.map((item) => (
                  <li key={item}>
                    <i className="fa-solid fa-xmark"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="row mt-60">
          <div className="col-xl-12">
            <div className="contracts__page-terms">
              <h3>{contractsContent.termsHighlightsTitle}</h3>
              <div className="contracts__page-terms-grid">
                {contractsContent.termsHighlights.map((item) => (
                  <div key={item} className="contracts__page-terms-item">
                    <i className="fa-solid fa-file-circle-check"></i>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
              <div className="contracts__page-terms-cta">
                <p>{contractsContent.termsCtaText}</p>
                <div className="contracts__page-terms-cta-buttons">
                  <Link
                    className="button-1"
                    href={contractsContent.termsPrimaryAction.href}
                  >
                    {contractsContent.termsPrimaryAction.label}
                    <i className="fa-regular fa-angle-right"></i>
                  </Link>
                  <Link
                    className="button-2"
                    href={contractsContent.termsSecondaryAction.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {contractsContent.termsSecondaryAction.label}
                    <i className="fa-regular fa-angle-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-60">
          <div className="col-xl-12">
            <div className="contracts__page-docs">
              <h3>{contractsContent.termsBreakdownTitle}</h3>
              <div className="contracts__page-docs-grid">
                {contractsContent.termsSections.map((section) => (
                  <article key={section.title} className="contracts__page-docs-item">
                    <h5>{section.title}</h5>
                    <ul>
                      {section.points.map((point) => (
                        <li key={point}>
                          <i className="fa-solid fa-check"></i>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-40">
          <div className="col-xl-12">
            <div className="contracts__page-clauses">
              <h3>{contractsContent.termsClauseIndexTitle}</h3>
              <div className="contracts__page-clauses-grid">
                {contractsContent.termsClauseIndex.map((clause) => (
                  <article
                    key={clause.clause}
                    className="contracts__page-clauses-item"
                  >
                    <h5>
                      Clause {clause.clause}: {clause.title}
                    </h5>
                    <p>{clause.summary}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-60">
          <div className="col-xl-12">
            <div className="contracts__page-faq">
              <h3>{contractsContent.faqTitle}</h3>
              <div className="contracts__page-faq-list">
                {contractsContent.faq.map((faq) => (
                  <article key={faq.question} className="contracts__page-faq-item">
                    <h5>{faq.question}</h5>
                    <p>{faq.answer}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-60">
          <div className="col-xl-12">
            <div className="contracts__page-brochure">
              <h3>{contractsContent.brochureTitle}</h3>
              <p>{contractsContent.brochureDescription}</p>
              <div className="contracts__page-brochure-grid">
                {contractsContent.brochurePreviews.map((preview) => (
                  <a
                    key={preview.src}
                    href={contractsContent.brochureLinkHref}
                    target="_blank"
                    rel="noreferrer"
                    className="contracts__page-brochure-item"
                  >
                    <div className="contracts__page-brochure-item-image">
                      <Image
                        src={preview.src}
                        alt={preview.title}
                        width={700}
                        height={990}
                      />
                    </div>
                    <span>{preview.title}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-40">
          <div className="col-xl-12">
            <div className="contracts__page-viewer">
              <h3>Full Brochure Viewer</h3>
              <p>
                View the complete brochure terms, coverage wording and artwork
                directly on-site.
              </p>
              <div className="contracts__page-viewer-frame">
                <iframe
                  src={globalContent.brochurePdfPath}
                  title={globalContent.brochureViewerTitle}
                  loading="lazy"
                />
              </div>
              <a
                className="contracts__page-viewer-link"
                href={contractsContent.brochureLinkHref}
                target="_blank"
                rel="noreferrer"
              >
                {contractsContent.brochureLinkLabel}
                <i className="fa-regular fa-angle-right"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="row mt-40">
          <div className="col-xl-12">
            <div className="contracts__page-reputation">
              <h3>{contractsContent.reputationTitle}</h3>
              <p>{contractsContent.reputationDescription}</p>
              <div className="contracts__page-reputation-badges">
                {contractsContent.reputationBadges.map((source) => (
                  <span key={source}>{source}</span>
                ))}
              </div>
              <div className="contracts__page-reputation-grid">
                {globalContent.reviewPlatforms.map((platform) =>
                  platform.href ? (
                    <a
                      key={platform.name}
                      className="contracts__page-reputation-item"
                      href={platform.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <h5>{platform.name}</h5>
                      <p>{platform.note}</p>
                      <span>
                        {platform.ctaLabel || `Open ${platform.name}`}
                        <i className="fa-regular fa-arrow-up-right-from-square"></i>
                      </span>
                    </a>
                  ) : (
                    <article
                      key={platform.name}
                      className="contracts__page-reputation-item"
                    >
                      <h5>{platform.name}</h5>
                      <p>{platform.note}</p>
                    </article>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContractsContent;
