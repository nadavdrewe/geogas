"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import Link from "next/link";
import Image from "next/image";
import one from "@/public/img/team/team-1.jpg";
import two from "@/public/img/team/team-2.jpg";
import three from "@/public/img/team/team-3.jpg";

const Team = () => {
  return (
    <div className="team__one section-padding">
      <div className="container">
        <div className="row mb-50 ai-end">
          <div className="col-lg-7 ">
            <h2>
              Introducing Our Committed Team Members
            </h2>
          </div>
          <div
            className="col-lg-5 "
            data-aos-duration="800"
            data-aos="fade-left"
            data-aos-delay="500"
          >
            <p>
              Meet the experts behind our top-notch services! Our team is
              equipped with the knowledge and experience needed,
            </p>
          </div>
        </div>
        <div className="row">
          <div
            className="col-xl-12 "
            data-aos-duration="800"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div className="swiper team_slider">
              <Swiper
                slidesPerView={1}
                spaceBetween={30}
                speed={2000}
                loop={true}
                roundLengths={true}
                modules={[Autoplay, Pagination]}
                autoplay={{
                  delay: 4500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  el: ".team_pagination",
                  clickable: true,
                }}
                breakpoints={{
                  992: {
                    slidesPerView: 2,
                  },
                  1200: {
                    slidesPerView: 3,
                  },
                }}
                className="swiper-wrapper"
              >
                <SwiperSlide>
                  <div className="swiper-slide">
                    <div className="team__one-item">
                      <div className="team__one-item-image">
                        <Image src={one} alt="team" />
                      </div>
                      <div className="team__one-item-content">
                        <div>
                          <h4>Steve Rhodes</h4>
                          <span>Senior Manager</span>
                        </div>
                        <div className="team__one-item-content-icon">
                          <span className="fa-sharp fa-regular fa-share-nodes"></span>
                          <div className="team__one-item-content-social">
                            <ul>
                              <li>
                                <Link href="https://www.geogasservices.uk">
                                  <i className="fab fa-facebook-f"></i>
                                </Link>
                              </li>
                              <li>
                                <Link href="/contact">
                                  <i className="fa-brands fa-twitter"></i>
                                </Link>
                              </li>
                              <li>
                                <Link href="mailto:info@geogasservices.uk">
                                  <i className="fab fa-instagram"></i>
                                </Link>
                              </li>
                              <li>
                                <Link href="tel:+447854451941">
                                  <i className="fab fa-linkedin-in"></i>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="swiper-slide">
                    <div className="team__one-item">
                      <div className="team__one-item-image">
                        <Image src={two} alt="team" />
                      </div>
                      <div className="team__one-item-content">
                        <div>
                          <h4>Elton John</h4>
                          <span>Senior Manager</span>
                        </div>
                        <div className="team__one-item-content-icon">
                          <span className="fa-sharp fa-regular fa-share-nodes"></span>
                          <div className="team__one-item-content-social">
                            <ul>
                              <li>
                                <Link href="https://www.geogasservices.uk">
                                  <i className="fab fa-facebook-f"></i>
                                </Link>
                              </li>
                              <li>
                                <Link href="/contact">
                                  <i className="fa-brands fa-twitter"></i>
                                </Link>
                              </li>
                              <li>
                                <Link href="mailto:info@geogasservices.uk">
                                  <i className="fab fa-instagram"></i>
                                </Link>
                              </li>
                              <li>
                                <Link href="tel:+447854451941">
                                  <i className="fab fa-linkedin-in"></i>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="swiper-slide">
                    <div className="team__one-item">
                      <div className="team__one-item-image">
                        <Image src={three} alt="team" />
                      </div>
                      <div className="team__one-item-content">
                        <div>
                          <h4>Ethan Harris</h4>
                          <span>Senior Manager</span>
                        </div>
                        <div className="team__one-item-content-icon">
                          <span className="fa-sharp fa-regular fa-share-nodes"></span>
                          <div className="team__one-item-content-social">
                            <ul>
                              <li>
                                <Link href="https://www.geogasservices.uk">
                                  <i className="fab fa-facebook-f"></i>
                                </Link>
                              </li>
                              <li>
                                <Link href="/contact">
                                  <i className="fa-brands fa-twitter"></i>
                                </Link>
                              </li>
                              <li>
                                <Link href="mailto:info@geogasservices.uk">
                                  <i className="fab fa-instagram"></i>
                                </Link>
                              </li>
                              <li>
                                <Link href="tel:+447854451941">
                                  <i className="fab fa-linkedin-in"></i>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="swiper-slide">
                    <div className="team__one-item">
                      <div className="team__one-item-image">
                        <Image src={one} alt="team" />
                      </div>
                      <div className="team__one-item-content">
                        <div>
                          <h4>Steve Rhodes</h4>
                          <span>Senior Manager</span>
                        </div>
                        <div className="team__one-item-content-icon">
                          <span className="fa-sharp fa-regular fa-share-nodes"></span>
                          <div className="team__one-item-content-social">
                            <ul>
                              <li>
                                <Link href="https://www.geogasservices.uk">
                                  <i className="fab fa-facebook-f"></i>
                                </Link>
                              </li>
                              <li>
                                <Link href="/contact">
                                  <i className="fa-brands fa-twitter"></i>
                                </Link>
                              </li>
                              <li>
                                <Link href="mailto:info@geogasservices.uk">
                                  <i className="fab fa-instagram"></i>
                                </Link>
                              </li>
                              <li>
                                <Link href="tel:+447854451941">
                                  <i className="fab fa-linkedin-in"></i>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="swiper-slide">
                    <div className="team__one-item">
                      <div className="team__one-item-image">
                        <Image src={two} alt="team" />
                      </div>
                      <div className="team__one-item-content">
                        <div>
                          <h4>Elton John</h4>
                          <span>Senior Manager</span>
                        </div>
                        <div className="team__one-item-content-icon">
                          <span className="fa-sharp fa-regular fa-share-nodes"></span>
                          <div className="team__one-item-content-social">
                            <ul>
                              <li>
                                <Link href="https://www.geogasservices.uk">
                                  <i className="fab fa-facebook-f"></i>
                                </Link>
                              </li>
                              <li>
                                <Link href="/contact">
                                  <i className="fa-brands fa-twitter"></i>
                                </Link>
                              </li>
                              <li>
                                <Link href="mailto:info@geogasservices.uk">
                                  <i className="fab fa-instagram"></i>
                                </Link>
                              </li>
                              <li>
                                <Link href="tel:+447854451941">
                                  <i className="fab fa-linkedin-in"></i>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="swiper-slide">
                    <div className="team__one-item">
                      <div className="team__one-item-image">
                        <Image src={three} alt="team" />
                      </div>
                      <div className="team__one-item-content">
                        <div>
                          <h4>Ethan Harris</h4>
                          <span>Senior Manager</span>
                        </div>
                        <div className="team__one-item-content-icon">
                          <span className="fa-sharp fa-regular fa-share-nodes"></span>
                          <div className="team__one-item-content-social">
                            <ul>
                              <li>
                                <Link href="https://www.geogasservices.uk">
                                  <i className="fab fa-facebook-f"></i>
                                </Link>
                              </li>
                              <li>
                                <Link href="/contact">
                                  <i className="fa-brands fa-twitter"></i>
                                </Link>
                              </li>
                              <li>
                                <Link href="mailto:info@geogasservices.uk">
                                  <i className="fab fa-instagram"></i>
                                </Link>
                              </li>
                              <li>
                                <Link href="tel:+447854451941">
                                  <i className="fab fa-linkedin-in"></i>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
        <div className="row mt-60">
          <div className="team__one-pagination">
            <div className="team_pagination"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
