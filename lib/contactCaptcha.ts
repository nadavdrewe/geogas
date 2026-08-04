import { createHmac, randomBytes, randomInt, timingSafeEqual } from "crypto";

const CAPTCHA_TTL_MS = 10 * 60 * 1000;
const CAPTCHA_PURPOSE = "contact";

type CaptchaToken = {
  answerHash: string;
  expiresAt: number;
  nonce: string;
  purpose: typeof CAPTCHA_PURPOSE;
};

const getCaptchaSecret = (): string => {
  const configuredSecret = process.env.CONTACT_CAPTCHA_SECRET?.trim();

  if (configuredSecret) {
    return configuredSecret;
  }

  // Existing deployments already require this to protect the admin panel. It
  // provides a safe transition while CONTACT_CAPTCHA_SECRET is rolled out.
  const adminKey = process.env.ADMIN_PANEL_KEY?.trim();
  if (adminKey) {
    return adminKey;
  }

  // A predictable development-only secret keeps local forms usable. Production
  // deliberately fails closed until a secret has been configured.
  return process.env.NODE_ENV === "production"
    ? ""
    : "local-contact-captcha-development-secret";
};

const encode = (value: string): string => Buffer.from(value).toString("base64url");

const decode = (value: string): string =>
  Buffer.from(value, "base64url").toString("utf8");

const sign = (value: string, secret: string): string =>
  createHmac("sha256", secret).update(value).digest("base64url");

const signaturesMatch = (expected: string, provided: string): boolean => {
  const expectedBuffer = Buffer.from(expected);
  const providedBuffer = Buffer.from(provided);

  return (
    expectedBuffer.length === providedBuffer.length &&
    timingSafeEqual(expectedBuffer, providedBuffer)
  );
};

export const createContactCaptcha = (): { question: string; token: string } | null => {
  const secret = getCaptchaSecret();
  if (!secret) {
    return null;
  }

  const firstNumber = randomInt(2, 10);
  const secondNumber = randomInt(2, 10);
  const answer = firstNumber + secondNumber;
  const expiresAt = Date.now() + CAPTCHA_TTL_MS;
  const nonce = randomBytes(16).toString("base64url");
  const payload: CaptchaToken = {
    answerHash: sign(`${answer}:${nonce}:${expiresAt}`, secret),
    expiresAt,
    nonce,
    purpose: CAPTCHA_PURPOSE,
  };
  const encodedPayload = encode(JSON.stringify(payload));

  return {
    question: `What is ${firstNumber} + ${secondNumber}?`,
    token: `${encodedPayload}.${sign(encodedPayload, secret)}`,
  };
};

export const verifyContactCaptcha = (
  token: unknown,
  suppliedAnswer: unknown
): boolean => {
  const secret = getCaptchaSecret();
  const answer = typeof suppliedAnswer === "string" ? suppliedAnswer.trim() : "";

  if (!secret || !token || typeof token !== "string" || !/^-?\d{1,3}$/.test(answer)) {
    return false;
  }

  const [encodedPayload, providedSignature, ...extraParts] = token.split(".");
  if (!encodedPayload || !providedSignature || extraParts.length > 0) {
    return false;
  }

  if (!signaturesMatch(sign(encodedPayload, secret), providedSignature)) {
    return false;
  }

  try {
    const payload = JSON.parse(decode(encodedPayload)) as Partial<CaptchaToken>;

    return (
      payload.purpose === CAPTCHA_PURPOSE &&
      typeof payload.answerHash === "string" &&
      typeof payload.expiresAt === "number" &&
      typeof payload.nonce === "string" &&
      payload.expiresAt >= Date.now() &&
      signaturesMatch(
        sign(`${Number(answer)}:${payload.nonce}:${payload.expiresAt}`, secret),
        payload.answerHash
      )
    );
  } catch {
    return false;
  }
};
