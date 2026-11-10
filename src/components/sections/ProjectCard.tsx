import { MapPin } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { projectCategories, projectFields, type Project, type ProjectCategoryId } from "@/data/projects";
import { cn } from "@/lib/cn";

const categoryLabel = (id: ProjectCategoryId) => projectCategories.find((c) => c.id === id)?.label ?? id;

type CardProps = { delay?: number; className?: string; aspect?: string; sizes: string };

/** A verified project from src/data/projects.ts. */
export function ProjectCard({ project, delay, className, aspect = "aspect-[4/3]", sizes }: CardProps & { project: Project }) {
  const lead = project.images[0];
  return (
    <Reveal delay={delay} className={className}>
      <article className="group">
        <div className={cn("overflow-hidden", aspect, "relative")}>
          {lead && (
            <Photo
              image={lead}
              sizes={sizes}
              className="absolute inset-0"
              imgClassName="transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            />
          )}
          <span className="absolute left-4 top-4 bg-white px-3 py-1.5 font-ui text-xs font-semibold uppercase tracking-[0.14em] text-navy">
            {project.status}
          </span>
        </div>
        <div className="mt-6">
          <p className="eyebrow !text-[0.6875rem]">{categoryLabel(project.category)}</p>
          <h3 className="h3 mt-3">{project.title}</h3>
          <p className="mt-2 flex items-center gap-2 font-ui text-sm text-slate">
            <MapPin className="size-4" aria-hidden /> {project.location}
          </p>
          <p className="mt-4 text-slate">{project.overview}</p>
          {project.scope.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.scope.map((s) => (
                <li key={s} className="border border-line px-3 py-1 font-ui text-xs text-graphite">
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>
      </article>
    </Reveal>
  );
}

/** Clearly-labelled portfolio placeholder. Contains no invented project data. */
export function ProjectPlaceholderCard({
  category,
  delay,
  className,
  aspect = "aspect-[4/3]",
  index,
}: CardProps & { category: ProjectCategoryId; index: number }) {
  return (
    <Reveal delay={delay} className={className}>
      <article className="group" aria-label={`Portfolio placeholder — ${categoryLabel(category)}`}>
        <div className={cn("blueprint-grid relative overflow-hidden", aspect)}>
          <div className="absolute inset-0 bg-gradient-to-br from-brand/25 via-transparent to-navy-900/70 transition-opacity duration-700 group-hover:opacity-70" />
          <div className="absolute inset-5 border border-dashed border-white/25 transition-colors duration-500 group-hover:border-white/55" />
          <span className="absolute left-8 top-8 font-ui text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
            Project {String(index).padStart(2, "0")}
          </span>
          <span className="absolute right-8 top-8 bg-white/10 px-3 py-1.5 font-ui text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur">
            Placeholder
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <Logo layout="badge" tone="light" alt="" className="h-12 opacity-20 transition-opacity duration-700 group-hover:opacity-40" />
          </div>
        </div>
        <div className="mt-6">
          <p className="eyebrow !text-[0.6875rem]">{categoryLabel(category)}</p>
          <h3 className="h3 mt-3 text-navy/80">Project title — to be published</h3>
          <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 font-ui text-sm text-slate">
            <dt className="text-navy/60">Location</dt>
            <dd className="italic">To be confirmed</dd>
            <dt className="text-navy/60">Status</dt>
            <dd className="italic">To be confirmed</dd>
            <dt className="text-navy/60">Scope</dt>
            <dd className="italic">To be confirmed</dd>
          </dl>
        </div>
      </article>
    </Reveal>
  );
}

export const placeholderFieldList = projectFields;
