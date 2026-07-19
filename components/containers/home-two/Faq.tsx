"use client";
import { useState } from "react";
import Image from "next/image";
import faq from "@/public/img/pages/faq.png";
import shape from "@/public/img/shape/faq-shape.png";

const Faq = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="faq__one section-padding pt-0">
      <div className="container">
        <div className="row ai-end">
          <div
            className="col-lg-6 "
            data-aos-duration="800"
            data-aos="fade-right"
            data-aos-delay="300"
          >
            <div className="faq__one-image">
              <Image src={faq} alt="image" priority />
              <Image
                className="shape left-right-animate"
                src={shape}
                alt="image"
                priority
              />
            </div>
          </div>
          <div className="col-lg-6 lg-mt-30">
            <div className="faq__one-right">
              <div className="faq__one-right-title">
                <h2>Ask Question</h2>
                <p
                  data-aos-duration="800"
                  data-aos="fade-up"
                  data-aos-delay="600"
                >
                  He rejects pleasures to secu other greater pleasures, or else
                  he endures pains to avoid worse pa the selection point
                </p>
              </div>
              <div
                data-aos-duration="800"
                data-aos="fade-up"
                data-aos-delay="900"
                id="accordionExample"
              >
                <div className="faq__area-item">
                  <h5
                    className={(active == 0 ? "  " : " collapsed") + " icon"}
                    onClick={() => setActive(active === 0 ? -1 : 0)}
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                  >
                    How often Plumb Professionals?
                  </h5>
                  <div
                    id="collapseOne"
                    className={`faq__area-item-body collapse${
                      active === 0 ? " show " : ""
                    }`}
                    data-bs-parent="#accordionExample"
                  >
                    <p>
                      It is a long established fact that a reader will be distr
                      acted bioiiy the rea dablea content of a page when looking
                      at its layout
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
                    What should I do in case of a plumbing?
                  </h5>
                  <div
                    id="collapseTwo"
                    className={`faq__area-item-body collapse${
                      active === 1 ? " show " : ""
                    }`}
                    data-bs-parent="#accordionExample"
                  >
                    <p>
                      It is a long established fact that a reader will be distr
                      acted bioiiy the rea dablea content of a page when looking
                      at its layout
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
                    What is the best way hardwood floors ?
                  </h5>
                  <div
                    id="collapseThree"
                    className={`faq__area-item-body collapse${
                      active === 2 ? " show " : ""
                    }`}
                    data-bs-parent="#accordionExample"
                  >
                    <p>
                      It is a long established fact that a reader will be distr
                      acted bioiiy the rea dablea content of a page when looking
                      at its layout
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
