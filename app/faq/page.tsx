import type { Metadata } from "next";
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
import { getSiteContent } from "@/lib/siteContent";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  const pageContent = content.pages.faq;

  return buildPageMetadata({
    title: pageContent.metaTitle,
    description: pageContent.metaDescription,
    path: "/faq",
    siteUrl: content.global.siteUrl,
    siteName: content.global.companyName,
  });
}

const page = async () => {
  const content = await getSiteContent();
  const pageContent = content.pages.faq;
  const heroSpot = pageContent.heroSpot;

  return (
    <>
      <HeaderTwo />
      <BreadCrumb title={pageContent.breadcrumbTitle} />
      <InnerPageEngineerSpot
        eyebrow={heroSpot.eyebrow}
        name={heroSpot.name}
        role={heroSpot.role}
        imageSrc={heroSpot.imageSrc}
        imageAlt={heroSpot.imageAlt}
        heading={heroSpot.heading}
        description={heroSpot.description}
        ctaHref={heroSpot.ctaHref}
        ctaLabel={heroSpot.ctaLabel}
        secondaryCtaHref={heroSpot.secondaryCtaHref}
        secondaryCtaLabel={heroSpot.secondaryCtaLabel}
        accent={heroSpot.accent}
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
