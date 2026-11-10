"use client";

import { useMemo, useState } from "react";
import { ProjectCard, ProjectPlaceholderCard } from "./ProjectCard";
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

export function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const real = useMemo(() => (filter === "all" ? projects : projects.filter((p) => p.category === filter)), [filter, projects]);
  const activeLabel = filter === "all" ? "All projects" : projectCategories.find((c) => c.id === filter)!.label;

  const placeholders: ProjectCategoryId[] =
    filter === "all" ? ["roads-highways", "bridges-infrastructure", "marine-coastal", "buildings-structures"] : [filter];

  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
        {[{ id: "all" as const, label: "All projects" }, ...projectCategories].map((c) => {
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
        {real.length > 0
          ? `${real.length} ${real.length === 1 ? "project" : "projects"} · ${activeLabel}`
          : `${activeLabel} · No projects published yet — placeholders shown`}
      </p>

      <div key={filter} className="mt-10 grid gap-x-6 gap-y-16 lg:grid-cols-12">
        {real.length > 0
          ? real.map((p, i) => (
              <ProjectCard
                key={p.slug}
                project={p}
                delay={(i % 2) * 100}
                className={spans[i % spans.length]}
                aspect={aspects[i % aspects.length]}
                sizes="(min-width: 1024px) 58vw, 100vw"
              />
            ))
          : (
            <>
              {placeholders.map((c, i) => (
                <ProjectPlaceholderCard
                  key={c}
                  category={c}
                  index={i + 1}
                  delay={(i % 2) * 100}
                  className={filter === "all" ? spans[i % spans.length] : "lg:col-span-7"}
                  aspect={filter === "all" ? aspects[i % aspects.length] : "aspect-[4/3] lg:aspect-[16/11]"}
                  sizes="58vw"
                />
              ))}
              <RecordStructure className={filter === "all" ? "lg:col-span-12" : "lg:col-span-5"} />
            </>
          )}
      </div>

      {real.length === 0 && (
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
