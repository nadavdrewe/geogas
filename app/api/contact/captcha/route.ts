import { NextResponse } from "next/server";
import { createContactCaptcha } from "@/lib/contactCaptcha";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const requestIsSameOrigin = (request: Request): boolean => {
  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
};

export async function GET(request: Request) {
  if (!requestIsSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid captcha request." }, { status: 403 });
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
