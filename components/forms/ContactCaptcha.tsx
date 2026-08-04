"use client";

import { useCallback, useEffect, useState } from "react";

export type ContactCaptchaValue = {
  token: string;
  answer: string;
};

type ContactCaptchaProps = {
  value: ContactCaptchaValue;
  onChange: (value: ContactCaptchaValue) => void;
};

type CaptchaChallenge = {
  question: string;
  token: string;
};

const ContactCaptcha = ({ value, onChange }: ContactCaptchaProps) => {
  const [challenge, setChallenge] = useState<CaptchaChallenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refreshChallenge = useCallback(async () => {
    setLoading(true);
    setError("");
    onChange({ token: "", answer: "" });

    try {
      const response = await fetch("/api/contact/captcha", { cache: "no-store" });
      const payload = (await response.json()) as CaptchaChallenge & { error?: string };

      if (!response.ok || !payload.question || !payload.token) {
        throw new Error(payload.error || "Unable to load verification question.");
      }

      setChallenge({ question: payload.question, token: payload.token });
      onChange({ token: payload.token, answer: "" });
    } catch (loadError) {
      setChallenge(null);
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Unable to load verification question."
      );
    } finally {
      setLoading(false);
    }
  }, [onChange]);

  useEffect(() => {
    void refreshChallenge();
  }, [refreshChallenge]);

  return (
    <div className="contact__captcha" aria-live="polite">
      <div className="contact__captcha-heading">
        <label htmlFor="contact-captcha-answer">Quick security check</label>
        <button type="button" onClick={() => void refreshChallenge()} disabled={loading}>
          New question
        </button>
      </div>
      {challenge ? <p>{challenge.question}</p> : null}
      <input
        id="contact-captcha-answer"
        type="text"
        inputMode="numeric"
        autoComplete="off"
        value={value.answer}
        onChange={(event) => onChange({ token: value.token, answer: event.target.value })}
        placeholder={loading ? "Loading question..." : "Your answer"}
        aria-label={challenge ? `Security check: ${challenge.question}` : "Security check answer"}
        disabled={loading || !challenge}
        required
      />
      {error ? <p className="contact__captcha-error">{error}</p> : null}
    </div>
  );
};

export default ContactCaptcha;
