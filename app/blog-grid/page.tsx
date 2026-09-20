import HeaderTwo from "@/components/layout/header/HeaderTwo";
import BreadCrumb from "@/components/layout/banner/BreadCrumb";
import BlogGrid from "@/components/containers/blog/BlogGrid";
import SubscribeArea from "@/components/containers/home/SubscribeArea";
import FooterTwo from "@/components/layout/footer/FooterTwo";
import InitAnimations from "@/components/layout/InitAnimations";
import CustomCursor from "@/components/layout/CustomCursor";
import ScrollProgressButton from "@/components/layout/ScrollProgressButton";
import { legacyPageMetadata } from "@/lib/seo/metadata";

export const metadata = legacyPageMetadata;

const page = () => {
  return (
    <>
      <HeaderTwo />
      <BreadCrumb title="Blog Grid" />
      <BlogGrid />
      <SubscribeArea />
      <FooterTwo />
      <InitAnimations />
      <CustomCursor />
      <ScrollProgressButton />
    </>
  );
};

export default page;
