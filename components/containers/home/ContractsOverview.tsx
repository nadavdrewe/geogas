"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/public/img/geologodark.png";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

const ContractsOverview = () => {
  const { content } = useSiteContent();
  const contractsOverview = content.home.contractsOverview;

  return (
    <section className="contracts__overview section-padding pt-0">
      <div className="container">
        <div className="row ai-center">
          <div className="col-xl-6 lg-mb-30">
            <div className="contracts__overview-left">
              <span className="contracts__overview-kicker">
                {contractsOverview.kicker}
              </span>
              <h2>{contractsOverview.title}</h2>
              <p>{contractsOverview.descriptionPrimary}</p>
              <p>{contractsOverview.descriptionSecondary}</p>
              <ul className="contracts__overview-points">
                {contractsOverview.points.map((point) => (
                  <li key={point}>
                    <i className="fa-solid fa-check"></i>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="contracts__overview-buttons">
                {contractsOverview.buttons.map((button) => (
                  <Link
                    key={`${button.label}-${button.href}`}
                    className={button.variant === "primary" ? "button-1" : "button-2"}
                    href={button.href}
                  >
                    {button.label}
                    <i className="fa-regular fa-angle-right"></i>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="contracts__overview-right">
              <div className="contracts__overview-right-brand">
                <Image
                  src={logo}
                  alt="Geo Gas Services logo"
                  width={360}
                  height={120}
                  priority
                />
                <p>{contractsOverview.brandNote}</p>
                <div className="contracts__overview-right-tags">
                  {contractsOverview.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <h4>{contractsOverview.includedTitle}</h4>
              <ul>
                {contractsOverview.includedBenefits.map((benefit) => (
                  <li key={benefit}>
                    <i className="fa-solid fa-check"></i>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link
                className="contracts__overview-right-link"
                href={contractsOverview.detailsLinkHref}
              >
                {contractsOverview.detailsLinkLabel}
                <i className="fa-regular fa-angle-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContractsOverview;
