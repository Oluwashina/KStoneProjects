import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { commitments, values } from "@/data/content";
import { ceo } from "@/data/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Kstone Projects Limited is a Nigerian engineering and construction company built on engineering precision, quality, safety and professional integrity. Engineering with Purpose. Building with Integrity.",
  alternates: { canonical: "/about" },
};

const foundations = [
  { n: "01", title: "Engineering precision", text: "Accurate design, detailing and execution — because tolerances decide performance." },
  { n: "02", title: "Proper planning", text: "Scope, sequence, resources and risk understood before work begins." },
  { n: "03", title: "Quality materials", text: "Specified, sourced and verified so what is built matches what was intended." },
  { n: "04", title: "Financial discipline", text: "Transparent cost control that protects clients and keeps projects viable." },
  { n: "05", title: "Professional integrity", text: "Honest advice, clear communication and accountability at every stage." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        image="modernBuilding"
        eyebrow="About Kstone Projects"
        title={
          <>
            Engineering with Purpose.
            <br />
            Building with <span className="serif-accent text-[1.06em]">Integrity.</span>
          </>
        }
        intro="A Nigerian engineering, construction and infrastructure development company focused on quality-driven solutions and long-term relationships."
      />

      {/* Introduction */}
      <section aria-labelledby="intro-heading" className="bg-white py-24 md:py-36">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-5">
              <p className="eyebrow">Company introduction</p>
              <h2 id="intro-heading" className="h2 mt-6 text-navy">
                Built on the belief that construction is <span className="serif-accent text-[1.06em]">more than assembly.</span>
              </h2>
            </Reveal>
            <Reveal delay={100} className="lg:col-span-7">
              <div className="space-y-6 text-lg text-slate">
                <p>
                  Kstone Projects Limited is an engineering, construction and infrastructure development company based
                  in Nigeria. We are focused on delivering quality-driven solutions across civil and infrastructure
                  engineering, marine and coastal works, building and structural construction, and the materials,
                  equipment and advisory services that support them.
                </p>
                <p>
                  Led by Chief Executive Officer {ceo.name}, a civil engineer and M.ASCE member, the company is built on
                  the conviction that successful construction requires engineering precision, proper planning, quality
                  materials, financial discipline and professional integrity.
                </p>
                <p>
                  We are ambitious to expand our participation in major infrastructure projects, oil and gas, marine
                  infrastructure, and piling and foundation engineering — and we are building the capability, standards
                  and relationships to do so responsibly.
                </p>
              </div>
            </Reveal>
          </div>
          <div className="mt-16 grid gap-6 md:mt-24 md:grid-cols-12">
            <Photo image="siteCranes" reveal sizes="(min-width: 768px) 58vw, 100vw" className="aspect-[16/10] md:col-span-7" />
            <Photo image="blueprint" reveal delay={150} sizes="(min-width: 768px) 40vw, 100vw" className="aspect-[4/3] md:col-span-5 md:mt-24" />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section aria-labelledby="mission-heading" className="bg-arch py-24 md:py-32">
        <div className="container-x">
          <h2 id="mission-heading" className="sr-only">
            Mission and vision
          </h2>
          <div className="grid gap-px bg-line md:grid-cols-2">
            <Reveal className="bg-white p-8 sm:p-12 lg:p-16">
              <p className="eyebrow">Our mission</p>
              <p className="mt-8 text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-navy">
                To deliver quality-driven engineering, construction and infrastructure solutions through precision,
                innovation and professional integrity.
              </p>
            </Reveal>
            <Reveal delay={120} className="bg-white p-8 sm:p-12 lg:p-16">
              <p className="eyebrow">Our vision</p>
              <p className="mt-8 text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-navy">
                To contribute meaningfully to Nigeria&apos;s infrastructure development, advance engineering excellence
                across Africa and beyond, and build an internationally recognised enterprise known for innovation,
                quality, integrity and sustainable development.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Engineering philosophy */}
      <section aria-labelledby="philosophy-heading" className="on-dark bg-navy py-24 text-white md:py-36">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-5">
              <p className="eyebrow">Engineering philosophy</p>
              <h2 id="philosophy-heading" className="h2 mt-6">
                Five foundations of <span className="serif-accent text-[1.06em]">sound construction.</span>
              </h2>
              <p className="lead mt-6">
                Successful construction goes beyond putting structures together. These five principles guide how we
                plan, build and work with clients and partners.
              </p>
            </Reveal>
            <ol className="lg:col-span-7">
              {foundations.map((f, i) => (
                <Reveal as="li" key={f.n} delay={i * 70} className="group grid grid-cols-[3.5rem_1fr] gap-4 border-t border-white/15 py-7 last:border-b sm:grid-cols-[5rem_14rem_1fr] sm:items-baseline">
                  <span className="font-ui text-sm font-semibold tracking-[0.18em] text-[#8fb4f2]">{f.n}</span>
                  <h3 className="text-xl font-semibold tracking-tight sm:text-[1.375rem]">{f.title}</h3>
                  <p className="col-start-2 text-white/70 sm:col-start-3">{f.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section aria-labelledby="commitments-heading" className="bg-white py-24 md:py-36">
        <div className="container-x">
          <SectionHeading
            id="commitments-heading"
            align="split"
            eyebrow="Our commitments"
            title={
              <>
                Quality, safety, integrity and <span className="serif-accent text-[1.06em]">sustainability.</span>
              </>
            }
            intro="Four commitments shape the way we work and the standards we hold ourselves to on every project and partnership."
          />
          <div className="mt-14 grid gap-x-6 gap-y-14 md:mt-20 md:grid-cols-2">
            {commitments.map((c, i) => (
              <Reveal key={c.title} delay={(i % 2) * 120}>
                <Photo image={c.image} sizes="(min-width: 768px) 48vw, 100vw" className="aspect-[16/10]" imgClassName="transition-transform duration-[1400ms] hover:scale-105" />
                <h3 className="h3 mt-7 text-navy">{c.title}</h3>
                <p className="mt-3 max-w-xl text-slate">{c.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section aria-labelledby="values-heading" className="bg-arch py-24 md:py-36">
        <div className="container-x">
          <SectionHeading
            id="values-heading"
            align="split"
            eyebrow="Core values"
            title={
              <>
                What we <span className="serif-accent text-[1.06em]">stand for.</span>
              </>
            }
          />
          <ul className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3 md:mt-20">
            {values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={(i % 3) * 90} className="group bg-white p-8 transition-colors duration-500 hover:bg-white lg:p-10">
                <span aria-hidden className="block h-0.5 w-8 bg-brand transition-all duration-500 group-hover:w-16" />
                <h3 className="h3 mt-8 text-navy">{v.title}</h3>
                <p className="mt-3 text-slate">{v.text}</p>
              </Reveal>
            ))}
          </ul>
          <div className="mt-14 flex flex-wrap gap-4">
            <Button href="/leadership">Meet our leadership</Button>
            <Button href="/services" variant="outline-dark">
              Explore capabilities
            </Button>
          </div>
        </div>
      </section>

      <CTASection
        title={
          <>
            Let&apos;s discuss what we can <span className="serif-accent text-[1.06em]">build together.</span>
          </>
        }
        text="Whether you are planning a project, assessing contractors or exploring a partnership, we would welcome the conversation."
        image="towers"
        secondary={{ label: "Partnership enquiries", href: "/partnerships" }}
      />
    </>
  );
}
