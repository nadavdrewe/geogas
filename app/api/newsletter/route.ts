import { NextResponse } from "next/server";

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
  try {
    const body = (await request.json()) as NewsletterPayload;
    const name = clean(body.name);
    const phone = clean(body.phone);
    const email = clean(body.email);

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

    if (webhookUrl) {
      const webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscription),
      });

      if (!webhookResponse.ok) {
        return NextResponse.json(
          { error: "Unable to save your subscription right now." },
          { status: 502 }
        );
      }
    } else {
      console.log("GeoGas newsletter signup", JSON.stringify(subscription));
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
