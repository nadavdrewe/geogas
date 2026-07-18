import { defaultSiteContent, SiteContent } from "@/data/siteContent";
import {
  getDatabaseSiteContent,
  saveDatabaseSiteContent,
} from "@/lib/contentDatabase";

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

const cloneDefaultContent = (): SiteContent => {
  return JSON.parse(JSON.stringify(defaultSiteContent)) as SiteContent;
};

const mergeContent = <T>(base: T, incoming: unknown): T => {
  if (Array.isArray(base)) {
    return (Array.isArray(incoming) ? incoming : base) as T;
  }

  if (!isRecord(base)) {
    if (typeof incoming === typeof base && incoming !== undefined) {
      return incoming as T;
    }
    return base;
  }

  const next = { ...base } as Record<string, unknown>;
  const incomingRecord = isRecord(incoming) ? incoming : {};

  for (const key of Object.keys(next)) {
    next[key] = mergeContent(next[key], incomingRecord[key]);
  }

  return next as T;
};

export const getSiteContent = async (): Promise<SiteContent> => {
  const fallback = cloneDefaultContent();

  try {
    const content = await getDatabaseSiteContent();
    return mergeContent(fallback, content);
  } catch {
    return fallback;
  }
};

export const saveSiteContent = async (
  nextContent: unknown
): Promise<SiteContent> => {
  const merged = mergeContent(cloneDefaultContent(), nextContent);
  await saveDatabaseSiteContent(merged);
  return merged;
};
