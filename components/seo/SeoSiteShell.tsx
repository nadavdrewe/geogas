import { ReactNode } from "react";
import HeaderTwo from "@/components/layout/header/HeaderTwo";
import FooterTwo from "@/components/layout/footer/FooterTwo";
import InitAnimations from "@/components/layout/InitAnimations";
import CustomCursor from "@/components/layout/CustomCursor";
import ScrollProgressButton from "@/components/layout/ScrollProgressButton";

type SeoSiteShellProps = {
  children: ReactNode;
};

const SeoSiteShell = ({ children }: SeoSiteShellProps) => {
  return (
    <>
      <HeaderTwo />
      {children}
      <FooterTwo />
      <InitAnimations />
      <CustomCursor />
      <ScrollProgressButton />
    </>
  );
};

export default SeoSiteShell;

