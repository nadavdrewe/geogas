"use client";

import Link from "next/link";
import { useSiteContent } from "@/components/providers/SiteContentProvider";
import type { PricingItem } from "@/data/siteContent";

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
      className={(compact ? "pt-0 " : "") + "pricing__listing section-padding"}
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
              <Link href="/pricing">Open Pricing Page</Link>
            </div>
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

        <div className="row mt-10">
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
                <div className="pricing__listing-block">
                  <h3>Boiler Servicing & Landlord Checks</h3>
                  <PriceGrid items={pricingContent.serviceItems} />
                </div>
              </div>
            </div>

            <div className="row mt-40">
              <div className="col-xl-12">
                <div className="pricing__listing-block">
                  <h3>Boiler Installation & Replacements</h3>
                  <PriceGrid items={pricingContent.installationItems} />
                </div>
              </div>
            </div>

            <div className="row mt-40">
              <div className="col-xl-12">
                <div className="pricing__listing-block">
                  <h3>Sales & System Upgrades</h3>
                  <PriceGrid items={pricingContent.salesItems} />
                </div>
              </div>
            </div>

            <div className="row mt-40">
              <div className="col-xl-12">
                <div className="pricing__listing-block">
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
                <Link className="button-2" href="/pricing">
                  {compact ? "View Full Pricing" : "View Pricing Page"}
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
