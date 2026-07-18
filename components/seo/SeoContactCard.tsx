import Image from "next/image";
import { SeoCompanyInfo } from "@/lib/seo/company";
import { SeoCtaBlock } from "@/lib/seo/types";
import SeoActionLink from "@/components/seo/SeoActionLink";

type SeoContactCardProps = {
  company: SeoCompanyInfo;
  cta: SeoCtaBlock;
};

const SeoContactCard = ({ company, cta }: SeoContactCardProps) => {
  return (
    <aside className="seo-page__sidebar-card">
      <div className="seo-page__sidebar-image">
        <Image
          src="/cartoons/van1.jpeg"
          alt="Geo Gas Services side-view van"
          width={1280}
          height={720}
          sizes="(max-width: 991px) 100vw, 360px"
        />
      </div>
      {cta.eyebrow ? <span className="seo-page__eyebrow">{cta.eyebrow}</span> : null}
      <h2>{cta.heading}</h2>
      <p>{cta.text}</p>
      <div className="seo-page__sidebar-contact-list">
        <a href={company.londonOfficePhoneHref}>London office {company.londonOfficePhoneDisplay}</a>
        <a href={company.sussexOfficePhoneHref}>Sussex office {company.sussexOfficePhoneDisplay}</a>
      </div>
      <div className="seo-page__sidebar-actions">
        <SeoActionLink
          className="button-1"
          href={company.londonOfficePhoneHref}
          label={`Call London office ${company.londonOfficePhoneDisplay}`}
        />
        <SeoActionLink
          className="button-2"
          href={company.sussexOfficePhoneHref}
          label={`Call Sussex office ${company.sussexOfficePhoneDisplay}`}
        />
        {cta.primaryHref && cta.primaryLabel ? (
          <SeoActionLink className="button-2" href={cta.primaryHref} label={cta.primaryLabel} />
        ) : null}
        <SeoActionLink className="button-2" href={company.whatsappHref} label="WhatsApp us" />
      </div>
    </aside>
  );
};

export default SeoContactCard;

