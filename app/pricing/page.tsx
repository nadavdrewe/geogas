import HeaderTwo from "@/components/layout/header/HeaderTwo";
import BreadCrumb from "@/components/layout/banner/BreadCrumb";
import PricingListing from "@/components/containers/pricing/PricingListing";
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
      <BreadCrumb title="Pricing" />
      <InnerPageEngineerSpot
        name="Mia"
        imageSrc="/cartoons/mia_hero.jpg"
        imageAlt="Superhero-style illustration of Mia from GEO Gas"
        heading="Mia Helps You Compare Rates And Cover"
        description="Use this page for live call-out and service pricing, then compare contract plans now starting from £19 per month in the brochure and contracts section."
        ctaHref="/contracts"
        ctaLabel="Compare £19 Plans"
        accent="green"
      />
      <PricingListing />
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
