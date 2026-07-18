import { NextResponse } from "next/server";
import { getContentDocumentById, SITE_DOCUMENT_ID } from "@/lib/contentDatabase";
import { getSiteContent, saveSiteContent } from "@/lib/siteContent";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const isAuthorized = (request: Request): boolean => {
  const key = process.env.ADMIN_PANEL_KEY;
  if (!key) return true;

  const providedKey = request.headers.get("x-admin-key");
  return providedKey === key;
};

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const document = await getContentDocumentById(SITE_DOCUMENT_ID);
  const content = document?.content ?? (await getSiteContent());

  return NextResponse.json(
    { content },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}

export async function PUT(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { content?: unknown };
    if (
      !body.content ||
      typeof body.content !== "object" ||
      Array.isArray(body.content)
    ) {
      return NextResponse.json(
        { error: "`content` must be a JSON object." },
        { status: 400 }
      );
    }

    const content = await saveSiteContent(body.content);
    return NextResponse.json({ ok: true, content });
  } catch {
    return NextResponse.json(
      { error: "Unable to save site content." },
      { status: 500 }
    );
  }
}
