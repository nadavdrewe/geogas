import { SeoSection } from "@/lib/seo/types";

type SeoSectionListProps = {
  sections: SeoSection[];
};

const SeoSectionList = ({ sections }: SeoSectionListProps) => {
  return (
    <div className="seo-page__stack">
      {sections.map((section) => (
        <section key={section.heading} className="seo-page__card">
          <h2>{section.heading}</h2>
          {section.body ? <p>{section.body}</p> : null}
          {section.bullets?.length ? (
            <ul className="seo-page__bullet-list">
              {section.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </div>
  );
};

export default SeoSectionList;

