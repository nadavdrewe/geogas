"use client";

import Link from "next/link";
import { useSiteContent } from "@/components/providers/SiteContentProvider";
import type { PricingItem } from "@/data/siteContent";

const pricingSections = [
  { href: "#callout-rates", label: "Hourly rates" },
  { href: "#servicing-prices", label: "Servicing & checks" },
  { href: "#installation-prices", label: "Installations" },
  { href: "#upgrade-prices", label: "System upgrades" },
  { href: "#electrical-prices", label: "Electrical" },
];

const PriceGrid = ({ items }: { items: PricingItem[] }) => (
  <div className="pricing__listing-grid">
    {items.map((item) => (
      <div className="pricing__listing-grid-item" key={item.label}>
        <h6>{item.label}</h6>
        <span>{item.value}</span>
      </div>
    ))}
  </div>
);

interface PricingListingProps {
  compact?: boolean;
}

const PricingListing = ({ compact = false }: PricingListingProps) => {
  const { content } = useSiteContent();
  const pricingContent = content.pricingPage;
  const contractContent = content.contractsPage;
  const leadPackage = contractContent.packages[0];

  return (
    <section
      id={compact ? "home-pricing" : undefined}
      className={
        "pricing__listing section-padding" +
        (compact ? " pricing__listing--compact" : "")
      }
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="pricing__listing-title">
              <h2>{pricingContent.title}</h2>
              <p>{pricingContent.description}</p>
            </div>
            <div className="pricing__listing-note">
              <i className="fa-solid fa-circle-info"></i>
              <p>{pricingContent.note}</p>
              {compact ? <Link href="/pricing">Open Pricing Page</Link> : null}
            </div>
            {!compact ? (
              <nav className="pricing__listing-jump" aria-label="Pricing categories">
                <span>Browse prices</span>
                <div>
                  {pricingSections.map((section) => (
                    <a href={section.href} key={section.href}>
                      {section.label}
                      <i className="fa-regular fa-arrow-down" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </nav>
            ) : null}
          </div>
        </div>

        {!compact ? (
          <div className="row mt-30">
            <div className="col-xl-7 lg-mb-30">
              <div className="pricing__listing-summary">
                <h3>Call-Out Pricing Summary</h3>
                <ul>
                  {pricingContent.calloutRules.map((rule) => (
                    <li key={rule}>
                      <i className="fa-solid fa-check"></i>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
                <div className="pricing__listing-summary-action">
                  <p>Need a confirmed total for your job?</p>
                  <Link href="/contact">
                    Get a tailored quote
                    <i className="fa-regular fa-angle-right" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-5">
              <div className="pricing__listing-contract">
                <div className="pricing__listing-contract-head">
                  <div>
                    <span>{pricingContent.contractEyebrow}</span>
                    <h4>{pricingContent.contractTitle}</h4>
                  </div>
                  <strong>{leadPackage?.monthlyFrom ?? "£19 / month"}</strong>
                </div>
                <ul>
                  {contractContent.packageBenefits.slice(0, 4).map((benefit) => (
                    <li key={benefit}>
                      <i className="fa-solid fa-shield-check"></i>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <div className="pricing__listing-contract-actions">
                  <Link className="button-2" href="/contracts">
                    Compare Contract Cover
                    <i className="fa-regular fa-angle-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="row mt-10" id={compact ? undefined : "callout-rates"}>
          {pricingContent.hourlyCategories.map((category) => (
            <div className="col-xl-4 col-md-6 mt-30" key={category.title}>
              <div className="pricing__listing-hourly">
                <h4>{category.title}</h4>
                <ul>
                  {category.rates.map((rate) => (
                    <li key={rate.period}>
                      <span>{rate.period}</span>
                      <strong>{rate.price}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {!compact ? (
          <>
            <div className="row mt-70">
              <div className="col-xl-12">
                <div className="pricing__listing-block" id="servicing-prices">
                  <h3>Boiler Servicing & Landlord Checks</h3>
                  <PriceGrid items={pricingContent.serviceItems} />
                </div>
              </div>
            </div>

            <div className="row mt-40">
              <div className="col-xl-12">
                <div className="pricing__listing-block" id="installation-prices">
                  <h3>Boiler Installation & Replacements</h3>
                  <PriceGrid items={pricingContent.installationItems} />
                </div>
              </div>
            </div>

            <div className="row mt-40">
              <div className="col-xl-12">
                <div className="pricing__listing-block" id="upgrade-prices">
                  <h3>Sales & System Upgrades</h3>
                  <PriceGrid items={pricingContent.salesItems} />
                </div>
              </div>
            </div>

            <div className="row mt-40">
              <div className="col-xl-12">
                <div className="pricing__listing-block" id="electrical-prices">
                  <h3>Electrical Works (EICR)</h3>
                  <PriceGrid items={pricingContent.electricalItems} />
                </div>
              </div>
            </div>
          </>
        ) : null}

        <div className="row mt-50">
          <div className="col-xl-12">
            <div className="pricing__listing-cta">
              <p>{pricingContent.ctaText}</p>
              <div className="pricing__listing-cta-buttons">
                <Link className="button-1" href="/contact">
                  Request A Quote<i className="fa-regular fa-angle-right"></i>
                </Link>
                <Link className="button-2" href={compact ? "/pricing" : "/contracts"}>
                  {compact ? "View Full Pricing" : "Compare Contract Cover"}
                  <i className="fa-regular fa-angle-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingListing;
