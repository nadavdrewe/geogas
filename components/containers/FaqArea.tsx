"use client";
import { useState } from "react";

const FaqArea = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="faq-page section-padding" id="accordionExample">
      <div className="container">
        <div className="row">
          <div
            className="col-lg-6 lg-mb-20 "
            data-aos-duration="800"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div className="faq__two-right">
              <div className="faq__area-item">
                <h5
                  className={(active == 0 ? "  " : " collapsed") + " icon"}
                  onClick={() => setActive(active === 0 ? -1 : 0)}
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                >
                  <span>01</span>How often Plumb Professionals?
                </h5>
                <div
                  id="collapseOne"
                  className={`faq__area-item-body collapse${
                    active === 0 ? " show " : ""
                  }`}
                  data-bs-parent="#accordionExample"
                >
                  <p>
                    Plumbers provide essential services to install repair and
                    plumbing systems in residential and commercial properties
                  </p>
                </div>
              </div>
              <div className="faq__area-item">
                <h5
                  className={(active == 1 ? "  " : " collapsed") + " icon"}
                  onClick={() => setActive(active === 1 ? -1 : 1)}
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                >
                  <span>02</span>What should I do in case of a plumbing?
                </h5>
                <div
                  id="collapseTwo"
                  className={`faq__area-item-body collapse${
                    active === 1 ? " show " : ""
                  }`}
                  data-bs-parent="#accordionExample"
                >
                  <p>
                    Plumbers provide essential services to install repair and
                    plumbing systems in residential and commercial properties
                  </p>
                </div>
              </div>
              <div className="faq__area-item">
                <h5
                  className={(active == 2 ? "  " : " collapsed") + " icon"}
                  onClick={() => setActive(active === 2 ? -1 : 2)}
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                >
                  <span>03</span>What is the best way hardwood floors ?
                </h5>
                <div
                  id="collapseThree"
                  className={`faq__area-item-body collapse${
                    active === 2 ? " show " : ""
                  }`}
                  data-bs-parent="#accordionExample"
                >
                  <p>
                    Plumbers provide essential services to install repair and
                    plumbing systems in residential and commercial properties
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-lg-6 "
            data-aos-duration="800"
            data-aos="fade-up"
            data-aos-delay="800"
          >
            <div className="faq__two-right">
              <div className="faq__area-item">
                <h5
                  className={(active == 3 ? "  " : " collapsed") + " icon"}
                  onClick={() => setActive(active === 3 ? -1 : 3)}
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                >
                  <span>04</span>How often should I deep clean my house ?
                </h5>
                <div
                  id="collapseFour"
                  className={`faq__area-item-body collapse${
                    active === 3 ? " show " : ""
                  }`}
                  data-bs-parent="#accordionExample"
                >
                  <p>
                    Plumbers provide essential services to install repair and
                    plumbing systems in residential and commercial properties
                  </p>
                </div>
              </div>
              <div className="faq__area-item">
                <h5
                  className={(active == 4 ? "  " : " collapsed") + " icon"}
                  onClick={() => setActive(active === 4 ? -1 : 4)}
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFive"
                >
                  <span>05</span>How do I know if I have a plumbing leak?
                </h5>
                <div
                  id="collapseFive"
                  className={`faq__area-item-body collapse${
                    active === 4 ? " show " : ""
                  }`}
                  data-bs-parent="#accordionExample"
                >
                  <p>
                    Plumbers provide essential services to install repair and
                    plumbing systems in residential and commercial properties
                  </p>
                </div>
              </div>
              <div className="faq__area-item">
                <h5
                  className={(active == 5 ? "  " : " collapsed") + " icon"}
                  onClick={() => setActive(active === 5 ? -1 : 5)}
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseSix"
                >
                  <span>06</span>How often Masterful Plumbing Solutions?
                </h5>
                <div
                  id="collapseSix"
                  className={`faq__area-item-body collapse${
                    active === 5 ? " show " : ""
                  }`}
                  data-bs-parent="#accordionExample"
                >
                  <p>
                    Plumbers provide essential services to install repair and
                    plumbing systems in residential and commercial properties
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqArea;
