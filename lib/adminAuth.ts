import { timingSafeEqual } from "crypto";

const getAdminPanelKey = (): string => process.env.ADMIN_PANEL_KEY?.trim() ?? "";

export const isAdminPanelConfigured = (): boolean => Boolean(getAdminPanelKey());

export const isAdminPanelRequestAuthorized = (request: Request): boolean => {
  const expectedKey = getAdminPanelKey();
  const providedKey = request.headers.get("x-admin-key") ?? "";

  if (!expectedKey || !providedKey) {
    return false;
  }

  const expected = Buffer.from(expectedKey);
  const provided = Buffer.from(providedKey);

  return (
    expected.length === provided.length && timingSafeEqual(expected, provided)
  );
};
