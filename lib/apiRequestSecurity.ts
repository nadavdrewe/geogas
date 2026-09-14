type RateLimitRecord = {
  count: number;
  resetAt: number;
};

type JsonRequestResult<T> =
  | { ok: true; value: T }
  | { ok: false; status: number; error: string };

const securityGlobal = globalThis as typeof globalThis & {
  geoGasApiRateLimits?: Map<string, RateLimitRecord>;
};

const rateLimits =
  securityGlobal.geoGasApiRateLimits ?? new Map<string, RateLimitRecord>();
securityGlobal.geoGasApiRateLimits = rateLimits;

const utf8Length = (value: string): number =>
  new TextEncoder().encode(value).byteLength;

export const getClientAddress = (request: Request): string => {
  // Nginx overwrites X-Real-IP with the socket peer, so prefer it over any
  // client-supplied forwarding chain. The final X-Forwarded-For entry is the
  // proxy-appended peer address and is the safe fallback.
  const realAddress = request.headers.get("x-real-ip")?.trim();
  if (realAddress) return realAddress.slice(0, 128);

  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",").at(-1)?.trim().slice(0, 128) || "unknown";
};

export const requestIsSameOrigin = (
  request: Request,
  options: { requireOrigin?: boolean } = {}
): boolean => {
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");

  if (fetchSite && fetchSite !== "same-origin") return false;
  if (!origin) return !options.requireOrigin;

  try {
    return origin === new URL(request.url).origin;
  } catch {
    return false;
  }
};

export const consumeRateLimit = (
  request: Request,
  bucket: string,
  maxRequests: number,
  windowMs: number
): number | null => {
  const now = Date.now();

  if (rateLimits.size > 10_000) {
    for (const [key, record] of rateLimits) {
      if (record.resetAt <= now) rateLimits.delete(key);
    }
  }

  const key = `${bucket}:${getClientAddress(request)}`;
  const current = rateLimits.get(key);

  if (!current || current.resetAt <= now) {
    rateLimits.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }

  current.count += 1;
  if (current.count <= maxRequests) return null;

  return Math.max(1, Math.ceil((current.resetAt - now) / 1000));
};

export const readJsonRequest = async <T>(
  request: Request,
  maxBytes: number
): Promise<JsonRequestResult<T>> => {
  const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";
  if (!contentType.startsWith("application/json")) {
    return { ok: false, status: 415, error: "Request body must be JSON." };
  }

  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(declaredLength) && declaredLength > maxBytes) {
    return { ok: false, status: 413, error: "Request body is too large." };
  }

  try {
    const rawBody = await request.text();
    if (utf8Length(rawBody) > maxBytes) {
      return { ok: false, status: 413, error: "Request body is too large." };
    }

    return { ok: true, value: JSON.parse(rawBody) as T };
  } catch {
    return { ok: false, status: 400, error: "Request body is not valid JSON." };
  }
};
