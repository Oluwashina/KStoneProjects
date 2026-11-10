import { emptyEnquiry, serviceOptions, validateEnquiry, type EnquiryFields } from "@/lib/validation";

/**
 * POST /api/enquiry
 *
 * Validates a business enquiry on the server (never trust the client) and
 * hands it to a delivery channel.
 *
 * Delivery is intentionally pluggable so no backend is needed to launch:
 *   • Set ENQUIRY_WEBHOOK_URL to forward each enquiry as JSON to Zapier, Make,
 *     Formspree, Slack, an email API proxy, a CMS, etc.
 *   • Swap `deliver()` for a direct integration (Resend, SendGrid, SMTP, CRM…).
 *
 * In development, enquiries are logged to the server console. In production, if
 * no delivery channel is configured the route responds with 503 rather than
 * pretending the enquiry was sent.
 */

const MAX_BODY_BYTES = 16_000;

function json(body: unknown, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

async function deliver(enquiry: EnquiryFields): Promise<"sent" | "logged" | "unconfigured"> {
  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  const serviceLabel = serviceOptions.find((o) => o.value === enquiry.service)?.label ?? enquiry.service;
  const payload = {
    receivedAt: new Date().toISOString(),
    type: enquiry.kind,
    fullName: enquiry.fullName.trim(),
    organisation: enquiry.organisation.trim(),
    email: enquiry.email.trim(),
    phone: enquiry.phone.trim(),
    subject: enquiry.subject.trim(),
    service: serviceLabel,
    partnerType: enquiry.kind === "partnership" ? enquiry.partnerType : undefined,
    message: enquiry.message.trim(),
    source: "kstone-projects-website",
  };

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
    console.info("[enquiry] (dev — not delivered anywhere)\n", payload);
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
      console.error("[enquiry] No delivery channel configured. Set ENQUIRY_WEBHOOK_URL.");
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
