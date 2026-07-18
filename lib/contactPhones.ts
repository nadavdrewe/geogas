export type ContactPhoneItem = {
  label?: string;
  value?: string;
  href?: string;
};

const EMERGENCY_PATTERN = /emergency|24\/?7|24hr|call[- ]?out|helpline/i;

const looksLikePhoneValue = (value?: string): boolean =>
  Boolean(value && /[\d+]/.test(value));

const isPhoneItem = (item: ContactPhoneItem): boolean =>
  Boolean(item.href?.startsWith("tel:")) || looksLikePhoneValue(item.value);

export const getPhoneItems = (contactItems: ContactPhoneItem[]): ContactPhoneItem[] =>
  contactItems.filter(isPhoneItem);

export const toTelHref = (item?: ContactPhoneItem, fallback = "+442077232221"): string => {
  if (item?.href?.startsWith("tel:")) return item.href;
  const source = item?.value ?? fallback;
  const normalized = source.replace(/[^\d+]/g, "");
  return `tel:${normalized || fallback}`;
};

export const isEmergencyPhoneItem = (item: ContactPhoneItem): boolean =>
  EMERGENCY_PATTERN.test(`${item.label ?? ""} ${item.value ?? ""}`);

export const resolvePrimaryAndEmergencyPhones = (contactItems: ContactPhoneItem[]) => {
  const phoneItems = getPhoneItems(contactItems);
  const emergencyPhone = phoneItems.find(isEmergencyPhoneItem);
  const primaryPhone =
    phoneItems.find((item) => !isEmergencyPhoneItem(item)) ??
    phoneItems[0] ??
    emergencyPhone;

  return { primaryPhone, emergencyPhone };
};
