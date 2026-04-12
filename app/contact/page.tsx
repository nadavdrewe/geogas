import HeaderTwo from "@/components/layout/header/HeaderTwo";
import BreadCrumb from "@/components/layout/banner/BreadCrumb";
import ContactArea from "@/components/containers/ContactArea";
import InnerPageEngineerSpot from "@/components/containers/InnerPageEngineerSpot";
import SubscribeArea from "@/components/containers/home/SubscribeArea";
import FooterTwo from "@/components/layout/footer/FooterTwo";
import InitAnimations from "@/components/layout/InitAnimations";
import CustomCursor from "@/components/layout/CustomCursor";
import ScrollProgressButton from "@/components/layout/ScrollProgressButton";

const page = () => {
  return (
    <>
      <HeaderTwo />
      <BreadCrumb title="Contact Us" />
      <InnerPageEngineerSpot
        name="Sophia"
        imageSrc="/cartoons/sophia_hero.jpg"
        imageAlt="Superhero-style illustration of Sophia from GEO Gas"
        heading="Sophia Can Help You Book The Right Engineer"
        description="Tell us what you need and we will route your enquiry to the right engineer for contracts, servicing, landlord checks, installations or emergency support."
        ctaHref="/pricing"
        ctaLabel="Check Prices First"
        accent="teal"
      />
      <ContactArea />
      <SubscribeArea />
      <FooterTwo />
      <InitAnimations />
      <CustomCursor />
      <ScrollProgressButton />
    </>
  );
};

export default page;
