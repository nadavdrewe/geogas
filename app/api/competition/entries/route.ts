import { NextResponse } from "next/server";
import {
  createCompetitionEntry,
  getCompetitionEntrySummary,
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

const validPhone = (value: string): boolean => {
  const digits = value.replace(/\D/g, "");
  return /^[0-9+().\-\s]{7,40}$/.test(value) && digits.length >= 7 && digits.length <= 15;
};

const maxRequestBytes = 4096;
const rateLimitWindowMs = 15 * 60 * 1000;
const maxRequestsPerWindow = 8;
type RateLimitRecord = { count: number; resetAt: number };
const rateLimitGlobal = globalThis as typeof globalThis & {
  competitionEntryRateLimits?: Map<string, RateLimitRecord>;
};
const competitionEntryRateLimits =
  rateLimitGlobal.competitionEntryRateLimits ?? new Map<string, RateLimitRecord>();
rateLimitGlobal.competitionEntryRateLimits = competitionEntryRateLimits;

const clientAddress = (request: Request): string => {
  const forwarded = request.headers.get("x-forwarded-for");
  return (
    forwarded?.split(",").at(-1)?.trim().slice(0, 128) ||
    request.headers.get("x-real-ip")?.trim().slice(0, 128) ||
    "unknown"
  );
};

const consumeRateLimit = (request: Request): number | null => {
  const now = Date.now();
  if (competitionEntryRateLimits.size > 5000) {
    for (const [address, record] of competitionEntryRateLimits) {
      if (record.resetAt <= now) competitionEntryRateLimits.delete(address);
    }
  }
  const address = clientAddress(request);
  const current = competitionEntryRateLimits.get(address);

  if (!current || current.resetAt <= now) {
    competitionEntryRateLimits.set(address, {
      count: 1,
      resetAt: now + rateLimitWindowMs,
    });
    return null;
  }

  current.count += 1;
  if (current.count <= maxRequestsPerWindow) return null;

  return Math.max(1, Math.ceil((current.resetAt - now) / 1000));
};

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
  const fetchSite = request.headers.get("sec-fetch-site");
  return (
    (!origin || origin === new URL(request.url).origin) &&
    (!fetchSite || fetchSite === "same-origin")
  );
};

export async function POST(request: Request) {
  if (!requestIsSameOrigin(request)) {
    return NextResponse.json(
      { error: "Invalid competition entry request." },
      { status: 403 }
    );
  }

  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return NextResponse.json(
      { error: "Competition entries must be submitted as JSON." },
      { status: 415 }
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > maxRequestBytes) {
    return NextResponse.json(
      { error: "Competition entry request is too large." },
      { status: 413 }
    );
  }

  const retryAfter = consumeRateLimit(request);
  if (retryAfter !== null) {
    return NextResponse.json(
      { error: "Too many entry attempts. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  try {
    let body: CompetitionEntryPayload;
    try {
      const rawBody = await request.text();
      if (new TextEncoder().encode(rawBody).byteLength > maxRequestBytes) {
        return NextResponse.json(
          { error: "Competition entry request is too large." },
          { status: 413 }
        );
      }
      body = JSON.parse(rawBody) as CompetitionEntryPayload;
    } catch {
      return NextResponse.json(
        { error: "Invalid competition entry request." },
        { status: 400 }
      );
    }

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
    const [entries, summary] = await Promise.all([
      getCompetitionEntries(rawLimit),
      getCompetitionEntrySummary(),
    ]);

    return NextResponse.json(
      { entries, summary },
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
