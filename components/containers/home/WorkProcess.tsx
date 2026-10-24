"use client";

import Image from "next/image";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

const WorkProcess = ({ addClass = false }) => {
  const { content } = useSiteContent();
  const workProcess = content.home.workProcess;
  const processIcons = ["/img/icon/process-1.svg", "/img/icon/process-2.svg", "/img/icon/process-3.svg"];

  return (
    <div
      id={addClass ? undefined : "home-process"}
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
        <ol className="row work__process-steps" aria-label="Call-out steps">
          {workProcess.steps.map((step, index) => (
            <li
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
                <div className="work__process-item-icon">
                  <span>{step.step}</span>
                  <Image src={processIcons[index % processIcons.length]} width={65} height={65} alt="" />
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default WorkProcess;
