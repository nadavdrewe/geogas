import { NextResponse } from "next/server";
import { competitionCampaigns, isCompetitionPhase } from "@/components/competition/campaigns";
import { getActiveCompetitionPhase, setActiveCompetitionPhase } from "@/lib/competitionCampaign";
import { isAdminPanelConfigured, isAdminPanelRequestAuthorized } from "@/lib/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const phase = getActiveCompetitionPhase();
  return NextResponse.json({ campaign: competitionCampaigns[phase] }, { headers: { "Cache-Control": "no-store" } });
}

export async function PUT(request: Request) {
  if (!isAdminPanelConfigured()) return NextResponse.json({ error: "Admin access is not configured." }, { status: 503 });
  if (!isAdminPanelRequestAuthorized(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const body = await request.json().catch(() => null) as { phase?: unknown } | null;
  if (!isCompetitionPhase(body?.phase)) return NextResponse.json({ error: "Choose Phase 1 or Phase 2." }, { status: 400 });

  return NextResponse.json({ campaign: setActiveCompetitionPhase(body.phase) });
}
