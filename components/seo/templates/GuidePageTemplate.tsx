import { SeoCompanyInfo } from "@/lib/seo/company";
import SeoCtaStrip from "@/components/seo/SeoCtaStrip";
import SeoFaqBlock from "@/components/seo/SeoFaqBlock";
import SeoInternalLinks from "@/components/seo/SeoInternalLinks";
import SeoPageScaffold from "@/components/seo/SeoPageScaffold";
import SeoSectionList from "@/components/seo/SeoSectionList";
import { GuidePage } from "@/lib/seo/types";

type GuidePageTemplateProps = {
  company: SeoCompanyInfo;
  page: GuidePage;
};

const GuidePageTemplate = ({ company, page }: GuidePageTemplateProps) => {
  return (
    <SeoPageScaffold
      company={company}
      page={page}
      summaryTitle="Guide overview"
      summaryItems={[
        { label: "Target keyword", value: page.targetKeyword },
        { label: "Guide type", value: page.guideCategory },
        { label: "Best next step", value: page.cta.heading },
      ]}
    >
      <SeoSectionList sections={page.sections} />
      <SeoFaqBlock faq={page.faq} />
      <SeoInternalLinks links={page.internalLinks || []} />
      <SeoCtaStrip company={company} cta={page.cta} />
    </SeoPageScaffold>
  );
};

export default GuidePageTemplate;

