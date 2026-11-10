import type { Metadata } from "next";
import { Award, GraduationCap, Landmark } from "lucide-react";
import { PortraitFrame } from "@/components/sections/PortraitFrame";
import { LinkedInCTA } from "@/components/sections/LinkedInCTA";
import { CTASection } from "@/components/sections/CTASection";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";
import { ceo } from "@/data/site";

export const metadata: Metadata = {
  title: `${ceo.name} — Chief Executive Officer`,
  description:
    "Engr. Salami Kabiru Ayobami is a Nigerian civil engineer, entrepreneur and the Chief Executive Officer of Kstone Projects Limited, with interests in infrastructure development, marine infrastructure and professional networking.",
  alternates: { canonical: "/leadership" },
  openGraph: { type: "profile", title: `${ceo.name} — CEO, Kstone Projects Limited` },
};

const practical = [
  "Road construction",
  "Bridge infrastructure",
  "Structural works",
  "Marine infrastructure",
  "Shore protection",
  "Jetty construction",
  "Building projects",
  "Site supervision",
];

const expanding = [
  "Oil and gas",
  "Marine infrastructure",
  "Piling and foundation engineering",
  "Large-scale infrastructure",
];

const pillars = [
  { word: "Trust", text: "Engineering relationships and projects built on professional integrity and dependable conduct." },
  { word: "Connection", text: "Networking, mentorship and strategic relationships that open doors and strengthen the profession." },
  { word: "Information", text: "Continuous learning and the open exchange of knowledge that raises engineering standards." },
];

export default function LeadershipPage() {
  return (
    <>
      {/* Executive hero */}
      <section aria-labelledby="ceo-name" className="on-dark blueprint-grid relative isolate overflow-hidden bg-navy-900 text-white">
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-br from-brand/20 via-transparent to-navy-900" />
        <div className="container-x grid items-end gap-12 pb-0 pt-36 lg:grid-cols-12 lg:gap-16 lg:pt-44">
          <div className="pb-4 lg:col-span-7 lg:pb-24">
            <p className="eyebrow rise">Leadership</p>
            <h1 id="ceo-name" className="display rise mt-7" style={{ ["--rise-delay" as string]: "100ms" }}>
              Engr. Salami
              <br />
              Kabiru <span className="serif-accent text-[1.06em]">Ayobami</span>
            </h1>
            <p className="rise mt-8 font-ui text-sm font-semibold uppercase tracking-[0.16em] text-[#8fb4f2]" style={{ ["--rise-delay" as string]: "220ms" }}>
              {ceo.position}
            </p>
            <p className="lead rise mt-5 max-w-xl" style={{ ["--rise-delay" as string]: "300ms" }}>
              {ceo.title}
            </p>
            <div className="rise mt-10 flex flex-wrap gap-4" style={{ ["--rise-delay" as string]: "400ms" }}>
              <Button href="/contact" size="lg">
                Get in touch
              </Button>
              <Button href="#philosophy" size="lg" variant="outline-light" icon="none">
                Professional philosophy
              </Button>
            </div>
          </div>
          <div className="rise lg:col-span-5" style={{ ["--rise-delay" as string]: "200ms" }}>
            <PortraitFrame priority className="aspect-[4/5] w-full max-w-lg lg:ml-auto" />
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section aria-labelledby="profile-heading" className="bg-white py-24 md:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">Professional profile</p>
            <h2 id="profile-heading" className="h2 mt-6 text-navy">
              An engineer&apos;s discipline. An <span className="serif-accent text-[1.06em]">entrepreneur&apos;s ambition.</span>
            </h2>
          </Reveal>
          <Reveal delay={100} className="space-y-6 text-lg text-slate lg:col-span-8">
            <p className="text-[1.375rem] leading-snug text-navy">
              Engr. Salami Kabiru Ayobami is a Nigerian civil engineer, entrepreneur and construction professional with a
              strong interest in infrastructure development, project management, construction technology and sustainable
              engineering solutions.
            </p>
            <p>
              As the Chief Executive Officer of Kstone Projects Limited, he is focused on developing an engineering and
              construction company that delivers quality-driven construction solutions, infrastructure services, building
              materials supply, equipment services and real estate consultancy.
            </p>
            <p>
              His entrepreneurial vision is driven by the belief that successful construction goes beyond putting
              structures together; it requires engineering precision, proper planning, quality materials, financial
              discipline and professional integrity.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Credentials */}
      <section aria-labelledby="credentials-heading" className="bg-arch py-24 md:py-32">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow">Education & credentials</p>
            <h2 id="credentials-heading" className="h2 mt-6 max-w-3xl text-navy">
              Grounded in civil engineering, connected to a global profession.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px bg-line md:grid-cols-3">
            {[
              {
                Icon: GraduationCap,
                label: "Education",
                title: "Degree in Civil Engineering",
                text: "Ladoke Akintola University of Technology (LAUTECH), Nigeria",
              },
              {
                Icon: Award,
                label: "Professional membership",
                title: "Associate Member, ASCE",
                text: "American Society of Civil Engineers (M.ASCE)",
              },
              {
                Icon: Landmark,
                label: "Current position",
                title: "Chief Executive Officer",
                text: "Kstone Projects Limited, Nigeria",
              },
            ].map(({ Icon, label, title, text }, i) => (
              <Reveal key={label} delay={i * 100} className="bg-white p-8 lg:p-10">
                <Icon className="size-7 text-brand" strokeWidth={1.5} aria-hidden />
                <p className="mt-8 font-ui text-xs font-semibold uppercase tracking-[0.16em] text-slate">{label}</p>
                <h3 className="h3 mt-3 text-navy">{title}</h3>
                <p className="mt-3 text-slate">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Areas of interest */}
      <section aria-labelledby="interests-heading" className="bg-white py-24 md:py-32">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-5">
              <p className="eyebrow">Areas of professional interest</p>
              <h2 id="interests-heading" className="h2 mt-6 text-navy">
                Practical breadth, <span className="serif-accent text-[1.06em]">strategic focus.</span>
              </h2>
              <p className="lead mt-6">
                His professional interests and practical experience span the following areas, with a growing focus on
                larger, more specialised sectors.
              </p>
              <Photo image="piling" reveal sizes="(min-width: 1024px) 40vw, 100vw" className="mt-10 hidden aspect-[4/3] lg:block" />
            </Reveal>
            <div className="lg:col-span-7">
              <Reveal delay={100}>
                <h3 className="ui-label uppercase tracking-[0.16em] text-brand">Experience & interests</h3>
                <ul className="mt-5 grid border-t border-line sm:grid-cols-2 sm:gap-x-10">
                  {practical.map((p) => (
                    <li key={p} className="flex items-center gap-4 border-b border-line py-4 font-ui text-base text-graphite">
                      <span aria-hidden className="size-1.5 bg-brand" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={150} className="mt-14">
                <h3 className="ui-label uppercase tracking-[0.16em] text-brand">Expanding professional exposure</h3>
                <p className="mt-4 max-w-xl text-slate">
                  Engr. Kabiru is particularly interested in expanding his professional exposure within:
                </p>
                <ul className="mt-5 flex flex-wrap gap-3">
                  {expanding.map((p) => (
                    <li key={p} className="border border-navy/20 bg-arch px-5 py-3 font-ui text-sm font-medium text-navy">
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section id="philosophy" aria-labelledby="philosophy-heading" className="on-dark bg-navy py-24 text-white md:py-36">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow">Leadership philosophy</p>
            <h2 id="philosophy-heading" className="sr-only">
              Professional philosophy
            </h2>
            <blockquote className="mt-8 max-w-5xl">
              <p className="serif-accent text-[clamp(2.5rem,7vw,6rem)] leading-[1.02] text-white">
                “Trust, Connection and Information.”
              </p>
            </blockquote>
            <p className="lead mt-8 max-w-2xl">
              Engr. Kabiru is passionate about professional networking, mentorship, continuous learning and building
              strategic relationships that promote engineering excellence.
            </p>
          </Reveal>
          <ul className="mt-16 grid gap-px bg-white/15 md:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal as="li" key={p.word} delay={i * 100} className="bg-navy p-8 lg:p-10">
                <p className="font-ui text-xs font-semibold tracking-[0.18em] text-[#8fb4f2]">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-8 text-3xl font-semibold tracking-tight">{p.word}</h3>
                <p className="mt-4 text-white/70">{p.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Vision & global outlook */}
      <section aria-labelledby="vision-heading" className="bg-white py-24 md:py-36">
        <div className="container-x">
          <h2 id="vision-heading" className="sr-only">
            Vision and global outlook
          </h2>
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <Reveal>
              <p className="eyebrow">Vision</p>
              <p className="mt-8 text-[clamp(1.5rem,2.4vw,2.125rem)] font-semibold leading-[1.22] tracking-[-0.02em] text-navy">
                To contribute meaningfully to Nigeria&apos;s infrastructure development, advance engineering excellence
                across Africa and beyond, and build an internationally recognised engineering and construction
                enterprise with a reputation for innovation, quality, integrity and sustainable development.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p className="eyebrow">Global outlook</p>
              <div className="mt-8 space-y-6 text-lg text-slate">
                <p>
                  Engr. Kabiru believes that Africa&apos;s infrastructure transformation requires technical expertise,
                  strategic partnerships, innovation, knowledge exchange and strong professional networks.
                </p>
                <p>
                  He is committed to building relationships and exploring opportunities across Africa and the
                  international engineering community, with the aim of contributing to impactful infrastructure projects
                  and sustainable economic development.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* LinkedIn / networking CTA */}
      <section aria-labelledby="connect-heading" className="on-dark relative overflow-hidden bg-brand py-20 text-white md:py-28">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-32 size-[30rem] rotate-12 border border-white/15" />
        <div className="container-x relative grid items-center gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow !text-white/80">Professional networking</p>
            <h2 id="connect-heading" className="h2 mt-6">
              Let&apos;s connect and exchange <span className="serif-accent text-[1.06em]">ideas.</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg text-white/85">
              Engr. Kabiru welcomes connections from engineers, developers, partners and organisations interested in
              Africa&apos;s infrastructure future.
            </p>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-5 lg:justify-self-end">
            <LinkedInCTA />
          </Reveal>
        </div>
      </section>

      <CTASection
        eyebrow="Work with Kstone"
        title={
          <>
            A conversation is the <span className="serif-accent text-[1.06em]">first step.</span>
          </>
        }
        text="Discuss a project, explore a partnership or arrange an introduction with the Kstone Projects team."
        image="blueprint"
        secondary={{ label: "Partnerships", href: "/partnerships" }}
      />
    </>
  );
}
