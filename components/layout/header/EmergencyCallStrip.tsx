"use client";

import { useEffect, useState } from "react";
import {
  ContactPhoneItem,
  getPhoneItems,
  isEmergencyPhoneItem,
  toTelHref,
} from "@/lib/contactPhones";

const EmergencyCallStrip = ({
  contactItems,
}: {
  contactItems: ContactPhoneItem[];
}) => {
  const rotatingPhoneItems = getPhoneItems(contactItems).filter((item, index, all) => {
    const href = toTelHref(item);
    return all.findIndex((candidate) => toTelHref(candidate) === href) === index;
  });
  const [activePhoneIndex, setActivePhoneIndex] = useState(0);

  useEffect(() => {
    setActivePhoneIndex(0);
  }, [rotatingPhoneItems.length]);

  useEffect(() => {
    if (rotatingPhoneItems.length <= 1) return;

    const timer = window.setInterval(() => {
      setActivePhoneIndex((prev) => (prev + 1) % rotatingPhoneItems.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [rotatingPhoneItems.length]);

  const activePhone = rotatingPhoneItems[activePhoneIndex] ?? rotatingPhoneItems[0];

  const activeLabel = activePhone?.label || "Main Landline";
  const activeNumber = activePhone?.value || "0207 723 2221";
  const activeHref = toTelHref(activePhone, "+442077232221");
  const isEmergency = activePhone ? isEmergencyPhoneItem(activePhone) : false;
  const ctaLabel = isEmergency ? "Call Emergency" : "Call Office";

  return (
    <div className="header-emergency-bar">
      <div className="container">
        <div className="header-emergency-bar__inner">
          <div className="header-emergency-bar__meta">
            <span className="header-emergency-bar__title">
              <i
                className={isEmergency ? "fa-solid fa-phone-volume" : "fa-solid fa-phone"}
                aria-hidden="true"
              ></i>
              {activeLabel}
            </span>
          </div>
          <a className="header-emergency-bar__number" href={activeHref}>
            {activeNumber}
          </a>
          <a className="header-emergency-bar__cta" href={activeHref}>
            {ctaLabel}
          </a>
        </div>
      </div>
    </div>
  );
};

export default EmergencyCallStrip;
