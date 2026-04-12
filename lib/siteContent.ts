import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { defaultSiteContent, SiteContent } from "@/data/siteContent";

const CONTENT_FILE_PATH = path.join(process.cwd(), "content/site-content.json");

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
    const raw = await readFile(CONTENT_FILE_PATH, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    return mergeContent(fallback, parsed);
  } catch {
    return fallback;
  }
};

export const saveSiteContent = async (
  nextContent: unknown
): Promise<SiteContent> => {
  const merged = mergeContent(cloneDefaultContent(), nextContent);
  await mkdir(path.dirname(CONTENT_FILE_PATH), { recursive: true });
  await writeFile(CONTENT_FILE_PATH, JSON.stringify(merged, null, 2), "utf8");
  return merged;
};
