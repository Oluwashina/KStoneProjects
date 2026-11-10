import type { Metadata } from "next";
import { Suspense } from "react";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { EnquiryForm, EnquiryFormFallback } from "@/components/sections/EnquiryForm";
import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { partnerTypes, partnershipPathways } from "@/data/content";

export const metadata: Metadata = {
  title: "Strategic Partnerships",
  description:
    "Kstone Projects Limited is open to collaboration with engineering and construction firms, infrastructure developers, oil and gas organisations, marine engineering companies, suppliers, real estate developers and international project stakeholders.",
  alternates: { canonical: "/partnerships" },
};

const bring = [
  { title: "Engineer-led management", text: "Led by a civil engineer and M.ASCE member with a focus on technical rigour and professional standards." },
  { title: "Broad capability", text: "Civil, marine and coastal, structural and building works, with materials, equipment and advisory support." },
  { title: "Local presence in Nigeria", text: "A Nigerian base for organisations seeking a dependable local partner for projects in the country." },
  { title: "A long-term outlook", text: "A commitment to quality, integrity and relationships that extend beyond a single project." },
];

const look = [
  "Technical competence and transparency",
  "Shared standards for quality and safety",
  "Clear commercial and contractual dealing",
  "A constructive, long-term outlook",
];

export default function PartnershipsPage() {
  return (
    <>
      <PageHero
        image="port"
        eyebrow="Strategic partnerships"
        title={
          <>
            Partnerships built on trust, connection and <span className="serif-accent text-[1.06em]">information.</span>
          </>
        }
        intro="Kstone Projects is open to collaboration with organisations and professionals who share a commitment to engineering excellence and impactful infrastructure."
        actions={<Button href="#partnership-enquiry">Start a partnership enquiry</Button>}
      />

      {/* Who we collaborate with */}
      <section aria-labelledby="who-heading" className="bg-white py-24 md:py-36">
        <div className="container-x">
          <SectionHeading
            id="who-heading"
            align="split"
            eyebrow="Who we collaborate with"
            title={
              <>
                Open to collaboration across the <span className="serif-accent text-[1.06em]">value chain.</span>
              </>
            }
            intro="Africa's infrastructure transformation requires technical expertise, strategic partnerships and strong professional networks. We welcome conversations with:"
          />
          <ul className="mt-14 grid border-t border-line md:mt-20 md:grid-cols-2 md:gap-x-16">
            {partnerTypes.map((p, i) => (
              <Reveal as="li" key={p.title} delay={(i % 2) * 90} className="group grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-8 transition-colors">
                <span className="pt-1 font-ui text-xs font-semibold tracking-[0.18em] text-brand">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="h3 text-navy">{p.title}</h3>
                  <p className="mt-3 max-w-md text-slate">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Pathways */}
      <section aria-labelledby="pathways-heading" className="on-dark bg-navy py-24 text-white md:py-36">
        <div className="container-x">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-5">
              <p className="eyebrow">Ways to work together</p>
              <h2 id="pathways-heading" className="h2 mt-6">
                Flexible forms of <span className="serif-accent text-[1.06em]">collaboration.</span>
              </h2>
              <p className="lead mt-6">
                Every partnership is different. We are happy to explore the structure that makes most sense for the
                project and the parties involved.
              </p>
              <Photo image="siteTeam" reveal sizes="(min-width: 1024px) 40vw, 100vw" className="mt-10 hidden aspect-[4/3] lg:block" />
            </Reveal>
            <ul className="grid gap-px bg-white/15 sm:grid-cols-2 lg:col-span-7">
              {partnershipPathways.map((p, i) => (
                <Reveal as="li" key={p.title} delay={i * 90} className="group bg-navy p-8 transition-colors duration-500 hover:bg-navy-900 lg:p-10">
                  <ArrowUpRight className="size-6 text-[#8fb4f2] transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden />
                  <h3 className="mt-10 text-xl font-semibold tracking-tight">{p.title}</h3>
                  <p className="mt-3 text-white/70">{p.text}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* What we bring / look for */}
      <section aria-labelledby="bring-heading" className="bg-arch py-24 md:py-36">
        <div className="container-x">
          <SectionHeading
            id="bring-heading"
            align="split"
            eyebrow="What we bring"
            title={
              <>
                A dependable partner, <span className="serif-accent text-[1.06em]">candidly described.</span>
              </>
            }
            intro="We are a growing company with clear ambitions. Here is what we offer — and what we look for in those we work with."
          />
          <div className="mt-14 grid gap-px bg-line md:grid-cols-2 lg:grid-cols-4 md:mt-20">
            {bring.map((b, i) => (
              <Reveal key={b.title} delay={i * 90} className="bg-white p-8 lg:p-10">
                <span aria-hidden className="block h-0.5 w-8 bg-brand" />
                <h3 className="h3 mt-8 text-navy">{b.title}</h3>
                <p className="mt-3 text-slate">{b.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-14 border-t border-line pt-10">
            <p className="ui-label uppercase tracking-[0.16em] text-brand">What we look for</p>
            <ul className="mt-6 grid gap-x-10 gap-y-3 font-ui text-base text-graphite sm:grid-cols-2 lg:grid-cols-4">
              {look.map((l) => (
                <li key={l} className="flex items-start gap-3">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 bg-brand" />
                  {l}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Enquiry */}
      <section id="partnership-enquiry" aria-labelledby="partner-enquiry-heading" className="bg-white py-24 md:py-36">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-5">
              <p className="eyebrow">Partnership enquiry</p>
              <h2 id="partner-enquiry-heading" className="h2 mt-6 text-navy">
                Start the <span className="serif-accent text-[1.06em]">conversation.</span>
              </h2>
              <p className="lead mt-6">
                Introduce your organisation and the kind of collaboration you have in mind. We will review your enquiry
                and respond with a considered next step.
              </p>
            </Reveal>
            <Reveal delay={100} className="lg:col-span-7">
              <Suspense fallback={<EnquiryFormFallback />}>
                <EnquiryForm kind="partnership" formId="partnership-form" />
              </Suspense>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
