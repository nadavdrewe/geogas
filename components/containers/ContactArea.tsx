"use client";

import Link from "next/link";
import Image from "next/image";
import CalloutQuoteForm from "@/components/forms/CalloutQuoteForm";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

const iconForLabel = (label: string) => {
  const lower = label.toLowerCase();
  if (lower.includes("emergency")) {
    return "fal fa-bolt icon-animation";
  }
  if (lower.includes("email")) {
    return "fal fa-envelope";
  }
  return "fal fa-phone-alt icon-animation";
};

const ContactArea = () => {
  const { content } = useSiteContent();
  const contactContent = content.home.contact;
  const brochureContactItems = content.header.contactItems;

  return (
    <section className="contact__page section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 lg-mb-30">
            <div className="contact__page-left">
              <div className="contact__page-image">
                <Image
                  src="/cartoons/van1.jpeg"
                  alt="Geo Gas Services branded van"
                  priority
                  width={1128}
                  height={497}
                  className="contact__page-image-media"
                  sizes="(max-width: 991px) 100vw, 50vw"
                />
              </div>
              <div className="info">
                <h4 className="info-title">Direct Contact Details</h4>
                <p className="info-note">
                  Use the numbers below for general enquiries and emergency
                  call-outs. Contract helpline details from the brochure are
                  listed separately.
                </p>

                {contactContent.infoItems.map((item) => (
                  <div className="info-item" key={`${item.label}-${item.href}`}>
                    <div className="info-item-icon">
                      <i className={iconForLabel(item.label)}></i>
                    </div>
                    <div className="info-item-content">
                      <span>{item.label}</span>
                      <h6>
                        <Link href={item.href}>{item.value}</Link>
                      </h6>
                    </div>
                  </div>
                ))}

                <div className="info-item info-item--meta">
                  <div className="info-item-icon">
                    <i className="fal fa-map-marked-alt"></i>
                  </div>
                  <div className="info-item-content">
                    <span>Operating Locations</span>
                    <h6>{contactContent.operatingLocations}</h6>
                  </div>
                </div>

                <div className="info-item info-item--meta">
                  <div className="info-item-icon">
                    <i className="fal fa-clock"></i>
                  </div>
                  <div className="info-item-content">
                    <span>Contact Hours</span>
                    <h6>{contactContent.contactHours.regularDays}</h6>
                    {contactContent.contactHours.regularHours ? (
                      <h6>{contactContent.contactHours.regularHours}</h6>
                    ) : null}
                    {contactContent.contactHours.emergency ? (
                      <p>{contactContent.contactHours.emergency}</p>
                    ) : null}
                  </div>
                </div>

                <div className="info-item info-item--brochure">
                  <div className="info-item-icon">
                    <i className="fal fa-file-alt"></i>
                  </div>
                  <div className="info-item-content">
                    <span>Brochure Contract Helpline</span>
                    {brochureContactItems.map((item) => (
                      <p key={`${item.label}-${item.href}`}>
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
                      </p>
                    ))}
                  </div>
                </div>

                <div className="contact__page-left-links">
                  <Link className="button-2" href="/pricing">
                    View Pricing
                    <i className="fa-regular fa-angle-right"></i>
                  </Link>
                  <Link className="button-2" href="/contracts">
                    Compare Contracts
                    <i className="fa-regular fa-angle-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="contact__page-right">
              <span className="contact__page-eyebrow">{contactContent.eyebrow}</span>
              <h2>{contactContent.title}</h2>
              <p className="contact__page-intro">{contactContent.intro}</p>
              <div className="contact__page-badges">
                {contactContent.badges.map((badge) => (
                  <span key={badge}>{badge}</span>
                ))}
              </div>
              <div data-aos-duration="800" data-aos="fade-left" data-aos-delay="500">
                <CalloutQuoteForm
                  namePlaceholder={contactContent.form.fullNamePlaceholder}
                  emailPlaceholder={contactContent.form.emailPlaceholder}
                  subjectPlaceholder={contactContent.form.subjectPlaceholder}
                  messagePlaceholder={contactContent.form.messagePlaceholder}
                  submitLabel={contactContent.form.submitLabel}
                  submitButtonClassName="button-1"
                  source="contact-page-form"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactArea;
