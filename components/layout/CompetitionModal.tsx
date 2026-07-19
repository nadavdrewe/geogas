"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import CompetitionEntryForm from "@/components/competition/CompetitionEntryForm";
import { competitionSlides } from "@/components/competition/competitionSlides";

const focusableSelector = [
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "a[href]",
].join(",");

const CompetitionModal = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const goToSlide = (index: number) => {
    setActiveSlide((index + competitionSlides.length) % competitionSlides.length);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (
      !isOpen ||
      !autoRotate ||
      pathname.startsWith("/competition") ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % competitionSlides.length);
    }, 6000);

    return () => window.clearInterval(intervalId);
  }, [autoRotate, isOpen, pathname]);

  useEffect(() => {
    if (!isOpen || pathname.startsWith("/admin") || pathname.startsWith("/competition")) {
      return;
    }

    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
        return;
      }

      if (event.key !== "Tab" || !modalRef.current) return;

      const focusable = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(focusableSelector)
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [isOpen, pathname]);

  if (
    !isOpen ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/competition")
  ) {
    return null;
  }

  const slide = competitionSlides[activeSlide];

  return (
    <div className="competition-modal" role="presentation">
      <button
        type="button"
        className="competition-modal__backdrop"
        aria-label="Close competition entry"
        onClick={closeModal}
      />
      <div
        className="competition-modal__dialog"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="competition-entry-heading"
        aria-describedby="competition-entry-description"
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="competition-modal__close"
          aria-label="Close competition entry"
          onClick={closeModal}
        >
          <i className="fa-solid fa-xmark" aria-hidden="true" />
        </button>

        <section className="competition-modal__art" aria-label="Competition artwork">
          <div className="competition-modal__image-wrap">
            <Image
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              width={1254}
              height={1254}
              sizes="(max-width: 767px) 92vw, (max-width: 1100px) 48vw, 430px"
              priority
              className="competition-modal__image"
            />
          </div>
          <div className="competition-modal__controls" aria-label="Competition artwork controls">
            <button
              type="button"
              onClick={() => goToSlide(activeSlide - 1)}
              aria-label="Show previous competition image"
            >
              <i className="fa-solid fa-arrow-left" aria-hidden="true" />
            </button>
            <div className="competition-modal__dots" aria-label="Choose competition image">
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
              className="competition-modal__pause"
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

        <section className="competition-modal__entry">
          <p className="competition-modal__eyebrow">Geo Gas Services competition</p>
          <h2 id="competition-entry-heading">Enter the Everyday Heroes draw</h2>
          <p id="competition-entry-description" className="competition-modal__description">
            Leave your details for the chance to win a year’s boiler cover subscription.
          </p>
          <CompetitionEntryForm
            source="competition-modal"
            successAction={{ label: "Close", onClick: closeModal }}
          />
        </section>
      </div>
    </div>
  );
};

export default CompetitionModal;
