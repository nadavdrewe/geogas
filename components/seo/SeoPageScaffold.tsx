import { ReactNode } from "react";
import { SeoCompanyInfo } from "@/lib/seo/company";
import { SeoPage } from "@/lib/seo/types";
import SeoHero from "@/components/seo/SeoHero";
import SeoContactCard from "@/components/seo/SeoContactCard";

type SummaryItem = {
  label: string;
  value: string;
};

type SeoPageScaffoldProps = {
  company: SeoCompanyInfo;
  page: SeoPage;
  summaryTitle: string;
  summaryItems: SummaryItem[];
  children: ReactNode;
  sidebarExtra?: ReactNode;
};

const SeoPageScaffold = ({
  company,
  page,
  summaryTitle,
  summaryItems,
  children,
  sidebarExtra,
}: SeoPageScaffoldProps) => {
  return (
    <main className="seo-page section-padding-three">
      <div className="container">
        <SeoHero
          company={company}
          page={page}
          summaryItems={summaryItems}
          summaryTitle={summaryTitle}
        />
        <div className="row g-4">
          <div className="col-lg-8">{children}</div>
          <div className="col-lg-4">
            <div className="seo-page__sidebar">
              <SeoContactCard company={company} cta={page.cta} />
              {sidebarExtra}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SeoPageScaffold;

