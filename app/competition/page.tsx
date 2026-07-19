import type { Metadata } from "next";
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
    title: "Enter the Everyday Heroes Competition",
    description:
      "Enter the Geo Gas Services Everyday Heroes competition for the chance to win a year’s boiler cover subscription.",
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
                <p className="competition-page__eyebrow">Geo Gas Services competition</p>
                <h1>Enter the Everyday Heroes draw</h1>
                <p className="competition-page__intro">
                  Enter your details for the chance to win a year’s boiler cover
                  subscription and ongoing peace of mind.
                </p>
                <ul className="competition-page__steps">
                  <li>Complete the short entry form below.</li>
                  <li>Follow, like and comment <strong>HERO</strong> on the competition post.</li>
                  <li>We’ll contact the winner using the details supplied.</li>
                </ul>
                <CompetitionEntryForm source="competition-page" />
                <p className="competition-page__terms">
                  Terms and conditions apply. Cover level and eligibility will be
                  confirmed before a prize is awarded.
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
