import { services } from "@/data/services";

/** Shared between the client form (instant feedback) and the API route (authority). */

export type EnquiryKind = "general" | "partnership";

export const serviceOptions: { value: string; label: string }[] = [
  ...services.map((s) => ({ value: s.slug, label: s.title })),
  { value: "strategic-partnership", label: "Strategic partnership" },
  { value: "other", label: "Other" },
];

export const partnerTypeOptions: { value: string; label: string }[] = [
  { value: "engineering-construction", label: "Engineering / construction firm" },
  { value: "infrastructure-developer", label: "Infrastructure developer" },
  { value: "oil-gas", label: "Oil & gas organisation" },
  { value: "marine-engineering", label: "Marine engineering company" },
  { value: "supplier", label: "Equipment / materials supplier" },
  { value: "real-estate", label: "Real estate developer" },
  { value: "international", label: "International project stakeholder" },
  { value: "other", label: "Other" },
];

export type EnquiryFields = {
  kind: EnquiryKind;
  fullName: string;
  organisation: string;
  email: string;
  phone: string;
  subject: string;
  service: string;
  partnerType: string;
  message: string;
  /** Honeypot — must stay empty. */
  website: string;
};

export type FieldErrors = Partial<Record<keyof EnquiryFields, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// International numbers: digits, spaces, +, -, (, ) — 7 to 16 digits.
const PHONE_CHARS = /^[+\d][\d\s().-]*$/;

export function validateEnquiry(f: EnquiryFields): FieldErrors {
  const e: FieldErrors = {};
  const name = f.fullName.trim();
  if (!name) e.fullName = "Please enter your full name.";
  else if (name.length < 2) e.fullName = "Please enter your full name.";
  else if (name.length > 120) e.fullName = "Name is too long.";

  if (!f.organisation.trim()) e.organisation = "Please enter your organisation.";
  else if (f.organisation.length > 160) e.organisation = "Organisation name is too long.";

  const email = f.email.trim();
  if (!email) e.email = "Please enter your email address.";
  else if (!EMAIL.test(email)) e.email = "Please enter a valid email address.";

  const phone = f.phone.trim();
  if (!phone) e.phone = "Please enter a phone number.";
  else {
    const digits = phone.replace(/\D/g, "");
    if (!PHONE_CHARS.test(phone) || digits.length < 7 || digits.length > 16)
      e.phone = "Please enter a valid phone number, including country code if outside Nigeria.";
  }

  const subject = f.subject.trim();
  if (!subject) e.subject = "Please add a subject.";
  else if (subject.length > 160) e.subject = "Subject is too long.";

  if (!f.service) e.service = "Please choose a service of interest.";
  else if (!serviceOptions.some((o) => o.value === f.service))
    e.service = "Please choose a service from the list.";

  if (f.kind === "partnership") {
    if (!f.partnerType) e.partnerType = "Please tell us what type of organisation you represent.";
    else if (!partnerTypeOptions.some((o) => o.value === f.partnerType))
      e.partnerType = "Please choose an option from the list.";
  }

  const message = f.message.trim();
  if (!message) e.message = "Please tell us about your enquiry.";
  else if (message.length < 20) e.message = "Please provide a little more detail (at least 20 characters).";
  else if (message.length > 4000) e.message = "Message is too long (maximum 4,000 characters).";

  return e;
}

export const emptyEnquiry = (kind: EnquiryKind): EnquiryFields => ({
  kind,
  fullName: "",
  organisation: "",
  email: "",
  phone: "",
  subject: "",
  service: kind === "partnership" ? "strategic-partnership" : "",
  partnerType: "",
  message: "",
  website: "",
});
