"use client";

import { useEffect, useState } from "react";
import { competitionCampaigns, CompetitionCampaign, CompetitionPhase, isCompetitionPhase } from "./campaigns";

export const useCompetitionCampaign = (): CompetitionCampaign => {
  const [phase, setPhase] = useState<CompetitionPhase>("phase-1");

  useEffect(() => {
    void fetch("/api/competition/campaign", { cache: "no-store" })
      .then((response) => response.json())
      .then((payload: { campaign?: { phase?: unknown } }) => {
        if (isCompetitionPhase(payload.campaign?.phase)) setPhase(payload.campaign.phase);
      })
      .catch(() => undefined);
  }, []);

  return competitionCampaigns[phase];
};
