"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

type ChatRole = "user" | "assistant";
type ChatSourceKind = "pricing" | "brochure" | "contracts" | "seo";

type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
  sources?: string[];
  sourceKinds?: ChatSourceKind[];
  confidence?: "low" | "medium" | "high";
  isTyping?: boolean;
  createdAt: number;
};

type ChatbotStreamChunkEvent = {
  type: "chunk";
  delta: string;
};

type ChatbotStreamFinalEvent = {
  type: "final";
  sources: string[];
  suggestions: string[];
  confidence: "low" | "medium" | "high";
  sourceKinds: ChatSourceKind[];
};

type ChatbotStreamErrorEvent = {
  type: "error";
  error: string;
};

type ChatbotStreamEvent =
  | ChatbotStreamChunkEvent
  | ChatbotStreamFinalEvent
  | ChatbotStreamErrorEvent;

type LeadFormState = {
  name: string;
  email: string;
  phone: string;
  postcode: string;
  service: string;
  note: string;
};

const THREAD_STORAGE_KEY = "geogas-chat-thread-v1";

const formatMessage = (text: string): string[] => {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
};

const formatMessageTime = (timestamp: number): string => {
  if (!Number.isFinite(timestamp) || timestamp <= 0) {
    return "Now";
  }

  const date = new Date(timestamp);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

const sanitizeStoredMessages = (value: unknown): ChatMessage[] => {
  if (!Array.isArray(value)) return [];

  return value.reduce<ChatMessage[]>((acc, item) => {
    const role: ChatRole = item?.role === "assistant" ? "assistant" : "user";
    const text = typeof item?.text === "string" ? item.text : "";
    if (!text.trim()) return acc;

    const createdAt =
      typeof item?.createdAt === "number" && Number.isFinite(item.createdAt)
        ? item.createdAt
        : Date.now();

    const sources = Array.isArray(item?.sources)
      ? item.sources.filter(
          (source: unknown): source is string => typeof source === "string"
        )
      : undefined;

    const sourceKinds = Array.isArray(item?.sourceKinds)
      ? item.sourceKinds.filter(
          (kind: unknown): kind is ChatSourceKind =>
            kind === "pricing" ||
            kind === "brochure" ||
            kind === "contracts" ||
            kind === "seo"
        )
      : undefined;

    const confidence =
      item?.confidence === "high" ||
      item?.confidence === "medium" ||
      item?.confidence === "low"
        ? item.confidence
        : undefined;

    acc.push({
      id:
        typeof item?.id === "string" && item.id
          ? item.id
          : `${role}-${createdAt}`,
      role,
      text,
      sources,
      sourceKinds,
      confidence,
      createdAt,
    });

    return acc;
  }, []);
};

const GeoChatbotSection = () => {
  const { content } = useSiteContent();
  const chatbotContent = content.chatbot;

  const initialMessage = useMemo<ChatMessage>(
    () => ({
      id: "initial-assistant",
      role: "assistant",
      text: chatbotContent.initialMessage,
      createdAt: 0,
    }),
    [chatbotContent.initialMessage]
  );

  const defaultLeadForm = useMemo<LeadFormState>(
    () => ({
      name: "",
      email: "",
      phone: "",
      postcode: "",
      service: chatbotContent.defaultService,
      note: "",
    }),
    [chatbotContent.defaultService]
  );

  const [messages, setMessages] = useState<ChatMessage[]>(() => [initialMessage]);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>(
    chatbotContent.quickPrompts
  );
  const [selectedFaqPrompt, setSelectedFaqPrompt] = useState<string>(
    chatbotContent.faqShortcuts[0]?.prompt ?? ""
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [leadForm, setLeadForm] = useState<LeadFormState>(defaultLeadForm);
  const [leadStatus, setLeadStatus] = useState<"idle" | "sending" | "success">(
    "idle"
  );
  const [leadError, setLeadError] = useState<string | null>(null);
  const [showQuickTools, setShowQuickTools] = useState(false);
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (
      messages.length === 1 &&
      messages[0]?.id === "initial-assistant" &&
      messages[0]?.createdAt === 0
    ) {
      setMessages([initialMessage]);
    }
  }, [initialMessage, messages]);

  useEffect(() => {
    if (leadStatus === "idle") {
      setLeadForm(defaultLeadForm);
    }
  }, [defaultLeadForm, leadStatus]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(THREAD_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as {
        messages?: unknown;
        suggestions?: string[];
      };
      const safeMessages = sanitizeStoredMessages(parsed.messages);
      if (safeMessages.length > 0) {
        setMessages(safeMessages);
      }
      if (parsed.suggestions && parsed.suggestions.length > 0) {
        setSuggestions(parsed.suggestions.slice(0, 4));
      }
    } catch {
      window.localStorage.removeItem(THREAD_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      THREAD_STORAGE_KEY,
      JSON.stringify({ messages, suggestions })
    );
  }, [messages, suggestions]);

  useEffect(() => {
    const node = messagesRef.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [messages]);

  const canSend = useMemo(
    () => inputValue.trim().length > 0 && !isSending,
    [inputValue, isSending]
  );

  const lastAssistantMessage = useMemo(() => {
    return [...messages]
      .reverse()
      .find(
        (message) =>
          message.role === "assistant" &&
          !message.isTyping &&
          message.text.trim().length > 0
      );
  }, [messages]);

  const lastUserMessage = useMemo(() => {
    return [...messages]
      .reverse()
      .find((message) => message.role === "user" && message.text.trim().length > 0);
  }, [messages]);

  const showLeadCapture = useMemo(() => {
    if (!lastAssistantMessage) return false;
    if (leadStatus === "success") return false;

    const hasPricingSource = lastAssistantMessage.sourceKinds?.includes("pricing");
    const looksLikePricingAnswer =
      /£|\b(price|pricing|cost|quote|rate|vat|call[- ]?out)\b/i.test(
        lastAssistantMessage.text
      );

    return Boolean(hasPricingSource || looksLikePricingAnswer);
  }, [lastAssistantMessage, leadStatus]);

  const updateAssistantMessage = (
    messageId: string,
    patch: Partial<
      Pick<
        ChatMessage,
        "text" | "sources" | "isTyping" | "confidence" | "sourceKinds"
      >
    >
  ) => {
    setMessages((prev) =>
      prev.map((message) =>
        message.id === messageId ? { ...message, ...patch } : message
      )
    );
  };

  const processStreamLine = (
    line: string,
    assistantId: string
  ): { done: boolean } => {
    const event = JSON.parse(line) as ChatbotStreamEvent;

    if (event.type === "chunk") {
      setMessages((prev) =>
        prev.map((message) =>
          message.id === assistantId
            ? {
                ...message,
                text: `${message.text}${event.delta}`,
                isTyping: true,
              }
            : message
        )
      );
      return { done: false };
    }

    if (event.type === "final") {
      updateAssistantMessage(assistantId, {
        isTyping: false,
        sources: event.sources,
        confidence: event.confidence,
        sourceKinds: event.sourceKinds,
      });
      if (event.suggestions?.length) {
        setSuggestions(event.suggestions.slice(0, 4));
      }
      return { done: true };
    }

    if (event.type === "error") {
      throw new Error(event.error);
    }

    return { done: false };
  };

  const sendMessage = async (rawText?: string) => {
    const text = (rawText ?? inputValue).trim();
    if (!text || isSending) return;

    const history = messages
      .filter((message) => message.text.trim().length > 0)
      .slice(-8)
      .map((message) => ({ role: message.role, text: message.text }));

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text,
      createdAt: Date.now(),
    };

    const assistantId = `assistant-${Date.now()}-stream`;
    const assistantPlaceholder: ChatMessage = {
      id: assistantId,
      role: "assistant",
      text: "",
      isTyping: true,
      createdAt: Date.now(),
    };

    const abortController = new AbortController();
    abortRef.current = abortController;

    setMessages((prev) => [...prev, userMessage, assistantPlaceholder]);
    setInputValue("");
    setError(null);
    setLeadStatus("idle");
    setLeadError(null);
    setIsSending(true);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text, history }),
        signal: abortController.signal,
      });

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string };
        throw new Error(payload.error || "Unable to process chatbot request.");
      }

      if (!response.body) {
        throw new Error("No streamed response body received.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let hasFinal = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) continue;
          const { done: streamDone } = processStreamLine(trimmed, assistantId);
          if (streamDone) {
            hasFinal = true;
          }
        }
      }

      const remaining = buffer.trim();
      if (remaining) {
        const { done: streamDone } = processStreamLine(remaining, assistantId);
        if (streamDone) {
          hasFinal = true;
        }
      }

      if (!hasFinal) {
        updateAssistantMessage(assistantId, { isTyping: false });
      }
    } catch (sendError) {
      const aborted = abortController.signal.aborted;

      updateAssistantMessage(assistantId, {
        isTyping: false,
        text: aborted
          ? "Response stopped. You can ask another question."
          : "I hit an error while responding. Please try again.",
      });

      setError(
        aborted
          ? null
          : sendError instanceof Error
            ? sendError.message
            : "Chatbot request failed."
      );
    } finally {
      setIsSending(false);
      abortRef.current = null;
    }
  };

  const stopStreaming = () => {
    abortRef.current?.abort();
  };

  const clearConversation = () => {
    if (isSending) return;
    setMessages([initialMessage]);
    setSuggestions(chatbotContent.quickPrompts);
    setSelectedFaqPrompt(chatbotContent.faqShortcuts[0]?.prompt ?? "");
    setError(null);
    setCopiedId(null);
    setLeadForm(defaultLeadForm);
    setLeadStatus("idle");
    setLeadError(null);
    window.localStorage.removeItem(THREAD_STORAGE_KEY);
  };

  const copyMessage = async (message: ChatMessage) => {
    if (!message.text.trim()) return;
    await navigator.clipboard.writeText(message.text);
    setCopiedId(message.id);
    window.setTimeout(() => {
      setCopiedId((current) => (current === message.id ? null : current));
    }, 1500);
  };

  const updateLeadField =
    (field: keyof LeadFormState) =>
    (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
      const value = event.target.value;
      setLeadForm((prev) => ({ ...prev, [field]: value }));
    };

  const submitLead = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (leadStatus === "sending") return;

    const name = leadForm.name.trim();
    const email = leadForm.email.trim();
    const phone = leadForm.phone.trim();
    const postcode = leadForm.postcode.trim();
    const service = leadForm.service.trim();

    if (!name || !email || !phone || !postcode || !service) {
      setLeadError("Name, email, phone, postcode and service are required.");
      return;
    }

    setLeadStatus("sending");
    setLeadError(null);

    try {
      const response = await fetch("/api/chatbot/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...leadForm,
          sourceQuestion: lastUserMessage?.text || "",
          sourceAnswer: lastAssistantMessage?.text || "",
        }),
      });

      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(payload.error || "Unable to submit lead right now.");
      }

      setLeadStatus("success");
      setLeadForm(defaultLeadForm);
    } catch (submitError) {
      setLeadStatus("idle");
      setLeadError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to submit lead right now."
      );
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage();
  };

  const askSelectedTopic = () => {
    if (!selectedFaqPrompt || isSending) return;
    void sendMessage(selectedFaqPrompt);
  };

  return (
    <section className="chatbot__section section-padding pt-0">
      <div className="container">
        <div className="chatbot__shell">
          <div className="chatbot__heading">
            <span>{chatbotContent.eyebrow}</span>
            <h2>{chatbotContent.title}</h2>
            <p>{chatbotContent.description}</p>
            <div className="chatbot__heading-actions">
              <button type="button" onClick={clearConversation} disabled={isSending}>
                {chatbotContent.newChatLabel}
              </button>
              <button
                type="button"
                className="chatbot__toggle"
                onClick={() => setShowQuickTools((prev) => !prev)}
              >
                {showQuickTools
                  ? chatbotContent.hideQuickToolsLabel
                  : chatbotContent.showQuickToolsLabel}
              </button>
            </div>
          </div>

          {showQuickTools ? (
            <div className="chatbot__tools">
              <div className="chatbot__faq">
                <p>{chatbotContent.quickTopicsLabel}</p>
                <div className="chatbot__faq-controls">
                  <select
                    value={selectedFaqPrompt}
                    onChange={(event) => setSelectedFaqPrompt(event.target.value)}
                    aria-label="Choose a quick topic"
                    disabled={isSending}
                  >
                    {chatbotContent.faqShortcuts.map((shortcut) => (
                      <option key={shortcut.label} value={shortcut.prompt}>
                        {shortcut.label}
                      </option>
                    ))}
                  </select>
                  <button type="button" onClick={askSelectedTopic} disabled={isSending}>
                    {chatbotContent.askTopicLabel}
                  </button>
                </div>
              </div>

              <div className="chatbot__quick">
                {suggestions.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => void sendMessage(prompt)}
                    disabled={isSending}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div className="chatbot__conversation">
            <div className="chatbot__conversation-head">
              <h4>{chatbotContent.conversationTitle}</h4>
              <p>{chatbotContent.conversationDescription}</p>
            </div>

            <div className="chatbot__messages" aria-live="polite" ref={messagesRef}>
              {messages.map((message) => (
                <article
                  key={message.id}
                  className={
                    "chatbot__message " +
                    (message.role === "assistant"
                      ? "chatbot__message--assistant"
                      : "chatbot__message--user")
                  }
                >
                  <div className="chatbot__message-role">
                    {message.role === "assistant" ? "Geo Bot" : "You"} |{" "}
                    {formatMessageTime(message.createdAt)}
                  </div>
                  <div className="chatbot__message-content">
                    {message.text ? (
                      formatMessage(message.text).map((line, index) => (
                        <p key={`${message.id}-${index}`}>{line}</p>
                      ))
                    ) : (
                      <p>Thinking through your request...</p>
                    )}
                  </div>
                  {message.isTyping ? (
                    <div className="chatbot__typing" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </div>
                  ) : null}
                  {message.role === "assistant" && !message.isTyping && message.text ? (
                    <div className="chatbot__meta">
                      <button type="button" onClick={() => void copyMessage(message)}>
                        {copiedId === message.id ? "Copied" : "Copy"}
                      </button>
                    </div>
                  ) : null}
                </article>
              ))}
            </div>

            <form className="chatbot__form" onSubmit={onSubmit}>
              <input
                type="text"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                placeholder={chatbotContent.inputPlaceholder}
                aria-label="Ask the Geo Gas chatbot"
                disabled={isSending}
              />
              <button type="submit" disabled={!canSend}>
                {isSending
                  ? chatbotContent.askButtonLoadingLabel
                  : chatbotContent.askButtonLabel}
              </button>
              {isSending ? (
                <button
                  type="button"
                  className="chatbot__stop"
                  onClick={stopStreaming}
                >
                  {chatbotContent.stopButtonLabel}
                </button>
              ) : null}
            </form>

            <div className="chatbot__status">
              <span />
              <p>{chatbotContent.statusText}</p>
            </div>
            {error ? <p className="chatbot__error">{error}</p> : null}
          </div>

          {showLeadCapture ? (
            <div className="chatbot__handoff">
              <div className="chatbot__handoff-head">
                <h4>{chatbotContent.leadCaptureHeading}</h4>
                <p>{chatbotContent.leadCaptureDescription}</p>
              </div>
              {leadStatus === "success" ? (
                <div className="chatbot__handoff-success">
                  <p>{chatbotContent.leadSuccessMessage}</p>
                  <div className="chatbot__handoff-actions">
                    <a href={content.global.emergencyPhoneHref}>
                      {chatbotContent.leadEmergencyCtaLabel}
                    </a>
                    <Link href="/contact">{chatbotContent.leadContactCtaLabel}</Link>
                  </div>
                </div>
              ) : (
                <form className="chatbot__handoff-form" onSubmit={submitLead}>
                  <input
                    type="text"
                    value={leadForm.name}
                    onChange={updateLeadField("name")}
                    placeholder={chatbotContent.fieldPlaceholders.name}
                    aria-label="Full name"
                    required
                  />
                  <input
                    type="email"
                    value={leadForm.email}
                    onChange={updateLeadField("email")}
                    placeholder={chatbotContent.fieldPlaceholders.email}
                    aria-label="Email address"
                    required
                  />
                  <input
                    type="text"
                    value={leadForm.phone}
                    onChange={updateLeadField("phone")}
                    placeholder={chatbotContent.fieldPlaceholders.phone}
                    aria-label="Phone number"
                    required
                  />
                  <input
                    type="text"
                    value={leadForm.postcode}
                    onChange={updateLeadField("postcode")}
                    placeholder={chatbotContent.fieldPlaceholders.postcode}
                    aria-label="Postcode"
                    required
                  />
                  <input
                    type="text"
                    value={leadForm.service}
                    onChange={updateLeadField("service")}
                    placeholder={chatbotContent.fieldPlaceholders.service}
                    aria-label="Service required"
                    required
                  />
                  <textarea
                    value={leadForm.note}
                    onChange={updateLeadField("note")}
                    placeholder={chatbotContent.fieldPlaceholders.note}
                    aria-label="Additional details"
                  />
                  <button type="submit" disabled={leadStatus === "sending"}>
                    {leadStatus === "sending"
                      ? chatbotContent.submitLeadLoadingLabel
                      : chatbotContent.submitLeadLabel}
                  </button>
                </form>
              )}
              {leadError ? <p className="chatbot__lead-error">{leadError}</p> : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default GeoChatbotSection;
