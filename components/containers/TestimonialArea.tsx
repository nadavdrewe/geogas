import Image from "next/image";
import quote from "@/public//img/icon/quote.svg";

const TestimonialArea = () => {
  return (
    <div className="testimonial-page section-padding-three">
      <div className="container">
        <div className="row">
          <div className="col-lg-6" data-aos-duration="800" data-aos="fade-up">
            <div className="testimonial__two-area-item">
              <div className="testimonial__two-area-item-client">
                <div className="testimonial__two-area-item-client-title">
                  <h4>Flores, Juanita</h4>
                  <span>Development Manager</span>
                </div>
                <Image src={quote} alt="icon" priority />
              </div>
              <p>
                Plumbers are skilled professionals who specialize in installing
                and maintaining systems used for water, sew drainage, and gas.
                They play a vital role
              </p>
              <div className="testimonial__two-area-item-reviews">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
            </div>
          </div>
          <div
            className="col-lg-6"
            data-aos-duration="800"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="testimonial__two-area-item">
              <div className="testimonial__two-area-item-client">
                <div className="testimonial__two-area-item-client-title">
                  <h4>Darrell Steward</h4>
                  <span>Marketing Coordinator</span>
                </div>
                <Image src={quote} alt="icon" priority />
              </div>
              <p>
                Plumbers are skilled professionals who specialize in installing
                and maintaining systems used for water, sew drainage, and gas.
                They play a vital role
              </p>
              <div className="testimonial__two-area-item-reviews">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
            </div>
          </div>
          <div className="col-lg-6" data-aos-duration="800" data-aos="fade-up">
            <div className="testimonial__two-area-item">
              <div className="testimonial__two-area-item-client">
                <div className="testimonial__two-area-item-client-title">
                  <h4>Cooper, Kristin</h4>
                  <span>Co Founder</span>
                </div>
                <Image src={quote} alt="icon" priority />
              </div>
              <p>
                Plumbers are skilled professionals who specialize in installing
                and maintaining systems used for water, sew drainage, and gas.
                They play a vital role
              </p>
              <div className="testimonial__two-area-item-reviews">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
            </div>
          </div>
          <div
            className="col-lg-6"
            data-aos-duration="800"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="testimonial__two-area-item">
              <div className="testimonial__two-area-item-client">
                <div className="testimonial__two-area-item-client-title">
                  <h4>Jardan Hawel</h4>
                  <span>Designer</span>
                </div>
                <Image src={quote} alt="icon" priority />
              </div>
              <p>
                Plumbers are skilled professionals who specialize in installing
                and maintaining systems used for water, sew drainage, and gas.
                They play a vital role
              </p>
              <div className="testimonial__two-area-item-reviews">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialArea;
