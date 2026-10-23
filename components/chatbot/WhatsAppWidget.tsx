"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

const WhatsAppWidget = () => {
  const { content } = useSiteContent();
  const [isOpen, setIsOpen] = useState(false);
  const [showTrigger, setShowTrigger] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  const closePanel = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };
  const whatsappUrl = useMemo(() => {
    const message = encodeURIComponent(content.global.whatsappMessage);
    return `https://wa.me/${content.global.whatsappPhone}?text=${message}`;
  }, [content.global.whatsappMessage, content.global.whatsappPhone]);

  useEffect(() => {
    const evaluateVisibility = () => {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      if (!isMobile) {
        setShowTrigger(true);
        return;
      }

      setShowTrigger(window.scrollY > 520 || isOpen);
    };

    evaluateVisibility();
    window.addEventListener("scroll", evaluateVisibility, { passive: true });
    window.addEventListener("resize", evaluateVisibility);

    return () => {
      window.removeEventListener("scroll", evaluateVisibility);
      window.removeEventListener("resize", evaluateVisibility);
    };
  }, [isOpen]);

  const openWhatsApp = () => {
    window.open(
      whatsappUrl,
      "geogas-whatsapp-chat",
      "popup=yes,width=420,height=720,noopener,noreferrer"
    );
  };

  return (
    <div className={`whatsapp-widget${isOpen ? " is-open" : ""}`} onKeyDown={(event) => {
      if (event.key === "Escape" && isOpen) { event.stopPropagation(); closePanel(); }
    }}>
      {!showTrigger && !isOpen ? null : (
        <>
          {isOpen ? (
            <div id="whatsapp-widget-panel" className="whatsapp-widget__panel" role="region" aria-label="Contact the team on WhatsApp">
              <div className="whatsapp-widget__panel-head">
                <div className="whatsapp-widget__panel-brand">
                  <span className="whatsapp-widget__brand" aria-hidden="true">
                    <Image
                      src="/img/geologodark.png"
                      alt=""
                      width={277}
                      height={115}
                      sizes="108px"
                      priority={false}
                    />
                  </span>
                  <small>Live team support on WhatsApp</small>
                </div>
                <button
                  type="button"
                  ref={closeRef}
                  className="whatsapp-widget__close"
                  onClick={closePanel}
                  aria-label="Close WhatsApp widget"
                >
                  <i className="fa-solid fa-xmark" aria-hidden="true"></i>
                </button>
              </div>
              <p className="whatsapp-widget__copy">
                Send us a quick message and we will pick it up as soon as possible.
              </p>
              <button
                type="button"
                className="whatsapp-widget__cta"
                onClick={openWhatsApp}
              >
                <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
                Start WhatsApp Chat
              </button>
              <small className="whatsapp-widget__number">
                {content.global.emergencyPhoneDisplay}
              </small>
            </div>
          ) : null}

          <button
            type="button"
            ref={triggerRef}
            className="whatsapp-widget__trigger"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-controls="whatsapp-widget-panel"
            aria-label="Chat to us on WhatsApp"
          >
            <span className="whatsapp-widget__icon" aria-hidden="true">
              <i className="fa-brands fa-whatsapp"></i>
            </span>
            <span className="whatsapp-widget__label">Chat to us</span>
          </button>
        </>
      )}
    </div>
  );
};

export default WhatsAppWidget;
