import { NextResponse } from "next/server";
import { createWebsiteLead } from "@/lib/contentDatabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type LeadPayload = {
  name?: string;
  email?: string;
  phone?: string;
  postcode?: string;
  service?: string;
  note?: string;
  sourceQuestion?: string;
  sourceAnswer?: string;
};

const clean = (value: unknown): string =>
  typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";

const validEmail = (value: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

const validate = (payload: LeadPayload): string | null => {
  const name = clean(payload.name);
  const email = clean(payload.email);
  const phone = clean(payload.phone);
  const postcode = clean(payload.postcode);
  const service = clean(payload.service);

  if (!name) return "Name is required.";
  if (!email) return "Email is required.";
  if (!validEmail(email)) return "Please enter a valid email address.";
  if (!phone) return "Phone is required.";
  if (!postcode) return "Postcode is required.";
  if (!service) return "Service requested is required.";
  if (name.length > 120 || email.length > 254 || phone.length > 40) {
    return "Please check the contact details entered.";
  }
  if (postcode.length > 24 || service.length > 160) {
    return "Please check the booking details entered.";
  }
  if (
    clean(payload.note).length > 4_000 ||
    clean(payload.sourceQuestion).length > 4_000 ||
    clean(payload.sourceAnswer).length > 4_000
  ) {
    return "Please shorten the extra details and try again.";
  }

  return null;
};

const requestIsSameOrigin = (request: Request): boolean => {
  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
};

export async function POST(request: Request) {
  if (!requestIsSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid booking request." }, { status: 403 });
  }

  try {
    const body = (await request.json()) as LeadPayload;
    const error = validate(body);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const lead = {
      name: clean(body.name),
      email: clean(body.email).toLowerCase(),
      phone: clean(body.phone),
      postcode: clean(body.postcode),
      service: clean(body.service),
      note: clean(body.note),
      sourceQuestion: clean(body.sourceQuestion),
      sourceAnswer: clean(body.sourceAnswer),
      createdAt: new Date().toISOString(),
    };

    await createWebsiteLead({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      postcode: lead.postcode,
      service: lead.service,
      note: lead.note,
      sourceQuestion: lead.sourceQuestion,
      sourceAnswer: lead.sourceAnswer,
      source: "website-chatbot",
    });

    const webhookUrl = process.env.LEAD_WEBHOOK_URL;

    if (webhookUrl) {
      try {
        const webhookResponse = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(lead),
          signal: AbortSignal.timeout(10_000),
        });

        if (!webhookResponse.ok) {
          console.error("Lead webhook failed after the booking was saved.");
        }
      } catch {
        console.error("Lead webhook could not be reached after the booking was saved.");
      }
    }

    return NextResponse.json({
      ok: true,
      message:
        "Thanks, your request has been sent. Our team will contact you shortly.",
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to submit lead right now." },
      { status: 500 }
    );
  }
}
