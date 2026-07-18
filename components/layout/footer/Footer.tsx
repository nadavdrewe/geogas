"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/public/img/geologodark.png";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { content } = useSiteContent();
  const footer = content.footer;
  const servicesGroup =
    footer.linkGroups.find((group) => group.title.toLowerCase().includes("service")) ??
    footer.linkGroups[0];
  const quickLinksGroup =
    footer.linkGroups.find((group) => group.title.toLowerCase().includes("quick")) ??
    footer.linkGroups[1];

  return (
    <div className="footer__one">
      <div className="container">
        <div className="row">
          <div className="col-xl-3 col-lg-5 col-md-6 xl-mb-30">
            <div
              className="footer__one-widget"
              data-aos-duration="800"
              data-aos="fade-up"
            >
              <div className="logo">
                <Link href="/">
                  <Image src={logo} alt="Geo Gas Services logo" priority />
                </Link>
              </div>
              <p>{footer.aboutText}</p>
              <div className="social__icon">
                <ul>
                  {footer.socialLinks.map((item) => (
                    <li key={`${item.icon}-${item.href}`}>
                      <Link
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                      >
                        <i className={item.icon}></i>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6 md-mb-30">
            <div
              className="footer__one-widget ml-60 xl-ml-0"
              data-aos-duration="800"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h4>{quickLinksGroup?.title ?? "Quick links"}</h4>
              <div className="footer-widget-menu">
                <ul>
                  {(quickLinksGroup?.links ?? []).map((item) => (
                    <li key={`${item.label}-${item.href}`}>
                      <Link href={item.href}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 md-mb-30">
            <div
              className="footer__one-widget"
              data-aos-duration="800"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <h4>{servicesGroup?.title ?? "Services"}</h4>
              <div className="footer-widget-menu">
                <ul>
                  {(servicesGroup?.links ?? []).map((item) => (
                    <li key={`${item.label}-${item.href}`}>
                      <Link href={item.href}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div
              className="footer__one-widget"
              data-aos-duration="800"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <h4>{footer.contactTitle}</h4>
              <div className="info">
                {footer.contactItems.map((item) => (
                  <div key={`${item.label}-${item.href}`} className="info-item">
                    <div className="info-item-icon">
                      <i className={item.icon || "fal fa-phone-alt"}></i>
                    </div>
                    <div className="info-item-content">
                      <span>{item.label}</span>
                      <h6>
                        <Link href={item.href}>{item.value}</Link>
                      </h6>
                    </div>
                  </div>
                ))}
              </div>
              <div className="footer__one-widget-hour">
                <p>
                  <strong>Operating Locations:</strong> {footer.operatingLocations}
                </p>
                <p>
                  <strong>Contact Hours:</strong> {footer.contactHours.regularDays}
                </p>
                {footer.contactHours.regularHours ? (
                  <p>{footer.contactHours.regularHours}</p>
                ) : null}
                {footer.contactHours.emergency ? (
                  <p>
                    <strong>{footer.contactHours.emergency}</strong>
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="copyright__one">
              <div className="row">
                <div className="col-lg-6">
                  <div className="copyright__one-left lg-t-center">
                    <p>
                      &copy; <Link href="/">{footer.copyrightName}</Link>{" "}
                      {currentYear} | {footer.rightsText}
                    </p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="copyright__one-menu t-right lg-t-center lg-mt-5">
                    <ul>
                      {footer.legalLinks.map((item) => (
                        <li key={`${item.label}-${item.href}`}>
                          <Link href={item.href}>{item.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
