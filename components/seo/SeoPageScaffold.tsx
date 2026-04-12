import { ReactNode } from "react";
import { SeoPage } from "@/lib/seo/types";
import SeoHero from "@/components/seo/SeoHero";
import SeoContactCard from "@/components/seo/SeoContactCard";

type SummaryItem = {
  label: string;
  value: string;
};

type SeoPageScaffoldProps = {
  page: SeoPage;
  summaryTitle: string;
  summaryItems: SummaryItem[];
  children: ReactNode;
  sidebarExtra?: ReactNode;
};

const SeoPageScaffold = ({
  page,
  summaryTitle,
  summaryItems,
  children,
  sidebarExtra,
}: SeoPageScaffoldProps) => {
  return (
    <main className="seo-page section-padding-three">
      <div className="container">
        <SeoHero page={page} summaryItems={summaryItems} summaryTitle={summaryTitle} />
        <div className="row g-4">
          <div className="col-lg-8">{children}</div>
          <div className="col-lg-4">
            <div className="seo-page__sidebar">
              <SeoContactCard cta={page.cta} />
              {sidebarExtra}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SeoPageScaffold;

