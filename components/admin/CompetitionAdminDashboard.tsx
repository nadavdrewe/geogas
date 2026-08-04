"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./CompetitionAdminDashboard.module.scss";

type CompetitionEntry = {
  id: number;
  name: string;
  email: string;
  phone: string;
  source: string;
  createdAt: string;
};

type CompetitionAdminDashboardProps = {
  adminKey: string;
};

type CompetitionEntrySummary = {
  total: number;
  last24Hours: number;
  competitionPage: number;
  competitionModal: number;
};

const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown";

  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

const sourceLabel = (source: string) =>
  source === "competition-page" ? "Competition page" : "Pop-up entry";

const escapeCsv = (value: string | number) => {
  const raw = String(value);
  const text = /^\s*[=+\-@]/.test(raw) ? `'${raw}` : raw;
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
};

const CompetitionAdminDashboard = ({
  adminKey,
}: CompetitionAdminDashboardProps) => {
  const [entries, setEntries] = useState<CompetitionEntry[]>([]);
  const [summary, setSummary] = useState<CompetitionEntrySummary | null>(null);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const requestIdRef = useRef(0);

  const loadEntries = useCallback(async () => {
    const requestId = ++requestIdRef.current;
    const key = adminKey.trim();
    if (!key) {
      setEntries([]);
      setSummary(null);
      setLastUpdated(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    setEntries([]);
    setSummary(null);
    setLastUpdated(null);
    setIsLoading(true);
    setError(null);

    try {
      const entriesResponse = await fetch("/api/competition/entries?limit=500", {
        cache: "no-store",
        headers: { "x-admin-key": key },
      });

      const entriesPayload = (await entriesResponse.json().catch(() => null)) as
        | {
            entries?: CompetitionEntry[];
            summary?: CompetitionEntrySummary;
            error?: string;
          }
        | null;

      if (requestId !== requestIdRef.current) return;

      if (!entriesResponse.ok) {
        throw new Error(entriesPayload?.error ?? "Could not load competition entries.");
      }

      const nextEntries = Array.isArray(entriesPayload?.entries)
        ? entriesPayload.entries
        : [];
      setEntries(nextEntries);
      setSummary(entriesPayload?.summary ?? null);
      setLastUpdated(new Date());
    } catch (loadError) {
      if (requestId !== requestIdRef.current) return;
      setEntries([]);
      setSummary(null);
      setLastUpdated(null);
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Could not load competition entries."
      );
    } finally {
      if (requestId === requestIdRef.current) setIsLoading(false);
    }
  }, [adminKey]);

  useEffect(() => {
    void loadEntries();
  }, [loadEntries]);

  const filteredEntries = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return entries;

    return entries.filter((entry) =>
      [entry.name, entry.email, entry.phone, sourceLabel(entry.source)]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [entries, search]);

  const downloadCsv = () => {
    const rows = [
      ["Name", "Email", "Phone", "Entry source", "Entered at"],
      ...filteredEntries.map((entry) => [
        entry.name,
        entry.email,
        entry.phone,
        sourceLabel(entry.source),
        entry.createdAt,
      ]),
    ];
    const csv = `\uFEFF${rows.map((row) => row.map(escapeCsv).join(",")).join("\n")}`;
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "geogas-competition-entries.csv";
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  const hasAdminKey = Boolean(adminKey.trim());

  return (
    <section
      className={styles.dashboard}
      aria-labelledby="competition-dashboard-heading"
      aria-busy={isLoading}
    >
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Competition</p>
          <h2 id="competition-dashboard-heading">Everyday Heroes entries</h2>
          <p>Live entry activity and entrant details.</p>
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.refresh} onClick={loadEntries} disabled={!hasAdminKey || isLoading}>
            <i className="fa-solid fa-rotate" aria-hidden="true" />
            {isLoading ? "Refreshing" : "Refresh"}
          </button>
          <button type="button" className={styles.export} onClick={downloadCsv} disabled={!entries.length}>
            <i className="fa-solid fa-download" aria-hidden="true" />
            Export CSV
          </button>
        </div>
      </div>

      {!hasAdminKey ? (
        <p className={styles.notice}>Enter the admin key above to view protected entrant details.</p>
      ) : null}

      {error ? <p className={styles.error} role="alert">{error}</p> : null}

      {hasAdminKey ? (
        <>
          <div className={styles.metrics}>
            <article>
              <span>Total entries</span>
              <strong>{summary?.total ?? "-"}</strong>
              <small>All verified entries</small>
            </article>
            <article>
              <span>Last 24 hours</span>
              <strong>{summary?.last24Hours ?? "-"}</strong>
              <small>Recent momentum</small>
            </article>
            <article>
              <span>Competition page</span>
              <strong>{summary?.competitionPage ?? "-"}</strong>
              <small>Full-page entries</small>
            </article>
            <article>
              <span>Pop-up entries</span>
              <strong>{summary?.competitionModal ?? "-"}</strong>
              <small>Homepage prompt</small>
            </article>
          </div>

          <div className={styles.tableHeader}>
            <div>
              <h3>Entrants</h3>
              <p>
                {lastUpdated
                  ? `Updated ${formatDate(lastUpdated.toISOString())}${
                      summary && summary.total > entries.length
                        ? ` · showing latest ${entries.length} of ${summary.total}`
                        : ""
                    }`
                  : "Loading entries..."}
              </p>
            </div>
            <label className={styles.search}>
              <span className="sr-only">Search entrants</span>
              <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, email or phone" />
            </label>
          </div>

          <div className={styles.tableWrap}>
            <table>
              <thead>
                <tr>
                  <th>Entrant</th>
                  <th>Contact</th>
                  <th>Source</th>
                  <th>Entered</th>
                </tr>
              </thead>
              <tbody>
                {filteredEntries.map((entry) => (
                  <tr key={entry.id}>
                    <td data-label="Entrant"><strong>{entry.name}</strong></td>
                    <td data-label="Contact"><a href={`mailto:${entry.email}`}>{entry.email}</a><a href={`tel:${entry.phone.replace(/[^+\d]/g, "")}`}>{entry.phone}</a></td>
                    <td data-label="Source"><span className={styles.source}>{sourceLabel(entry.source)}</span></td>
                    <td data-label="Entered">{formatDate(entry.createdAt)}</td>
                  </tr>
                ))}
                {!isLoading && filteredEntries.length === 0 ? (
                  <tr><td colSpan={4} className={styles.empty}>No entrants match this view yet.</td></tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </>
      ) : null}
    </section>
  );
};

export default CompetitionAdminDashboard;
