import Header from "@/components/layout/header/Header";
import Banner from "@/components/layout/banner/Banner";
import About from "@/components/containers/home-two/About";
import CtaArea from "@/components/containers/home-two/CtaArea";
import WorkArea from "@/components/containers/home-two/WorkArea";
import Pricing from "@/components/containers/home-two/Pricing";
import Service from "@/components/containers/home-two/Services";
import Portfolio from "@/components/containers/home-two/Portfolio";
import Faq from "@/components/containers/home-two/Faq";
import TeamArea from "@/components/containers/home-two/Team";
import Testimonial from "@/components/containers/home-two/Testimonial";
import Blog from "@/components/containers/home-two/Blog";
import SubscribeArea from "@/components/containers/home-two/SubscribeArea";
import Footer from "@/components/layout/footer/Footer";
import InitAnimations from "@/components/layout/InitAnimations";
import CustomCursor from "@/components/layout/CustomCursor";
import ScrollProgressButton from "@/components/layout/ScrollProgressButton";

const page = () => {
  return (
    <>
      <Header />
      <Banner />
      <About />
      <CtaArea />
      <WorkArea />
      <Pricing />
      <Service />
      <Portfolio />
      <Faq />
      <TeamArea />
      <Testimonial />
      <Blog />
      <SubscribeArea />
      <Footer />
      <InitAnimations />
      <CustomCursor />
      <ScrollProgressButton />
    </>
  );
};

export default page;
