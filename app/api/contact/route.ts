import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ContactPayload = {
  name?: string;
  phone?: string;
  email?: string;
  postcode?: string;
  subject?: string;
  message?: string;
  source?: string;
};

const clean = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

const validEmail = (value: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

const validate = (payload: ContactPayload): string | null => {
  const name = clean(payload.name);
  const phone = clean(payload.phone);
  const email = clean(payload.email);
  const message = clean(payload.message);

  if (!name) return "Full name is required.";
  if (!phone) return "Phone number is required.";
  if (!email) return "Email address is required.";
  if (!validEmail(email)) return "Please enter a valid email address.";
  if (!message) return "Please provide details about the issue.";

  return null;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const error = validate(body);

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const enquiry = {
      name: clean(body.name),
      phone: clean(body.phone),
      email: clean(body.email),
      postcode: clean(body.postcode),
      subject: clean(body.subject),
      message: clean(body.message),
      source: clean(body.source) || "website-contact-form",
      createdAt: new Date().toISOString(),
    };

    const webhookUrl =
      process.env.CONTACT_WEBHOOK_URL || process.env.LEAD_WEBHOOK_URL;

    if (webhookUrl) {
      const webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enquiry),
      });

      if (!webhookResponse.ok) {
        return NextResponse.json(
          { error: "Unable to deliver enquiry right now." },
          { status: 502 }
        );
      }
    } else {
      console.log("GeoGas contact enquiry", JSON.stringify(enquiry));
    }

    return NextResponse.json({
      ok: true,
      message: "Thanks, your request has been sent. We will contact you shortly.",
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to submit request right now." },
      { status: 500 }
    );
  }
}
