"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: ReactNode;
  /** Delay in ms. */
  delay?: number;
  as?: ElementType;
  className?: string;
  /** "fade" (translate + opacity) or "image" (clip-path wipe). */
  variant?: "fade" | "image";
  id?: string;
};

/**
 * Scroll-triggered reveal. Content is visible by default and only hidden when
 * the `.js` class is present (see layout) so it degrades gracefully without JS.
 * Honours prefers-reduced-motion via CSS.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className,
  variant = "fade",
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      className={cn(variant === "image" ? "img-reveal" : "reveal", className)}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
