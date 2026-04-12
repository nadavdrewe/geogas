import HeaderTwo from "@/components/layout/header/HeaderTwo";
import BreadCrumb from "@/components/layout/banner/BreadCrumb";
import ContractsContent from "@/components/containers/contracts/ContractsContent";
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
      <BreadCrumb title="Home Service Contracts" />
      <InnerPageEngineerSpot
        name="Matt"
        imageSrc="/cartoons/matt_hero.jpg"
        imageAlt="Superhero-style illustration of Matt from GEO Gas"
        heading="Matt Covers Home Service Contract Support"
        description="Review GEO Starter and GEO Complete cover details, exclusions and brochure terms. Contract plans now start from £19 per month."
        ctaHref="/contact"
        ctaLabel="Ask About Cover"
        accent="red"
      />
      <ContractsContent />
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
