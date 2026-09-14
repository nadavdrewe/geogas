import { NextResponse } from "next/server";
import {
  consumeRateLimit,
  readJsonRequest,
  requestIsSameOrigin,
} from "@/lib/apiRequestSecurity";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type NewsletterPayload = {
  name?: string;
  phone?: string;
  email?: string;
  source?: string;
};

const clean = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

const validEmail = (value: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

export async function POST(request: Request) {
  if (!requestIsSameOrigin(request, { requireOrigin: true })) {
    return NextResponse.json(
      { error: "Invalid subscription request." },
      { status: 403 }
    );
  }

  const retryAfter = consumeRateLimit(
    request,
    "newsletter",
    5,
    60 * 60 * 1000
  );
  if (retryAfter !== null) {
    return NextResponse.json(
      { error: "Too many subscription attempts. Please try again later." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  try {
    const parsed = await readJsonRequest<NewsletterPayload>(request, 4096);
    if (!parsed.ok) {
      return NextResponse.json(
        { error: parsed.error },
        { status: parsed.status }
      );
    }

    const body = parsed.value;
    const name = clean(body.name);
    const phone = clean(body.phone);
    const email = clean(body.email);

    if (name.length > 120 || phone.length > 40 || email.length > 254) {
      return NextResponse.json(
        { error: "Please check the contact details entered." },
        { status: 400 }
      );
    }

    if (!name) {
      return NextResponse.json(
        { error: "Full name is required." },
        { status: 400 }
      );
    }

    if (!phone) {
      return NextResponse.json(
        { error: "Phone number is required." },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { error: "Email address is required." },
        { status: 400 }
      );
    }

    if (!validEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const subscription = {
      name,
      phone,
      email,
      source: clean(body.source) || "website-newsletter-form",
      message: "Newsletter subscription request",
      createdAt: new Date().toISOString(),
    };

    const webhookUrl =
      process.env.NEWSLETTER_WEBHOOK_URL ||
      process.env.CONTACT_WEBHOOK_URL ||
      process.env.LEAD_WEBHOOK_URL;

    if (!webhookUrl) {
      return NextResponse.json(
        { error: "Subscriptions are temporarily unavailable. Please try again later." },
        { status: 503 }
      );
    }

    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subscription),
      signal: AbortSignal.timeout(10_000),
    });

    if (!webhookResponse.ok) {
      return NextResponse.json(
        { error: "Unable to save your subscription right now." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Thanks, you're subscribed.",
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to submit subscription right now." },
      { status: 500 }
    );
  }
}
