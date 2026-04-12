"use client";
import Counter from "../Counter";
import BoilerAnimationPanel from "./BoilerAnimationPanel";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

const Solutions = ({ addClass = false }) => {
  const { content } = useSiteContent();
  const solutions = content.home.solutions;

  return (
    <>
      <div
        className={
          (addClass ? " section-padding " : " section-padding pt-0") +
          " solutions__area"
        }
      >
        <div className="container">
          <div className="row ai-center">
            <div className="col-lg-8 lg-mb-30 ">
              <div className="solutions__area-left">
                <h2>{solutions.title}</h2>
                <p>{solutions.description}</p>
              </div>
            </div>
            <div
              className="col-lg-4 "
              data-aos-duration="800"
              data-aos="fade-left"
              data-aos-delay="500"
            >
              <div className="solutions__area-right">
                <h2>
                  <span className="counter">
                    <Counter value={solutions.categoriesCount} />
                  </span>
                  <span className="pre">+</span>
                </h2>
                <h5>{solutions.categoriesLabel}</h5>
              </div>
            </div>
          </div>
          <div className="row mb-60">
            {solutions.metrics.map((metric, index) => (
              <div
                key={`${metric.label}-${metric.value}`}
                className="col-lg-3 col-sm-6 mt-35 "
                data-aos-duration="800"
                data-aos="fade-up"
                data-aos-delay={300 + index * 200}
              >
                <div className="counter__two-item">
                  <h2>
                    <span className="counter">
                      <Counter value={metric.value} />
                    </span>
                    <span className="pre">{metric.suffix}</span>
                  </h2>
                  <span>{metric.label}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="row">
            <div className="col-xl-12 ">
              <BoilerAnimationPanel className="solutions__area-animation" aosDelay={500} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Solutions;
