import Link from "next/link";

const Pricing = () => {
  return (
    <div className="pricing__one section-padding">
      <div className="container">
        <div className="row mb-20 ai-end">
          <div className="col-lg-7 ">
            <h2>Affordable Solutions for Every Home</h2>
          </div>
          <div
            className="col-lg-5 "
            data-aos-duration="800"
            data-aos="fade-left"
            data-aos-delay="500"
          >
            <p>
              Get the best value for your money with our range of handyman and
              plumbing services.
            </p>
          </div>
        </div>
        <div className="row">
          <div
            className="col-xl-4 col-md-6 "
            data-aos-duration="800"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="pricing__one-item topy-tilt">
              <div className="pricing__one-item-title">
                <h3>Basic</h3>
                <h2>
                  $19<span> /mo</span>
                </h2>
              </div>
              <div className="pricing__one-item-list">
                <ul>
                  <li>
                    <i className="fa-solid fa-chevrons-right"></i>Custom
                    Renovations
                  </li>
                  <li>
                    <i className="fa-solid fa-chevrons-right"></i>Pipe
                    Replacement
                  </li>
                  <li>
                    <i className="fa-solid fa-chevrons-right"></i>Emergency
                    Services (24/7)
                  </li>
                  <li>
                    <i className="fa-solid fa-chevrons-right"></i>Fixture
                    Installations
                  </li>
                </ul>
              </div>
              <div className="pricing__one-item-button">
                <Link className="button-5" href="/contact">
                  Purchase Now<i className="fa-regular fa-angle-right"></i>
                </Link>
              </div>
            </div>
          </div>
          <div
            className="col-xl-4 col-md-6 "
            data-aos-duration="800"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <div className="pricing__one-item topy-tilt">
              <div className="pricing__one-item-title">
                <h3>Standard</h3>
                <h2>
                  $39<span> /mo</span>
                </h2>
              </div>
              <div className="pricing__one-item-list">
                <ul>
                  <li>
                    <i className="fa-solid fa-chevrons-right"></i>Custom
                    Renovations
                  </li>
                  <li>
                    <i className="fa-solid fa-chevrons-right"></i>Pipe
                    Replacement
                  </li>
                  <li>
                    <i className="fa-solid fa-chevrons-right"></i>Emergency
                    Services (24/7)
                  </li>
                  <li>
                    <i className="fa-solid fa-chevrons-right"></i>Fixture
                    Installations
                  </li>
                </ul>
              </div>
              <div className="pricing__one-item-button">
                <Link className="button-5" href="/contact">
                  Purchase Now<i className="fa-regular fa-angle-right"></i>
                </Link>
              </div>
            </div>
          </div>
          <div
            className="col-xl-4 col-md-6 "
            data-aos-duration="800"
            data-aos="fade-up"
            data-aos-delay="900"
          >
            <div className="pricing__one-item topy-tilt">
              <div className="pricing__one-item-title">
                <h3>Premium</h3>
                <h2>
                  $59<span> /mo</span>
                </h2>
              </div>
              <div className="pricing__one-item-list">
                <ul>
                  <li>
                    <i className="fa-solid fa-chevrons-right"></i>Custom
                    Renovations
                  </li>
                  <li>
                    <i className="fa-solid fa-chevrons-right"></i>Pipe
                    Replacement
                  </li>
                  <li>
                    <i className="fa-solid fa-chevrons-right"></i>Emergency
                    Services (24/7)
                  </li>
                  <li>
                    <i className="fa-solid fa-chevrons-right"></i>Fixture
                    Installations
                  </li>
                </ul>
              </div>
              <div className="pricing__one-item-button">
                <Link className="button-5" href="/contact">
                  Purchase Now<i className="fa-regular fa-angle-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
