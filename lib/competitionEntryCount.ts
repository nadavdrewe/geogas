import { mkdirSync } from "fs";
import path from "path";
import DatabaseConstructor from "better-sqlite3";
import type { Database } from "better-sqlite3";

const databasePath =
  process.env.CONTENT_DATABASE_PATH ??
  path.join(process.cwd(), "content", "geogas-content.sqlite");

const openDatabase = (): Database => {
  mkdirSync(path.dirname(databasePath), { recursive: true });
  const db = new DatabaseConstructor(databasePath, { timeout: 5000 });
  db.pragma("journal_mode = DELETE");
  return db;
};

export const getCompetitionEntryCount = (): number => {
  const db = openDatabase();

  try {
    db.exec(`
      CREATE TABLE IF NOT EXISTS competition_entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL COLLATE NOCASE UNIQUE,
        phone TEXT NOT NULL,
        source TEXT NOT NULL DEFAULT 'competition-modal',
        created_at TEXT NOT NULL
      );
    `);

    const row = db
      .prepare("SELECT COUNT(*) AS count FROM competition_entries;")
      .get() as { count?: unknown } | undefined;
    const count = typeof row?.count === "number" ? row.count : Number(row?.count);

    return Number.isFinite(count) ? count : 0;
  } finally {
    db.close();
  }
};
