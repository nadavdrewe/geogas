import { NextResponse } from "next/server";
import { createContactCaptcha } from "@/lib/contactCaptcha";
import {
  consumeRateLimit,
  requestIsSameOrigin,
} from "@/lib/apiRequestSecurity";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!requestIsSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid captcha request." }, { status: 403 });
  }

  const retryAfter = consumeRateLimit(
    request,
    "contact-captcha",
    30,
    15 * 60 * 1000
  );
  if (retryAfter !== null) {
    return NextResponse.json(
      { error: "Too many security-check requests. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  const captcha = createContactCaptcha();
  if (!captcha) {
    return NextResponse.json(
      { error: "Enquiries are temporarily unavailable. Please call us instead." },
      { status: 503 }
    );
  }

  return NextResponse.json(captcha, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
