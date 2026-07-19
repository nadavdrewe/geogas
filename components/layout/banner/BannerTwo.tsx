"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import StaffHeroCarousel from "@/components/containers/home/StaffHeroCarousel";
import { BRAND_VAN_IMAGE } from "@/lib/brandAssets";
import { useSiteContent } from "@/components/providers/SiteContentProvider";
import {
  getPhoneItems,
  isEmergencyPhoneItem,
  resolvePrimaryAndEmergencyPhones,
  toTelHref,
} from "@/lib/contactPhones";

const BannerTwo = () => {
  const { content } = useSiteContent();
  const hero = content.home.hero;
  const kickerLabel = hero.kicker.replace(/engineering/i, "Repair");
  const phoneItems = getPhoneItems(content.header.contactItems);
  const { primaryPhone } = resolvePrimaryAndEmergencyPhones(content.header.contactItems);
  const orderedPhoneItems = [
    primaryPhone,
    ...phoneItems.filter((item) => item !== primaryPhone),
  ].filter((item): item is NonNullable<typeof item> => Boolean(item));
  const uniquePhoneItems = orderedPhoneItems.filter((item, index, all) => {
    const href = toTelHref(item);
    return all.findIndex((candidate) => toTelHref(candidate) === href) === index;
  });
  const visiblePhoneItems = uniquePhoneItems;
  const mainNumber = primaryPhone?.value ?? "0207 723 2221";
  const mainHref = toTelHref(primaryPhone, "+442077232221");
  const totalHighlights = hero.highlights.length;
  const heroMessageRotations = hero.rotations;
  const [headlineIndex, setHeadlineIndex] = useState(() => {
    const emergencyFirstIndex = heroMessageRotations.findIndex((item) =>
      /24\/?7|call[- ]?out|helpline/i.test(
        `${item.headingLineOne} ${item.headingLineTwo} ${item.subtext}`
      )
    );
    return emergencyFirstIndex >= 0 ? emergencyFirstIndex : 0;
  });
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [isCompactLayout, setIsCompactLayout] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMediaChange = () => setPrefersReducedMotion(media.matches);

    handleMediaChange();
    media.addEventListener("change", handleMediaChange);

    return () => media.removeEventListener("change", handleMediaChange);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 991px)");
    const handleMediaChange = () => setIsCompactLayout(media.matches);

    handleMediaChange();
    media.addEventListener("change", handleMediaChange);

    return () => media.removeEventListener("change", handleMediaChange);
  }, []);

  useEffect(() => {
    if (heroMessageRotations.length === 0 || prefersReducedMotion) return;

    const timer = window.setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % heroMessageRotations.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [heroMessageRotations.length, prefersReducedMotion]);

  useEffect(() => {
    if (!isCompactLayout || prefersReducedMotion || totalHighlights <= 1) return;

    const timer = window.setInterval(() => {
      setHighlightIndex((prev) => (prev + 1) % totalHighlights);
    }, 3000);

    return () => window.clearInterval(timer);
  }, [isCompactLayout, prefersReducedMotion, totalHighlights]);

  const activeMessage =
    heroMessageRotations[headlineIndex] || heroMessageRotations[0];
  const visibleHighlights = isCompactLayout
    ? totalHighlights > 0
      ? [hero.highlights[highlightIndex % totalHighlights]]
      : []
    : hero.highlights.slice(0, 2);

  return (
    <div className="banner__two">
      <div className="container">
        <div className="row ai-center">
          <div className="col-lg-7 lg-mb-40">
            <div className="banner__two-content">
              <a
                className="banner__two-content-kicker banner__two-content-kicker--call"
                href={mainHref}
                aria-label={`Call ${mainNumber} for main landline support`}
              >
                <span>{kickerLabel}</span>
                <em>{mainNumber}</em>
              </a>
              {visiblePhoneItems.length > 0 ? (
                <div className="banner__two-content-phone-list">
                  {visiblePhoneItems.map((item) => {
                    const phoneHref = toTelHref(item, "+442077232221");
                    const phoneLabel = item.label ?? "Phone";
                    const phoneValue = item.value ?? "";
                    const isEmergency = isEmergencyPhoneItem(item);

                    return (
                      <a
                        key={`${phoneLabel}-${phoneValue}`}
                        className={
                          "banner__two-content-phone-pill" +
                          (isEmergency ? " is-emergency" : "")
                        }
                        href={phoneHref}
                        aria-label={`Call ${phoneValue} ${phoneLabel}`}
                      >
                        <i
                          className={
                            isEmergency ? "fa-solid fa-phone-volume" : "fa-solid fa-phone"
                          }
                          aria-hidden="true"
                        ></i>
                        <span>{phoneLabel}</span>
                        <em>{phoneValue}</em>
                      </a>
                    );
                  })}
                </div>
              ) : null}
              <div className="banner__two-mobile-title-wrap">
                <h1 data-aos-duration="800" data-aos="fade-up" data-aos-delay="400">
                  {hero.brandName}
                  {activeMessage ? (
                    <span
                      key={`${activeMessage.headingLineOne}-${activeMessage.headingLineTwo}`}
                      className="banner__two-rotating-copy"
                    >
                      {isCompactLayout ? (
                        <span className="banner__two-rotating-copy-line banner__two-rotating-copy-line--mobile">
                          {`${activeMessage.headingLineOne} ${activeMessage.headingLineTwo}`}
                        </span>
                      ) : (
                        <>
                          <span className="banner__two-rotating-copy-line">
                            {activeMessage.headingLineOne}
                          </span>
                          <span className="banner__two-rotating-copy-line">
                            {activeMessage.headingLineTwo}
                          </span>
                        </>
                      )}
                    </span>
                  ) : null}
                </h1>
                <div className="banner__two-mobile-van d-lg-none">
                  <Image
                    src={BRAND_VAN_IMAGE}
                    alt="Geo Gas services van"
                    width={1280}
                    height={720}
                    sizes="(max-width: 991px) 100vw, 0px"
                    priority={false}
                  />
                </div>
                {activeMessage ? (
                  <p
                    key={activeMessage.subtext}
                    className="banner__two-rotating-subtext"
                  >
                    {activeMessage.subtext}
                  </p>
                ) : null}
              </div>
              <ul className="banner__two-content-points">
                {visibleHighlights.map((item, index) => (
                  <li key={`${item.title}-${index}`}>
                    <i className={item.icon}></i>
                    <div className="banner__two-content-point-copy">
                      <strong>{item.title}</strong>
                      <span>{item.detail}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="banner__two-content-actions">
                <Link className="button-1" href={hero.primaryAction.href}>
                  {hero.primaryAction.label}
                  <i className="fa-regular fa-angle-right"></i>
                </Link>
                <Link
                  className="button-4 banner__two-button-secondary"
                  href={hero.secondaryAction.href}
                >
                  {hero.secondaryAction.label}
                  <i className="fa-regular fa-angle-right"></i>
                </Link>
              </div>
              <div className="banner__two-content-trust">
                {hero.trustPoints.map((item) => (
                  <div key={item.text} className="banner__two-content-trust-item">
                    <i className={item.icon}></i>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg-5 d-none d-lg-block">
            <StaffHeroCarousel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerTwo;
