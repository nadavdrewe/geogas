import type { SiteContent } from "@/data/siteContent";
import { defaultSiteContent } from "@/data/siteContent";

const defaultContactItems = defaultSiteContent.header.contactItems;

const getOfficePhone = (items: SiteContent["header"]["contactItems"], pattern: RegExp) =>
  items.find((item) => pattern.test(item.label));

export type SeoCompanyInfo = {
  name: string;
  siteUrl: string;
  primaryPhoneDisplay: string;
  primaryPhoneHref: string;
  emergencyPhoneDisplay: string;
  emergencyPhoneHref: string;
  londonOfficePhoneDisplay: string;
  londonOfficePhoneHref: string;
  sussexOfficePhoneDisplay: string;
  sussexOfficePhoneHref: string;
  whatsappHref: string;
  email: string;
  serviceAreas: string[];
};

export const buildSeoCompanyInfo = (
  content: SiteContent = defaultSiteContent
): SeoCompanyInfo => ({
  name: content.global.companyName,
  siteUrl: content.global.siteUrl,
  primaryPhoneDisplay:
    getOfficePhone(content.header.contactItems, /london/i)?.value ??
    content.global.primaryPhoneDisplay,
  primaryPhoneHref:
    getOfficePhone(content.header.contactItems, /london/i)?.href ??
    content.global.primaryPhoneHref,
  emergencyPhoneDisplay: content.global.emergencyPhoneDisplay,
  emergencyPhoneHref: content.global.emergencyPhoneHref,
  londonOfficePhoneDisplay:
    getOfficePhone(content.header.contactItems, /london/i)?.value ??
    getOfficePhone(defaultContactItems, /london/i)?.value ??
    content.global.primaryPhoneDisplay,
  londonOfficePhoneHref:
    getOfficePhone(content.header.contactItems, /london/i)?.href ??
    getOfficePhone(defaultContactItems, /london/i)?.href ??
    content.global.primaryPhoneHref,
  sussexOfficePhoneDisplay:
    getOfficePhone(content.header.contactItems, /sussex/i)?.value ??
    getOfficePhone(defaultContactItems, /sussex/i)?.value ??
    content.global.primaryPhoneDisplay,
  sussexOfficePhoneHref:
    getOfficePhone(content.header.contactItems, /sussex/i)?.href ??
    getOfficePhone(defaultContactItems, /sussex/i)?.href ??
    content.global.primaryPhoneHref,
  whatsappHref: `https://wa.me/${content.global.whatsappPhone}?text=${encodeURIComponent(
    content.global.whatsappMessage
  )}`,
  email: content.global.email,
  serviceAreas: content.global.serviceAreas,
});

export const SEO_COMPANY = buildSeoCompanyInfo();

