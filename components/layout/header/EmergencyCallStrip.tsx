"use client";

type HeaderContactItem = {
  label?: string;
  value?: string;
  href?: string;
};

const toTelHref = (value?: string): string => {
  if (!value) return "tel:+447854451941";
  return `tel:${value.replace(/\s+/g, "")}`;
};

const EmergencyCallStrip = ({
  contactItems,
}: {
  contactItems: HeaderContactItem[];
}) => {
  const emergencyItem =
    contactItems.find((item) =>
      /emergency|24\/7|call[- ]?out/i.test(`${item.label ?? ""} ${item.value ?? ""}`)
    ) ??
    contactItems.find((item) => (item.href ?? "").startsWith("tel:"));

  const emergencyLabel = emergencyItem?.label || "24/7 Emergency Call-Out";
  const emergencyNumber = emergencyItem?.value || "07854 451941";
  const emergencyHref =
    emergencyItem?.href && emergencyItem.href.startsWith("tel:")
      ? emergencyItem.href
      : toTelHref(emergencyItem?.value);

  return (
    <div className="header-emergency-bar">
      <div className="container">
        <div className="header-emergency-bar__inner">
          <span className="header-emergency-bar__title">
            <i className="fa-solid fa-phone-volume" aria-hidden="true"></i>
            {emergencyLabel}
          </span>
          <a className="header-emergency-bar__number" href={emergencyHref}>
            {emergencyNumber}
          </a>
          <a className="header-emergency-bar__cta" href={emergencyHref}>
            Call Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default EmergencyCallStrip;
