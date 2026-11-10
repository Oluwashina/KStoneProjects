import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { CategoryNav } from "@/components/sections/CategoryNav";
import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { serviceCategories, services, servicesByCategory, type Service } from "@/data/services";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Services & Capabilities",
  description:
    "Civil and infrastructure engineering, marine and coastal works, building and structural construction, materials supply, equipment services and real estate consultancy from Kstone Projects Limited.",
  alternates: { canonical: "/services" },
};

function ServiceRow({ service, flip, number }: { service: Service; flip: boolean; number: string }) {
  return (
    <article
      id={service.slug}
      aria-labelledby={`${service.slug}-title`}
      className="grid items-center gap-8 py-12 md:py-16 lg:grid-cols-12 lg:gap-16"
    >
      <div className={cn("lg:col-span-6", flip && "lg:order-2")}>
        <Photo
          image={service.image}
          reveal
          sizes="(min-width: 1024px) 48vw, 100vw"
          className="aspect-[4/3]"
        />
      </div>
      <Reveal delay={80} className={cn("lg:col-span-6", flip ? "lg:order-1 lg:pr-8" : "lg:pl-8")}>
        <p className="font-ui text-sm font-semibold tracking-[0.18em] text-brand">{number}</p>
        <h3 id={`${service.slug}-title`} className="h2 mt-4 text-navy !text-[clamp(1.75rem,3vw,2.5rem)]">
          {service.title}
        </h3>
        <p className="mt-5 text-lg text-graphite">{service.summary}</p>

        <div className="mt-7 border-l-2 border-brand pl-5">
          <p className="ui-label uppercase tracking-[0.14em] text-brand">Why it matters</p>
          <p className="mt-2 text-slate">{service.value}</p>
        </div>

        <ul className="mt-7 grid gap-x-6 gap-y-2.5 font-ui text-[0.9375rem] text-graphite sm:grid-cols-2">
          {service.scope.map((s) => (
            <li key={s} className="flex items-start gap-3">
              <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden strokeWidth={2.25} />
              {s}
            </li>
          ))}
        </ul>

        <div className="mt-9">
          <Button href={`/contact?service=${service.slug}#enquiry`} variant="outline-dark">
            {service.ctaLabel}
          </Button>
        </div>
      </Reveal>
    </article>
  );
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        image="roadInterchange"
        eyebrow="Services & capabilities"
        title={
          <>
            Capabilities across the <span className="serif-accent text-[1.06em]">built environment.</span>
          </>
        }
        intro="From roads, bridges and marine works to buildings, materials and advisory support — four service divisions, each approached with the same technical discipline."
        actions={<Button href="/contact#enquiry">Make an enquiry</Button>}
      />

      <CategoryNav items={serviceCategories.map((c) => ({ id: c.id, label: c.short, index: c.index }))} />

      {serviceCategories.map((cat, ci) => {
        const list = servicesByCategory(cat.id);
        return (
          <section
            key={cat.id}
            id={cat.id}
            aria-labelledby={`${cat.id}-heading`}
            className={cn("py-20 md:py-28", ci % 2 === 0 ? "bg-white" : "bg-arch")}
          >
            <div className="container-x">
              <div className="grid gap-6 border-b border-line pb-12 lg:grid-cols-12 lg:items-end lg:gap-16">
                <Reveal className="lg:col-span-7">
                  <p className="eyebrow">Division {cat.index}</p>
                  <h2 id={`${cat.id}-heading`} className="h1 mt-5 text-navy !text-[clamp(2rem,4.2vw,3.5rem)]">
                    {cat.title}
                  </h2>
                </Reveal>
                <Reveal delay={100} className="lg:col-span-5">
                  <p className="lead">{cat.intro}</p>
                </Reveal>
              </div>
              <div className="divide-y divide-line">
                {list.map((s, i) => (
                  <ServiceRow
                    key={s.slug}
                    service={s}
                    flip={i % 2 === 1}
                    number={String(services.indexOf(s) + 1).padStart(2, "0")}
                  />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <CTASection
        eyebrow="Your requirement"
        title={
          <>
            Don&apos;t see exactly what you <span className="serif-accent text-[1.06em]">need?</span>
          </>
        }
        text="Describe your project or scope and we will tell you plainly whether and how we can help — including where a partnership may be the better route."
        image="port"
        primary={{ label: "Send an enquiry", href: "/contact#enquiry" }}
        secondary={{ label: "Explore partnerships", href: "/partnerships" }}
      />
    </>
  );
}
