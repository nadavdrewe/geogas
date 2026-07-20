import { SeoCompanyInfo } from "@/lib/seo/company";
import SeoBulletPanel from "@/components/seo/SeoBulletPanel";
import SeoCtaStrip from "@/components/seo/SeoCtaStrip";
import SeoFaqBlock from "@/components/seo/SeoFaqBlock";
import SeoInternalLinks from "@/components/seo/SeoInternalLinks";
import SeoPageScaffold from "@/components/seo/SeoPageScaffold";
import SeoReviewsBlock from "@/components/seo/SeoReviewsBlock";
import SeoSectionList from "@/components/seo/SeoSectionList";
import SeoVisualFeature from "@/components/seo/SeoVisualFeature";
import { getSeoPageVisuals } from "@/lib/seo/pageVisuals";
import { ServicePage } from "@/lib/seo/types";

type ServicePageTemplateProps = {
  company: SeoCompanyInfo;
  page: ServicePage;
};

const ServicePageTemplate = ({ company, page }: ServicePageTemplateProps) => {
  const { featureImage } = getSeoPageVisuals(page);

  return (
    <SeoPageScaffold
      company={company}
      page={page}
      summaryTitle="Service overview"
      summaryItems={[
        { label: "Pricing", value: page.pricingGuidance || "Call for pricing" },
        { label: "Areas covered", value: page.areasCovered.join(", ") },
        { label: "Local proof", value: page.localProof || "London and Sussex call-out coverage" },
      ]}
      sidebarExtra={<SeoBulletPanel items={page.areasCovered} title="Areas covered" />}
    >
      <SeoSectionList sections={page.sections.slice(0, 1)} />
      {featureImage ? <SeoVisualFeature image={featureImage} /> : null}
      <SeoSectionList sections={page.sections.slice(1)} />
      <SeoBulletPanel items={page.trustSignals || []} title="Why customers book us" />
      <SeoReviewsBlock reviews={page.reviews || []} />
      <SeoFaqBlock faq={page.faq} />
      <SeoInternalLinks links={page.internalLinks || []} />
      <SeoCtaStrip company={company} cta={page.cta} />
    </SeoPageScaffold>
  );
};

export default ServicePageTemplate;
