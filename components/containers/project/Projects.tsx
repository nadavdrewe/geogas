import Link from "next/link";
import Image from "next/image";
import one from "@/public/img/portfolio/portfolio-1.jpg";
import two from "@/public/img/portfolio/portfolio-2.jpg";
import three from "@/public/img/portfolio/portfolio-5.jpg";
import four from "@/public/img/portfolio/portfolio-3.jpg";
import five from "@/public/img/portfolio/portfolio-4.jpg";
import six from "@/public/img/portfolio/portfolio-6.jpg";

const Projects = () => {
  return (
    <div className="portfolio__one section-padding-three">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div
              className="portfolio__one-item "
              data-aos-duration="800"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <Image src={one} alt="image" priority />
              <div className="portfolio__one-item-content">
                <span>Guaranteed</span>
                <h5>
                  <Link href="/projects-details">
                    Reliable Plumbing Solutions
                  </Link>
                </h5>
              </div>
            </div>
            <div
              className="portfolio__one-item "
              data-aos-duration="800"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <Image src={two} alt="image" priority />
              <div className="portfolio__one-item-content">
                <span>Professional</span>
                <h5>
                  <Link href="/projects-details">Home Repair Specialists</Link>
                </h5>
              </div>
            </div>
            <div
              className="portfolio__one-item "
              data-aos-duration="800"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <Image src={three} alt="image" priority />
              <div className="portfolio__one-item-content">
                <span>Dependable</span>
                <h5>
                  <Link href="/projects-details">Precision Home Repairs</Link>
                </h5>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div
              className="portfolio__one-item "
              data-aos-duration="800"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <Image src={four} alt="image" priority />
              <div className="portfolio__one-item-content">
                <span>Reliable</span>
                <h5>
                  <Link href="/projects-details">Expert Handyman Services</Link>
                </h5>
              </div>
            </div>
            <div
              className="portfolio__one-item "
              data-aos-duration="800"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <Image src={five} alt="image" priority />
              <div className="portfolio__one-item-content">
                <span>Efficient</span>
                <h5>
                  <Link href="/projects-details">
                    Affordable Repair Services
                  </Link>
                </h5>
              </div>
            </div>
            <div
              className="portfolio__one-item "
              data-aos-duration="800"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <Image src={six} alt="image" priority />
              <div className="portfolio__one-item-content">
                <span>Expertise</span>
                <h5>
                  <Link href="/projects-details">Plumbing and Maintenance</Link>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
