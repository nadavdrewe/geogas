import Link from "next/link";
import Image from "next/image";
import {
  annualServiceChecks,
  brochurePreviews,
  contractAtAGlance,
  contractPackages,
  contractsContact,
  contractsFaq,
  contractsIntro,
  currentPricingNotice,
  landlordPackageHighlights,
  packageBenefits,
  reputationPlatforms,
  reputationSources,
  termsClauseIndex,
  sharedExclusions,
  termsSections,
  termsHighlights,
} from "@/data/contractsContent";

const ContractsContent = () => {
  return (
    <section className="contracts__page section-padding">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="contracts__page-title">
              <h2>{contractsIntro.heading}</h2>
              <p>{contractsIntro.subheading}</p>
            </div>
          </div>
        </div>

        <div className="row mt-30">
          <div className="col-xl-12">
            <div className="contracts__page-reference">
              <i className="fa-solid fa-circle-info"></i>
              <p>{currentPricingNotice}</p>
                <div className="contracts__page-reference-links">
                  <Link href="/pricing">View Current Pricing</Link>
                  <Link href="/info/price.txt" target="_blank" rel="noreferrer">
                    Open Live Price File
                  </Link>
                </div>
            </div>
          </div>
        </div>

        <div className="row mt-40">
          <div className="col-xl-7 lg-mb-30">
            <div className="contracts__page-intro-card">
              <h3>Peace Of Mind Home Contracts</h3>
              <p>{contractsIntro.founderNote}</p>
              <span>{contractsIntro.founderName}</span>
            </div>
          </div>
          <div className="col-xl-5">
            <div className="contracts__page-contact-card">
              <h3>Contract Helpline 24/7</h3>
              <ul>
                <li>
                  <i className="fa-solid fa-phone"></i>
                  <a href={`tel:${contractsContact.phonePrimary.replace(/\s/g, "")}`}>
                    {contractsContact.phonePrimary}
                  </a>
                </li>
                <li>
                  <i className="fa-solid fa-phone"></i>
                  <a
                    href={`tel:${contractsContact.phoneSecondary.replace(/\s/g, "")}`}
                  >
                    {contractsContact.phoneSecondary}
                  </a>
                </li>
                <li>
                  <i className="fa-solid fa-envelope"></i>
                  <a href={`mailto:${contractsContact.email}`}>
                    {contractsContact.email}
                  </a>
                </li>
                <li>
                  <i className="fa-solid fa-globe"></i>
                  <a
                    href={`https://${contractsContact.website}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {contractsContact.website}
                  </a>
                </li>
              </ul>
              <div className="contracts__page-price-tag">
                <span>Contracts from</span>
                <h4>£19 / month</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-60">
          <div className="col-xl-12">
            <div className="contracts__page-benefits">
              <h3>Package Benefits</h3>
              <div className="contracts__page-benefits-grid">
                {packageBenefits.map((benefit) => (
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
          {contractPackages.map((pkg) => (
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
                {pkg.extraCover && (
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
                )}
              </article>
            </div>
          ))}
        </div>

        <div className="row mt-60">
          <div className="col-xl-6 lg-mb-30">
            <div className="contracts__page-block">
              <h3>Landlord Packages & Safety Certificates</h3>
              <p>
                The brochure confirms landlord packages are available, including
                inspection on gas appliances and pipework with certificates.
              </p>
              <ul>
                {landlordPackageHighlights.map((item) => (
                  <li key={item}>
                    <i className="fa-solid fa-house-user"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="contracts__page-note">
                Use the Pricing and Contact pages to request current landlord check
                rates and booking availability.
              </p>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="contracts__page-block">
              <h3>Contract At A Glance (Brochure Terms)</h3>
              <ul>
                {contractAtAGlance.map((item) => (
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
              <h3>Annual Boiler Service Checks</h3>
              <ul>
                {annualServiceChecks.map((item) => (
                  <li key={item}>
                    <i className="fa-solid fa-check"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="contracts__page-note">
                The annual boiler service itself does not form part of the
                contract cover.
              </p>
            </div>
          </div>
          <div className="col-xl-5">
            <div className="contracts__page-block contracts__page-block--warning">
              <h3>Things We Don&apos;t Cover</h3>
              <ul>
                {sharedExclusions.map((item) => (
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
              <h3>Terms & Conditions Highlights</h3>
              <div className="contracts__page-terms-grid">
                {termsHighlights.map((item) => (
                  <div key={item} className="contracts__page-terms-item">
                    <i className="fa-solid fa-file-circle-check"></i>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
              <div className="contracts__page-terms-cta">
                <p>
                  Read the full legal wording in the brochure Terms & Conditions
                  pages.
                </p>
                <div className="contracts__page-terms-cta-buttons">
                  <Link className="button-1" href="/contact">
                    Ask About Contracts
                    <i className="fa-regular fa-angle-right"></i>
                  </Link>
                  <Link
                    className="button-2"
                    href="/info/geo-gas-brochure-2026.pdf"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open Full Brochure
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
              <h3>Contract Terms Breakdown</h3>
              <div className="contracts__page-docs-grid">
                {termsSections.map((section) => (
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
              <h3>Terms Clause Index</h3>
              <div className="contracts__page-clauses-grid">
                {termsClauseIndex.map((clause) => (
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
              <h3>Contracts FAQ</h3>
              <div className="contracts__page-faq-list">
                {contractsFaq.map((faq) => (
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
              <h3>Brochure Pages Preview</h3>
              <p>
                Preview company brochure pages here, then open the full PDF for
                complete wording.
              </p>
              <div className="contracts__page-brochure-grid">
                {brochurePreviews.map((preview) => (
                  <a
                    key={preview.src}
                    href="/info/geo-gas-brochure-2026.pdf"
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
                  src="/info/geo-gas-brochure-2026.pdf"
                  title="GEO Gas Brochure 2026"
                  loading="lazy"
                />
              </div>
              <a
                className="contracts__page-viewer-link"
                href="/info/geo-gas-brochure-2026.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Open PDF In New Tab
                <i className="fa-regular fa-angle-right"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="row mt-40">
          <div className="col-xl-12">
            <div className="contracts__page-reputation">
              <h3>Proud Of Our 5 Star Reputation</h3>
              <p>
                Checkatrade, Trustpilot and Google Reviews are highlighted in
                the GEO Gas brochure.
              </p>
              <div className="contracts__page-reputation-badges">
                {reputationSources.map((source) => (
                  <span key={source}>{source}</span>
                ))}
              </div>
              <div className="contracts__page-reputation-grid">
                {reputationPlatforms.map((platform) => (
                  <article
                    key={platform.name}
                    className="contracts__page-reputation-item"
                  >
                    <h5>{platform.name}</h5>
                    <p>{platform.note}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContractsContent;
