"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import VanillaTilt from "vanilla-tilt";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import SplitType from "split-type";

const InitAnimations = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  // tilt effect
  useEffect(() => {
    const tiltElements = document.querySelectorAll(".topy-tilt");

    tiltElements.forEach((element) => {
      const tiltElement = element as HTMLElement;
      VanillaTilt.init(tiltElement, {
        max: 5,
        speed: 3000,
      });
    });
  }, []);

  // parallax image effect
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const imageParallax = document.querySelectorAll(".parallax-image");

    if (imageParallax.length > 0) {
      imageParallax.forEach((element) => {
        const animImageParallax = element as HTMLElement;
        const aipWrap = animImageParallax.closest(
          ".parallax-image-wrap"
        ) as HTMLElement;
        const aipInner = aipWrap?.querySelector(".parallax-image-inner");

        if (aipWrap && aipInner) {
          const tl_ImageParallax = gsap.timeline({
            scrollTrigger: {
              trigger: aipWrap,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });

          tl_ImageParallax.to(animImageParallax, {
            yPercent: 30,
            ease: "none",
          });
          gsap.fromTo(
            aipInner,
            {
              scale: 1.2,
              opacity: 0,
            },
            {
              scale: 1,
              opacity: 1,
              duration: 1.5,
              scrollTrigger: {
                trigger: aipWrap,
                start: "top 99%",
                markers: false,
              },
            }
          );
          ScrollTrigger.refresh();
        }
      });
    }
  }, []);

  // split text
  useEffect(() => {
    if (window.innerWidth >= 992) {
      gsap.registerPlugin(ScrollTrigger);

      new SplitType(".title-anim", {
        types: ["chars", "words"],
      });

      const titleAnims = document.querySelectorAll(".title-anim");
      titleAnims.forEach((titleAnim) => {
        const charElements = titleAnim.querySelectorAll(".char");

        charElements.forEach((char, index) => {
          const tl2 = gsap.timeline({
            scrollTrigger: {
              trigger: char,
              start: "top 90%",
              end: "bottom 60%",
              scrub: false,
              markers: false,
              toggleActions: "play none none none",
            },
          });

          const charDelay = index * 0.03;

          tl2.from(char, {
            duration: 0.8,
            x: 70,
            delay: charDelay,
            autoAlpha: 0,
          });
        });
      });

      const titleElements = document.querySelectorAll(".title-anim");

      titleElements.forEach((el) => {
        const triggerEl = el as gsap.DOMTarget;
        gsap.to(triggerEl, {
          scrollTrigger: {
            trigger: triggerEl,
            start: "top 100%",
            markers: false,
            onEnter: () => {
              if (el instanceof Element) {
                el.classList.add("title-anim-active");
              }
            },
          },
        });
      });
    }
  }, []);
  return null;
};

export default InitAnimations;
