import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CategoryCard } from "@/components/sections/CategoryCard";
import { SectorShowcase } from "@/components/sections/SectorShowcase";
import { ProjectCard, ProjectPlaceholderCard } from "@/components/sections/ProjectCard";
import { PortraitFrame } from "@/components/sections/PortraitFrame";
import { CTASection } from "@/components/sections/CTASection";
import { approach, partnerTypes } from "@/data/content";
import { projects } from "@/data/projects";
import { serviceCategories, services } from "@/data/services";
import { ceo, site } from "@/data/site";

export const metadata: Metadata = {
  title: { absolute: `${site.name} | Engineering, Construction & Infrastructure — Nigeria` },
  description:
    "Kstone Projects Limited delivers quality-driven engineering, construction and infrastructure solutions across civil, marine, structural and building works. Based in Nigeria, serving opportunities across Africa and beyond.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const featured = projects.slice(0, 3);
  const placeholderCategories = ["roads-highways", "marine-coastal", "buildings-structures"] as const;

  return (
    <>
      {/* 1 ─ HERO ───────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="hero-title"
        className="on-dark relative isolate flex min-h-[44rem] items-end overflow-hidden bg-navy-900 text-white md:min-h-[100svh]"
      >
        <div className="absolute inset-x-0 -top-24 bottom-0 -z-10">
          <Parallax className="absolute inset-0">
            <Photo image="heroBridge" priority sizes="100vw" quality={70} className="hero-settle absolute inset-0 !bg-navy-900" />
          </Parallax>
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/95 via-navy-900/25 to-navy-900/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900/85 via-navy-900/35 to-transparent" />
        </div>

        <div className="container-x relative w-full pb-8 pt-40 md:pb-10">
          <p className="eyebrow rise">Kstone Projects Limited</p>
          <h1 id="hero-title" className="display rise mt-7 max-w-5xl" style={{ ["--rise-delay" as string]: "120ms" }}>
            Engineering Infrastructure.
            <br />
            Building <span className="serif-accent text-[1.08em] font-normal">Possibilities.</span>
          </h1>
          <p className="lead rise mt-8 max-w-2xl" style={{ ["--rise-delay" as string]: "260ms" }}>
            Delivering quality-driven engineering, construction and infrastructure solutions through precision,
            innovation and professional integrity.
          </p>
          <div className="rise mt-10 flex flex-wrap gap-4" style={{ ["--rise-delay" as string]: "400ms" }}>
            <Button href="/services" size="lg">
              Explore Our Capabilities
            </Button>
            <Button href="/contact" size="lg" variant="outline-light" icon="up-right">
              Discuss a Project
            </Button>
          </div>

          <div className="relative mt-16 md:mt-24">
            <div className="draw-line absolute inset-x-0 top-0 h-px bg-white/25" />
            <div className="rise flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between" style={{ ["--rise-delay" as string]: "560ms" }}>
              <p className="flex items-center gap-3 font-ui text-sm font-medium tracking-wide text-white/90">
                <MapPin className="size-4 text-[#8fb4f2]" aria-hidden />
                <span>
                  Nigeria <span className="mx-2 text-white/40">|</span> Serving Opportunities Across Africa and Beyond
                </span>
              </p>
              <p className="font-ui text-xs tracking-[0.16em] text-white/55 uppercase">Illustrative photography</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2 ─ COMPANY OVERVIEW ───────────────────────────────────────────── */}
      <section aria-labelledby="overview-heading" className="bg-white py-24 md:py-36">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow">Company overview</p>
            </Reveal>
            <Reveal delay={100} className="lg:col-span-8">
              <h2 id="overview-heading" className="text-[clamp(1.6rem,3.1vw,2.75rem)] font-semibold leading-[1.18] tracking-[-0.025em] text-navy text-balance">
                Kstone Projects is a Nigerian engineering and construction company{" "}
                <span className="text-slate/70">
                  focused on quality-driven delivery across infrastructure, marine works, buildings and construction
                  support.
                </span>
              </h2>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Photo image="rebar" reveal sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/5]" />
            </div>
            <div className="flex flex-col justify-between lg:col-span-7">
              <Reveal>
                <div className="max-w-2xl space-y-6 text-lg text-slate">
                  <p>
                    We are building an engineering and construction enterprise on a simple conviction: that successful
                    construction goes beyond putting structures together. It demands engineering precision, proper
                    planning, quality materials, financial discipline and professional integrity.
                  </p>
                  <p>
                    Our capabilities span civil and infrastructure engineering, marine and coastal works, building and
                    structural construction, and the materials, equipment and advisory services that support them. We are
                    ambitious to participate in major infrastructure, marine, piling and foundation, and oil and gas
                    projects.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={120} className="mt-12">
                <dl className="grid grid-cols-3 divide-x divide-line border-y border-line">
                  {[
                    { k: "Based in", v: "Nigeria" },
                    { k: "Service divisions", v: String(serviceCategories.length).padStart(2, "0") },
                    { k: "Core capabilities", v: String(services.length) },
                  ].map((s) => (
                    <div key={s.k} className="px-4 py-7 first:pl-0 sm:px-8">
                      <dt className="font-ui text-xs font-medium uppercase tracking-[0.14em] text-slate">{s.k}</dt>
                      <dd className="mt-2 text-3xl font-semibold tracking-tight text-navy sm:text-4xl">{s.v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-6">
                  <p className="serif-accent text-2xl text-navy sm:text-3xl">Engineering with Purpose.<br />Building with Integrity.</p>
                  <Button href="/about" variant="outline-dark">
                    About Kstone
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3 ─ CORE CAPABILITIES ──────────────────────────────────────────── */}
      <section aria-labelledby="capabilities-heading" className="bg-arch py-24 md:py-36">
        <div className="container-x">
          <SectionHeading
            id="capabilities-heading"
            align="split"
            eyebrow="Core capabilities"
            title={
              <>
                Four disciplines. <span className="serif-accent text-[1.06em]">One standard of delivery.</span>
              </>
            }
            intro="Capabilities across civil, marine, structural and support services — presented as areas of focus, each approached with the same technical discipline."
            action={
              <Button href="/services" variant="outline-dark">
                All services
              </Button>
            }
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4 md:mt-20">
            {serviceCategories.map((c, i) => (
              <CategoryCard key={c.id} category={c} delay={i * 90} />
            ))}
          </div>
        </div>
      </section>

      {/* 4 ─ FEATURED SECTORS ───────────────────────────────────────────── */}
      <section aria-labelledby="sectors-heading" className="on-dark bg-navy py-24 text-white md:py-36">
        <div className="container-x">
          <SectionHeading
            id="sectors-heading"
            align="split"
            eyebrow="Featured sectors"
            title={
              <>
                Where our engineering <span className="serif-accent text-[1.06em]">applies.</span>
              </>
            }
            intro="Five sectors where we focus our capability and where we are working to expand our participation."
            className="mb-14 md:mb-20"
          />
          <SectorShowcase />
        </div>
      </section>

      {/* 5 ─ OUR APPROACH ───────────────────────────────────────────────── */}
      <section aria-labelledby="approach-heading" className="relative overflow-hidden bg-white py-24 md:py-36">
        <div className="container-x">
          <SectionHeading
            id="approach-heading"
            align="split"
            eyebrow="Our approach"
            title={
              <>
                Method before <span className="serif-accent text-[1.06em]">momentum.</span>
              </>
            }
            intro="Reliable outcomes come from a consistent process. Four disciplines guide how we take a project from first conversation to handover."
          />
          <ol className="relative mt-16 grid gap-px bg-line md:mt-24 md:grid-cols-2 lg:grid-cols-4">
            {approach.map((a, i) => (
              <Reveal as="li" key={a.n} delay={i * 100} className="group relative bg-white p-8 transition-colors duration-500 hover:bg-arch lg:p-10">
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-brand transition-transform duration-700 ease-out group-hover:scale-x-100"
                />
                <p className="font-ui text-6xl font-light tracking-tight text-brand/90 sm:text-7xl">{a.n}</p>
                <h3 className="h3 mt-10 text-navy">{a.title}</h3>
                <p className="mt-4 text-slate">{a.text}</p>
                <ul className="mt-6 space-y-2 border-t border-line pt-6 font-ui text-sm text-graphite">
                  {a.points.map((p) => (
                    <li key={p} className="flex items-center gap-3">
                      <span aria-hidden className="size-1 bg-brand" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 6 ─ FEATURED PROJECTS ──────────────────────────────────────────── */}
      <section aria-labelledby="projects-heading" className="bg-arch py-24 md:py-36">
        <div className="container-x">
          <SectionHeading
            id="projects-heading"
            align="split"
            eyebrow="Featured projects"
            title={
              <>
                A portfolio in <span className="serif-accent text-[1.06em]">preparation.</span>
              </>
            }
            intro={
              featured.length
                ? "A selection of projects delivered or in progress."
                : "Verified project records and photography will be published here as they are approved. The structure below shows how each project will be presented."
            }
            action={
              <Button href="/projects" variant="outline-dark">
                View portfolio
              </Button>
            }
          />
          <div className="mt-14 grid gap-x-6 gap-y-14 md:mt-20 md:grid-cols-3">
            {featured.length
              ? featured.map((p, i) => (
                  <ProjectCard key={p.slug} project={p} delay={i * 100} sizes="(min-width: 768px) 33vw, 100vw" />
                ))
              : placeholderCategories.map((c, i) => (
                  <ProjectPlaceholderCard key={c} category={c} index={i + 1} delay={i * 100} aspect="aspect-[4/5]" sizes="33vw" />
                ))}
          </div>
        </div>
      </section>

      {/* 7 ─ LEADERSHIP SPOTLIGHT ───────────────────────────────────────── */}
      <section aria-labelledby="leadership-heading" className="bg-white py-24 md:py-36">
        <div className="container-x">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <Reveal variant="image" className="relative aspect-[4/5] overflow-hidden">
                <div className="img-reveal-inner absolute inset-0">
                  <PortraitFrame className="absolute inset-0" />
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow">Leadership</p>
                <h2 id="leadership-heading" className="h1 mt-6 text-navy">
                  {ceo.name}
                </h2>
                <p className="mt-4 font-ui text-sm font-semibold uppercase tracking-[0.14em] text-brand">{ceo.position}</p>
              </Reveal>
              <Reveal delay={100}>
                <p className="mt-8 max-w-2xl text-lg text-slate">
                  A Nigerian civil engineer, entrepreneur and construction professional with a strong interest in
                  infrastructure development, project management, construction technology and sustainable engineering
                  solutions. He holds a degree in Civil Engineering from LAUTECH and is an Associate Member of the
                  American Society of Civil Engineers (M.ASCE).
                </p>
                <blockquote className="mt-10 border-l-2 border-brand pl-6">
                  <p className="serif-accent text-3xl text-navy sm:text-4xl">“Trust, Connection and Information.”</p>
                  <footer className="mt-3 font-ui text-sm text-slate">Professional philosophy</footer>
                </blockquote>
                <div className="mt-10">
                  <Button href="/leadership">Read the full profile</Button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 8 ─ STRATEGIC PARTNERSHIPS ─────────────────────────────────────── */}
      <section aria-labelledby="partnerships-heading" className="on-dark relative overflow-hidden bg-brand py-24 text-white md:py-32">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-[34rem] rotate-12 border border-white/15" />
        <div aria-hidden className="pointer-events-none absolute -right-8 top-24 size-[34rem] rotate-12 border border-white/10" />
        <div className="container-x relative">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-5">
              <p className="eyebrow !text-white/80">Strategic partnerships</p>
              <h2 id="partnerships-heading" className="h2 mt-6">
                Built on <span className="serif-accent text-[1.06em]">trust and connection.</span>
              </h2>
              <p className="mt-6 text-lg text-white/85">
                We welcome conversations with organisations and professionals who share a commitment to engineering
                excellence — whether on a specific project, a longer-term collaboration or an exchange of knowledge.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button href="/partnerships" variant="white" size="lg">
                  Explore Partnerships
                </Button>
              </div>
            </Reveal>
            <Reveal delay={120} className="lg:col-span-7">
              <ul className="grid gap-x-10 border-t border-white/25 sm:grid-cols-2">
                {partnerTypes.map((p) => (
                  <li key={p.title} className="border-b border-white/25">
                    <Link
                      href="/partnerships"
                      className="group flex items-center justify-between gap-4 py-5 font-ui text-base font-medium text-white"
                    >
                      {p.title}
                      <ArrowRight className="size-4 shrink-0 -translate-x-1 opacity-60 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 9 ─ CONTACT CTA ────────────────────────────────────────────────── */}
      <CTASection
        title={
          <>
            Have a project in <span className="serif-accent text-[1.06em]">mind?</span>
          </>
        }
        text="Tell us about your project, tender or partnership interest. We will respond with a clear and professional next step."
        image="towersAlt"
        primary={{ label: "Discuss a Project", href: "/contact" }}
        secondary={{ label: "Partnership enquiries", href: "/partnerships" }}
      />
    </>
  );
}
