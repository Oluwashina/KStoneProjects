"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { projectCategories, projectFields, type Project, type ProjectCategoryId } from "@/data/projects";
import { cn } from "@/lib/cn";

type Filter = "all" | ProjectCategoryId;

const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];
const aspects = ["aspect-[4/3] lg:aspect-[16/11]", "aspect-[4/3] lg:aspect-square", "aspect-[4/3] lg:aspect-square", "aspect-[4/3] lg:aspect-[16/11]"];

/** Describes — without inventing data — what each published project will contain. */
function RecordStructure({ className }: { className?: string }) {
  return (
    <Reveal className={className}>
      <div className="blueprint-grid-light flex h-full flex-col justify-between border border-line p-8 sm:p-10">
        <div>
          <p className="eyebrow">Project record</p>
          <h3 className="h3 mt-5 text-navy">Every project will be presented in full.</h3>
          <p className="mt-4 text-slate">
            Each entry will include the details below, supported by project photography and verified by Kstone Projects
            before publication.
          </p>
        </div>
        <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-3 font-ui text-[0.9375rem] text-graphite sm:grid-cols-2">
          {projectFields.map((f, i) => (
            <li key={f} className="flex items-center gap-3 border-b border-line/80 pb-3">
              <span className="text-xs font-semibold tracking-[0.14em] text-brand">{String(i + 1).padStart(2, "0")}</span>
              {f}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

export function ProjectsExplorer({ projects: projectsProp }: { projects: Project[] }) {
  const projects = projectsProp;
  const [filter, setFilter] = useState<Filter>("all");

  const real = useMemo(() => (filter === "all" ? projects : projects.filter((p) => p.category === filter)), [filter, projects]);
  const activeLabel = filter === "all" ? "All projects" : projectCategories.find((c) => c.id === filter)!.label;

  const categoriesWithProjects = useMemo(() => {
    const ids = new Set(projects.map((p) => p.category));
    return projectCategories.filter((c) => ids.has(c.id));
  }, [projects]);

  const filterOptions =
    projects.length > 0
      ? [{ id: "all" as const, label: "All projects" }, ...categoriesWithProjects]
      : [{ id: "all" as const, label: "All projects" }, ...projectCategories];

  const statusMessage =
    real.length > 0
      ? `${real.length} ${real.length === 1 ? "project" : "projects"} · ${activeLabel}`
      : projects.length > 0
        ? `${activeLabel} · No projects in this category yet`
        : `${activeLabel} · Portfolio records in preparation`;

  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
        {filterOptions.map((c) => {
          const active = filter === c.id;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(c.id)}
              className={cn(
                "border px-5 py-2.5 font-ui text-sm font-medium transition-colors duration-300",
                active ? "border-navy bg-navy text-white" : "border-line bg-white text-graphite hover:border-brand hover:text-brand",
              )}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      <p className="mt-6 font-ui text-sm text-slate" role="status" aria-live="polite">
        {statusMessage}
      </p>

      <div key={filter} className="mt-10 grid gap-x-6 gap-y-16 lg:grid-cols-12">
        {real.length > 0 ? (
          real.map((p, i) => (
            <ProjectCard
              key={p.slug}
              project={p}
              delay={(i % 2) * 100}
              className={spans[i % spans.length]}
              aspect={aspects[i % aspects.length]}
              sizes="(min-width: 1024px) 58vw, 100vw"
            />
          ))
        ) : projects.length === 0 ? (
          <RecordStructure className="lg:col-span-12" />
        ) : (
          <p className="lg:col-span-12 text-slate">
            Nothing published under this discipline yet. View{" "}
            <button
              type="button"
              onClick={() => setFilter("all")}
              className="font-semibold text-brand underline-offset-4 hover:underline"
            >
              all projects
            </button>{" "}
            or contact us for reference work.
          </p>
        )}
      </div>

      {real.length === 0 && projects.length === 0 && (
        <div className="mt-16 flex flex-col items-start gap-5 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-slate">
            Need project information for a tender, pre-qualification or partnership discussion? Get in touch and we will
            advise what we can share.
          </p>
          <Button href="/contact?service=other#enquiry" variant="outline-dark">
            Request project information
          </Button>
        </div>
      )}
    </div>
  );
}
