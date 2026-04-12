import HeaderTwo from "@/components/layout/header/HeaderTwo";
import BreadCrumb from "@/components/layout/banner/BreadCrumb";
import Faq from "@/components/containers/home/Faq";
import InnerPageEngineerSpot from "@/components/containers/InnerPageEngineerSpot";
import Contact from "@/components/containers/home/Contact";
import SubscribeArea from "@/components/containers/home/SubscribeArea";
import FooterTwo from "@/components/layout/footer/FooterTwo";
import InitAnimations from "@/components/layout/InitAnimations";
import CustomCursor from "@/components/layout/CustomCursor";
import ScrollProgressButton from "@/components/layout/ScrollProgressButton";

const page = () => {
  return (
    <>
      <HeaderTwo />
      <BreadCrumb title="FAQ" />
      <InnerPageEngineerSpot
        name="Matthew"
        imageSrc="/cartoons/matthew_hero.jpg"
        imageAlt="Superhero-style illustration of Matthew from GEO Gas"
        heading="Matthew Answers The Most Common Cover Questions"
        description="Browse FAQs for contract cover, service response and call-out details, then contact the team if you want a tailored recommendation."
        ctaHref="/contact"
        ctaLabel="Ask A Question"
        accent="green"
      />
      <Faq fullPage={true} />
      <Contact addClass={true} />
      <SubscribeArea />
      <FooterTwo />
      <InitAnimations />
      <CustomCursor />
      <ScrollProgressButton />
    </>
  );
};

export default page;
