import { mkdirSync } from "fs";
import path from "path";
import DatabaseConstructor from "better-sqlite3";
import type { Database } from "better-sqlite3";
import { competitionCampaigns, CompetitionPhase, isCompetitionPhase } from "@/components/competition/campaigns";

const databasePath = process.env.CONTENT_DATABASE_PATH ?? path.join(process.cwd(), "content", "geogas-content.sqlite");

const openDatabase = (): Database => {
  mkdirSync(path.dirname(databasePath), { recursive: true });
  const db = new DatabaseConstructor(databasePath, { timeout: 5000 });
  db.pragma("journal_mode = DELETE");
  return db;
};

export const getActiveCompetitionPhase = (): CompetitionPhase => {
  const db = openDatabase();
  try {
    db.exec("CREATE TABLE IF NOT EXISTS competition_settings (setting_key TEXT PRIMARY KEY, value TEXT NOT NULL, updated_at TEXT NOT NULL);");
    db.prepare("INSERT OR IGNORE INTO competition_settings (setting_key, value, updated_at) VALUES ('active_phase', 'phase-1', ?)").run(new Date().toISOString());
    const row = db.prepare("SELECT value FROM competition_settings WHERE setting_key = 'active_phase';").get() as { value?: unknown } | undefined;
    return isCompetitionPhase(row?.value) ? row.value : "phase-1";
  } finally {
    db.close();
  }
};

export const setActiveCompetitionPhase = (phase: CompetitionPhase) => {
  const db = openDatabase();
  try {
    db.exec("CREATE TABLE IF NOT EXISTS competition_settings (setting_key TEXT PRIMARY KEY, value TEXT NOT NULL, updated_at TEXT NOT NULL);");
    db.prepare("INSERT INTO competition_settings (setting_key, value, updated_at) VALUES ('active_phase', ?, ?) ON CONFLICT(setting_key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at;").run(phase, new Date().toISOString());
    return competitionCampaigns[phase];
  } finally {
    db.close();
  }
};
