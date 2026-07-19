import { NextResponse } from "next/server";
import {
  createCompetitionEntry,
  getCompetitionEntries,
} from "@/lib/contentDatabase";
import {
  isAdminPanelConfigured,
  isAdminPanelRequestAuthorized,
} from "@/lib/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type CompetitionEntryPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  website?: unknown;
  source?: unknown;
};

const clean = (value: unknown): string =>
  typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";

const validEmail = (value: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const validPhone = (value: string): boolean =>
  /^[0-9+().\-\s]{7,40}$/.test(value);

const validate = (payload: CompetitionEntryPayload): string | null => {
  const name = clean(payload.name);
  const email = clean(payload.email);
  const phone = clean(payload.phone);

  if (name.length < 2 || name.length > 120) {
    return "Please enter your full name.";
  }

  if (!validEmail(email) || email.length > 254) {
    return "Please enter a valid email address.";
  }

  if (!validPhone(phone)) {
    return "Please enter a valid phone number.";
  }

  return null;
};

const requestIsSameOrigin = (request: Request): boolean => {
  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
};

export async function POST(request: Request) {
  if (!requestIsSameOrigin(request)) {
    return NextResponse.json(
      { error: "Invalid competition entry request." },
      { status: 403 }
    );
  }

  try {
    const body = (await request.json()) as CompetitionEntryPayload;

    // Bots commonly fill this field. Accept without storing so real entrants see
    // no unnecessary failure message while automated submissions do not reach the draw.
    if (clean(body.website)) {
      return NextResponse.json({
        ok: true,
        message: "Thanks, your competition entry has been received.",
      });
    }

    const error = validate(body);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const result = await createCompetitionEntry({
      name: clean(body.name),
      email: clean(body.email).toLowerCase(),
      phone: clean(body.phone),
      source:
        clean(body.source) === "competition-page"
          ? "competition-page"
          : "competition-modal",
    });

    if ("duplicate" in result) {
      return NextResponse.json(
        {
          error:
            "That email address has already been entered into this competition.",
        },
        { status: 409 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "You’re in the draw. Good luck!",
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to enter the competition right now. Please try again shortly." },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  if (!isAdminPanelConfigured()) {
    return NextResponse.json(
      { error: "Admin access is not configured." },
      { status: 503 }
    );
  }

  if (!isAdminPanelRequestAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const rawLimit = Number(
      new URL(request.url).searchParams.get("limit") ?? "100"
    );
    const entries = await getCompetitionEntries(rawLimit);

    return NextResponse.json(
      { entries },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch {
    return NextResponse.json(
      { error: "Unable to retrieve competition entries." },
      { status: 500 }
    );
  }
}
