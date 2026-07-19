"use client";

import { useState } from "react";
import Link from "next/link";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

const ServiceArea = () => {
  const [active, setActive] = useState(0);
  const { content } = useSiteContent();
  const servicesContent = content.home.services;
  const contractsContent = content.contractsPage;
  const brochureBenefits = contractsContent.packageBenefits.slice(0, 8);
  const boilerServiceChecks = contractsContent.annualServiceChecks.slice(0, 6);
  const keyLimits = contractsContent.sharedExclusions.slice(0, 6);
  const serviceContactItems = content.header.contactItems;

  return (
    <section className="services__two section-padding-three">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="services__two-title">
              <span>{servicesContent.kicker}</span>
              <h2>{servicesContent.title}</h2>
              <p>{servicesContent.description}</p>
            </div>
          </div>
        </div>

        <div className="row services__two-grid">
          {servicesContent.cards.map((service, index) => (
            <div
              key={`${service.title}-${index}`}
              className="col-xl-4 col-md-6 mt-30 services__two-col"
              data-aos-duration="800"
              data-aos="fade-up"
              data-aos-delay={300 + ((index % 3) + 1) * 120}
            >
              <article
                className={
                  "services__two-item services__two-item--home services__two-item--tone-" +
                  ((index % 6) + 1) +
                  (active === index ? " active" : "")
                }
                onMouseEnter={() => setActive(index)}
              >
                <span className="services__two-item-kicker">{service.kicker}</span>
                <h4>{service.title}</h4>
                <p>{service.description}</p>
                <div className="services__two-item-footer">
                  <Link href={service.linkHref}>
                    {service.linkLabel}
                    <i className="fa-regular fa-angle-right"></i>
                  </Link>
                  <div className="icon">
                    <i className={service.icon}></i>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>

        <div className="row mt-60">
          <div className="col-xl-8 lg-mb-30">
            <div className="services__page-panel">
              <div className="services__page-panel-head">
                <h3>Brochure Highlights Included Across GEO Contract Support</h3>
                <div className="services__page-chips">
                  <span>24/7 Helpline</span>
                  <span>Gas Safe Registered</span>
                  <span>Parts & Labour Covered*</span>
                </div>
              </div>
              <div className="services__page-list-grid">
                <div>
                  <h5>Package Benefits</h5>
                  <ul className="services__page-list">
                    {brochureBenefits.map((item) => (
                      <li key={item}>
                        <i className="fa-solid fa-check"></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5>Annual Boiler Service Checks (Brochure)</h5>
                  <ul className="services__page-list">
                    {boilerServiceChecks.map((item) => (
                      <li key={item}>
                        <i className="fa-solid fa-circle-check"></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="services__page-note">
                    The brochure notes that the annual boiler service itself does not
                    form part of the contract repair cover.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-4">
            <div className="services__page-panel services__page-panel--contact">
              <h3>Service Help & Contracts</h3>
              <p>
                Need emergency support, a boiler service, or landlord gas safety
                checks? Contact GEO Gas or compare current cover options.
              </p>
              <ul className="services__page-contact-list">
                {serviceContactItems.map((item) => (
                  <li key={`${item.label}-${item.href}`}>
                    <i className={item.icon || "fa-solid fa-circle-info"}></i>
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    >
                      {item.value}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="services__page-actions">
                <Link className="button-1" href="/contracts">
                  View Contracts
                  <i className="fa-regular fa-angle-right"></i>
                </Link>
                <Link className="button-2" href="/pricing">
                  View Pricing
                  <i className="fa-regular fa-angle-right"></i>
                </Link>
                <Link
                  className="button-2"
                  href={content.global.brochurePdfPath}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open Brochure
                  <i className="fa-regular fa-angle-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-40">
          <div className="col-xl-12">
            <div className="services__page-panel services__page-panel--warning">
              <h3>Important Service Limits & Exclusions (Brochure Summary)</h3>
              <ul className="services__page-list services__page-list--two-col">
                {keyLimits.map((item) => (
                  <li key={item}>
                    <i className="fa-solid fa-triangle-exclamation"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="services__page-note">
                Full terms, claim limits and exclusions are set out in the GEO Gas
                brochure Terms & Conditions. Use the Contracts page for the full
                breakdown.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceArea;
