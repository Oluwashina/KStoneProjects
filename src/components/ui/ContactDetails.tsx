import { Mail, MapPin, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedinIcon, XIcon } from "./BrandIcons";
import type { ReactNode } from "react";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

/**
 * Renders official contact details, or an honest placeholder when a value has
 * not been supplied yet. Edit values in src/data/site.ts.
 */

const Pending = ({ children }: { children: ReactNode }) => (
  <span className="italic opacity-65">{children}</span>
);

type Tone = "dark" | "light";

function telHref(display: string) {
  const digits = display.replace(/\D/g, "");
  return digits.startsWith("0") ? `tel:+234${digits.slice(1)}` : `tel:${digits}`;
}

export function ContactList({ tone = "dark", className }: { tone?: Tone; className?: string }) {
  const { email, phones, addresses } = site.contact;
  const iconCls = cn("mt-1 size-[1.05rem] shrink-0", tone === "dark" ? "text-[#8fb4f2]" : "text-brand");
  const linkCls = cn(
    "underline-offset-4 transition-colors hover:underline",
    tone === "dark" ? "hover:text-white" : "hover:text-brand",
  );

  return (
    <ul className={cn("space-y-4", className)}>
      <li className="flex gap-3">
        <Mail className={iconCls} aria-hidden />
        <div>
          <p className="ui-label opacity-60">Email</p>
          {email ? (
            <a href={`mailto:${email}`} className={linkCls}>
              {email}
            </a>
          ) : (
            <Pending>Official company email — to be confirmed</Pending>
          )}
        </div>
      </li>
      <li className="flex gap-3">
        <Phone className={iconCls} aria-hidden />
        <div>
          <p className="ui-label opacity-60">Telephone</p>
          {phones.length ? (
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
              {phones.map((phone, i) => (
                <span key={phone} className="inline-flex items-center gap-2">
                  {i > 0 ? (
                    <span aria-hidden className="text-concrete">
                      |
                    </span>
                  ) : null}
                  <a href={telHref(phone)} className={linkCls}>
                    {phone}
                  </a>
                </span>
              ))}
            </p>
          ) : (
            <Pending>Nigerian phone number — to be confirmed</Pending>
          )}
        </div>
      </li>
      <li className="flex gap-3">
        <MapPin className={iconCls} aria-hidden />
        <div>
          <p className="ui-label opacity-60">{addresses.length > 1 ? "Offices" : "Office"}</p>
          {addresses.length ? (
            <div className="space-y-4">
              {addresses.map((entry) => (
                <address key={entry.label} className="not-italic">
                  {addresses.length > 1 ? <span className="ui-label mb-1 block text-[0.7rem] opacity-70">{entry.label}</span> : null}
                  {entry.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </address>
              ))}
            </div>
          ) : (
            <Pending>Office address — to be confirmed</Pending>
          )}
        </div>
      </li>
    </ul>
  );
}

const socials = [
  { key: "linkedinCompany", label: "LinkedIn", Icon: LinkedinIcon },
  { key: "instagram", label: "Instagram", Icon: InstagramIcon },
  { key: "facebook", label: "Facebook", Icon: FacebookIcon },
  { key: "x", label: "X", Icon: XIcon },
] as const;

export function SocialList({ tone = "dark", className }: { tone?: Tone; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-3", className)}>
      {socials.map(({ key, label, Icon }) => {
        const href = site.social[key];
        const base = cn(
          "inline-flex size-11 items-center justify-center border transition-colors",
          tone === "dark" ? "border-white/20 text-white/80" : "border-navy/20 text-navy",
        );
        return (
          <li key={key}>
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Kstone Projects on ${label}`}
                className={cn(base, tone === "dark" ? "hover:border-white hover:bg-white/10" : "hover:border-brand hover:text-brand")}
              >
                <Icon className="size-[1.1rem]" aria-hidden />
              </a>
            ) : (
              <span
                role="img"
                aria-label={`${label} — link to be added`}
                title={`${label} — to be added`}
                className={cn(base, "cursor-not-allowed border-dashed opacity-50")}
              >
                <Icon className="size-[1.1rem]" aria-hidden />
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
