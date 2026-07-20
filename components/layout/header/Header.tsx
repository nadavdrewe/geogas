"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "@/public/img/geologowhite.png";
import SearchBox from "./SearchBox";
import Hamburger from "./Hamburger";
import OffCanvasMenu from "./OffcanvasMenu";
import EmergencyCallStrip from "./EmergencyCallStrip";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

const Header = () => {
  const pathname = usePathname();
  const { content } = useSiteContent();
  const navItems = content.header.navItems;

  const [hamburger, setHamburger] = useState(false);
  const [search, setSearch] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleHamburger = () => {
    setHamburger(!hamburger);
  };

  const handleSearch = () => {
    setSearch(!search);
  };

  const handleToggleMenu = (nextValue?: boolean) => {
    if (typeof nextValue === "boolean") {
      setToggleMenu(nextValue);
      return;
    }

    setToggleMenu(!toggleMenu);
  };

  useEffect(() => {
    const handleResizeHeader = (): void => {
      setToggleMenu(false);
    };

    window.addEventListener("resize", handleResizeHeader);
    return () => {
      window.removeEventListener("resize", handleResizeHeader);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <EmergencyCallStrip contactItems={content.header.contactItems} />
      <div
        className={
          (scrolled ? " sticky-menu" : " ") + " header-one header__sticky"
        }
      >
        <div className="container">
          <div className="header-one__shell">
            <div className="row ai-center">
              <div className="col-xl-2 col-lg-2 col-7">
                <div className="header-one__left logo">
                  <Link href="/">
                    <Image src={logo} alt="Geo Gas Services logo" priority />
                  </Link>
                </div>
              </div>
              <div className="col-xl-8 col-lg-8 res-hide">
                <div className="header-one__center">
                  <div className="header-one__center-menu t-center">
                    <ul id="mobilemenu">
                      {navItems.map((item) => {
                        const isActive =
                          item.href === "/"
                            ? pathname === "/"
                            : pathname.startsWith(item.href);
                        return (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className={isActive ? "is-active" : ""}
                            >
                              {item.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-2 col-5 ms-auto">
                <div className="header-one__right">
                  <div className="header-one__right-search">
                    <div className="search">
                      <button
                        type="button"
                        className="header-one__right-search-icon open"
                        onClick={handleSearch}
                        aria-label="Open site search"
                        aria-expanded={search}
                        aria-controls="site-search-panel"
                      >
                        <i className="fal fa-search"></i>
                      </button>
                    </div>
                  </div>
                  <div className="header-one__right-sidebar">
                    <button
                      type="button"
                      className="header-one__right-sidebar-popup-icon"
                      onClick={handleHamburger}
                      aria-label="Open contact details"
                      aria-expanded={hamburger}
                      aria-controls="site-sidebar"
                    >
                      <i className="fa-regular fa-bars-sort"></i>
                    </button>
                  </div>
                  <button
                    type="button"
                    className="header-one__right-responsive-menu menu__bar"
                    onClick={() => handleToggleMenu()}
                    aria-label="Open navigation menu"
                    aria-expanded={toggleMenu}
                    aria-controls="mobile-navigation"
                  >
                    <i className="fa-regular fa-bars"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SearchBox search={search} setSearch={setSearch} />
      <Hamburger
        hamburger={hamburger}
        setHamburger={setHamburger}
        description={content.header.sidebarDescription}
        contactTitle={content.header.contactTitle}
        contactItems={content.header.contactItems}
      />
      <OffCanvasMenu
        toggleMenu={toggleMenu}
        handleToggleMenu={handleToggleMenu}
        description={content.header.offcanvasDescription}
        navItems={content.header.navItems}
        contactTitle={content.header.contactTitle}
        contactItems={content.header.contactItems}
      />
    </>
  );
};

export default Header;
