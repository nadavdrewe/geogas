"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

const Services = () => {
  const [active, setActive] = useState(0);
  const sliderRef = useRef<SwiperInstance | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
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

  useEffect(() => {
    const autoplay = sliderRef.current?.autoplay;
    if (isPlaying && !prefersReducedMotion) autoplay?.start();
    else autoplay?.stop();
  }, [isPlaying, prefersReducedMotion]);

  return (
    <section className="services__two section-padding" aria-labelledby="home-services-heading">
      <div className="container">
        <div className="row mb-20">
          <div className="col-xl-12 ">
            <div className="services__two-title">
              <span>{servicesContent.kicker}</span>
              <h2 id="home-services-heading">{servicesContent.title}</h2>
              <p>{servicesContent.description}</p>
            </div>
          </div>
        </div>
        <div
          className="services__two-carousel"
          onFocusCapture={() => setIsPlaying(false)}
          data-aos-duration="800" data-aos="fade-up"
        >
          <Swiper
            modules={[A11y, Autoplay]}
            id="home-services-slider"
            a11y={{ enabled: true, containerMessage: "Geo Gas services", slideLabelMessage: "Service {{index}} of {{slidesLength}}" }}
            className="services__two-slider"
            loop={serviceCards.length > 3}
            speed={prefersReducedMotion ? 0 : 750}
            spaceBetween={24}
            autoplay={
              !isPlaying || prefersReducedMotion
                ? false
                : {
                    delay: 3400,
                    disableOnInteraction: true,
                    pauseOnMouseEnter: true,
                  }
            }
            onSlideChange={(swiper) => setActive(swiper.realIndex)}
            onSwiper={(swiper) => {
              sliderRef.current = swiper;
            }}
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
                >
                  <span className="services__two-item-kicker">{service.kicker}</span>
                  <h4>{service.title}</h4>
                  <p>{service.description}</p>
                  <div className="services__two-item-footer">
                    <Link href={service.linkHref} aria-label={`${service.linkLabel}: ${service.title}`}>
                      {service.linkLabel}
                      <i className="fa-regular fa-angle-right" aria-hidden="true"></i>
                    </Link>
                    <div className="icon" aria-hidden="true">
                      <i className={service.icon}></i>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="services__two-navigation" aria-label="Service carousel controls">
            <span className="services__two-position" aria-live={isPlaying ? "off" : "polite"} aria-atomic="true">
              {active + 1} / {serviceCards.length}
            </span>
            <div className="services__two-navigation-buttons">
              <button type="button" aria-label="Previous service" aria-controls="home-services-slider" onClick={() => { setIsPlaying(false); sliderRef.current?.slidePrev(); }}>
                <i className="fa-regular fa-arrow-left" aria-hidden="true" />
              </button>
              <button type="button" aria-label="Next service" aria-controls="home-services-slider" onClick={() => { setIsPlaying(false); sliderRef.current?.slideNext(); }}>
                <i className="fa-regular fa-arrow-right" aria-hidden="true" />
              </button>
            </div>
            {!prefersReducedMotion && serviceCards.length > 3 ? (
              <button
                type="button"
                className="services__two-playback"
                aria-controls="home-services-slider"
                aria-pressed={isPlaying}
                onClick={() => setIsPlaying((playing) => !playing)}
              >
                <i className={`fa-solid ${isPlaying ? "fa-pause" : "fa-play"}`} aria-hidden="true" />
                {isPlaying ? "Pause slideshow" : "Play slideshow"}
              </button>
            ) : null}
            <Link href="/services" className="services__two-all-link">
              View all services <i className="fa-regular fa-angle-right" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
