"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { competitionSlides } from "@/components/competition/competitionSlides";

const CompetitionGallery = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);

  const goToSlide = (index: number) => {
    setActiveSlide((index + competitionSlides.length) % competitionSlides.length);
  };

  useEffect(() => {
    if (
      !autoRotate ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % competitionSlides.length);
    }, 6000);

    return () => window.clearInterval(intervalId);
  }, [autoRotate]);

  const slide = competitionSlides[activeSlide];

  return (
    <section className="competition-gallery" aria-label="Competition artwork">
      <div className="competition-gallery__image-wrap">
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          width={1254}
          height={1254}
          sizes="(max-width: 991px) 92vw, 51vw"
          priority
          className="competition-gallery__image"
        />
      </div>
      <div className="competition-gallery__controls" aria-label="Competition artwork controls">
        <button
          type="button"
          onClick={() => goToSlide(activeSlide - 1)}
          aria-label="Show previous competition image"
        >
          <i className="fa-solid fa-arrow-left" aria-hidden="true" />
        </button>
        <div className="competition-gallery__dots" aria-label="Choose competition image">
          {competitionSlides.map((item, index) => (
            <button
              type="button"
              key={item.src}
              className={index === activeSlide ? "is-active" : ""}
              onClick={() => goToSlide(index)}
              aria-label={`Show competition image ${index + 1}`}
              aria-pressed={index === activeSlide}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => goToSlide(activeSlide + 1)}
          aria-label="Show next competition image"
        >
          <i className="fa-solid fa-arrow-right" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="competition-gallery__pause"
          onClick={() => setAutoRotate((enabled) => !enabled)}
          aria-pressed={!autoRotate}
        >
          <i
            className={autoRotate ? "fa-solid fa-pause" : "fa-solid fa-play"}
            aria-hidden="true"
          />
          {autoRotate ? "Pause" : "Play"}
        </button>
      </div>
    </section>
  );
};

export default CompetitionGallery;
