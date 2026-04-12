"use client";

import { FormEvent, useState } from "react";

type NewsletterSubscribeFormProps = {
  namePlaceholder?: string;
  phonePlaceholder?: string;
  placeholder: string;
  buttonLabel: string;
  buttonClassName?: string;
  source?: string;
};

type SubmitState = {
  status: "idle" | "sending" | "success" | "error";
  message: string;
};

const defaultState: SubmitState = {
  status: "idle",
  message: "",
};

const NewsletterSubscribeForm = ({
  namePlaceholder = "Full Name",
  phonePlaceholder = "Phone Number",
  placeholder,
  buttonLabel,
  buttonClassName = "button-2",
  source = "website-newsletter-form",
}: NewsletterSubscribeFormProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>(defaultState);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submitState.status === "sending") {
      return;
    }

    setSubmitState({ status: "sending", message: "Submitting..." });

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          source,
        }),
      });

      const payload = (await response.json()) as {
        ok?: boolean;
        message?: string;
        error?: string;
      };

      if (!response.ok || !payload.ok) {
        setSubmitState({
          status: "error",
          message: payload.error || "Unable to subscribe right now.",
        });
        return;
      }

      setSubmitState({
        status: "success",
        message: payload.message || "Thanks, you're subscribed.",
      });
      setEmail("");
      setName("");
      setPhone("");
    } catch {
      setSubmitState({
        status: "error",
        message: "Unable to subscribe right now.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="newsletter-subscribe-form">
      <input
        type="text"
        name="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder={namePlaceholder}
        required
      />
      <input
        type="tel"
        name="phone"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
        placeholder={phonePlaceholder}
        required
      />
      <input
        type="email"
        name="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder={placeholder}
        required
      />
      <button
        className={buttonClassName}
        type="submit"
        disabled={submitState.status === "sending"}
      >
        {submitState.status === "sending" ? "Submitting..." : buttonLabel}
      </button>
      {submitState.status !== "idle" ? (
        <p
          className={
            "contact__form-feedback " +
            (submitState.status === "success" ? "is-success" : "") +
            (submitState.status === "error" ? " is-error" : "")
          }
        >
          {submitState.message}
        </p>
      ) : null}
    </form>
  );
};

export default NewsletterSubscribeForm;
