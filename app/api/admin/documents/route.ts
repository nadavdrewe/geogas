import { NextResponse } from "next/server";
import {
  getContentDocumentById,
  getContentDocumentSummaries,
  SITE_DOCUMENT_ID,
  saveContentDocumentContent,
} from "@/lib/contentDatabase";
import { saveSiteContent } from "@/lib/siteContent";
import {
  isAdminPanelConfigured,
  isAdminPanelRequestAuthorized,
} from "@/lib/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const authorize = (request: Request): NextResponse | null => {
  if (!isAdminPanelConfigured()) {
    return NextResponse.json(
      { error: "Admin access is not configured." },
      { status: 503 }
    );
  }

  if (!isAdminPanelRequestAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  return null;
};

export async function GET(request: Request) {
  const authorizationError = authorize(request);
  if (authorizationError) return authorizationError;

  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (id) {
    const document = await getContentDocumentById(id);
    if (!document) {
      return NextResponse.json(
        { error: "Content document not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { document },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }

  const documents = await getContentDocumentSummaries();
  return NextResponse.json(
    { documents },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}

export async function PUT(request: Request) {
  const authorizationError = authorize(request);
  if (authorizationError) return authorizationError;

  try {
    const body = (await request.json()) as {
      id?: unknown;
      content?: unknown;
    };

    if (typeof body.id !== "string" || !body.id.trim()) {
      return NextResponse.json(
        { error: "`id` must be a content document id." },
        { status: 400 }
      );
    }

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

    if (body.id === SITE_DOCUMENT_ID) {
      const content = await saveSiteContent(body.content);
      const document = await getContentDocumentById(SITE_DOCUMENT_ID);
      return NextResponse.json({
        ok: true,
        document: document ? { ...document, content } : null,
      });
    }

    const document = await saveContentDocumentContent(body.id, body.content);
    if (!document) {
      return NextResponse.json(
        { error: "Content document not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true, document });
  } catch {
    return NextResponse.json(
      { error: "Unable to save content document." },
      { status: 500 }
    );
  }
}
