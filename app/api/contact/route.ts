import { NextResponse } from "next/server";
import { sendBookingEmail } from "@/lib/bookingEmail";

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

    try {
      const emailSent = await sendBookingEmail({
        name: enquiry.name,
        email: enquiry.email,
        phone: enquiry.phone,
        postcode: enquiry.postcode,
        service: enquiry.subject,
        details: enquiry.message,
        source: enquiry.source,
        receivedAt: enquiry.createdAt,
      });

      if (!emailSent) {
        const webhookUrl =
          process.env.CONTACT_WEBHOOK_URL || process.env.LEAD_WEBHOOK_URL;

        if (!webhookUrl) {
          return NextResponse.json(
            { error: "Enquiries are temporarily unavailable. Please call us instead." },
            { status: 503 }
          );
        }

        const webhookResponse = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(enquiry),
          signal: AbortSignal.timeout(10_000),
        });

        if (!webhookResponse.ok) {
          return NextResponse.json(
            { error: "Unable to deliver enquiry right now." },
            { status: 502 }
          );
        }
      }
    } catch {
      return NextResponse.json(
        { error: "Unable to deliver enquiry right now." },
        { status: 502 }
      );
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
