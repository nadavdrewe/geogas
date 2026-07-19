"use client";

import { useSiteContent } from "@/components/providers/SiteContentProvider";

const toAnchorId = (value: string) =>
  `help-advice-${value.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-")}`;

const HelpAdviceContent = () => {
  const { content } = useSiteContent();
  const helpAdviceContent = content.helpAdvicePage;

  return (
    <section className="help-advice section-padding">
      <div className="container">
        <div className="row jc-center">
          <div className="col-xl-10">
            <div className="help-advice__intro">
              <span className="help-advice__eyebrow">{helpAdviceContent.eyebrow}</span>
              <h2>{helpAdviceContent.title}</h2>
              <p>{helpAdviceContent.description}</p>
            </div>

            <div className="help-advice__grid">
              {helpAdviceContent.items.map((section, index) => (
                <article
                  className="help-advice__card"
                  key={section.title}
                  id={toAnchorId(section.title)}
                >
                  <div className="help-advice__card-head">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{section.title}</h3>
                  </div>
                  <p>{section.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpAdviceContent;
