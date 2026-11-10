"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type Item = { id: string; label: string; index: string };

/** Sticky in-page navigation with scroll-spy. Works as plain anchor links without JS. */
export function CategoryNav({ items }: { items: Item[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Service categories"
      className="sticky top-[var(--header-h)] z-30 border-b border-line bg-white/92 backdrop-blur-xl"
    >
      <div className="container-x">
        <ul className="-mx-1 flex gap-1 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((i) => {
            const isActive = active === i.id;
            return (
              <li key={i.id} className="shrink-0">
                <a
                  href={`#${i.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 font-ui text-sm font-medium transition-colors duration-300",
                    isActive ? "bg-navy text-white" : "text-graphite hover:bg-arch hover:text-brand",
                  )}
                >
                  <span className={cn("text-xs tracking-[0.14em]", isActive ? "text-[#8fb4f2]" : "text-brand")}>{i.index}</span>
                  {i.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
