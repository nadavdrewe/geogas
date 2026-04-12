import { SEO_COMPANY } from "@/lib/seo/company";
import { SeoCtaBlock } from "@/lib/seo/types";
import SeoActionLink from "@/components/seo/SeoActionLink";

type SeoContactCardProps = {
  cta: SeoCtaBlock;
};

const SeoContactCard = ({ cta }: SeoContactCardProps) => {
  return (
    <aside className="seo-page__sidebar-card">
      {cta.eyebrow ? <span className="seo-page__eyebrow">{cta.eyebrow}</span> : null}
      <h2>{cta.heading}</h2>
      <p>{cta.text}</p>
      <div className="seo-page__sidebar-actions">
        <SeoActionLink
          className="button-1"
          href={SEO_COMPANY.primaryPhoneHref}
          label={`Call ${SEO_COMPANY.primaryPhoneDisplay}`}
        />
        {cta.primaryHref && cta.primaryLabel ? (
          <SeoActionLink className="button-2" href={cta.primaryHref} label={cta.primaryLabel} />
        ) : null}
        <SeoActionLink className="button-2" href={SEO_COMPANY.whatsappHref} label="WhatsApp us" />
      </div>
    </aside>
  );
};

export default SeoContactCard;

