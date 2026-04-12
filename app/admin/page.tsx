"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { defaultSiteContent } from "@/data/siteContent";

type Primitive = string | number | boolean | null;
type PathSegment = string | number;
type LeafFieldType = "string" | "number" | "boolean" | "null";

type LeafField = {
  path: PathSegment[];
  value: Primitive;
  type: LeafFieldType;
};

type BlogVideoPost = {
  title: string;
  summary: string;
  file: string;
  poster?: string;
};

const prettyDefault = JSON.stringify(defaultSiteContent, null, 2);

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

const pathToLabel = (path: PathSegment[]): string => {
  return path.reduce<string>((acc, segment) => {
    if (typeof segment === "number") {
      return `${acc}[${segment}]`;
    }
    return acc ? `${acc}.${segment}` : String(segment);
  }, "");
};

const collectLeafFields = (
  value: unknown,
  path: PathSegment[] = [],
  out: LeafField[] = []
): LeafField[] => {
  if (value === null) {
    out.push({ path, value: null, type: "null" });
    return out;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      collectLeafFields(item, [...path, index], out);
    });
    return out;
  }

  if (typeof value === "object") {
    Object.entries(value).forEach(([key, item]) => {
      collectLeafFields(item, [...path, key], out);
    });
    return out;
  }

  if (typeof value === "string") {
    out.push({ path, value, type: "string" });
    return out;
  }

  if (typeof value === "number") {
    out.push({ path, value, type: "number" });
    return out;
  }

  if (typeof value === "boolean") {
    out.push({ path, value, type: "boolean" });
  }

  return out;
};

const setValueAtPath = (
  value: unknown,
  path: PathSegment[],
  nextValue: unknown
): unknown => {
  if (path.length === 0) return nextValue;

  const [head, ...rest] = path;

  if (Array.isArray(value)) {
    const index = Number(head);
    const nextArray = [...value];
    const current = nextArray[index];
    nextArray[index] =
      rest.length === 0 ? nextValue : setValueAtPath(current, rest, nextValue);
    return nextArray;
  }

  if (value && typeof value === "object") {
    const key = String(head);
    const nextRecord = { ...(value as Record<string, unknown>) };
    const current = nextRecord[key];
    nextRecord[key] =
      rest.length === 0 ? nextValue : setValueAtPath(current, rest, nextValue);
    return nextRecord;
  }

  return value;
};

const getBlogVideos = (value: unknown): BlogVideoPost[] => {
  if (!isRecord(value)) return [];
  const home = value.home;
  if (!isRecord(home)) return [];
  const blog = home.blog;
  if (!isRecord(blog)) return [];
  const videos = blog.videos;
  if (!Array.isArray(videos)) return [];

  return videos.filter((item): item is BlogVideoPost => {
    return (
      isRecord(item) &&
      typeof item.title === "string" &&
      typeof item.summary === "string" &&
      typeof item.file === "string" &&
      (typeof item.poster === "string" || typeof item.poster === "undefined")
    );
  });
};

const AdminPage = () => {
  const [adminKey, setAdminKey] = useState("");
  const [editorMode, setEditorMode] = useState<"visual" | "raw">("visual");
  const [fieldFilter, setFieldFilter] = useState("");
  const [editorValue, setEditorValue] = useState(prettyDefault);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadInputKey, setUploadInputKey] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [newVideoPost, setNewVideoPost] = useState<BlogVideoPost>({
    title: "",
    summary: "",
    file: "",
    poster: "",
  });

  const parsedJson = useMemo(() => {
    try {
      return JSON.parse(editorValue) as unknown;
    } catch {
      return null;
    }
  }, [editorValue]);

  const parsedPreview = parsedJson === null ? "invalid" : "valid";
  const blogVideos = useMemo(() => getBlogVideos(parsedJson), [parsedJson]);

  const leafFields = useMemo(() => {
    if (!parsedJson) return [] as LeafField[];
    return collectLeafFields(parsedJson);
  }, [parsedJson]);

  const filteredLeafFields = useMemo(() => {
    const term = fieldFilter.trim().toLowerCase();
    if (!term) return leafFields;

    return leafFields.filter((field) => {
      const pathLabel = pathToLabel(field.path).toLowerCase();
      const valueText = String(field.value ?? "").toLowerCase();
      return pathLabel.includes(term) || valueText.includes(term);
    });
  }, [fieldFilter, leafFields]);

  const loadContent = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/content", { cache: "no-store" });
      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(payload?.error ?? "Could not load editable content.");
      }

      const payload = (await response.json()) as { content?: unknown };
      const nextValue = JSON.stringify(
        payload.content ?? defaultSiteContent,
        null,
        2
      );
      setEditorValue(nextValue);
    } catch (loadError) {
      const message =
        loadError instanceof Error
          ? loadError.message
          : "Could not load editable content.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadUploads = useCallback(async () => {
    setUploadError(null);

    try {
      const keyValue = adminKey.trim();
      const response = await fetch("/api/admin/upload", {
        cache: "no-store",
        headers: {
          ...(keyValue ? { "x-admin-key": keyValue } : {}),
        },
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(payload?.error ?? "Could not load uploads.");
      }

      const payload = (await response.json()) as { files?: string[] };
      setUploadedFiles(payload.files ?? []);
    } catch (uploadLoadError) {
      const message =
        uploadLoadError instanceof Error
          ? uploadLoadError.message
          : "Could not load uploads.";
      setUploadError(message);
    }
  }, [adminKey]);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  useEffect(() => {
    loadUploads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLeafValue = (path: PathSegment[], nextValue: Primitive) => {
    if (!parsedJson) return;

    const nextJson = setValueAtPath(parsedJson, path, nextValue);
    setEditorValue(JSON.stringify(nextJson, null, 2));
  };

  const copyText = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setStatus(`Copied: ${value}`);
      setError(null);
    } catch {
      setError("Clipboard copy failed in this browser.");
    }
  };

  const isVideoPath = (value: string) => {
    return /\.(mp4|webm|mov|m4v)$/i.test(value);
  };

  const isImagePath = (value: string) => {
    return /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(value);
  };

  const handleFormat = () => {
    if (!parsedJson) {
      setError("Cannot format invalid JSON.");
      return;
    }

    setEditorValue(JSON.stringify(parsedJson, null, 2));
    setStatus("JSON formatted.");
    setError(null);
  };

  const handleReset = () => {
    setEditorValue(prettyDefault);
    setStatus("Editor reset to default content values.");
    setError(null);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setStatus(null);
    setError(null);

    try {
      const parsed = JSON.parse(editorValue);
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(adminKey ? { "x-admin-key": adminKey } : {}),
        },
        body: JSON.stringify({ content: parsed }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(payload?.error ?? "Save failed.");
      }

      const payload = (await response.json()) as { content?: unknown };
      setEditorValue(JSON.stringify(payload.content ?? parsed, null, 2));
      setStatus("Content saved and published.");
      window.dispatchEvent(new Event("site-content-updated"));
    } catch (saveError) {
      const message =
        saveError instanceof Error ? saveError.message : "Save failed.";
      setError(message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownload = () => {
    if (!parsedJson) {
      setError("Cannot download invalid JSON.");
      return;
    }

    const blob = new Blob([JSON.stringify(parsedJson, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "site-content.json";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const setVideoPosts = (nextPosts: BlogVideoPost[]) => {
    if (!parsedJson) {
      setError("JSON is invalid. Fix JSON before editing video posts.");
      return;
    }

    const nextJson = setValueAtPath(parsedJson, ["home", "blog", "videos"], nextPosts);
    setEditorValue(JSON.stringify(nextJson, null, 2));
  };

  const updateVideoPostField = (
    index: number,
    field: keyof BlogVideoPost,
    value: string
  ) => {
    const nextPosts = blogVideos.map((post, postIndex) =>
      postIndex === index ? { ...post, [field]: value } : post
    );
    setVideoPosts(nextPosts);
  };

  const removeVideoPost = (index: number) => {
    const nextPosts = blogVideos.filter((_, postIndex) => postIndex !== index);
    setVideoPosts(nextPosts);
    setStatus("Video post removed. Save content to publish.");
    setError(null);
  };

  const addVideoPost = () => {
    if (!newVideoPost.title.trim() || !newVideoPost.file.trim()) {
      setError("New video post needs at least a title and video file path.");
      return;
    }

    const nextPost: BlogVideoPost = {
      title: newVideoPost.title.trim(),
      summary: newVideoPost.summary.trim(),
      file: newVideoPost.file.trim(),
      ...(newVideoPost.poster?.trim()
        ? { poster: newVideoPost.poster.trim() }
        : {}),
    };

    setVideoPosts([...blogVideos, nextPost]);
    setNewVideoPost({ title: "", summary: "", file: "", poster: "" });
    setStatus("Video post added. Save content to publish.");
    setError(null);
  };

  const handleUpload = async () => {
    if (!uploadFile) {
      setUploadError("Choose a file first.");
      return;
    }

    setIsUploading(true);
    setUploadStatus(null);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("file", uploadFile);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        headers: {
          ...(adminKey ? { "x-admin-key": adminKey } : {}),
        },
        body: formData,
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(payload?.error ?? "Upload failed.");
      }

      const payload = (await response.json()) as {
        path?: string;
        files?: string[];
      };

      setUploadStatus(
        payload.path ? `Upload complete: ${payload.path}` : "Upload complete."
      );
      setUploadedFiles(payload.files ?? []);
      setUploadFile(null);
      setUploadInputKey((prev) => prev + 1);
    } catch (uploadRequestError) {
      const message =
        uploadRequestError instanceof Error
          ? uploadRequestError.message
          : "Upload failed.";
      setUploadError(message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="section-padding">
      <div className="container">
        <div className="row mb-30">
          <div className="col-xl-12">
            <h1>Admin Content Editor</h1>
            <p>
              Edit text and media paths for the website. Use <code>/admin</code>{" "}
              for visual field editing and raw JSON editing.
            </p>
          </div>
        </div>

        <div className="row mb-20">
          <div className="col-xl-6 col-lg-8">
            <label htmlFor="admin-key">Admin key (if enabled)</label>
            <input
              id="admin-key"
              type="password"
              value={adminKey}
              onChange={(event) => setAdminKey(event.target.value)}
              placeholder="Optional admin key"
            />
          </div>
        </div>

        <div className="row mb-20">
          <div className="col-xl-12">
            <div className="d-flex flex-wrap gap-2">
              <button
                className="button-1"
                type="button"
                onClick={handleSave}
                disabled={isSaving || isLoading}
              >
                {isSaving ? "Saving..." : "Save Content"}
              </button>
              <button
                className="button-2"
                type="button"
                onClick={handleFormat}
                disabled={isSaving || isLoading}
              >
                Format JSON
              </button>
              <button
                className="button-2"
                type="button"
                onClick={handleReset}
                disabled={isSaving || isLoading}
              >
                Reset To Defaults
              </button>
              <button
                className="button-2"
                type="button"
                onClick={loadContent}
                disabled={isSaving || isLoading}
              >
                Reload Content
              </button>
              <button
                className="button-2"
                type="button"
                onClick={handleDownload}
                disabled={isSaving || isLoading}
              >
                Download JSON
              </button>
              <button
                className="button-2"
                type="button"
                onClick={loadUploads}
                disabled={isUploading}
              >
                Reload Uploads
              </button>
              <button
                className={editorMode === "visual" ? "button-1" : "button-2"}
                type="button"
                onClick={() => setEditorMode("visual")}
              >
                Visual Editor
              </button>
              <button
                className={editorMode === "raw" ? "button-1" : "button-2"}
                type="button"
                onClick={() => setEditorMode("raw")}
              >
                Raw JSON
              </button>
            </div>
          </div>
        </div>

        <div className="row mb-20">
          <div className="col-xl-12">
            {isLoading ? <p>Loading content...</p> : null}
            {status ? <p>{status}</p> : null}
            {error ? <p>{error}</p> : null}
            <p>JSON status: {parsedPreview}</p>
          </div>
        </div>

        <div className="row mb-30">
          <div className="col-xl-12">
            <h4>Media Uploads</h4>
            <p>
              Upload images/videos/PDFs and copy the returned public path into
              fields (for example <code>/uploads/your-file.jpg</code>).
            </p>
            <div className="d-flex flex-wrap gap-2 ai-center">
              <input
                key={uploadInputKey}
                type="file"
                onChange={(event) =>
                  setUploadFile(event.target.files?.[0] ?? null)
                }
              />
              <button
                className="button-2"
                type="button"
                onClick={handleUpload}
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Upload"}
              </button>
            </div>
            {uploadStatus ? <p>{uploadStatus}</p> : null}
            {uploadError ? <p>{uploadError}</p> : null}
            {uploadedFiles.length > 0 ? (
              <div style={{ maxHeight: 220, overflow: "auto", marginTop: 10 }}>
                {uploadedFiles.slice(0, 40).map((filePath) => (
                  <div
                    key={filePath}
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "center",
                      marginBottom: 6,
                      flexWrap: "wrap",
                    }}
                  >
                    <code>{filePath}</code>
                    <button
                      className="button-2"
                      type="button"
                      onClick={() => copyText(filePath)}
                    >
                      Copy
                    </button>
                    {isVideoPath(filePath) ? (
                      <button
                        className="button-2"
                        type="button"
                        onClick={() =>
                          setNewVideoPost((current) => ({
                            ...current,
                            file: filePath,
                          }))
                        }
                      >
                        Use As Video
                      </button>
                    ) : null}
                    {isImagePath(filePath) ? (
                      <button
                        className="button-2"
                        type="button"
                        onClick={() =>
                          setNewVideoPost((current) => ({
                            ...current,
                            poster: filePath,
                          }))
                        }
                      >
                        Use As Poster
                      </button>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="row mb-30">
          <div className="col-xl-12">
            <h4>Video Posts</h4>
            <p>
              Manage homepage video cards here. Upload a file above, then set the
              video path and optional poster path. Click Save Content to publish.
            </p>

            {blogVideos.map((post, index) => (
              <div
                key={`${post.file}-${index}`}
                style={{
                  border: "1px solid rgba(0,0,0,0.12)",
                  padding: 12,
                  marginBottom: 12,
                }}
              >
                <p>
                  <strong>Video {index + 1}</strong>
                </p>
                <label>Title</label>
                <input
                  type="text"
                  value={post.title}
                  onChange={(event) =>
                    updateVideoPostField(index, "title", event.target.value)
                  }
                />
                <label>Summary</label>
                <textarea
                  rows={2}
                  value={post.summary}
                  onChange={(event) =>
                    updateVideoPostField(index, "summary", event.target.value)
                  }
                  style={{ width: "100%" }}
                />
                <label>Video Path</label>
                <input
                  type="text"
                  value={post.file}
                  onChange={(event) =>
                    updateVideoPostField(index, "file", event.target.value)
                  }
                />
                <label>Poster Path (optional)</label>
                <input
                  type="text"
                  value={post.poster || ""}
                  onChange={(event) =>
                    updateVideoPostField(index, "poster", event.target.value)
                  }
                />
                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                  <button
                    className="button-2"
                    type="button"
                    onClick={() => copyText(post.file)}
                  >
                    Copy Video Path
                  </button>
                  <button
                    className="button-2"
                    type="button"
                    onClick={() => removeVideoPost(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div
              style={{
                border: "1px solid rgba(0,0,0,0.2)",
                padding: 12,
              }}
            >
              <p>
                <strong>Add New Video Post</strong>
              </p>
              <label>Title</label>
              <input
                type="text"
                value={newVideoPost.title}
                onChange={(event) =>
                  setNewVideoPost((current) => ({
                    ...current,
                    title: event.target.value,
                  }))
                }
                placeholder="Video title"
              />
              <label>Summary</label>
              <textarea
                rows={2}
                value={newVideoPost.summary}
                onChange={(event) =>
                  setNewVideoPost((current) => ({
                    ...current,
                    summary: event.target.value,
                  }))
                }
                placeholder="Video summary"
                style={{ width: "100%" }}
              />
              <label>Video Path</label>
              <input
                type="text"
                value={newVideoPost.file}
                onChange={(event) =>
                  setNewVideoPost((current) => ({
                    ...current,
                    file: event.target.value,
                  }))
                }
                placeholder="/uploads/your-video.mp4"
              />
              <label>Poster Path (optional)</label>
              <input
                type="text"
                value={newVideoPost.poster || ""}
                onChange={(event) =>
                  setNewVideoPost((current) => ({
                    ...current,
                    poster: event.target.value,
                  }))
                }
                placeholder="/uploads/your-poster.jpg"
              />
              <div style={{ marginTop: 10 }}>
                <button className="button-1" type="button" onClick={addVideoPost}>
                  Add Video Post
                </button>
              </div>
            </div>
          </div>
        </div>

        {editorMode === "visual" ? (
          <div className="row">
            <div className="col-xl-12">
              <h4>Visual Field Editor</h4>
              <p>
                Edit existing values quickly. Use Raw JSON mode if you need to
                add/remove entire objects or array items.
              </p>
              <input
                type="text"
                value={fieldFilter}
                onChange={(event) => setFieldFilter(event.target.value)}
                placeholder="Filter fields by path or value"
              />
              <p style={{ marginTop: 10 }}>
                Showing {filteredLeafFields.length} of {leafFields.length} fields
              </p>
              {parsedJson === null ? (
                <p>JSON is invalid. Switch to Raw JSON mode and fix it first.</p>
              ) : (
                <div style={{ maxHeight: 620, overflow: "auto", paddingRight: 8 }}>
                  {filteredLeafFields.map((field) => {
                    const label = pathToLabel(field.path);
                    const isLongString =
                      field.type === "string" &&
                      (String(field.value).length > 110 ||
                        String(field.value).includes("\n"));

                    return (
                      <div key={label} style={{ marginBottom: 14 }}>
                        <label style={{ display: "block", marginBottom: 4 }}>
                          <code>{label}</code>
                        </label>
                        {field.type === "string" && isLongString ? (
                          <textarea
                            value={String(field.value)}
                            rows={3}
                            onChange={(event) =>
                              setLeafValue(field.path, event.target.value)
                            }
                            style={{ width: "100%" }}
                          />
                        ) : null}
                        {field.type === "string" && !isLongString ? (
                          <input
                            type="text"
                            value={String(field.value)}
                            onChange={(event) =>
                              setLeafValue(field.path, event.target.value)
                            }
                          />
                        ) : null}
                        {field.type === "number" ? (
                          <input
                            type="number"
                            value={Number(field.value)}
                            onChange={(event) =>
                              setLeafValue(
                                field.path,
                                Number(event.target.value || "0")
                              )
                            }
                          />
                        ) : null}
                        {field.type === "boolean" ? (
                          <label style={{ display: "flex", gap: 8 }}>
                            <input
                              type="checkbox"
                              checked={Boolean(field.value)}
                              onChange={(event) =>
                                setLeafValue(field.path, event.target.checked)
                              }
                            />
                            <span>{Boolean(field.value) ? "true" : "false"}</span>
                          </label>
                        ) : null}
                        {field.type === "null" ? (
                          <p>
                            <code>null</code> value. Edit in Raw JSON mode if
                            needed.
                          </p>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-xl-12">
              <h4>Raw JSON Editor</h4>
              <textarea
                value={editorValue}
                onChange={(event) => setEditorValue(event.target.value)}
                rows={34}
                style={{ width: "100%", fontFamily: "monospace", fontSize: 13 }}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminPage;
