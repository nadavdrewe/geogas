import HeaderTwo from "@/components/layout/header/HeaderTwo";
import BreadCrumb from "@/components/layout/banner/BreadCrumb";
import About from "@/components/containers/home-two/About";
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
      <BreadCrumb title="About Us" />
      <InnerPageEngineerSpot
        name="Aaron"
        role="Founder & GEO Gas Hero"
        imageSrc="/cartoons/aaron_hero.jpg"
        imageAlt="Superhero-style illustration of Aaron from GEO Gas"
        heading="Meet The Engineers Behind GEO Gas Service Cover"
        description="Our engineer team shows up fast, works safely and keeps contract support practical. Explore the cover options and pricing now starting from £19 per month."
        ctaHref="/contracts"
        ctaLabel="View Contract Cover"
        accent="red"
      />
      <About />
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
