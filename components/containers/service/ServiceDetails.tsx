import Link from "next/link";
import Image from "next/image";
import avatar from "@/public/img/avatar/help.png";
import one from "@/public/img/service/services-details.jpg";
import two from "@/public/img/portfolio/portfolio-2.jpg";
import three from "@/public/img/portfolio/portfolio-5.jpg";

const ServiceDetails = () => {
  return (
    <div className="services__details section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 lg-mb-50">
            <div className="all__sidebar">
              <div className="all__sidebar-item">
                <h4>Service lists</h4>
                <div className="all__sidebar-item-category">
                  <ul>
                    <li>
                      <Link href="/services-details">
                        Drip Detectives
                        <i className="fa-solid fa-angles-right"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href="/services-details">
                        Leak Stop Specialists
                        <i className="fa-solid fa-angles-right"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href="/services-details">
                        Pipe Dream Team
                        <i className="fa-solid fa-angles-right"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href="/services-details">
                        Rapid Repair Squad
                        <i className="fa-solid fa-angles-right"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href="/services-details">
                        Clear Flow Plumbers
                        <i className="fa-solid fa-angles-right"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="all__sidebar-item-help t-right">
                <div className="content">
                  <h4>
                    Need Help?
                    <br />
                    Call Us
                  </h4>
                  <Link className="button-3" href="/services-details">
                    Read More<i className="fa-regular fa-angle-right"></i>
                  </Link>
                </div>
                <Image src={avatar} alt="image" priority />
              </div>
              <div className="all__sidebar-item">
                <h4>Download</h4>
                <div className="all__sidebar-item-download">
                  <ul>
                    <li>
                      <Link href="/">
                        <div>Company File</div>
                        <span className="fa-regular fa-arrow-down-to-bracket"></span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/">
                        <div>Project File</div>
                        <span className="fa-regular fa-arrow-down-to-bracket"></span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="services__details-content">
              <h2 className="mb-20">Your Plumbing Solutions</h2>
              <p className="mb-35">
                Plumbers provide essential services to install, repair, and
                maintain plumbing systems in residential and commercial
                properties. They work on pipes, fixtures, water heaters
              </p>
              <div className="parallax-image-wrap">
                <div className="parallax-image-inner">
                  <Image
                    src={one}
                    alt="image"
                    priority
                    className="parallax-image"
                  />
                </div>
              </div>
              <p className="mt-35 mb-25">
                Plumbers provide essential services to install, repair, and
                maintain plumbing systems in residential and commercial
                properties. They work on pipes, fixtures, water heaters, and
                drainage systems,an ensuring proper functioning and water flow.
                Plumbers use specialized tools to diagnose and solve plumbing
                issues efficiently, helping to prevent water damage and maintain
              </p>
              <h3>Pipe Perfection Plumbing Done Right</h3>
              <div className="row mt-25 mb-10">
                <div className="col-lg-6">
                  <div className="list">
                    <p>
                      <i className="fa-solid fa-square-check"></i>Precision
                      Plumbing for Your Peace of Mind
                    </p>
                    <p>
                      <i className="fa-solid fa-square-check"></i>The Flow
                      Masters Where Quality Meets{" "}
                    </p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="list">
                    <p>
                      <i className="fa-solid fa-square-check"></i>Piping Hot
                      Service Every Time{" "}
                    </p>
                    <p>
                      <i className="fa-solid fa-square-check"></i>Trust Your Tap
                      to Us Flawless Plumbing
                    </p>
                  </div>
                </div>
              </div>
              <p>
                Plumbers provide essential services to install, repair, and
                maintain plumbing systems in residential and commercial
                properties. They work on pipes, fixtures, water heaters
              </p>
              <div className="row mt-35">
                <div className="col-md-6">
                  <div className="services__two-item">
                    <h4>Piping Hot Service Every The Flow Masters</h4>
                    <p>
                      Plumbers provide essential services to install, repair,
                      and maint plumbing systems
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="services__two-item">
                    <h4>Flow Masters Plumbing Solutions</h4>
                    <p>
                      Plumbers provide essential services to install, repair,
                      and maint plumbing systems
                    </p>
                  </div>
                </div>
              </div>
              <p>
                Plumbers provide essential services to install, repair, and
                maintain plumbing systems in residential and commercial
                properties. They work on pipes, fixtures, water heaters
              </p>
              <div className="row mt-35">
                <div className="col-md-6">
                  <Image src={two} alt="image" priority />
                </div>
                <div className="col-md-6 md-mt-30">
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

export default ServiceDetails;
