import HeaderTwo from "@/components/layout/header/HeaderTwo";
import BannerTwo from "@/components/layout/banner/BannerTwo";
import GeoChatbotSection from "@/components/chatbot/GeoChatbotSection";
import ComicStripSection from "@/components/containers/home/ComicStripSection";
import Services from "@/components/containers/home/Services";
import ContractsOverview from "@/components/containers/home/ContractsOverview";
import PricingListing from "@/components/containers/pricing/PricingListing";
import Solutions from "@/components/containers/home/Solutions";
import WorkProcess from "@/components/containers/home/WorkProcess";
import Faq from "@/components/containers/home/Faq";
import Team from "@/components/containers/home/Team";
// import Portfolio from "@/components/containers/home/Portfolio";
import Testimonial from "@/components/containers/home/Testimonial";
import Contact from "@/components/containers/home/Contact";
import Blog from "@/components/containers/home/Blog";
import SubscribeArea from "@/components/containers/home/SubscribeArea";
import FooterTwo from "@/components/layout/footer/FooterTwo";
import InitAnimations from "@/components/layout/InitAnimations";
import CustomCursor from "@/components/layout/CustomCursor";
import ScrollProgressButton from "@/components/layout/ScrollProgressButton";

const page = () => {
  return (
    <>
      <HeaderTwo />
      <BannerTwo />
      <ComicStripSection />
      <GeoChatbotSection />
      <Services />
      <ContractsOverview />
      <PricingListing compact={true} />
      <Solutions />
      <WorkProcess />
      <Faq />
      <Team />
      {/* <Portfolio /> */}
      <Testimonial />
      <Contact />
      <Blog />
      <SubscribeArea />
      <FooterTwo />
      <InitAnimations />
      <CustomCursor />
      <ScrollProgressButton />
    </>
  );
};

export default page;
