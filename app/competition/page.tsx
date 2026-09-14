import type { Metadata } from "next";
import CompetitionEntryCount from "@/components/competition/CompetitionEntryCount";
import CompetitionEntryForm from "@/components/competition/CompetitionEntryForm";
import CompetitionGallery from "@/components/competition/CompetitionGallery";
import FooterTwo from "@/components/layout/footer/FooterTwo";
import HeaderTwo from "@/components/layout/header/HeaderTwo";
import InitAnimations from "@/components/layout/InitAnimations";
import ScrollProgressButton from "@/components/layout/ScrollProgressButton";
import CustomCursor from "@/components/layout/CustomCursor";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getSiteContent } from "@/lib/siteContent";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();

  return buildPageMetadata({
    title: "Win a Boiler Safety Check | Everyday Heroes Phase 1",
    description:
      "Enter the Geo Gas Services Everyday Heroes Phase 1 competition to win a free boiler service, gas inspection and a carbon monoxide detector with a 10-year warranty, worth 200 pounds.",
    path: "/competition",
    siteUrl: content.global.siteUrl,
    siteName: content.global.companyName,
  });
}

const CompetitionPage = () => {
  return (
    <>
      <HeaderTwo />
      <main className="competition-page">
        <section className="competition-page__hero section-padding-three">
          <div className="container">
            <div className="competition-page__grid">
              <CompetitionGallery />
              <div className="competition-page__entry">
                <p className="competition-page__eyebrow">Geo Gas Services competition · Phase 1</p>
                <h1>Win a Boiler Safety Check</h1>
                <p className="competition-page__intro">
                  Enter for a free boiler service and gas inspection, plus a new
                  carbon monoxide detector with a 10-year warranty. Worth £200.
                </p>
                <CompetitionEntryCount />
                <ul className="competition-page__steps">
                  <li>Complete the short entry form below.</li>
                  <li>Follow, like and comment <strong>HERO</strong> on the competition post.</li>
                  <li>We’ll contact the winner using the details supplied.</li>
                </ul>
                <CompetitionEntryForm source="competition-page" />
                <p className="competition-page__terms">
                  Phase 1 prize: a free boiler service and gas inspection, plus a
                  new carbon monoxide detector with a 10-year warranty, worth £200.
                  Terms and eligibility apply.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterTwo />
      <InitAnimations />
      <CustomCursor />
      <ScrollProgressButton />
    </>
  );
};

export default CompetitionPage;
