"use client";

import Link from "next/link";
import Image from "next/image";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

const Portfolio = () => {
  const { content } = useSiteContent();
  const portfolio = content.home.portfolio;

  return (
    <div className="portfolio__two section-padding pt-0">
      <div className="container">
        <div className="row mb-30">
          <div className="col-xl-12 ">
            <div className="portfolio__two-title">
              <h2>{portfolio.title}</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {portfolio.items.map((item, index) => (
            <div key={`${item.title}-${index}`} className="col-lg-6">
              <div className="topy-tilt">
                <div
                  className="portfolio__two-item "
                  data-aos-duration="800"
                  data-aos="fade-up"
                  data-aos-delay={index < 2 ? 300 : 600}
                >
                  <Link href={item.href}>
                    <Image
                      src={item.imagePath}
                      alt={item.alt}
                      width={650}
                      height={430}
                      priority={index < 2}
                    />
                  </Link>
                  <div className="portfolio__two-item-content">
                    <div>
                      <span>{item.category}</span>
                      <h4>
                        <Link href={item.href}>{item.title}</Link>
                      </h4>
                    </div>
                    <Link href={item.href}>
                      <i className="fa-regular fa-arrow-up-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="col-xl-12 t-center mt-70">
            <Link className="button-2" href={portfolio.action.href}>
              {portfolio.action.label}
              <i className="fa-regular fa-angle-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
