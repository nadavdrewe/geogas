import { SeoCompanyInfo } from "@/lib/seo/company";
import SeoBulletPanel from "@/components/seo/SeoBulletPanel";
import SeoCtaStrip from "@/components/seo/SeoCtaStrip";
import SeoFaqBlock from "@/components/seo/SeoFaqBlock";
import SeoInternalLinks from "@/components/seo/SeoInternalLinks";
import SeoPageScaffold from "@/components/seo/SeoPageScaffold";
import SeoSectionList from "@/components/seo/SeoSectionList";
import { ProblemPage } from "@/lib/seo/types";

type ProblemPageTemplateProps = {
  company: SeoCompanyInfo;
  page: ProblemPage;
};

const ProblemPageTemplate = ({ company, page }: ProblemPageTemplateProps) => {
  return (
    <SeoPageScaffold
      company={company}
      page={page}
      summaryTitle="Fault snapshot"
      summaryItems={[
        { label: "Urgency", value: page.urgency },
        { label: "Safety", value: page.safetyWarning },
        { label: "Typical fix", value: page.typicalFixes.join(", ") },
      ]}
      sidebarExtra={
        <>
          <SeoBulletPanel items={page.symptoms} title="Common symptoms" />
          <SeoBulletPanel items={page.safeChecks} title="Safe checks" />
        </>
      }
    >
      <SeoSectionList sections={page.sections} />
      <SeoBulletPanel items={page.doNotDiy} title="Do not DIY these repairs" tone="warning" />
      <SeoBulletPanel items={page.typicalFixes} title="What usually fixes it" />
      <SeoFaqBlock faq={page.faq} />
      <SeoInternalLinks links={page.internalLinks || []} />
      <SeoCtaStrip company={company} cta={page.cta} />
    </SeoPageScaffold>
  );
};

export default ProblemPageTemplate;

