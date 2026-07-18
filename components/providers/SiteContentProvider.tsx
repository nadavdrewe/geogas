"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { defaultSiteContent, SiteContent } from "@/data/siteContent";

type SiteContentContextValue = {
  content: SiteContent;
  isLoading: boolean;
  error: string | null;
  refreshContent: () => Promise<void>;
};

const SiteContentContext = createContext<SiteContentContextValue>({
  content: defaultSiteContent,
  isLoading: true,
  error: null,
  refreshContent: async () => {},
});

const fetchSiteContent = async (): Promise<SiteContent> => {
  const response = await fetch("/api/content/site", { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Unable to load editable site content.");
  }

  const data = (await response.json()) as { content?: SiteContent };
  return data.content ?? defaultSiteContent;
};

export const SiteContentProvider = ({
  children,
  initialContent = defaultSiteContent,
}: {
  children: React.ReactNode;
  initialContent?: SiteContent;
}) => {
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const refreshContent = useCallback(async () => {
    setIsLoading(true);
    try {
      const nextContent = await fetchSiteContent();
      setContent(nextContent);
      setError(null);
    } catch (fetchError) {
      const message =
        fetchError instanceof Error
          ? fetchError.message
          : "Unable to load editable site content.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const handleContentUpdate = () => {
      void refreshContent();
    };

    window.addEventListener("site-content-updated", handleContentUpdate);
    return () => {
      window.removeEventListener("site-content-updated", handleContentUpdate);
    };
  }, [refreshContent]);

  const contextValue = useMemo(
    () => ({
      content,
      isLoading,
      error,
      refreshContent,
    }),
    [content, error, isLoading, refreshContent]
  );

  return (
    <SiteContentContext.Provider value={contextValue}>
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = () => useContext(SiteContentContext);
