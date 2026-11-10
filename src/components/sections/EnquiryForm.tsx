"use client";

import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import {
  emptyEnquiry,
  partnerTypeOptions,
  serviceOptions,
  validateEnquiry,
  type EnquiryFields,
  type EnquiryKind,
  type FieldErrors,
} from "@/lib/validation";
import { cn } from "@/lib/cn";

type Status = "idle" | "submitting" | "success" | "error";

const inputBase =
  "block w-full border bg-white px-4 font-ui text-base text-graphite placeholder:text-concrete " +
  "transition-[border-color,box-shadow] duration-200 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15";

function Field({
  id,
  label,
  error,
  hint,
  required = true,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between font-ui text-sm font-semibold text-navy">
        <span>
          {label}
          {required && (
            <span aria-hidden className="ml-0.5 text-brand">
              *
            </span>
          )}
        </span>
        {!required && <span className="text-xs font-normal text-slate">Optional</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 font-ui text-xs text-slate">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-start gap-1.5 font-ui text-sm text-[#b42318]">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}

export function EnquiryForm({ kind = "general", formId = "enquiry" }: { kind?: EnquiryKind; formId?: string }) {
  const uid = useId();
  const params = useSearchParams();
  const requested = params.get("service");

  const [values, setValues] = useState<EnquiryFields>(() => {
    const base = emptyEnquiry(kind);
    if (kind === "general" && requested && serviceOptions.some((o) => o.value === requested)) {
      const svc = serviceOptions.find((o) => o.value === requested)!;
      return { ...base, service: svc.value, subject: svc.value === "other" ? "" : `Enquiry: ${svc.label}` };
    }
    return base;
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof EnquiryFields, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState<string>("");
  const successRef = useRef<HTMLHeadingElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
    if (status === "error") errorRef.current?.focus();
  }, [status]);

  const id = (name: string) => `${uid}-${name}`;

  const update =
    (name: keyof EnquiryFields) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const next = { ...values, [name]: e.target.value };
      setValues(next);
      if (touched[name]) setErrors((prev) => ({ ...prev, [name]: validateEnquiry(next)[name] }));
    };

  const blur = (name: keyof EnquiryFields) => () => {
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateEnquiry(values)[name] }));
  };

  const fieldProps = (name: keyof EnquiryFields) => ({
    id: id(name),
    name,
    value: values[name],
    onChange: update(name),
    onBlur: blur(name),
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${id(name)}-error` : undefined,
    disabled: status === "submitting",
  });

  const cls = (name: keyof EnquiryFields) =>
    cn(inputBase, errors[name] ? "border-[#b42318] focus:border-[#b42318] focus:ring-[#b42318]/15" : "border-line hover:border-concrete");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const found = validateEnquiry(values);
    setErrors(found);
    setTouched(Object.fromEntries(Object.keys(values).map((k) => [k, true])));
    const first = Object.keys(found)[0] as keyof EnquiryFields | undefined;
    if (first) {
      document.getElementById(id(first))?.focus();
      return;
    }

    setStatus("submitting");
    setServerMessage("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; errors?: FieldErrors; message?: string };
      if (res.ok && data.ok) {
        setStatus("success");
        return;
      }
      if (data.errors) setErrors(data.errors);
      setServerMessage(data.message ?? "We could not send your enquiry. Please check the details and try again.");
      setStatus("error");
    } catch {
      setServerMessage("We could not reach the server. Please check your connection and try again.");
      setStatus("error");
    }
  }

  function reset() {
    setValues(emptyEnquiry(kind));
    setErrors({});
    setTouched({});
    setStatus("idle");
  }

  if (status === "success") {
    return (
      <div className="border border-line bg-white p-8 sm:p-12" role="status">
        <CheckCircle2 className="size-12 text-brand" strokeWidth={1.5} aria-hidden />
        <h3 ref={successRef} tabIndex={-1} className="h3 mt-6 text-navy outline-none">
          Thank you — your {kind === "partnership" ? "partnership enquiry" : "enquiry"} has been received.
        </h3>
        <p className="mt-4 max-w-lg text-slate">
          A member of the Kstone Projects team will review your message and respond to <strong className="text-navy">{values.email}</strong>.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 font-ui text-sm font-semibold text-brand underline underline-offset-4 hover:text-brand-600"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form id={formId} onSubmit={onSubmit} noValidate aria-busy={submitting} className="border border-line bg-white p-6 sm:p-10">
      {status === "error" && (
        <div
          ref={errorRef}
          tabIndex={-1}
          role="alert"
          className="mb-8 flex items-start gap-3 border border-[#f1b5ae] bg-[#fef3f2] p-4 font-ui text-sm text-[#7a271a] outline-none"
        >
          <AlertCircle className="mt-0.5 size-5 shrink-0" aria-hidden />
          <p>{serverMessage}</p>
        </div>
      )}

      <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
        <Field id={id("fullName")} label="Full name" error={errors.fullName}>
          <input type="text" autoComplete="name" placeholder="Your full name" {...fieldProps("fullName")} className={cn(cls("fullName"), "h-14")} />
        </Field>
        <Field id={id("organisation")} label="Organisation" error={errors.organisation}>
          <input type="text" autoComplete="organization" placeholder="Company or institution" {...fieldProps("organisation")} className={cn(cls("organisation"), "h-14")} />
        </Field>
        <Field id={id("email")} label="Email address" error={errors.email}>
          <input type="email" inputMode="email" autoComplete="email" placeholder="name@organisation.com" {...fieldProps("email")} className={cn(cls("email"), "h-14")} />
        </Field>
        <Field id={id("phone")} label="Phone number" error={errors.phone} hint="Include the country code if outside Nigeria.">
          <input type="tel" inputMode="tel" autoComplete="tel" placeholder="+234 …" {...fieldProps("phone")} className={cn(cls("phone"), "h-14")} />
        </Field>

        {kind === "partnership" && (
          <Field id={id("partnerType")} label="Type of organisation" error={errors.partnerType} className="sm:col-span-2">
            <select {...fieldProps("partnerType")} className={cn(cls("partnerType"), "h-14 select-chevron pr-10")}>
              <option value="">Select organisation type</option>
              {partnerTypeOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>
        )}

        <Field id={id("subject")} label="Subject" error={errors.subject}>
          <input type="text" placeholder="Brief subject of your enquiry" {...fieldProps("subject")} className={cn(cls("subject"), "h-14")} />
        </Field>
        <Field id={id("service")} label="Service of interest" error={errors.service}>
          <select {...fieldProps("service")} className={cn(cls("service"), "h-14 select-chevron pr-10")}>
            <option value="">Select a service</option>
            {serviceOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>

        <Field id={id("message")} label="Message" error={errors.message} hint={`${values.message.trim().length}/4000`} className="sm:col-span-2">
          <textarea
            rows={6}
            placeholder={kind === "partnership" ? "Tell us about your organisation and the collaboration you have in mind." : "Tell us about your project, location, scope and timeline."}
            {...fieldProps("message")}
            className={cn(cls("message"), "resize-y py-4 leading-relaxed")}
          />
        </Field>

        {/* Honeypot: hidden from people and assistive tech, attractive to bots. */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor={id("website")}>Leave this field empty</label>
          <input id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={update("website")} />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm font-ui text-xs leading-relaxed text-slate">
          By submitting, you agree that Kstone Projects may use your details to respond to your enquiry. We do not share
          your information.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="group/btn inline-flex h-14 shrink-0 items-center justify-center gap-3 bg-brand px-8 font-ui text-base font-semibold text-white transition-colors hover:bg-brand-600 disabled:cursor-wait disabled:opacity-80"
        >
          {submitting ? (
            <>
              <Loader2 className="size-5 animate-spin" aria-hidden /> Sending…
            </>
          ) : (
            <>
              {kind === "partnership" ? "Send partnership enquiry" : "Send enquiry"}
              <Send className="size-4 transition-transform group-hover/btn:translate-x-0.5" aria-hidden />
            </>
          )}
        </button>
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {submitting ? "Sending your enquiry" : ""}
      </p>
    </form>
  );
}

/** Layout-stable placeholder while search params resolve. */
export function EnquiryFormFallback() {
  return <div aria-hidden className="min-h-[44rem] animate-pulse border border-line bg-arch" />;
}
