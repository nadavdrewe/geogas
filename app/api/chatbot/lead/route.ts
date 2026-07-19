import { NextResponse } from "next/server";

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

const clean = (value: unknown): string => {
  return typeof value === "string" ? value.trim() : "";
};

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

  return null;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadPayload;
    const error = validate(body);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const lead = {
      name: clean(body.name),
      email: clean(body.email),
      phone: clean(body.phone),
      postcode: clean(body.postcode),
      service: clean(body.service),
      note: clean(body.note),
      sourceQuestion: clean(body.sourceQuestion),
      sourceAnswer: clean(body.sourceAnswer),
      createdAt: new Date().toISOString(),
    };

    const webhookUrl = process.env.LEAD_WEBHOOK_URL;

    if (!webhookUrl) {
      return NextResponse.json(
        { error: "Lead capture is temporarily unavailable. Please call us instead." },
        { status: 503 }
      );
    }

    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(10_000),
    });

    if (!webhookResponse.ok) {
      return NextResponse.json(
        { error: "Lead capture webhook failed." },
        { status: 502 }
      );
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
