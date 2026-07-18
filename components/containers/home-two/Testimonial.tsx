"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import Image from "next/image";
import one from "@/public/img/avatar/avatar-1.jpg";
import two from "@/public/img/avatar/avatar-2.jpg";

const Testimonial = () => {
  return (
    <div className="testimonial__one section-padding">
      <div className="container">
        <div className="row mb-60">
          <div className="col-xl-12">
            <div className="team__one-title">
              <h2>Feedback from Our Valued Customers</h2>
              <p
                data-aos-duration="800"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                It&apos;s never been easier to create a beautiful and functional
                website. zohatic provides you with everything you need to get
                started
              </p>
            </div>
          </div>
        </div>
        <div className="row ai-center">
          <div
            className="col-xl-6 col-lg-6"
            data-aos-duration="800"
            data-aos="fade-right"
            data-aos-delay="300"
          >
            <div className="testimonial__one-left"></div>
          </div>
          <div
            className="col-xl-6 col-lg-6 "
            data-aos-duration="800"
            data-aos="fade-left"
            data-aos-delay="500"
          >
            <div className="swiper testimonial_slider">
              <Swiper
                slidesPerView={1}
                spaceBetween={30}
                speed={2000}
                loop={true}
                roundLengths={true}
                modules={[Autoplay, Navigation]}
                autoplay={{
                  delay: 4500,
                  disableOnInteraction: false,
                }}
                navigation={{
                  nextEl: ".testimonial_next",
                  prevEl: ".testimonial_prev",
                }}
                className="swiper-wrapper"
              >
                <SwiperSlide>
                  <div className="testimonial__one-item swiper-slide">
                    <div className="testimonial__one-item-client">
                      <div className="testimonial__one-item-client-image">
                        <Image src={one} alt="Image" />
                      </div>
                      <div className="testimonial__one-item-client-title">
                        <h4>Flores, Juanita</h4>
                        <span>Development Manager</span>
                      </div>
                    </div>
                    <p>
                      Lorem ipsum dolo monsolanus amet,mango consectetur caron
                      adipiscing elit. Cras nec sapi Lorem ipsum dolo monsolanus
                      amet,mango consectetur caron adipiscing elit. Cras nec
                      sapi Lorem ipsum dolo monso
                    </p>
                    <div className="testimonial__one-item-reviews">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="testimonial__one-item swiper-slide">
                    <div className="testimonial__one-item-client">
                      <div className="testimonial__one-item-client-image">
                        <Image src={two} alt="Image" />
                      </div>
                      <div className="testimonial__one-item-client-title">
                        <h4>Cooper, Kristin</h4>
                        <span>Co Founder</span>
                      </div>
                    </div>
                    <p>
                      Lorem ipsum dolo monsolanus amet,mango consectetur caron
                      adipiscing elit. Cras nec sapi Lorem ipsum dolo monsolanus
                      amet,mango consectetur caron adipiscing elit. Cras nec
                      sapi Lorem ipsum dolo monso
                    </p>
                    <div className="testimonial__one-item-reviews">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="testimonial__one-item swiper-slide">
                    <div className="testimonial__one-item-client">
                      <div className="testimonial__one-item-client-image">
                        <Image src={one} alt="Image" />
                      </div>
                      <div className="testimonial__one-item-client-title">
                        <h4>Flores, Juanita</h4>
                        <span>Development Manager</span>
                      </div>
                    </div>
                    <p>
                      Lorem ipsum dolo monsolanus amet,mango consectetur caron
                      adipiscing elit. Cras nec sapi Lorem ipsum dolo monsolanus
                      amet,mango consectetur caron adipiscing elit. Cras nec
                      sapi Lorem ipsum dolo monso
                    </p>
                    <div className="testimonial__one-item-reviews">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="testimonial__one-item swiper-slide">
                    <div className="testimonial__one-item-client">
                      <div className="testimonial__one-item-client-image">
                        <Image src={two} alt="Image" />
                      </div>
                      <div className="testimonial__one-item-client-title">
                        <h4>Cooper, Kristin</h4>
                        <span>Co Founder</span>
                      </div>
                    </div>
                    <p>
                      Lorem ipsum dolo monsolanus amet,mango consectetur caron
                      adipiscing elit. Cras nec sapi Lorem ipsum dolo monsolanus
                      amet,mango consectetur caron adipiscing elit. Cras nec
                      sapi Lorem ipsum dolo monso
                    </p>
                    <div className="testimonial__one-item-reviews">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
            <div className="testimonial__one-arrow jc-end">
              <div className="testimonial__one-arrow-prev testimonial_prev">
                <i className="fal fa-long-arrow-left"></i>
              </div>
              <div className="testimonial__one-arrow-next testimonial_next">
                <i className="fal fa-long-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
