"use client";

import { FormEvent, useState } from "react";

type SubmitState =
  | { status: "idle"; message: "" }
  | { status: "sending"; message: string }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

type CompetitionEntryFormProps = {
  source: "competition-modal" | "competition-page";
  successAction?: {
    label: string;
    onClick: () => void;
  };
};

const CompetitionEntryForm = ({
  source,
  successAction,
}: CompetitionEntryFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
    message: "",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitState.status === "sending") return;

    setSubmitState({ status: "sending", message: "Entering you into the draw…" });

    try {
      const response = await fetch("/api/competition/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, website, source }),
      });
      const payload = (await response.json().catch(() => null)) as
        | { ok?: boolean; message?: string; error?: string }
        | null;

      if (!response.ok || !payload?.ok) {
        setSubmitState({
          status: "error",
          message: payload?.error ?? "Unable to enter the competition right now.",
        });
        return;
      }

      setSubmitState({
        status: "success",
        message: payload.message ?? "You’re in the draw. Good luck!",
      });
      setName("");
      setEmail("");
      setPhone("");
      setWebsite("");
    } catch {
      setSubmitState({
        status: "error",
        message: "Unable to enter the competition right now.",
      });
    }
  };

  if (submitState.status === "success") {
    return (
      <div className="competition-entry-form__success" role="status" aria-live="polite">
        <i className="fa-solid fa-circle-check" aria-hidden="true" />
        <p>{submitState.message}</p>
        {successAction ? (
          <button type="button" onClick={successAction.onClick}>
            {successAction.label}
          </button>
        ) : null}
      </div>
    );
  }

  return (
    <form className="competition-entry-form" onSubmit={handleSubmit}>
      <label>
        Full name
        <input
          type="text"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          autoComplete="name"
          maxLength={120}
          required
        />
      </label>
      <label>
        Email address
        <input
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          maxLength={254}
          required
        />
      </label>
      <label>
        Phone number
        <input
          type="tel"
          name="phone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          autoComplete="tel"
          inputMode="tel"
          maxLength={40}
          required
        />
      </label>
      <label className="competition-entry-form__honeypot" aria-hidden="true">
        Website
        <input
          type="text"
          name="website"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </label>
      <button
        type="submit"
        className="competition-entry-form__submit"
        disabled={submitState.status === "sending"}
      >
        {submitState.status === "sending" ? "Entering…" : "Enter competition"}
      </button>
      <p className="competition-entry-form__privacy">
        We’ll only use these details to administer this competition.
      </p>
      {submitState.status === "error" ? (
        <p className="competition-entry-form__feedback is-error" role="alert">
          {submitState.message}
        </p>
      ) : null}
    </form>
  );
};

export default CompetitionEntryForm;
