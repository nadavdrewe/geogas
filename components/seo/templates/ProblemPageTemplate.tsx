import SeoBulletPanel from "@/components/seo/SeoBulletPanel";
import SeoCtaStrip from "@/components/seo/SeoCtaStrip";
import SeoFaqBlock from "@/components/seo/SeoFaqBlock";
import SeoInternalLinks from "@/components/seo/SeoInternalLinks";
import SeoPageScaffold from "@/components/seo/SeoPageScaffold";
import SeoSectionList from "@/components/seo/SeoSectionList";
import { ProblemPage } from "@/lib/seo/types";

type ProblemPageTemplateProps = {
  page: ProblemPage;
};

const ProblemPageTemplate = ({ page }: ProblemPageTemplateProps) => {
  return (
    <SeoPageScaffold
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
      <SeoCtaStrip cta={page.cta} />
    </SeoPageScaffold>
  );
};

export default ProblemPageTemplate;

