"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

const Services = () => {
  const [active, setActive] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const { content } = useSiteContent();
  const servicesContent = content.home.services;
  const serviceCards = servicesContent.cards;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMediaChange = () => setPrefersReducedMotion(media.matches);

    handleMediaChange();
    media.addEventListener("change", handleMediaChange);

    return () => media.removeEventListener("change", handleMediaChange);
  }, []);

  return (
    <div className="services__two section-padding">
      <div className="container">
        <div className="row mb-20">
          <div className="col-xl-12 ">
            <div className="services__two-title">
              <span>{servicesContent.kicker}</span>
              <h2>{servicesContent.title}</h2>
              <p>{servicesContent.description}</p>
            </div>
          </div>
        </div>
        <div className="services__two-carousel" data-aos-duration="800" data-aos="fade-up">
          <Swiper
            modules={[Autoplay]}
            className="services__two-slider"
            loop={serviceCards.length > 3}
            speed={prefersReducedMotion ? 0 : 750}
            spaceBetween={24}
            autoplay={
              prefersReducedMotion
                ? false
                : {
                    delay: 3400,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }
            }
            onSlideChange={(swiper) => setActive(swiper.realIndex)}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1200: {
                slidesPerView: 3,
              },
            }}
          >
            {serviceCards.map((service, index) => (
              <SwiperSlide key={service.title} className="services__two-slide">
                <article
                  className={
                    "services__two-item services__two-item--home active_hover topy-tilt services__two-item--tone-" +
                    ((index % 6) + 1) +
                    (active === index ? " active" : " ")
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
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Services;
