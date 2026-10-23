"use client";
import Image from "next/image";
import quote from "@/public/img/icon/quote.svg";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

const Testimonial = () => {
  const { content } = useSiteContent();
  const testimonial = content.home.testimonial;

  return (
    <div className="testimonial__two section-padding" id="home-reviews">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="testimonial__two-area">
              <div className="row mb-40">
                <div className="col-xl-12">
                  <div className="testimonial__two-area-title">
                    <h2>{testimonial.title}</h2>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-12">
                  <div className="testimonial__two-area-brand">
                    <div className="testimonial__two-area-brand-head">
                      <h4>{testimonial.sectionTitle}</h4>
                      <p>{testimonial.sectionDescription}</p>
                    </div>
                    <div className="testimonial__two-area-brand-grid">
                      {testimonial.platforms.map((platform) =>
                        platform.href ? (
                          <a
                            key={platform.name}
                            href={platform.href}
                            target="_blank"
                            rel="noreferrer"
                            className="testimonial__two-area-brand-item"
                          >
                            <h5>{platform.name}</h5>
                            <p>{platform.note}</p>
                            <div className="testimonial__two-area-brand-item-stars">
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                            </div>
                            <span className="testimonial__two-area-brand-item-cta">
                              {platform.ctaLabel || `Open ${platform.name}`}
                              <i className="fa-regular fa-arrow-up-right-from-square"></i>
                            </span>
                          </a>
                        ) : (
                          <div
                            key={platform.name}
                            className="testimonial__two-area-brand-item"
                          >
                            <h5>{platform.name}</h5>
                            <p>{platform.note}</p>
                            <div className="testimonial__two-area-brand-item-stars">
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                    <div className="testimonial__two-area-brand-line">
                      <span>{testimonial.brandLine}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-12">
                  <div className="testimonial__two-stories" aria-label="Customer stories">
                      {testimonial.items.map((item, index) => (
                        <article
                          key={`${item.clientType}-${item.location}-${index}`}
                        >
                          <div className="testimonial__two-area-item">
                            <div className="testimonial__two-area-item-client">
                              <div className="testimonial__two-area-item-client-title">
                                <h4>{item.clientType}</h4>
                                <span>{item.location}</span>
                              </div>
                              <Image src={quote} alt="" />
                            </div>
                            <p>{item.quote}</p>
                            <div className="testimonial__two-area-item-reviews" aria-label="5 out of 5 stars">
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                            </div>
                          </div>
                        </article>
                      ))}
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

export default Testimonial;
