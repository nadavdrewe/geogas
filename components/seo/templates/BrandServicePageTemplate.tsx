import SeoBulletPanel from "@/components/seo/SeoBulletPanel";
import SeoCtaStrip from "@/components/seo/SeoCtaStrip";
import SeoFaqBlock from "@/components/seo/SeoFaqBlock";
import SeoInternalLinks from "@/components/seo/SeoInternalLinks";
import SeoPageScaffold from "@/components/seo/SeoPageScaffold";
import SeoReviewsBlock from "@/components/seo/SeoReviewsBlock";
import SeoSectionList from "@/components/seo/SeoSectionList";
import { BrandServicePage } from "@/lib/seo/types";

type BrandServicePageTemplateProps = {
  page: BrandServicePage;
};

const BrandServicePageTemplate = ({ page }: BrandServicePageTemplateProps) => {
  return (
    <SeoPageScaffold
      page={page}
      summaryTitle={`${page.brand} support`}
      summaryItems={[
        { label: "Brand", value: page.brand },
        { label: "Areas covered", value: page.areasCovered.join(", ") },
        { label: "Local proof", value: page.localProof || `${page.brand} support across London` },
      ]}
      sidebarExtra={<SeoBulletPanel items={page.commonFaults} title="Common faults" />}
    >
      <SeoSectionList sections={page.sections} />
      <SeoReviewsBlock reviews={page.reviews || []} />
      <SeoFaqBlock faq={page.faq} />
      <SeoInternalLinks links={page.internalLinks || []} />
      <SeoCtaStrip cta={page.cta} />
    </SeoPageScaffold>
  );
};

export default BrandServicePageTemplate;

