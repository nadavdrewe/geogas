import type { Metadata } from "next";
import HeaderTwo from "@/components/layout/header/HeaderTwo";
import BannerTwo from "@/components/layout/banner/BannerTwo";
import CompetitionHomeHero from "@/components/competition/CompetitionHomeHero";
import GeoChatbotSection from "@/components/chatbot/GeoChatbotSection";
import ComicStripSection from "@/components/containers/home/ComicStripSection";
import Services from "@/components/containers/home/Services";
import ContractsOverview from "@/components/containers/home/ContractsOverview";
import PricingListing from "@/components/containers/pricing/PricingListing";
import Solutions from "@/components/containers/home/Solutions";
import WorkProcess from "@/components/containers/home/WorkProcess";
import Faq from "@/components/containers/home/Faq";
import Team from "@/components/containers/home/Team";
import Testimonial from "@/components/containers/home/Testimonial";
import Contact from "@/components/containers/home/Contact";
import Blog from "@/components/containers/home/Blog";
import SubscribeArea from "@/components/containers/home/SubscribeArea";
import FooterTwo from "@/components/layout/footer/FooterTwo";
import InitAnimations from "@/components/layout/InitAnimations";
import CustomCursor from "@/components/layout/CustomCursor";
import ScrollProgressButton from "@/components/layout/ScrollProgressButton";
import { getSiteContent } from "@/lib/siteContent";
import { buildPageMetadata } from "@/lib/seo/metadata";

// Switch this to "standard" to restore the previous BannerTwo homepage hero.
const homeHeroVariant: "competition" | "standard" = "competition";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  const companyName = content.global.companyName;

  return buildPageMetadata({
    title: `${companyName} | Home`,
    description: `${companyName} provides gas, boiler, plumbing, drainage, building works and carpentry support across ${content.global.operatingLocations}.`,
    path: "/",
    keywords: [
      "Geo Gas Services",
      "Gas engineer London and Sussex",
      "Boiler repair London and Sussex",
      "Emergency call-out",
      "Building works",
      "Carpentry",
    ],
    siteUrl: content.global.siteUrl,
    siteName: companyName,
  });
}

const page = () => {
  return (
    <>
      <HeaderTwo />
      {homeHeroVariant === "competition" ? <CompetitionHomeHero /> : <BannerTwo />}
      <GeoChatbotSection />
      <Services />
      <ContractsOverview />
      <PricingListing compact={true} />
      <Solutions />
      <WorkProcess />
      <Faq />
      <Team />
      <Testimonial />
      <Contact />
      <Blog />
      <SubscribeArea />
      <ComicStripSection />
      <FooterTwo />
      <InitAnimations />
      <CustomCursor />
      <ScrollProgressButton />
    </>
  );
};

export default page;
