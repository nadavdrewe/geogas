"use client";

import Link from "next/link";
import Image from "next/image";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

const About = () => {
  const { content } = useSiteContent();
  const aboutContent = content.aboutPage;

  return (
    <section className="about__one section-padding">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div
              className="about__one-area"
              data-aos-duration="800"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="about__one-left">
                <div className="about__one-left-image">
                  <Image
                    src={aboutContent.imagePath}
                    alt={aboutContent.imageAlt}
                    width={1045}
                    height={1863}
                    priority
                  />
                </div>
              </div>
              <div className="about__one-right">
                <span className="about__one-kicker">{aboutContent.kicker}</span>
                <h2>{aboutContent.title}</h2>
                {aboutContent.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <p className="about__one-founder">{aboutContent.founderName}</p>
                <blockquote>{aboutContent.founderQuote}</blockquote>
                <div className="about__one-right-stats">
                  {aboutContent.stats.map((stat) => (
                    <div key={stat.value + stat.label} className="about__one-right-stat">
                      <h4>{stat.value}</h4>
                      <span>{stat.label}</span>
                    </div>
                  ))}
                </div>
                <div className="about__one-right-actions">
                  <Link className="button-1" href={aboutContent.primaryAction.href}>
                    {aboutContent.primaryAction.label}
                    <i className="fa-regular fa-angle-right"></i>
                  </Link>
                  <Link
                    className="button-2"
                    href={aboutContent.secondaryAction.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {aboutContent.secondaryAction.label}
                    <i className="fa-regular fa-angle-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-40">
          <div className="col-xl-7 lg-mb-30">
            <div className="about__one-benefits">
              <h3>{aboutContent.keyBenefitsTitle}</h3>
              <div className="about__one-benefits-grid">
                {aboutContent.keyBenefits.map((benefit) => (
                  <div key={benefit} className="about__one-benefits-item">
                    <i className="fa-solid fa-check"></i>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-xl-5">
            <div className="about__one-packages">
              <h3>{aboutContent.coverageTitle}</h3>
              <div className="about__one-packages-item">
                <h4>{aboutContent.starterTitle}</h4>
                <ul>
                  {aboutContent.starterCoverage.map((item) => (
                    <li key={item}>
                      <i className="fa-solid fa-fire-flame-curved"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="about__one-packages-item">
                <h4>{aboutContent.completeTitle}</h4>
                <ul>
                  {aboutContent.completeAddons.map((item) => (
                    <li key={item}>
                      <i className="fa-solid fa-plus"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-40">
          <div className="col-xl-12">
            <div className="about__one-reputation">
              <div className="about__one-reputation-image">
                <Image
                  src={aboutContent.reputationImagePath}
                  alt={aboutContent.reputationImageAlt}
                  width={542}
                  height={768}
                />
              </div>
              <div className="about__one-reputation-content">
                <h3>{aboutContent.reputationTitle}</h3>
                <p>{aboutContent.reputationDescription}</p>
                <div className="about__one-reputation-badges">
                  {aboutContent.reputationBadges.map((badge) => (
                    <span key={badge}>{badge}</span>
                  ))}
                </div>
                <ul>
                  {content.header.contactItems.map((item) => (
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
