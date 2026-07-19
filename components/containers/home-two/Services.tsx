"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import one from "@/public/img/service/services-1.jpg";
import two from "@/public/img/service/services-2.jpg";
import three from "@/public/img/service/services-3.jpg";

const Services = () => {
  const [active, setActive] = useState(1);

  return (
    <div className="services__one">
      <div className="container">
        <div className="row mb-30">
          <div className="col-xl-12 ">
            <div className="services__one-title">
              <h2>
                Comprehensive Handyman & Plumbing Services
              </h2>
              <p>
                From minor repairs to major installations, our skilled team
                offers reliable solutions tailored to your home’s needs.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="services__one-area">
              <div className="services__one-list">
                <Link href="/services-details" onMouseEnter={() => setActive(0)}>
                  <div
                    className="services__one-list-item "
                    data-aos-duration="800"
                    data-aos="fade-up"
                    data-service="1"
                    data-aos-delay="400"
                  >
                    <div className="services__one-list-item-icon">
                      <span>
                        <i className="fa-regular fa-diagram-sankey"></i>
                      </span>
                    </div>
                    <div className="services__one-list-item-content">
                      <h4>The Pipeline Professionals</h4>
                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable
                      </p>
                    </div>
                  </div>
                </Link>
                <Link href="/services-details" onMouseEnter={() => setActive(1)}>
                  <div
                    className="services__one-list-item "
                    data-aos-duration="800"
                    data-aos="fade-up"
                    data-service="2"
                    data-aos-delay="600"
                  >
                    <div className="services__one-list-item-icon">
                      <span>
                        <i className="fa-regular fa-screwdriver-wrench"></i>
                      </span>
                    </div>
                    <div className="services__one-list-item-content">
                      <h4>The Handy Plumbers</h4>
                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable
                      </p>
                    </div>
                  </div>
                </Link>
                <Link href="/services-details" onMouseEnter={() => setActive(2)}>
                  <div
                    className="services__one-list-item "
                    data-aos-duration="800"
                    data-aos="fade-up"
                    data-service="3"
                    data-aos-delay="900"
                  >
                    <div className="services__one-list-item-icon">
                      <span>
                        <i className="fa-regular fa-hand-holding-droplet"></i>
                      </span>
                    </div>
                    <div className="services__one-list-item-content">
                      <h4>Drain Masters at Your Service</h4>
                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="services__one-right">
                <div
                  className={
                    "services__one-right-image item-1 " +
                    (active === 0 ? " active" : " ")
                  }
                >
                  <Image src={one} alt="image" priority />
                </div>
                <div
                  className={
                    "services__one-right-image item-2 " +
                    (active === 1 ? " active" : " ")
                  }
                >
                  <Image src={two} alt="image" priority />
                </div>
                <div
                  className={
                    "services__one-right-image item-3 " +
                    (active === 2 ? " active" : " ")
                  }
                >
                  <Image src={three} alt="image" priority />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
