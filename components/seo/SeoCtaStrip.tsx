import { SeoCompanyInfo } from "@/lib/seo/company";
import { SeoCtaBlock } from "@/lib/seo/types";
import SeoActionLink from "@/components/seo/SeoActionLink";

type SeoCtaStripProps = {
  company: SeoCompanyInfo;
  cta: SeoCtaBlock;
};

const SeoCtaStrip = ({ company, cta }: SeoCtaStripProps) => {
  return (
    <section className="seo-page__cta">
      <div className="seo-page__cta-copy">
        {cta.eyebrow ? <span className="seo-page__eyebrow">{cta.eyebrow}</span> : null}
        <h2>{cta.heading}</h2>
        <p>{cta.text}</p>
      </div>
      <div className="seo-page__cta-actions">
        <SeoActionLink
          className="button-1"
          href={company.primaryPhoneHref}
          label={`Call ${company.primaryPhoneDisplay}`}
        />
        {cta.primaryHref && cta.primaryLabel ? (
          <SeoActionLink className="button-2" href={cta.primaryHref} label={cta.primaryLabel} />
        ) : null}
      </div>
    </section>
  );
};

export default SeoCtaStrip;

