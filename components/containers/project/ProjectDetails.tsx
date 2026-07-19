import Link from "next/link";
import Image from "next/image";
import poster from "@/public/img/portfolio/projects-details.jpg";
import one from "@/public/img/portfolio/portfolio-2.jpg";
import two from "@/public/img/portfolio/portfolio-5.jpg";
import three from "@/public/img/portfolio/portfolio-6.jpg";

const ProjectDetails = () => {
  return (
    <div className="project__details section-padding">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="project__details-content">
              <h2>Piping Hot Service Every Time</h2>
              <div className="meta">
                <ul>
                  <li>
                    <Link
                      href="https://www.google.com/maps"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fa-solid fa-location-dot"></i>3891 Ranchview
                      Dr. Richardson, California 62639,
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <i className="fas fa-calendar-alt"></i>October 19, 2024
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="parallax-image-wrap">
                <div className="parallax-image-inner">
                  <Image
                    src={poster}
                    alt="image"
                    priority
                    className="parallax-image"
                  />
                </div>
              </div>
              <div className="information">
                <ul>
                  <li>
                    <h4>Project Information</h4>
                  </li>
                  <li>
                    Category :<span>Geo Gas Services</span>
                  </li>
                  <li>
                    Customer :<span>Jonh Jorden</span>
                  </li>
                  <li>
                    Date :<span>20 Oct, 2024</span>
                  </li>
                </ul>
              </div>
              <h3 className="mb-20">
                Precision Plumbing for Your Peace of Mind
              </h3>
              <p>
                Plumbers provide essential services to install, repair, and
                maintain plumbing systems in residential and commercial
                properties. They work on pipes, fixtures, water heaters, and
                drainage systems the ensuring proper functioning and water flow.
                Plumbers use specialized
              </p>
              <p>
                Plumbers provide essential services to install, repair, and
                maintain plumbing systems in residential and commercial
                properties. They work on pipes, fixtures, water heaters, and
                drainage systems the ensuring proper functioning and water flow.
                Plumbers use specialized Plumbers provide essential services to
                install, repair, and maintain plumbing systems in residential
                and commercial properties. They work on pipes
              </p>
              <div className="row mt-30 mb-10">
                <div className="col-lg-4">
                  <div className="list">
                    <p>
                      <i className="fa-solid fa-square-check"></i>Precision
                      Plumbing for Your Peace of Mind
                    </p>
                    <p>
                      <i className="fa-solid fa-square-check"></i>The Flow
                      Masters Where Quality Meets
                    </p>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="list">
                    <p>
                      <i className="fa-solid fa-square-check"></i>Piping Hot
                      Service Every Time
                    </p>
                    <p>
                      <i className="fa-solid fa-square-check"></i>Trust Your Tap
                      to Us Flawless Plumbing
                    </p>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="list">
                    <p>
                      <i className="fa-solid fa-square-check"></i>Plumbing Pros:
                      Fixing Leaks and Drips
                    </p>
                    <p>
                      <i className="fa-solid fa-square-check"></i>Your Plumbing
                      Solutions, Our Expertise
                    </p>
                  </div>
                </div>
              </div>
              <p>
                Plumbers provide essential services to install, repair, and
                maintain plumbing systems in residential and commercial
                properties. They work on pipes, fixtures, water heaters, and
                drainage systems the ensuring proper functioning and water flow.
                Plumbers use specialized
              </p>
              <div className="row mt-35 mb-35">
                <div className="col-md-4">
                  <Image src={one} alt="image" priority />
                </div>
                <div className="col-md-4 md-mb-30 md-mt-30">
                  <Image src={two} alt="image" priority />
                </div>
                <div className="col-md-4">
                  <Image src={three} alt="image" priority />
                </div>
              </div>
              <h3 className="mb-20">Piping Hot Service Every Time</h3>
              <p>
                Plumbers provide essential services to install, repair, and
                maintain plumbing systems in residential and commercial
                properties. They work on pipes, fixtures, water heaters, and
                drainage systems the ensuring proper functioning and water flow.
                Plumbers use specialized Plumbers provide essential services to
                install, repair, and maintain plumbing systems in residential
                and commercial properties. They work on pipes
              </p>
              <div className="navigation">
                <Link href="/projects-details">
                  <i className="fa-regular fa-arrow-left"></i>
                  <h5>Previous</h5>
                </Link>
                <Link href="/projects-details">
                  <i className="fa-regular fa-arrow-right"></i>
                  <h5>Next</h5>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
