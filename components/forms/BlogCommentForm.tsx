"use client";

import { FormEvent, useState } from "react";

type SubmitState = {
  status: "idle" | "sending" | "success" | "error";
  message: string;
};

const defaultState: SubmitState = {
  status: "idle",
  message: "",
};

const BlogCommentForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>(defaultState);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submitState.status === "sending") {
      return;
    }

    setSubmitState({ status: "sending", message: "Submitting..." });

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
          subject: subject || "Website blog comment enquiry",
          message,
          source: "website-blog-comment-form",
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
          message: payload.error || "Unable to submit comment right now.",
        });
        return;
      }

      setSubmitState({
        status: "success",
        message:
          payload.message ||
          "Thanks, your message has been sent to the Geo Gas team.",
      });

      setName("");
      setPhone("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch {
      setSubmitState({
        status: "error",
        message: "Unable to submit comment right now.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-sm-6 mb-30">
          <div className="contact-item">
            <input
              type="text"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Full Name"
              aria-label="Full name"
              required
            />
          </div>
        </div>
        <div className="col-sm-6 sm-mb-30">
          <div className="contact-item">
            <input
              type="tel"
              name="phone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="Phone Number"
              aria-label="Phone number"
              required
            />
          </div>
        </div>
        <div className="col-sm-6 sm-mb-30">
          <div className="contact-item">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email Address"
              aria-label="Email address"
              required
            />
          </div>
        </div>
        <div className="col-sm-12 mb-30">
          <div className="contact-item">
            <input
              type="text"
              name="subject"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              placeholder="Subject"
              aria-label="Subject"
            />
          </div>
        </div>
        <div className="col-sm-12 mb-30">
          <div className="contact-item">
            <textarea
              name="message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Type your comments...."
              aria-label="Comment"
              required
            ></textarea>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="contact-item">
            <button className="button-1" type="submit">
              {submitState.status === "sending" ? "Sending..." : "Submit Comment"}
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

export default BlogCommentForm;
