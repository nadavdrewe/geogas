import SeoStructuredData from "@/components/seo/SeoStructuredData";
import BrandServicePageTemplate from "@/components/seo/templates/BrandServicePageTemplate";
import GuidePageTemplate from "@/components/seo/templates/GuidePageTemplate";
import LocationServicePageTemplate from "@/components/seo/templates/LocationServicePageTemplate";
import PartGuidePageTemplate from "@/components/seo/templates/PartGuidePageTemplate";
import ProblemPageTemplate from "@/components/seo/templates/ProblemPageTemplate";
import ServicePageTemplate from "@/components/seo/templates/ServicePageTemplate";
import { buildSeoSchemas } from "@/lib/seo/schema";
import { SeoPage } from "@/lib/seo/types";

type SeoPageRendererProps = {
  page: SeoPage;
};

const SeoPageRenderer = ({ page }: SeoPageRendererProps) => {
  return (
    <>
      <SeoStructuredData items={buildSeoSchemas(page)} />
      {page.type === "service" ? <ServicePageTemplate page={page} /> : null}
      {page.type === "location_service" ? <LocationServicePageTemplate page={page} /> : null}
      {page.type === "problem" ? <ProblemPageTemplate page={page} /> : null}
      {page.type === "part_guide" ? <PartGuidePageTemplate page={page} /> : null}
      {page.type === "brand_service" ? <BrandServicePageTemplate page={page} /> : null}
      {page.type === "guide" ? <GuidePageTemplate page={page} /> : null}
    </>
  );
};

export default SeoPageRenderer;
