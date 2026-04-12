"use client";

import Image from "next/image";
import border from "@/public/img/shape/border.svg";
import processTwo from "@/public/img/icon/process-1.svg";
import processThree from "@/public/img/icon/process-2.svg";
import process from "@/public/img/icon/process-3.svg";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

const WorkProcess = ({ addClass = false }) => {
  const { content } = useSiteContent();
  const workProcess = content.home.workProcess;
  const processIcons = [processTwo, processThree, process];

  return (
    <div
      className={
        (addClass ? " pt-0 bg-transparent" : " ") +
        " work__process section-padding"
      }
    >
      <div className="container">
        <div className="row mb-40">
          <div className="col-xl-12 ">
            <div className="work__process-title">
              <h2>{workProcess.title}</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {workProcess.steps.map((step, index) => (
            <div
              key={`${step.step}-${step.title}`}
              className="col-lg-4 col-md-6 "
              data-aos-duration="800"
              data-aos="fade-up"
              data-aos-delay={400 + index * 300}
            >
              <div
                className={[
                  "work__process-item",
                  index === 1 ? "two" : "",
                  index === 2 ? "three" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {index < 2 ? (
                  <Image className="shape" src={border} alt="border" priority />
                ) : null}
                <div className="work__process-item-icon">
                  <span>{step.step}</span>
                  <Image src={processIcons[index] || process} alt="icon" priority />
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkProcess;
