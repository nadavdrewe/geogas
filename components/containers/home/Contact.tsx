"use client";

import Link from "next/link";
import CalloutQuoteForm from "@/components/forms/CalloutQuoteForm";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

const Contact = ({ addClass = false }) => {
  const { content } = useSiteContent();
  const contactContent = content.home.contact;

  return (
    <div
      className={(addClass ? " section-padding pt-0" : " ") + " contact__one"}
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="contact__one-area">
              <div className="row ai-center">
                <div className="col-lg-6 lg-mb-30">
                  <div className="contact__one-area-left">
                    <h2>{contactContent.title}</h2>
                    <div
                      className="info "
                      data-aos-duration="800"
                      data-aos="fade-up"
                      data-aos-delay="600"
                    >
                      {contactContent.infoItems.map((item) => (
                        <div key={`${item.label}-${item.href}`} className="info-item">
                          <div className="info-item-content">
                            <span>{item.label}</span>
                            <h5>
                              <Link href={item.href}>{item.value}</Link>
                            </h5>
                          </div>
                        </div>
                      ))}
                      <div className="info-meta">
                        <div className="info-meta-item">
                          <span>Operating Locations</span>
                          <p>{contactContent.operatingLocations}</p>
                        </div>
                        <div className="info-meta-item">
                          <span>Contact Hours</span>
                          <p>{contactContent.contactHours.regularDays}</p>
                          <p>{contactContent.contactHours.regularHours}</p>
                          <p className="info-meta-item-emergency">
                            {contactContent.contactHours.emergency}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div
                    className="contact__one-area-right "
                    data-aos-duration="800"
                    data-aos="fade-left"
                    data-aos-delay="400"
                  >
                    <CalloutQuoteForm
                      namePlaceholder={contactContent.form.fullNamePlaceholder}
                      emailPlaceholder={contactContent.form.emailPlaceholder}
                      subjectPlaceholder={contactContent.form.subjectPlaceholder}
                      messagePlaceholder={contactContent.form.messagePlaceholder}
                      submitLabel={contactContent.form.submitLabel}
                      submitButtonClassName="button-1"
                      source="home-contact-section"
                    />
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

export default Contact;
