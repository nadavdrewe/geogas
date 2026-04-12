import SeoBulletPanel from "@/components/seo/SeoBulletPanel";
import SeoCtaStrip from "@/components/seo/SeoCtaStrip";
import SeoFaqBlock from "@/components/seo/SeoFaqBlock";
import SeoInternalLinks from "@/components/seo/SeoInternalLinks";
import SeoPageScaffold from "@/components/seo/SeoPageScaffold";
import SeoReviewsBlock from "@/components/seo/SeoReviewsBlock";
import SeoSectionList from "@/components/seo/SeoSectionList";
import { ServicePage } from "@/lib/seo/types";

type ServicePageTemplateProps = {
  page: ServicePage;
};

const ServicePageTemplate = ({ page }: ServicePageTemplateProps) => {
  return (
    <SeoPageScaffold
      page={page}
      summaryTitle="Service overview"
      summaryItems={[
        { label: "Pricing", value: page.pricingGuidance || "Call for pricing" },
        { label: "Areas covered", value: page.areasCovered.join(", ") },
        { label: "Local proof", value: page.localProof || "London call-out coverage" },
      ]}
      sidebarExtra={<SeoBulletPanel items={page.areasCovered} title="Areas covered" />}
    >
      <SeoSectionList sections={page.sections} />
      <SeoBulletPanel items={page.trustSignals || []} title="Why customers book us" />
      <SeoReviewsBlock reviews={page.reviews || []} />
      <SeoFaqBlock faq={page.faq} />
      <SeoInternalLinks links={page.internalLinks || []} />
      <SeoCtaStrip cta={page.cta} />
    </SeoPageScaffold>
  );
};

export default ServicePageTemplate;

