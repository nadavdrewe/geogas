import { NextResponse } from "next/server";
import { getSiteContent } from "@/lib/siteContent";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const content = await getSiteContent();

  return NextResponse.json(
    { content },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
