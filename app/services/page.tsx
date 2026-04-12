import HeaderTwo from "@/components/layout/header/HeaderTwo";
import BreadCrumb from "@/components/layout/banner/BreadCrumb";
import ServiceArea from "@/components/containers/service/ServiceArea";
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
      <BreadCrumb title="Our Services" />
      <InnerPageEngineerSpot
        name="James"
        imageSrc="/cartoons/james_hero.jpg"
        imageAlt="Superhero-style illustration of James from GEO Gas"
        heading="James Is On The Service Response Team"
        description="Gas, boiler, plumbing and drain call-outs are backed by experienced engineers and clear pricing. Check current service rates before you book."
        ctaHref="/pricing"
        ctaLabel="View Current Pricing"
        accent="teal"
      />
      <ServiceArea />
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
