"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import quote from "@/public/img/icon/quote.svg";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

const Testimonial = () => {
  const { content } = useSiteContent();
  const testimonial = content.home.testimonial;

  return (
    <div className="testimonial__two section-padding">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="testimonial__two-area">
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
              <div className="row mb-60">
                <div className="col-xl-12">
                  <div className="testimonial__two-area-title">
                    <h2>{testimonial.title}</h2>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-12">
                  <div className="swiper testimonial_slider_two">
                    <Swiper
                      slidesPerView={1}
                      spaceBetween={30}
                      speed={2000}
                      loop={true}
                      roundLengths={true}
                      modules={[Autoplay, Pagination]}
                      autoplay={{
                        delay: 4500,
                        disableOnInteraction: false,
                      }}
                      pagination={{
                        el: ".testimonial_pagination",
                        clickable: true,
                      }}
                      breakpoints={{
                        992: {
                          slidesPerView: 2,
                        },
                      }}
                      className="swiper-wrapper"
                    >
                      {testimonial.items.map((item) => (
                        <SwiperSlide key={`${item.clientType}-${item.location}`}>
                          <div className="testimonial__two-area-item swiper-slide">
                            <div className="testimonial__two-area-item-client">
                              <div className="testimonial__two-area-item-client-title">
                                <h4>{item.clientType}</h4>
                                <span>{item.location}</span>
                              </div>
                              <Image src={quote} alt="icon" priority />
                            </div>
                            <p>{item.quote}</p>
                            <div className="testimonial__two-area-item-reviews">
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              </div>
              <div className="row mt-60">
                <div className="testimonial__two-pagination">
                  <div className="testimonial_pagination"></div>
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
