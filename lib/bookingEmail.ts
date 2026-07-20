import nodemailer from "nodemailer";

export type BookingEmail = {
  name: string;
  email: string;
  phone: string;
  postcode?: string;
  service?: string;
  details?: string;
  source: string;
  receivedAt: string;
  sourceQuestion?: string;
  sourceAnswer?: string;
};

type GmailSmtpConfiguration = {
  user: string;
  appPassword: string;
  recipient: string;
};

const getEnvironmentValue = (name: string): string => process.env[name]?.trim() ?? "";

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");

const formatValue = (value?: string): string => value?.trim() || "Not provided";

const asTextLines = (booking: BookingEmail): string[] => [
  "New GEO Gas website booking request",
  "",
  `Received: ${booking.receivedAt}`,
  `Source: ${booking.source}`,
  `Name: ${booking.name}`,
  `Email: ${booking.email}`,
  `Phone: ${booking.phone}`,
  `Postcode: ${formatValue(booking.postcode)}`,
  `Service: ${formatValue(booking.service)}`,
  "",
  "Customer details:",
  formatValue(booking.details),
  ...(booking.sourceQuestion
    ? ["", "Chatbot question:", booking.sourceQuestion]
    : []),
  ...(booking.sourceAnswer
    ? ["", "Chatbot answer:", booking.sourceAnswer]
    : []),
];

const asHtml = (booking: BookingEmail): string => {
  const row = (label: string, value?: string) =>
    `<tr><th align="left" style="padding: 4px 12px 4px 0; vertical-align: top;">${escapeHtml(
      label
    )}</th><td style="padding: 4px 0;">${escapeHtml(formatValue(value))}</td></tr>`;

  const details = escapeHtml(formatValue(booking.details)).replace(/\n/g, "<br />");
  const chatbotContext = booking.sourceQuestion
    ? `<h2 style="font-size: 16px; margin: 24px 0 8px;">Chatbot context</h2>
       <p><strong>Question:</strong><br />${escapeHtml(booking.sourceQuestion).replace(/\n/g, "<br />")}</p>
       <p><strong>Answer:</strong><br />${escapeHtml(booking.sourceAnswer ?? "").replace(/\n/g, "<br />")}</p>`
    : "";

  return `<h1 style="font-size: 20px;">New GEO Gas website booking request</h1>
    <table style="border-collapse: collapse;">
      ${row("Received", booking.receivedAt)}
      ${row("Source", booking.source)}
      ${row("Name", booking.name)}
      ${row("Email", booking.email)}
      ${row("Phone", booking.phone)}
      ${row("Postcode", booking.postcode)}
      ${row("Service", booking.service)}
    </table>
    <h2 style="font-size: 16px; margin: 24px 0 8px;">Customer details</h2>
    <p>${details}</p>
    ${chatbotContext}`;
};

/**
 * Returns null when Gmail SMTP has not been configured at all. A partial
 * configuration is an error so a deployment cannot silently fall back to a
 * different delivery method while appearing to use Gmail.
 */
const getGmailSmtpConfiguration = (): GmailSmtpConfiguration | null => {
  const user = getEnvironmentValue("GMAIL_SMTP_USER");
  // Google displays App Passwords in groups. Accept either the grouped or
  // ungrouped form when it is pasted into the deployment environment.
  const appPassword = getEnvironmentValue("GMAIL_SMTP_APP_PASSWORD").replace(
    /\s/g,
    ""
  );
  const recipient = getEnvironmentValue("BOOKING_NOTIFICATION_TO");
  const configuredCount = [user, appPassword, recipient].filter(Boolean).length;

  if (configuredCount === 0) return null;

  if (configuredCount !== 3) {
    throw new Error("Gmail SMTP configuration is incomplete.");
  }

  return { user, appPassword, recipient };
};

export const sendBookingEmail = async (booking: BookingEmail): Promise<boolean> => {
  const configuration = getGmailSmtpConfiguration();

  if (!configuration) return false;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: configuration.user,
      pass: configuration.appPassword,
    },
  });

  await transporter.sendMail({
    from: `GEO Gas Website <${configuration.user}>`,
    to: configuration.recipient,
    replyTo: booking.email,
    subject: `New booking: ${booking.name}${booking.service ? ` — ${booking.service}` : ""}`,
    text: asTextLines(booking).join("\n"),
    html: asHtml(booking),
  });

  return true;
};
