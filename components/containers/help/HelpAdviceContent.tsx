import { helpAdviceItems } from "@/data/helpAdviceContent";

const toAnchorId = (value: string) =>
  `help-advice-${value.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-")}`;

const HelpAdviceContent = () => {
  return (
    <section className="help-advice section-padding">
      <div className="container">
        <div className="row jc-center">
          <div className="col-xl-10">
            <div className="help-advice__intro">
              <span className="help-advice__eyebrow">FAQ</span>
              <h2>Here Are Some Of The Most Common Problems Associated With Your Boiler</h2>
              <p>
                Quick checks can help identify simple issues before you book a
                call-out. If you are unsure at any stage, stop and contact a
                qualified engineer.
              </p>
            </div>

            <div className="help-advice__grid">
              {helpAdviceItems.map((section, index) => (
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
