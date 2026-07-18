import { NextRequest, NextResponse } from "next/server";

const suspiciousPathPattern =
  /(^|\/)(wp-admin|wp-content|wp-includes|phpmyadmin|pma|vendor|ssh_key|deploy_key|gitlab_deploy_key|id_rsa|authorized_keys|passwd|shadow|config\.backup|appspec\.yml|buildspec\.yml|cloudbuild\.yaml|wercker\.yml|appveyor\.yml)(\/|$)/i;

const suspiciousExtensionPattern =
  /\.(php|asp|aspx|jsp|cgi|pl|py|sh|bak|backup|old|orig|save|swp|sql|sqlite|db|env|ini|conf|config|yml|yaml|toml|log|pem|key)$/i;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname !== "/.well-known/traffic-advice" &&
    (pathname.includes("/.") ||
      suspiciousPathPattern.test(pathname) ||
      suspiciousExtensionPattern.test(pathname))
  ) {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
