"use client";

import BoilerAnimationPanel from "@/components/containers/home/BoilerAnimationPanel";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

const BoilerAnimationSection = () => {
  const { content } = useSiteContent();
  const boilerAnimationContent = content.home.boilerAnimation;

  return (
    <section className="boiler-animation-section section-padding">
      <div className="container">
        <div className="row mb-40">
          <div className="col-xl-8">
            <div className="boiler-animation-section__title">
              <h2>{boilerAnimationContent.title}</h2>
              <p>{boilerAnimationContent.description}</p>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-xl-9 col-lg-10">
            <BoilerAnimationPanel />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoilerAnimationSection;
