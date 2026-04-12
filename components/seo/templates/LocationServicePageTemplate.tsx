import SeoBulletPanel from "@/components/seo/SeoBulletPanel";
import SeoCtaStrip from "@/components/seo/SeoCtaStrip";
import SeoFaqBlock from "@/components/seo/SeoFaqBlock";
import SeoInternalLinks from "@/components/seo/SeoInternalLinks";
import SeoPageScaffold from "@/components/seo/SeoPageScaffold";
import SeoReviewsBlock from "@/components/seo/SeoReviewsBlock";
import SeoSectionList from "@/components/seo/SeoSectionList";
import { LocationServicePage } from "@/lib/seo/types";

type LocationServicePageTemplateProps = {
  page: LocationServicePage;
};

const LocationServicePageTemplate = ({ page }: LocationServicePageTemplateProps) => {
  return (
    <SeoPageScaffold
      page={page}
      summaryTitle={`${page.location} coverage`}
      summaryItems={[
        { label: "Service", value: page.h1 },
        { label: "Local proof", value: page.localProof || `${page.location} coverage` },
        { label: "Nearby areas", value: page.nearbyAreas.join(", ") },
      ]}
      sidebarExtra={
        <>
          {page.areasCovered?.length ? (
            <SeoBulletPanel items={page.areasCovered} title={`Areas we cover in ${page.location}`} />
          ) : null}
          <SeoBulletPanel items={page.nearbyAreas} title="Nearby areas" />
        </>
      }
    >
      <SeoSectionList sections={page.sections} />
      <SeoReviewsBlock reviews={page.reviews || []} />
      <SeoFaqBlock faq={page.faq} />
      <SeoInternalLinks links={page.internalLinks || []} />
      <SeoCtaStrip cta={page.cta} />
    </SeoPageScaffold>
  );
};

export default LocationServicePageTemplate;

