import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { ProjectsExplorer } from "@/components/sections/ProjectsExplorer";
import { Reveal } from "@/components/ui/Reveal";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "The Kstone Projects Limited project portfolio — roads and highways, bridges and infrastructure, marine and coastal works, buildings and structures. Verified project records are published as they are approved.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        image="viaduct"
        eyebrow="Project portfolio"
        title={
          <>
            A portfolio built on <span className="serif-accent text-[1.06em]">verified work.</span>
          </>
        }
        intro={
          projects.length > 0
            ? "Browse Kstone Projects by discipline. Select a project for photography, scope and status."
            : "Browse by discipline. Only real, approved projects will appear here — until then, each category shows how its projects will be presented."
        }
      />

      <section aria-labelledby="portfolio-heading" className="bg-white py-20 md:py-28">
        <div className="container-x">
          <Reveal className="mb-12 grid gap-6 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="eyebrow">Browse by category</p>
              <h2 id="portfolio-heading" className="h2 mt-5 text-navy">
                Roads, bridges, marine works and buildings.
              </h2>
            </div>
            <p className="lead lg:col-span-5">
              {projects.length > 0
                ? "We publish a focused set of well-documented projects — each with verified photography, scope and status. More records will follow as they are approved."
                : "We would rather show a small number of well-documented projects than a long list we cannot stand behind. Project records, scope and photography will be added as they are verified."}
            </p>
          </Reveal>
          <ProjectsExplorer projects={projects} />
        </div>
      </section>

      <CTASection
        eyebrow="Work with us"
        title={
          <>
            Planning a project that needs a <span className="serif-accent text-[1.06em]">dependable partner?</span>
          </>
        }
        text="Share your scope, location and timeline. We will respond with a clear view of how we can contribute."
        image="roadWorks"
        secondary={{ label: "View services", href: "/services" }}
      />
    </>
  );
}
