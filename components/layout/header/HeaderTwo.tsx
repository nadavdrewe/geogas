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

const HeaderTwo = () => {
  const pathname = usePathname();
  const { content } = useSiteContent();
  const navItems = content.header.navItems;

  // hamburger
  const [hamburger, setHamburger] = useState(false);
  const handleHamburger = () => {
    setHamburger(!hamburger);
  };

  // search box
  const [search, setSearch] = useState(false);
  const handleSearch = () => {
    setSearch(!search);
  };

  // offcanvas menu
  const [toggleMenu, setToggleMenu] = useState(false);
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

  return (
    <>
      <EmergencyCallStrip contactItems={content.header.contactItems} />
      <div className="header-two">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="header-two-area">
                <div className="row ai-center">
                  <div className="col-xl-2 col-lg-2 col-7">
                    <div className="header-one__left logo">
                      <Link href="/">
                        <Image src={logo} alt="Geo Gas Services logo" priority />
                      </Link>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-8 res-hide">
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
                  <div className="col-xl-4 col-lg-2 col-5">
                    <div className="header-one__right">
                      <div className="header-one__right-search">
                        <div className="search">
                          <span
                            className="header-one__right-search-icon open"
                            onClick={handleSearch}
                          >
                            <i className="fal fa-search"></i>
                          </span>
                        </div>
                      </div>
                      <div className="header-one__right-sidebar">
                        <div
                          className="header-one__right-sidebar-popup-icon"
                          onClick={handleHamburger}
                        >
                          <i className="fa-regular fa-bars-sort"></i>
                        </div>
                      </div>
                      <div
                        className="header-one__right-responsive-menu menu__bar"
                        onClick={() => handleToggleMenu()}
                      >
                        <i className="fa-regular fa-bars"></i>
                      </div>
                    </div>
                  </div>
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

export default HeaderTwo;
