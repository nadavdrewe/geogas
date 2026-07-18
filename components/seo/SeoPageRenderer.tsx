import SeoStructuredData from "@/components/seo/SeoStructuredData";
import BrandServicePageTemplate from "@/components/seo/templates/BrandServicePageTemplate";
import GuidePageTemplate from "@/components/seo/templates/GuidePageTemplate";
import LocationServicePageTemplate from "@/components/seo/templates/LocationServicePageTemplate";
import PartGuidePageTemplate from "@/components/seo/templates/PartGuidePageTemplate";
import ProblemPageTemplate from "@/components/seo/templates/ProblemPageTemplate";
import ServicePageTemplate from "@/components/seo/templates/ServicePageTemplate";
import { buildSeoSchemas } from "@/lib/seo/schema";
import { SeoCompanyInfo } from "@/lib/seo/company";
import { SeoPage } from "@/lib/seo/types";

type SeoPageRendererProps = {
  company: SeoCompanyInfo;
  page: SeoPage;
};

const SeoPageRenderer = ({ company, page }: SeoPageRendererProps) => {
  return (
    <>
      <SeoStructuredData items={buildSeoSchemas(page, company)} />
      {page.type === "service" ? <ServicePageTemplate company={company} page={page} /> : null}
      {page.type === "location_service" ? (
        <LocationServicePageTemplate company={company} page={page} />
      ) : null}
      {page.type === "problem" ? <ProblemPageTemplate company={company} page={page} /> : null}
      {page.type === "part_guide" ? (
        <PartGuidePageTemplate company={company} page={page} />
      ) : null}
      {page.type === "brand_service" ? (
        <BrandServicePageTemplate company={company} page={page} />
      ) : null}
      {page.type === "guide" ? <GuidePageTemplate company={company} page={page} /> : null}
    </>
  );
};

export default SeoPageRenderer;
