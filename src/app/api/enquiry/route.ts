import { buildEnquiryPayload, gmailSmtpConfigured, sendEnquiryViaGmail } from "@/lib/enquiry-mail";
import { emptyEnquiry, validateEnquiry, type EnquiryFields } from "@/lib/validation";

/**
 * POST /api/enquiry
 *
 * Validates on the server and delivers internally:
 *   1. Gmail SMTP when GMAIL_USER + GMAIL_APP_PASSWORD are set (see .env.example)
 *   2. Else ENQUIRY_WEBHOOK_URL if set
 *   3. Else console log in development only
 *
 * Production returns 503 if no channel is configured — enquiries are never faked as sent.
 */

const MAX_BODY_BYTES = 16_000;

function json(body: unknown, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

async function deliver(enquiry: EnquiryFields): Promise<"sent" | "logged" | "unconfigured"> {
  const payload = buildEnquiryPayload(enquiry);

  if (gmailSmtpConfigured()) {
    await sendEnquiryViaGmail(payload);
    return "sent";
  }

  const webhook = process.env.ENQUIRY_WEBHOOK_URL?.trim();
  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return "sent";
  }

  if (process.env.NODE_ENV !== "production") {
    console.info("[enquiry] (dev — not delivered; set GMAIL_* in .env.local to test email)\n", payload);
    return "logged";
  }
  return "unconfigured";
}

export async function POST(request: Request) {
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) return json({ ok: false, message: "Your message is too large." }, 413);

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json({ ok: false, message: "Invalid request." }, 400);
  }
  if (typeof raw !== "object" || raw === null) return json({ ok: false, message: "Invalid request." }, 400);

  // Coerce to known string fields only.
  const r = raw as Record<string, unknown>;
  const str = (k: string) => (typeof r[k] === "string" ? (r[k] as string) : "");
  const kind = r.kind === "partnership" ? "partnership" : "general";
  const enquiry: EnquiryFields = {
    ...emptyEnquiry(kind),
    fullName: str("fullName"),
    organisation: str("organisation"),
    email: str("email"),
    phone: str("phone"),
    subject: str("subject"),
    service: str("service"),
    partnerType: str("partnerType"),
    message: str("message"),
    website: str("website"),
  };

  // Honeypot tripped: pretend success so bots learn nothing.
  if (enquiry.website.trim() !== "") return json({ ok: true });

  const errors = validateEnquiry(enquiry);
  if (Object.keys(errors).length) {
    return json({ ok: false, errors, message: "Please correct the highlighted fields." }, 422);
  }

  try {
    const result = await deliver(enquiry);
    if (result === "unconfigured") {
      console.error("[enquiry] No delivery channel configured. Set GMAIL_USER + GMAIL_APP_PASSWORD (see .env.example).");
      return json(
        {
          ok: false,
          message: "Online enquiries are not available just yet. Please try again shortly or contact us by another route.",
        },
        503,
      );
    }
    return json({ ok: true });
  } catch (error) {
    console.error("[enquiry] Delivery failed:", error);
    return json({ ok: false, message: "We could not send your enquiry. Please try again in a moment." }, 502);
  }
}
