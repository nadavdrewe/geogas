import { SeoCompanyInfo } from "@/lib/seo/company";
import SeoBulletPanel from "@/components/seo/SeoBulletPanel";
import SeoCtaStrip from "@/components/seo/SeoCtaStrip";
import SeoFaqBlock from "@/components/seo/SeoFaqBlock";
import SeoInternalLinks from "@/components/seo/SeoInternalLinks";
import SeoPageScaffold from "@/components/seo/SeoPageScaffold";
import SeoReviewsBlock from "@/components/seo/SeoReviewsBlock";
import SeoSectionList from "@/components/seo/SeoSectionList";
import { BrandServicePage } from "@/lib/seo/types";

type BrandServicePageTemplateProps = {
  company: SeoCompanyInfo;
  page: BrandServicePage;
};

const BrandServicePageTemplate = ({ company, page }: BrandServicePageTemplateProps) => {
  return (
    <SeoPageScaffold
      company={company}
      page={page}
      summaryTitle={`${page.brand} support`}
      summaryItems={[
        { label: "Brand", value: page.brand },
        { label: "Areas covered", value: page.areasCovered.join(", ") },
        { label: "Local proof", value: page.localProof || `${page.brand} support across London and Sussex` },
      ]}
      sidebarExtra={<SeoBulletPanel items={page.commonFaults} title="Common faults" />}
    >
      <SeoSectionList sections={page.sections} />
      <SeoReviewsBlock reviews={page.reviews || []} />
      <SeoFaqBlock faq={page.faq} />
      <SeoInternalLinks links={page.internalLinks || []} />
      <SeoCtaStrip company={company} cta={page.cta} />
    </SeoPageScaffold>
  );
};

export default BrandServicePageTemplate;

