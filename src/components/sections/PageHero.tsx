import type { ReactNode } from "react";
import { Photo } from "@/components/ui/Photo";
import { Parallax } from "@/components/ui/Parallax";
import type { ImageKey } from "@/data/images";
import { cn } from "@/lib/cn";

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  image: ImageKey;
  actions?: ReactNode;
  /** Shorter hero for utility pages such as Contact. */
  compact?: boolean;
  /** Anything rendered in the bottom-right of the hero (e.g. an index). */
  aside?: ReactNode;
  headingId?: string;
};

export function PageHero({ eyebrow, title, intro, image, actions, compact, aside, headingId = "page-title" }: Props) {
  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        "on-dark relative isolate flex items-end overflow-hidden bg-navy-900 text-white",
        compact ? "min-h-[26rem] md:min-h-[30rem]" : "min-h-[34rem] md:min-h-[42rem] lg:min-h-[78svh]",
      )}
    >
      <div className="absolute inset-x-0 -top-24 bottom-0 -z-10">
        <Parallax className="absolute inset-0">
          <Photo image={image} priority sizes="100vw" quality={60} className="absolute inset-0 hero-settle !bg-navy-900" />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/55 to-navy-900/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/80 via-navy-900/35 to-transparent" />
      </div>

      <div className="container-x relative pb-14 pt-40 md:pb-20 lg:pb-24">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="eyebrow rise">{eyebrow}</p>
            <h1 id={headingId} className="h1 rise mt-6 max-w-4xl" style={{ ["--rise-delay" as string]: "120ms" }}>
              {title}
            </h1>
            {intro && (
              <p className="lead rise mt-7 max-w-2xl" style={{ ["--rise-delay" as string]: "260ms" }}>
                {intro}
              </p>
            )}
            {actions && (
              <div className="rise mt-9 flex flex-wrap gap-4" style={{ ["--rise-delay" as string]: "380ms" }}>
                {actions}
              </div>
            )}
          </div>
          {aside && <div className="lg:col-span-4 lg:justify-self-end">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
