"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import YoutubeEmbed from "@/components/containers/YoutubeEmbed";
import banner from "@/public/img/banner/banner.png";

const Banner = () => {
  const [videoActive, setVideoActive] = useState(false);
  return (
    <>
      <div className="banner__one">
        <div className="container">
          <div className="row ai-center">
            <div className="col-xl-5 col-lg-6">
              <div className="banner__one-content">
                <h1
                  data-aos-duration="800"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  Plumbing pros you Best Quality <span>work</span>
                </h1>
                <p
                  data-aos-duration="800"
                  data-aos="fade-up"
                  data-aos-delay="600"
                >
                  Plumbers provide essential services to install, repair, and
                  maint plumbing systems in residential
                </p>
                <div
                  className="banner__one-content-button"
                  data-aos-duration="800"
                  data-aos="fade-up"
                  data-aos-delay="900"
                >
                  <Link className="button-2" href="/about">
                    Discover More<i className="fa-regular fa-angle-right"></i>
                  </Link>
                  <div className="video">
                    <a
                      className="video-popup"
                      onClick={() => setVideoActive(true)}
                    >
                      <i className="fas fa-play"></i>
                      <h5>Play Now</h5>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-7 col-lg-6">
              <div
                className="banner__one-image "
                data-aos-duration="800"
                data-aos="fade-left"
                data-aos-delay="400"
              >
                <Image src={banner} alt="banner" priority />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={(videoActive ? " video-zoom-in" : " ") + " video-backdrop"}
        onClick={() => setVideoActive(false)}
      >
        <div className="video-inner">
          <div
            className="video-container"
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
              e.stopPropagation()
            }
          >
            {videoActive && <YoutubeEmbed embedId="0WC-tD-njcA" />}
            <button
              aria-label="close video popup"
              className="close-video-popup"
              onClick={() => setVideoActive(false)}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
