import nodemailer from "nodemailer";
import { site } from "@/data/site";
import { partnerTypeOptions, serviceOptions, type EnquiryFields } from "@/lib/validation";

export type EnquiryMailPayload = {
  receivedAt: string;
  type: EnquiryFields["kind"];
  fullName: string;
  organisation: string;
  email: string;
  phone: string;
  subject: string;
  service: string;
  partnerType?: string;
  message: string;
  source: string;
};

export function buildEnquiryPayload(enquiry: EnquiryFields): EnquiryMailPayload {
  const serviceLabel = serviceOptions.find((o) => o.value === enquiry.service)?.label ?? enquiry.service;
  const partnerLabel =
    enquiry.kind === "partnership"
      ? partnerTypeOptions.find((o) => o.value === enquiry.partnerType)?.label ?? enquiry.partnerType
      : undefined;

  return {
    receivedAt: new Date().toISOString(),
    type: enquiry.kind,
    fullName: enquiry.fullName.trim(),
    organisation: enquiry.organisation.trim(),
    email: enquiry.email.trim(),
    phone: enquiry.phone.trim(),
    subject: enquiry.subject.trim(),
    service: serviceLabel,
    partnerType: partnerLabel,
    message: enquiry.message.trim(),
    source: "Kstone Projects Website",
  };
}

const FONT = "Segoe UI, Helvetica, Arial, sans-serif";
const BRAND = "#0155CF";
const NAVY = "#10233F";
const SLATE = "#566170";
const LINE = "#E2E6EC";
const ARCH = "#F4F6F9";

function esc(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function formatReceived(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone: "Africa/Lagos",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

/** Fixed label column + value column; works in Gmail/Apple Mail. */
function detailRow(label: string, valueHtml: string): string {
  return `
    <tr>
      <td style="padding:0;border-bottom:1px solid ${LINE};">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;table-layout:fixed;">
          <tr>
            <td width="128" style="width:128px;max-width:128px;padding:13px 0 13px 24px;font-family:${FONT};font-size:11px;font-weight:600;letter-spacing:0.07em;text-transform:uppercase;color:${SLATE};vertical-align:top;line-height:1.35;">${esc(label)}</td>
            <td style="padding:13px 24px 13px 12px;font-family:${FONT};font-size:15px;line-height:1.45;color:${NAVY};vertical-align:top;word-break:break-word;">${valueHtml}</td>
          </tr>
        </table>
      </td>
    </tr>`;
}

function plainValue(text: string) {
  return esc(text);
}

function mailLink(email: string) {
  const e = esc(email);
  return `<a href="mailto:${e}" style="color:${BRAND};text-decoration:none;font-weight:500;">${e}</a>`;
}

function telLink(phone: string) {
  const digits = phone.replace(/[^\d+]/g, "");
  const display = esc(phone);
  return `<a href="tel:${esc(digits)}" style="color:${BRAND};text-decoration:none;font-weight:500;">${display}</a>`;
}

function buildHtml(payload: EnquiryMailPayload): string {
  const isPartnership = payload.type === "partnership";
  const heading = isPartnership ? "Partnership enquiry" : "Project enquiry";
  const badge = isPartnership ? "Partnership" : "Enquiry";

  const rows = [
    detailRow("Received", `<span style="color:#252A30;">${esc(formatReceived(payload.receivedAt))}</span>`),
    detailRow("Name", plainValue(payload.fullName)),
    detailRow("Organisation", plainValue(payload.organisation)),
    detailRow("Email", mailLink(payload.email)),
    detailRow("Phone", telLink(payload.phone)),
    detailRow("Subject", plainValue(payload.subject)),
    detailRow("Service", plainValue(payload.service)),
    ...(isPartnership && payload.partnerType ? [detailRow("Org. type", plainValue(payload.partnerType))] : []),
  ].join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(heading)}</title>
</head>
<body style="margin:0;padding:32px 16px;background:${ARCH};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="border-collapse:collapse;max-width:600px;width:100%;background:#ffffff;border:1px solid ${LINE};">
          <tr>
            <td style="background:${BRAND};padding:28px 24px 26px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                <tr>
                  <td valign="middle" style="font-family:${FONT};font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.9);line-height:1.3;">${esc(site.name)}</td>
                  <td align="right" valign="middle" width="1" style="width:1px;white-space:nowrap;padding:0 0 0 12px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" align="right" style="border-collapse:collapse;">
                      <tr>
                        <td style="background:#ffffff;font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${NAVY};padding:7px 14px;line-height:1;text-align:center;white-space:nowrap;">${esc(badge)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top:14px;font-family:${FONT};font-size:24px;font-weight:700;line-height:1.25;color:#ffffff;">${esc(heading)}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 0 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${rows}</table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 24px 24px;">
              <p style="margin:0 0 10px;font-family:${FONT};font-size:11px;font-weight:600;letter-spacing:0.07em;text-transform:uppercase;color:${SLATE};">Message</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:${ARCH};border:1px solid ${LINE};border-left:4px solid ${BRAND};">
                <tr>
                  <td style="padding:16px 18px;font-family:${FONT};font-size:15px;line-height:1.6;color:#252A30;">${esc(payload.message).replace(/\n/g, "<br />")}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 24px 22px;border-top:1px solid ${LINE};font-family:${FONT};font-size:12px;line-height:1.5;color:#A7B0BD;">
              Sent from the ${esc(payload.source)} · Use <strong style="color:${SLATE};font-weight:600;">Reply</strong> to reach ${esc(payload.fullName)} at ${esc(payload.email)}.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildText(payload: EnquiryMailPayload): string {
  const lines = [
    payload.type === "partnership" ? "NEW PARTNERSHIP ENQUIRY" : "NEW PROJECT ENQUIRY",
    "—".repeat(40),
    `Received: ${formatReceived(payload.receivedAt)}`,
    `Name: ${payload.fullName}`,
    `Organisation: ${payload.organisation}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    `Subject: ${payload.subject}`,
    `Service: ${payload.service}`,
  ];
  if (payload.type === "partnership" && payload.partnerType) {
    lines.push(`Organisation type: ${payload.partnerType}`);
  }
  lines.push("", "Message:", payload.message, "", `Source: ${payload.source}`);
  return lines.join("\n");
}

export function enquiryMailSubject(payload: EnquiryMailPayload): string {
  const prefix = payload.type === "partnership" ? "[Partnership]" : "[Enquiry]";
  const topic = payload.subject.length > 80 ? `${payload.subject.slice(0, 77)}…` : payload.subject;
  return `${prefix} ${topic} — ${payload.organisation}`;
}

export async function sendEnquiryViaGmail(payload: EnquiryMailPayload): Promise<void> {
  const user = process.env.GMAIL_USER?.trim();
  const pass = process.env.GMAIL_APP_PASSWORD?.trim().replace(/\s/g, "");
  if (!user || !pass) {
    throw new Error("Gmail SMTP is not configured (GMAIL_USER / GMAIL_APP_PASSWORD).");
  }

  const to = process.env.ENQUIRY_NOTIFY_TO?.trim() || user;

  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });

  await transport.sendMail({
    from: `${site.name} <${user}>`,
    to,
    replyTo: `"${payload.fullName}" <${payload.email}>`,
    subject: enquiryMailSubject(payload),
    text: buildText(payload),
    html: buildHtml(payload),
  });
}

export function gmailSmtpConfigured(): boolean {
  return Boolean(process.env.GMAIL_USER?.trim() && process.env.GMAIL_APP_PASSWORD?.trim());
}
