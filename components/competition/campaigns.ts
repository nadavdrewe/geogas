export type CompetitionPhase = "phase-1" | "phase-2";

export type CompetitionCampaign = {
  phase: CompetitionPhase;
  label: string;
  image: string;
  alt: string;
  title: string;
  intro: string;
  prizeSummary: string;
};

export const competitionCampaigns: Record<CompetitionPhase, CompetitionCampaign> = {
  "phase-1": {
    phase: "phase-1",
    label: "Phase 1",
    image: "/compImages/competition-phase-1-boiler-safety-check.png",
    alt: "Geo Gas Services Everyday Heroes Phase 1 competition poster offering a free boiler service, gas inspection and a carbon monoxide detector with a 10-year warranty, worth 200 pounds.",
    title: "Win a Boiler Safety Check",
    intro: "Enter for a free boiler service and gas inspection, plus a new carbon monoxide detector with a 10-year warranty. Worth £200.",
    prizeSummary: "Free boiler service and gas inspection, plus a new carbon monoxide detector with a 10-year warranty. Worth £200.",
  },
  "phase-2": {
    phase: "phase-2",
    label: "Phase 2",
    image: "/compImages/competition-phase-2-boiler-repair-contribution.png",
    alt: "Geo Gas Services Everyday Heroes Phase 2 competition poster offering 500 pounds towards a new boiler or boiler repair and a carbon monoxide detector with a 10-year warranty.",
    title: "Win £500 Towards a New Boiler or Boiler Repair",
    intro: "Enter to win £500 towards a new boiler or boiler repair, plus a new carbon monoxide detector with a 10-year warranty.",
    prizeSummary: "£500 towards a new boiler or boiler repair, plus a new carbon monoxide detector with a 10-year warranty.",
  },
};

export const isCompetitionPhase = (value: unknown): value is CompetitionPhase =>
  value === "phase-1" || value === "phase-2";
