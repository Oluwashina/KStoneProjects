import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { EnquiryForm, EnquiryFormFallback } from "@/components/sections/EnquiryForm";
import { ContactList, SocialList } from "@/components/ui/ContactDetails";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Kstone Projects Limited about engineering, construction and infrastructure projects, tenders and strategic partnerships in Nigeria and across Africa.",
  alternates: { canonical: "/contact" },
};

const include = [
  "Type of project and location",
  "Scope, scale and intended timeline",
  "Your organisation and role",
  "Any tender or procurement requirements",
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        compact
        image="towersAlt"
        eyebrow="Contact"
        title={
          <>
            Let&apos;s discuss your <span className="serif-accent text-[1.06em]">project.</span>
          </>
        }
        intro="Tell us about your project, tender or partnership interest. We read every enquiry and will respond with a clear next step."
      />

      <section aria-labelledby="contact-heading" className="bg-arch py-20 md:py-28">
        <div className="container-x">
          <h2 id="contact-heading" className="sr-only">
            Business enquiry
          </h2>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <p className="eyebrow mb-6">Business enquiry</p>
              <Suspense fallback={<EnquiryFormFallback />}>
                <EnquiryForm kind="general" formId="enquiry" />
              </Suspense>
            </Reveal>

            <aside aria-label="Contact details" className="space-y-10 lg:col-span-5 lg:pt-12">
              <Reveal delay={100}>
                <h3 className="h3 text-navy">Contact details</h3>
                <p className="mt-3 text-slate">
                  Official contact details will be published here once confirmed. Until then, please use the enquiry form.
                </p>
                <div className="mt-8 border-t border-line pt-8 text-graphite">
                  <ContactList tone="light" />
                </div>
              </Reveal>

              <Reveal delay={150}>
                <h3 className="ui-label uppercase tracking-[0.16em] text-brand">Connect</h3>
                <SocialList tone="light" className="mt-4" />
              </Reveal>

              <Reveal delay={200} className="border-t border-line pt-8">
                <h3 className="ui-label uppercase tracking-[0.16em] text-brand">Helpful to include</h3>
                <ul className="mt-5 space-y-3 font-ui text-[0.9375rem] text-graphite">
                  {include.map((i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 bg-brand" />
                      {i}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
