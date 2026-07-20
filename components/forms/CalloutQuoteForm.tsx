"use client";

import { FormEvent, useId, useState } from "react";

type CalloutQuoteFormProps = {
  namePlaceholder: string;
  phonePlaceholder?: string;
  emailPlaceholder: string;
  postcodePlaceholder?: string;
  subjectPlaceholder: string;
  messagePlaceholder: string;
  submitLabel: string;
  submitButtonClassName?: string;
  source?: string;
  showFieldLabels?: boolean;
};

type SubmitState = {
  status: "idle" | "sending" | "success" | "error";
  message: string;
};

const defaultState: SubmitState = {
  status: "idle",
  message: "",
};

const CalloutQuoteForm = ({
  namePlaceholder,
  phonePlaceholder = "Phone Number",
  emailPlaceholder,
  postcodePlaceholder = "Postcode (optional)",
  subjectPlaceholder,
  messagePlaceholder,
  submitLabel,
  submitButtonClassName = "button-1",
  source = "website-contact-form",
  showFieldLabels = false,
}: CalloutQuoteFormProps) => {
  const fieldIdPrefix = useId().replace(/:/g, "");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [postcode, setPostcode] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>(defaultState);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submitState.status === "sending") {
      return;
    }

    setSubmitState({ status: "sending", message: "Sending your request..." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          postcode,
          subject,
          message,
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
          message: payload.error || "Unable to submit request right now.",
        });
        return;
      }

      setSubmitState({
        status: "success",
        message:
          payload.message || "Thanks, your request has been sent successfully.",
      });
      setName("");
      setPhone("");
      setEmail("");
      setPostcode("");
      setSubject("");
      setMessage("");
    } catch {
      setSubmitState({
        status: "error",
        message: "Unable to submit request right now.",
      });
    }
  };

  const FieldLabel = ({
    field,
    children,
    optional = false,
  }: {
    field: string;
    children: string;
    optional?: boolean;
  }) =>
    showFieldLabels ? (
      <label className="contact__form-label" htmlFor={`${fieldIdPrefix}-${field}`}>
        {children}
        {optional ? <span>Optional</span> : <strong aria-hidden="true">Required</strong>}
      </label>
    ) : null;

  return (
    <form
      className={showFieldLabels ? "contact__form contact__form--labelled" : "contact__form"}
      onSubmit={handleSubmit}
    >
      <div className="row">
        <div className="col-md-6 mb-30">
          <div className="contact__form-area-item">
            <FieldLabel field="name">Full name</FieldLabel>
            <input
              type="text"
              id={`${fieldIdPrefix}-name`}
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder={namePlaceholder}
              aria-label="Full name"
              required
            />
          </div>
        </div>
        <div className="col-md-6 mb-30">
          <div className="contact__form-area-item">
            <FieldLabel field="phone">Phone number</FieldLabel>
            <input
              type="tel"
              id={`${fieldIdPrefix}-phone`}
              name="phone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder={phonePlaceholder}
              aria-label="Phone number"
              required
            />
          </div>
        </div>
        <div className="col-md-6 mb-30">
          <div className="contact__form-area-item">
            <FieldLabel field="email">Email address</FieldLabel>
            <input
              type="email"
              id={`${fieldIdPrefix}-email`}
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={emailPlaceholder}
              aria-label="Email address"
              required
            />
          </div>
        </div>
        <div className="col-md-6 mb-30">
          <div className="contact__form-area-item">
            <FieldLabel field="postcode" optional>
              Postcode
            </FieldLabel>
            <input
              type="text"
              id={`${fieldIdPrefix}-postcode`}
              name="postcode"
              value={postcode}
              onChange={(event) => setPostcode(event.target.value)}
              placeholder={postcodePlaceholder}
              aria-label="Postcode"
            />
          </div>
        </div>
        <div className="col-md-12 mb-30">
          <div className="contact__form-area-item">
            <FieldLabel field="subject" optional>
              Service required
            </FieldLabel>
            <input
              type="text"
              id={`${fieldIdPrefix}-subject`}
              name="subject"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              placeholder={subjectPlaceholder}
              aria-label="Service required"
            />
          </div>
        </div>
        <div className="col-md-12 mb-30">
          <div className="contact__form-area-item">
            <FieldLabel field="message">What can we help with?</FieldLabel>
            <textarea
              id={`${fieldIdPrefix}-message`}
              name="message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder={messagePlaceholder}
              aria-label="Details of the issue"
              required
            ></textarea>
          </div>
        </div>
        <div className="col-md-12">
          <div className="contact__form-area-item">
            <button
              className={submitButtonClassName}
              type="submit"
              disabled={submitState.status === "sending"}
            >
              {submitState.status === "sending" ? "Sending..." : submitLabel}
            </button>
            {submitState.status !== "idle" ? (
              <p
                role="status"
                aria-live="polite"
                className={
                  "contact__form-feedback " +
                  (submitState.status === "success" ? "is-success" : "") +
                  (submitState.status === "error" ? " is-error" : "")
                }
              >
                {submitState.message}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </form>
  );
};

export default CalloutQuoteForm;
