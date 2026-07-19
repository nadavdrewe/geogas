import { SeoCompanyInfo } from "@/lib/seo/company";
import SeoBulletPanel from "@/components/seo/SeoBulletPanel";
import SeoCtaStrip from "@/components/seo/SeoCtaStrip";
import SeoFaqBlock from "@/components/seo/SeoFaqBlock";
import SeoInternalLinks from "@/components/seo/SeoInternalLinks";
import SeoPageScaffold from "@/components/seo/SeoPageScaffold";
import SeoSectionList from "@/components/seo/SeoSectionList";
import { PartGuidePage } from "@/lib/seo/types";

type PartGuidePageTemplateProps = {
  company: SeoCompanyInfo;
  page: PartGuidePage;
};

const PartGuidePageTemplate = ({ company, page }: PartGuidePageTemplateProps) => {
  return (
    <SeoPageScaffold
      company={company}
      page={page}
      summaryTitle="Component guide"
      summaryItems={[
        { label: "Replacement cost", value: page.replacementCost },
        { label: "DIY repair", value: page.diyAllowed ? "Limited safe checks only" : "Engineer only" },
        { label: "Safety", value: page.safetyWarning },
      ]}
      sidebarExtra={<SeoBulletPanel items={page.symptoms} title="Signs it may have failed" />}
    >
      <SeoSectionList sections={page.sections} />
      <SeoFaqBlock faq={page.faq} />
      <SeoInternalLinks links={page.internalLinks || []} />
      <SeoCtaStrip company={company} cta={page.cta} />
    </SeoPageScaffold>
  );
};

export default PartGuidePageTemplate;

