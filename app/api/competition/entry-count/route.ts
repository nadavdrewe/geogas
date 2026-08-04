import { NextResponse } from "next/server";
import { getCompetitionEntryCount } from "@/lib/competitionEntryCount";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const count = getCompetitionEntryCount();

    return NextResponse.json(
      { count },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return NextResponse.json(
      { error: "Unable to retrieve the competition entry count." },
      { status: 500 }
    );
  }
}
