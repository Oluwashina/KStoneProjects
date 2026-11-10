import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  align?: "left" | "split";
  className?: string;
  /** Extra node (e.g. a CTA) placed at the end on wide screens. */
  action?: ReactNode;
};

export function SectionHeading({ eyebrow, title, intro, id, align = "left", className, action }: Props) {
  if (align === "split") {
    return (
      <div className={cn("grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12", className)}>
        <Reveal className="lg:col-span-7">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={id} className="h2 mt-5">
            {title}
          </h2>
        </Reveal>
        {(intro || action) && (
          <Reveal delay={120} className="lg:col-span-5">
            {intro && <p className="lead">{intro}</p>}
            {action && <div className="mt-6">{action}</div>}
          </Reveal>
        )}
      </div>
    );
  }
  return (
    <Reveal className={cn("max-w-3xl", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="h2 mt-5">
        {title}
      </h2>
      {intro && <p className="lead mt-6">{intro}</p>}
      {action && <div className="mt-8">{action}</div>}
    </Reveal>
  );
}
