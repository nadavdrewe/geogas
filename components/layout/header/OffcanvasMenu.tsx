import Image from "next/image";
import Link from "next/link";
import logo from "@/public/img/geologodark.png";
import { ContactItem, NavItem } from "@/data/siteContent";

interface HamburgerProps {
  toggleMenu: boolean;
  handleToggleMenu: (value?: boolean) => void;
  description: string;
  navItems: NavItem[];
  contactTitle: string;
  contactItems: ContactItem[];
}

const OffcanvasMenu = ({
  toggleMenu,
  handleToggleMenu,
  description,
  navItems,
  contactTitle,
  contactItems,
}: HamburgerProps) => {
  return (
    <>
      <div className="fix-area d-block d-xl-none">
        <div
          id="mobile-navigation"
          className={(toggleMenu ? " info-open" : " ") + " offcanvas__info"}
        >
          <div className="offcanvas__wrapper">
            <div className="offcanvas__content">
              <div className="offcanvas__top mb-5 d-flex justify-content-between align-items-center">
                <div className="offcanvas__logo">
                  <Link href="/">
                    <Image src={logo} alt="logo-img" priority />
                  </Link>
                </div>
                <div className="offcanvas__close">
                  <button
                    type="button"
                    aria-label="Close menu"
                    onClick={() => handleToggleMenu(false)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </div>
              <p className="text d-none d-xl-block">{description}</p>
              <div className="mobile-menu fix mb-3 mean-container">
                <div className="mean-bar">
                  <nav className="mean-nav mobile-menu">
                    <ul>
                      {navItems.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={() => handleToggleMenu(false)}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="offcanvas__contact">
                <h4>{contactTitle}</h4>
                <ul>
                  {contactItems.map((item) => {
                    const isEmail = item.value.includes("@");
                    const isWeb = item.href.startsWith("http");
                    const displayValue =
                      isEmail || isWeb ? item.value.toLowerCase() : item.value;
                    return (
                      <li
                        key={`${item.label}-${item.href}`}
                        className="d-flex align-items-center"
                      >
                        <div className="offcanvas__contact-icon mr-15">
                          <i className={item.icon || "fal fa-phone-alt"}></i>
                        </div>
                        <div className="offcanvas__contact-text">
                          <Link
                            href={item.href}
                            className={isEmail ? "contact-value is-email" : "contact-value"}
                            target={
                              item.href.startsWith("http") ? "_blank" : undefined
                            }
                            rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                          >
                            {displayValue}
                          </Link>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          (toggleMenu ? " overlay-open" : " ") +
          " offcanvas__overlay d-block d-xl-none"
        }
        onClick={() => handleToggleMenu(false)}
      ></div>
    </>
  );
};

export default OffcanvasMenu;
