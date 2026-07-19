import Link from "next/link";
import Image from "next/image";
import logo from "@/public/img/geologodark.png";
import { ContactItem } from "@/data/siteContent";

interface HamburgerProps {
  hamburger: boolean;
  setHamburger: (value: boolean) => void;
  description: string;
  contactTitle: string;
  contactItems: ContactItem[];
}

const Hamburger = ({
  hamburger,
  setHamburger,
  description,
  contactTitle,
  contactItems,
}: HamburgerProps) => {
  return (
    <>
      <div
        id="site-sidebar"
        className={
          (hamburger ? " active" : " ") + " header-one__right-sidebar-popup"
        }
      >
        <button
          type="button"
          className="sidebar-close-btn"
          onClick={() => setHamburger(false)}
          aria-label="Close contact details"
        >
          <i className="fal fa-times"></i>
        </button>
        <div className="header-one__right-sidebar-popup-logo">
          <Link href="/">
            <Image src={logo} alt="Geo Gas Services logo" priority />
          </Link>
        </div>
        <p>{description}</p>
        <div className="header-one__right-sidebar-popup-contact">
          <h4 className="mb-30">{contactTitle}</h4>
          {contactItems.map((item) => {
            const isEmail = item.value.includes("@");
            const isWeb = item.href.startsWith("http");
            const displayValue = isEmail || isWeb ? item.value.toLowerCase() : item.value;
            return (
              <div
                key={`${item.label}-${item.href}`}
                className="header-one__right-sidebar-popup-contact-item"
              >
                <div className="header-one__right-sidebar-popup-contact-item-icon">
                  <i className={item.icon || "fal fa-phone-alt"}></i>
                </div>
                <div className="header-one__right-sidebar-popup-contact-item-content">
                  <span>{item.label}</span>
                  <h6>
                    <Link
                      href={item.href}
                      className={isEmail ? "contact-value is-email" : "contact-value"}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    >
                      {displayValue}
                    </Link>
                  </h6>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div
        className={(hamburger ? " show" : " ") + " sidebar-overlay"}
        onClick={() => setHamburger(false)}
      ></div>
    </>
  );
};

export default Hamburger;
