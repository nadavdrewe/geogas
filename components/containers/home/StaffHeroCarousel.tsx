"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

const getHeroImagePath = (
  normalImagePath: string,
  explicitHeroImagePath?: string
): string => {
  if (explicitHeroImagePath) {
    return explicitHeroImagePath;
  }

  if (normalImagePath.includes("_normal.")) {
    return normalImagePath.replace("_normal.", "_hero.");
  }

  return normalImagePath;
};

const StaffHeroCarousel = ({ compact = false }: { compact?: boolean }) => {
  const { content } = useSiteContent();
  const staffProfiles = content.home.team.members;
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMediaChange = () => setPrefersReducedMotion(media.matches);

    handleMediaChange();
    media.addEventListener("change", handleMediaChange);

    return () => media.removeEventListener("change", handleMediaChange);
  }, []);

  return (
    <div
      className={
        "staff-hero-carousel" + (compact ? " staff-hero-carousel--compact" : "")
      }
      data-aos-duration="800"
      data-aos="fade-left"
      data-aos-delay="400"
    >
      <Swiper
        modules={[Autoplay]}
        className="staff-hero-carousel__slider"
        loop={staffProfiles.length > 1}
        speed={prefersReducedMotion ? 0 : 900}
        spaceBetween={compact ? 0 : 18}
        centeredSlides={!compact}
        allowTouchMove={true}
        autoplay={
          prefersReducedMotion
            ? false
            : {
                delay: compact ? 4200 : 3200,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
              }
        }
        breakpoints={
          compact
            ? {
                0: {
                  slidesPerView: 1,
                  centeredSlides: false,
                },
              }
            : {
                0: {
                  slidesPerView: 1,
                  centeredSlides: false,
                },
                768: {
                  slidesPerView: 1.05,
                  centeredSlides: true,
                },
                1200: {
                  slidesPerView: 1.12,
                  centeredSlides: true,
                },
              }
        }
      >
        {staffProfiles.map((member, index) => {
          const heroImagePath = getHeroImagePath(
            member.imagePath,
            member.heroImagePath
          );

          return (
            <SwiperSlide key={member.id}>
              <article className="staff-hero-carousel__slide">
                <div className="staff-hero-carousel__media">
                  <Image
                    className="staff-hero-carousel__image staff-hero-carousel__image--normal"
                    src={member.imagePath}
                    alt={`${member.name} normal`}
                    width={680}
                    height={980}
                    sizes="(max-width: 767px) 92vw, (max-width: 1199px) 46vw, 38vw"
                    priority={index === 0}
                  />
                  <Image
                    className="staff-hero-carousel__image staff-hero-carousel__image--hero"
                    src={heroImagePath}
                    alt={`${member.name} hero`}
                    width={680}
                    height={980}
                    sizes="(max-width: 767px) 92vw, (max-width: 1199px) 46vw, 38vw"
                  />
                </div>
                <div className="staff-hero-carousel__meta">
                  <h3>{member.name}</h3>
                  <span>{member.role}</span>
                </div>
              </article>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default StaffHeroCarousel;
