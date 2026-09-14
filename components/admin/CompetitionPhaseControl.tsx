"use client";

import { useEffect, useState } from "react";
import { CompetitionPhase } from "@/components/competition/campaigns";

const CompetitionPhaseControl = ({ adminKey }: { adminKey: string }) => {
  const [phase, setPhase] = useState<CompetitionPhase>("phase-1");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!adminKey.trim()) return;
    void fetch("/api/competition/campaign", { cache: "no-store" })
      .then((response) => response.json())
      .then((payload) => setPhase(payload.campaign?.phase === "phase-2" ? "phase-2" : "phase-1"));
  }, [adminKey]);

  const save = async () => {
    setStatus("Updating…");
    const response = await fetch("/api/competition/campaign", { method: "PUT", headers: { "Content-Type": "application/json", "x-admin-key": adminKey.trim() }, body: JSON.stringify({ phase }) });
    setStatus(response.ok ? `${phase === "phase-1" ? "Phase 1" : "Phase 2"} is now active.` : "Could not update the active phase.");
  };

  return <section style={{ margin: "24px 0", padding: 20, border: "1px solid #dbe2ea", borderRadius: 8 }}>
    <h2>Live Competition Phase</h2>
    <p>Only one phase is live at a time. Both phases use the same QR entry route.</p>
    <label htmlFor="competition-phase">Active campaign</label>
    <select id="competition-phase" value={phase} onChange={(event) => setPhase(event.target.value as CompetitionPhase)} disabled={!adminKey.trim()}>
      <option value="phase-1">Phase 1 · Boiler safety check worth £200</option>
      <option value="phase-2">Phase 2 · £500 towards a boiler or repair</option>
    </select>
    <button className="button-1" type="button" onClick={save} disabled={!adminKey.trim()} style={{ marginLeft: 12 }}>Make this live</button>
    {status ? <p>{status}</p> : null}
  </section>;
};

export default CompetitionPhaseControl;
