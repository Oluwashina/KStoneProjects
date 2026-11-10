"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { sectors } from "@/data/content";
import { cn } from "@/lib/cn";

/**
 * Interactive sector selector: an accordion-style list on one side, imagery on the other.
 * Hover (pointer) or focus/click/arrow keys change the active sector.
 */
export function SectorShowcase() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next = i;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % sectors.length;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + sectors.length) % sectors.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = sectors.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  };

  const current = sectors[active];

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      {/* Imagery */}
      <div className="relative order-1 aspect-[4/3] w-full overflow-hidden bg-navy lg:order-2 lg:col-span-7 lg:aspect-auto lg:min-h-[34rem]">
        {sectors.map((s, i) => (
          <div
            key={s.id}
            aria-hidden={i !== active}
            className={cn(
              "absolute inset-0 transition-[opacity,transform] duration-[900ms] ease-out",
              i === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0",
            )}
          >
            <Photo
              image={s.image}
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="absolute inset-0"
              alt={i === active ? undefined : ""}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 sm:p-8">
          <p className="font-ui text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
            {String(active + 1).padStart(2, "0")} / {String(sectors.length).padStart(2, "0")}
          </p>
          <p className="font-ui text-xs text-white/60">Illustrative photography</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="order-2 lg:order-1 lg:col-span-5">
        <div role="group" aria-label="Featured sectors" className="divide-y divide-white/15 border-y border-white/15">
          {sectors.map((s, i) => {
            const selected = i === active;
            return (
              <div key={s.id}>
                <button
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  id={`sector-tab-${s.id}`}
                  aria-expanded={selected}
                  aria-controls={`sector-panel-${s.id}`}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onKeyDown={(e) => onKey(e, i)}
                  className={cn(
                    "group flex w-full items-center justify-between gap-4 py-5 text-left transition-colors duration-300",
                    selected ? "text-white" : "text-white/55 hover:text-white",
                  )}
                >
                  <span className="flex items-baseline gap-5">
                    <span className="font-ui text-xs font-semibold tracking-[0.18em] text-[#8fb4f2]">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[1.375rem] font-semibold tracking-tight sm:text-2xl">{s.title}</span>
                  </span>
                  <ArrowRight
                    aria-hidden
                    className={cn("size-5 shrink-0 transition-all duration-500", selected ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0")}
                  />
                </button>
                <div
                  role="region"
                  id={`sector-panel-${s.id}`}
                  aria-labelledby={`sector-tab-${s.id}`}
                  hidden={!selected}
                  className="pb-7 pl-9 sm:pl-[3.1rem]"
                >
                  <p className="max-w-md text-white/75">{s.description}</p>
                  <ul className="mt-4 space-y-1.5 font-ui text-sm text-white/65">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-3">
                        <span aria-hidden className="size-1 bg-[#8fb4f2]" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={s.href}
                    className="mt-6 inline-flex items-center gap-2 font-ui text-sm font-semibold text-white underline-offset-4 hover:underline"
                  >
                    View related services <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        <p className="sr-only" aria-live="polite">
          Showing {current.title}
        </p>
      </div>
    </div>
  );
}
