import { existsSync, mkdirSync, readdirSync, readFileSync } from "fs";
import path from "path";
import DatabaseConstructor from "better-sqlite3";
import type { Database } from "better-sqlite3";
import { defaultSiteContent, SiteContent } from "@/data/siteContent";
import type { SeoPageType } from "@/lib/seo/types";

type PlainObject = Record<string, unknown>;
type ContentCollection = "site" | "seo_default" | "seo_page";

type ContentDocumentInput = {
  collection: ContentCollection;
  documentType: string | null;
  slug: string;
  title: string | null;
  sourcePath: string | null;
  content: unknown;
};

type DocumentRow = {
  id?: unknown;
  collection?: unknown;
  document_type?: unknown;
  slug?: unknown;
  title?: unknown;
  source_path?: unknown;
  content_json?: unknown;
  updated_at?: unknown;
};

type CompetitionEntryRow = {
  id?: unknown;
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  source?: unknown;
  created_at?: unknown;
};

export type SeoContentRecord = {
  slug: string;
  type: SeoPageType;
  content: unknown;
};

export type ContentDocumentSummary = {
  id: string;
  collection: ContentCollection;
  documentType: string | null;
  slug: string;
  title: string | null;
  sourcePath: string | null;
  updatedAt: string;
};

export type ContentDocument = ContentDocumentSummary & {
  content: unknown;
};

export type CompetitionEntryInput = {
  name: string;
  email: string;
  phone: string;
  source: string;
};

export type CompetitionEntry = CompetitionEntryInput & {
  id: number;
  createdAt: string;
};

export const SITE_DOCUMENT_ID = "site:published";

const DATABASE_PATH =
  process.env.CONTENT_DATABASE_PATH ??
  path.join(process.cwd(), "content", "geogas-content.sqlite");

const CONTENT_DIRECTORY = path.join(process.cwd(), "content");

const DIRECTORY_BY_TYPE: Record<SeoPageType, string> = {
  service: "services",
  location_service: "location-services",
  problem: "problems",
  part_guide: "parts",
  brand_service: "brands",
  guide: "guides",
};

const PAGE_TYPES = Object.keys(DIRECTORY_BY_TYPE) as SeoPageType[];

let ensurePromise: Promise<void> | null = null;
let writeQueue = Promise.resolve();

const isPlainObject = (value: unknown): value is PlainObject => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

const cloneDefaultContent = (): SiteContent => {
  return JSON.parse(JSON.stringify(defaultSiteContent)) as SiteContent;
};

const openDatabase = (): Database => {
  mkdirSync(path.dirname(DATABASE_PATH), { recursive: true });
  const db = new DatabaseConstructor(DATABASE_PATH, { timeout: 5000 });
  db.pragma("journal_mode = DELETE");
  return db;
};

const makeDocumentId = (
  collection: ContentCollection,
  documentType: string | null,
  slug: string
) => {
  if (collection === "site" && slug === "published" && documentType === null) {
    return SITE_DOCUMENT_ID;
  }

  return [collection, documentType, slug].filter(Boolean).join(":");
};

const deriveTitle = (
  collection: ContentCollection,
  documentType: string | null,
  slug: string,
  content: unknown
): string => {
  if (collection === "site") return "Published Site Content";
  if (collection === "seo_default") return `SEO Default: ${documentType ?? slug}`;

  if (isPlainObject(content)) {
    for (const key of ["h1", "title", "linkTitle", "metaTitle"]) {
      const value = content[key];
      if (typeof value === "string" && value.trim()) {
        return value.trim();
      }
    }
  }

  return slug;
};

const runSchema = (db: Database) => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS content_documents (
      id TEXT PRIMARY KEY,
      collection TEXT NOT NULL,
      document_type TEXT,
      slug TEXT NOT NULL,
      title TEXT,
      source_path TEXT,
      content_json TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      UNIQUE(collection, document_type, slug)
    );

    CREATE INDEX IF NOT EXISTS idx_content_documents_collection
      ON content_documents(collection);

    CREATE INDEX IF NOT EXISTS idx_content_documents_type_slug
      ON content_documents(document_type, slug);

    CREATE TABLE IF NOT EXISTS competition_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL COLLATE NOCASE UNIQUE,
      phone TEXT NOT NULL,
      source TEXT NOT NULL DEFAULT 'competition-modal',
      created_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_competition_entries_created_at
      ON competition_entries(created_at DESC);
  `);
};

const getSingleNumber = (db: Database, sql: string, ...params: unknown[]): number => {
  const row = db.prepare(sql).get(...params) as { value?: unknown } | undefined;
  const value = row?.value;
  return typeof value === "number" ? value : Number(value ?? 0);
};

const tableExists = (db: Database, tableName: string): boolean => {
  const row = db
    .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?;")
    .get(tableName) as { name?: unknown } | undefined;

  return row?.name === tableName;
};

const documentCount = (
  db: Database,
  collection: ContentCollection,
  documentType?: string
): number => {
  if (documentType) {
    return getSingleNumber(
      db,
      `SELECT COUNT(*) AS value
       FROM content_documents
       WHERE collection = ? AND document_type = ?;`,
      collection,
      documentType
    );
  }

  return getSingleNumber(
    db,
    "SELECT COUNT(*) AS value FROM content_documents WHERE collection = ?;",
    collection
  );
};

const parseJsonColumn = <T>(value: unknown, fallback: T): T => {
  if (typeof value !== "string") return fallback;

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

const upsertContentDocument = (db: Database, input: ContentDocumentInput) => {
  const id = makeDocumentId(input.collection, input.documentType, input.slug);
  const title =
    input.title ??
    deriveTitle(input.collection, input.documentType, input.slug, input.content);

  db.prepare(
    `INSERT INTO content_documents (
       id,
       collection,
       document_type,
       slug,
       title,
       source_path,
       content_json,
       created_at,
       updated_at
     )
     VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
     ON CONFLICT(id) DO UPDATE SET
       collection = excluded.collection,
       document_type = excluded.document_type,
       slug = excluded.slug,
       title = excluded.title,
       source_path = excluded.source_path,
       content_json = excluded.content_json,
       updated_at = excluded.updated_at;`
  ).run(
    id,
    input.collection,
    input.documentType,
    input.slug,
    title,
    input.sourcePath,
    JSON.stringify(input.content)
  );
};

const readVersionedJson = (sourcePath: string): unknown => {
  return JSON.parse(readFileSync(sourcePath, "utf8")) as unknown;
};

const seedVersionedSiteContent = (db: Database): void => {
  upsertContentDocument(db, {
    collection: "site",
    documentType: null,
    slug: "published",
    title: "Published Site Content",
    sourcePath: "data/siteContent.ts",
    content: cloneDefaultContent(),
  });
};

const seedVersionedSeoDefaults = (db: Database): number => {
  let seededCount = 0;

  for (const type of PAGE_TYPES) {
    const sourcePath = path.join(CONTENT_DIRECTORY, "defaults", `${type}.json`);
    if (!existsSync(sourcePath)) continue;

    upsertContentDocument(db, {
      collection: "seo_default",
      documentType: type,
      slug: type,
      title: `SEO Default: ${type}`,
      sourcePath: `content/defaults/${type}.json`,
      content: readVersionedJson(sourcePath),
    });
    seededCount += 1;
  }

  return seededCount;
};

const seedVersionedSeoPages = (db: Database): number => {
  let seededCount = 0;

  for (const type of PAGE_TYPES) {
    const directoryName = DIRECTORY_BY_TYPE[type];
    const directoryPath = path.join(CONTENT_DIRECTORY, directoryName);
    if (!existsSync(directoryPath)) continue;

    const files = readdirSync(directoryPath, { withFileTypes: true })
      .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
      .sort((left, right) => left.name.localeCompare(right.name));

    for (const file of files) {
      const sourcePath = path.join(directoryPath, file.name);
      const content = readVersionedJson(sourcePath);
      const fallbackSlug = file.name.replace(/\.json$/, "");
      const slug =
        isPlainObject(content) && typeof content.slug === "string" && content.slug.trim()
          ? content.slug.trim()
          : fallbackSlug;

      upsertContentDocument(db, {
        collection: "seo_page",
        documentType: type,
        slug,
        title: null,
        sourcePath: `content/${directoryName}/${file.name}`,
        content,
      });
      seededCount += 1;
    }
  }

  return seededCount;
};

const rowToSummary = (row: DocumentRow): ContentDocumentSummary | null => {
  if (
    typeof row.id !== "string" ||
    typeof row.collection !== "string" ||
    typeof row.slug !== "string" ||
    !["site", "seo_default", "seo_page"].includes(row.collection)
  ) {
    return null;
  }

  return {
    id: row.id,
    collection: row.collection as ContentCollection,
    documentType:
      typeof row.document_type === "string" ? row.document_type : null,
    slug: row.slug,
    title: typeof row.title === "string" ? row.title : null,
    sourcePath: typeof row.source_path === "string" ? row.source_path : null,
    updatedAt: typeof row.updated_at === "string" ? row.updated_at : "",
  };
};

const rowToCompetitionEntry = (
  row: CompetitionEntryRow
): CompetitionEntry | null => {
  if (
    typeof row.id !== "number" ||
    typeof row.name !== "string" ||
    typeof row.email !== "string" ||
    typeof row.phone !== "string" ||
    typeof row.source !== "string" ||
    typeof row.created_at !== "string"
  ) {
    return null;
  }

  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    source: row.source,
    createdAt: row.created_at,
  };
};

const enqueueWrite = <T>(operation: () => Promise<T>): Promise<T> => {
  const next = writeQueue.then(operation, operation);
  writeQueue = next.then(
    () => undefined,
    () => undefined
  );
  return next;
};

const migrateLegacySiteContent = (db: Database): boolean => {
  if (!tableExists(db, "site_content")) return false;

  const row = db
    .prepare("SELECT content_json FROM site_content WHERE id = 'published' LIMIT 1;")
    .get() as { content_json?: unknown } | undefined;
  const content = parseJsonColumn(row?.content_json, null);
  if (!content) return false;

  upsertContentDocument(db, {
    collection: "site",
    documentType: null,
    slug: "published",
    title: "Published Site Content",
    sourcePath: "content/site-content.json",
    content,
  });

  return true;
};

const migrateLegacySeoDefaults = (db: Database): boolean => {
  if (!tableExists(db, "seo_defaults")) return false;

  const rows = db
    .prepare("SELECT type, content_json FROM seo_defaults ORDER BY type ASC;")
    .all() as { type?: unknown; content_json?: unknown }[];

  for (const row of rows) {
    if (typeof row.type !== "string") continue;

    upsertContentDocument(db, {
      collection: "seo_default",
      documentType: row.type,
      slug: row.type,
      title: `SEO Default: ${row.type}`,
      sourcePath: `content/defaults/${row.type}.json`,
      content: parseJsonColumn(row.content_json, {}),
    });
  }

  return rows.length > 0;
};

const migrateLegacySeoPages = (db: Database): boolean => {
  if (!tableExists(db, "seo_pages")) return false;

  const rows = db
    .prepare("SELECT slug, type, content_json FROM seo_pages ORDER BY type ASC, slug ASC;")
    .all() as { slug?: unknown; type?: unknown; content_json?: unknown }[];

  for (const row of rows) {
    if (typeof row.slug !== "string" || typeof row.type !== "string") continue;

    upsertContentDocument(db, {
      collection: "seo_page",
      documentType: row.type,
      slug: row.slug,
      title: null,
      sourcePath: `content/${DIRECTORY_BY_TYPE[row.type as SeoPageType] ?? "seo"}/${
        row.slug
      }.json`,
      content: parseJsonColumn(row.content_json, {}),
    });
  }

  return rows.length > 0;
};

export const ensureContentDatabase = async (): Promise<void> => {
  ensurePromise ??= enqueueWrite(async () => {
    const db = openDatabase();

    try {
      runSchema(db);

      if (documentCount(db, "site") === 0) {
        if (!migrateLegacySiteContent(db)) {
          seedVersionedSiteContent(db);
        }
      }

      if (documentCount(db, "seo_default") === 0) {
        if (!migrateLegacySeoDefaults(db)) {
          seedVersionedSeoDefaults(db);
        }
      }

      if (documentCount(db, "seo_page") === 0) {
        if (!migrateLegacySeoPages(db)) {
          seedVersionedSeoPages(db);
        }
      }
    } finally {
      db.close();
    }
  });

  return ensurePromise;
};

export const getDatabaseSiteContent = async (): Promise<unknown> => {
  await ensureContentDatabase();
  const db = openDatabase();

  try {
    const row = db
      .prepare(
        `SELECT content_json
         FROM content_documents
         WHERE collection = 'site' AND slug = 'published'
         LIMIT 1;`
      )
      .get() as DocumentRow | undefined;

    return parseJsonColumn(row?.content_json, cloneDefaultContent());
  } finally {
    db.close();
  }
};

export const saveDatabaseSiteContent = async (
  content: SiteContent
): Promise<void> => {
  await ensureContentDatabase();

  await enqueueWrite(async () => {
    const db = openDatabase();

    try {
      runSchema(db);
      upsertContentDocument(db, {
        collection: "site",
        documentType: null,
        slug: "published",
        title: "Published Site Content",
        sourcePath: "admin",
        content,
      });
    } finally {
      db.close();
    }
  });
};

export const getContentDocumentSummaries = async (): Promise<
  ContentDocumentSummary[]
> => {
  await ensureContentDatabase();
  const db = openDatabase();

  try {
    const rows = db
      .prepare(
        `SELECT
           id,
           collection,
           document_type,
           slug,
           title,
           source_path,
           updated_at
         FROM content_documents
         ORDER BY
           CASE collection
             WHEN 'site' THEN 0
             WHEN 'seo_default' THEN 1
             ELSE 2
           END,
           document_type ASC,
           slug ASC;`
      )
      .all() as DocumentRow[];

    return rows
      .map(rowToSummary)
      .filter((summary): summary is ContentDocumentSummary => summary !== null);
  } finally {
    db.close();
  }
};

export const getContentDocumentById = async (
  id: string
): Promise<ContentDocument | null> => {
  await ensureContentDatabase();
  const db = openDatabase();

  try {
    const row = db
      .prepare(
        `SELECT
           id,
           collection,
           document_type,
           slug,
           title,
           source_path,
           content_json,
           updated_at
         FROM content_documents
         WHERE id = ?
         LIMIT 1;`
      )
      .get(id) as DocumentRow | undefined;
    if (!row) return null;

    const summary = rowToSummary(row);
    if (!summary) return null;

    return {
      ...summary,
      content: parseJsonColumn(row.content_json, {}),
    };
  } finally {
    db.close();
  }
};

export const saveContentDocumentContent = async (
  id: string,
  content: unknown
): Promise<ContentDocument | null> => {
  await ensureContentDatabase();

  return enqueueWrite(async () => {
    const existing = await getContentDocumentById(id);
    if (!existing) return null;

    const db = openDatabase();

    try {
      runSchema(db);
      upsertContentDocument(db, {
        collection: existing.collection,
        documentType: existing.documentType,
        slug: existing.slug,
        title: null,
        sourcePath: existing.sourcePath,
        content,
      });
    } finally {
      db.close();
    }

    return getContentDocumentById(id);
  });
};

export const createCompetitionEntry = async (
  input: CompetitionEntryInput
): Promise<{ entry: CompetitionEntry } | { duplicate: true }> => {
  await ensureContentDatabase();

  return enqueueWrite(async () => {
    const db = openDatabase();

    try {
      runSchema(db);
      const createdAt = new Date().toISOString();
      const result = db
        .prepare(
          `INSERT INTO competition_entries (
             name,
             email,
             phone,
             source,
             created_at
           )
           VALUES (?, ?, ?, ?, ?);`
        )
        .run(input.name, input.email, input.phone, input.source, createdAt);

      return {
        entry: {
          id: Number(result.lastInsertRowid),
          ...input,
          createdAt,
        },
      };
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes("competition_entries.email")
      ) {
        return { duplicate: true };
      }

      throw error;
    } finally {
      db.close();
    }
  });
};

export const getCompetitionEntries = async (
  limit = 100
): Promise<CompetitionEntry[]> => {
  await ensureContentDatabase();
  const safeLimit = Number.isFinite(limit)
    ? Math.min(Math.max(Math.floor(limit), 1), 500)
    : 100;
  const db = openDatabase();

  try {
    const rows = db
      .prepare(
        `SELECT id, name, email, phone, source, created_at
         FROM competition_entries
         ORDER BY created_at DESC, id DESC
         LIMIT ?;`
      )
      .all(safeLimit) as CompetitionEntryRow[];

    return rows
      .map(rowToCompetitionEntry)
      .filter((entry): entry is CompetitionEntry => entry !== null);
  } finally {
    db.close();
  }
};

export const getSeoDefaultsByType = async (): Promise<Map<SeoPageType, unknown>> => {
  await ensureContentDatabase();
  const db = openDatabase();

  try {
    const rows = db
      .prepare(
        `SELECT document_type, content_json
         FROM content_documents
         WHERE collection = 'seo_default'
         ORDER BY document_type ASC;`
      )
      .all() as DocumentRow[];
    const defaultsByType = new Map<SeoPageType, unknown>();

    for (const row of rows) {
      const type = row.document_type;
      if (typeof type !== "string" || !PAGE_TYPES.includes(type as SeoPageType)) {
        continue;
      }

      defaultsByType.set(type as SeoPageType, parseJsonColumn(row.content_json, {}));
    }

    return defaultsByType;
  } finally {
    db.close();
  }
};

export const getSeoContentRecords = async (): Promise<SeoContentRecord[]> => {
  await ensureContentDatabase();
  const db = openDatabase();

  try {
    const rows = db
      .prepare(
        `SELECT slug, document_type, content_json
         FROM content_documents
         WHERE collection = 'seo_page'
         ORDER BY document_type ASC, slug ASC;`
      )
      .all() as DocumentRow[];

    return rows
      .map((row): SeoContentRecord | null => {
        const slug = row.slug;
        const type = row.document_type;

        if (
          typeof slug !== "string" ||
          typeof type !== "string" ||
          !PAGE_TYPES.includes(type as SeoPageType)
        ) {
          return null;
        }

        return {
          slug,
          type: type as SeoPageType,
          content: parseJsonColumn(row.content_json, {}),
        };
      })
      .filter((record): record is SeoContentRecord => record !== null);
  } finally {
    db.close();
  }
};
