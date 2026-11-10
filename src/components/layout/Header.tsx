"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { navigation, site } from "@/data/site";
import { cn } from "@/lib/cn";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";

/** Routes whose first screen is a dark photographic hero (header starts transparent). */
const HERO_ROUTES = new Set(["/", "/about", "/services", "/projects", "/leadership", "/partnerships", "/contact"]);

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const hasHero = HERO_ROUTES.has(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll + Escape to close while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = [
          toggleRef.current,
          ...Array.from(panelRef.current.querySelectorAll<HTMLElement>("a[href], button")),
        ].filter(Boolean) as HTMLElement[];
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onMq);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  const overDark = (hasHero && !scrolled) || open;
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500",
        overDark ? "on-dark" : "",
        !overDark && "bg-white/92 shadow-[0_1px_0_0_var(--color-line)] backdrop-blur-xl",
        overDark && !open && hasHero && "bg-gradient-to-b from-navy-900/70 to-transparent",
        open && "bg-navy-900",
      )}
    >
      <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link href="/" aria-label="Kstone Projects Limited — home" className="relative block shrink-0" onClick={close}>
          <span className="relative block">
            <Logo
              tone="light"
              priority
              className={cn("h-8 transition-opacity duration-500 sm:h-9", overDark ? "opacity-0" : "opacity-100")}
            />
            <Logo
              tone="dark"
              priority
              alt=""
              className={cn(
                "absolute inset-0 h-8 transition-opacity duration-500 sm:h-9",
                overDark ? "opacity-100" : "opacity-0",
              )}
            />
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group relative block px-4 py-2 font-ui text-[0.9375rem] font-medium transition-colors duration-300",
                      overDark ? "text-white/85 hover:text-white" : "text-graphite hover:text-brand",
                      active && (overDark ? "text-white" : "text-brand"),
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-4 -bottom-0.5 h-0.5 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100",
                        overDark ? "bg-white" : "bg-brand",
                        active && "scale-x-100",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <Button href="/contact" size="md" className="!min-h-11" variant="primary">
              Discuss a Project
            </Button>
          </div>
          <button
            ref={toggleRef}
            type="button"
            className={cn(
              "inline-flex size-11 items-center justify-center transition-colors lg:hidden",
              overDark ? "text-white" : "text-navy",
            )}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-7" strokeWidth={1.5} /> : <Menu className="size-7" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="on-dark fixed inset-x-0 bottom-0 top-[var(--header-h)] overflow-y-auto bg-navy-900 lg:hidden"
      >
        <div className="container-x flex min-h-full flex-col pb-10 pt-6">
          <nav aria-label="Mobile">
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {[{ label: "Home", href: "/" }, ...navigation].map((item, i) => {
                const active = item.href === "/" ? pathname === "/" : isActive(item.href);
                return (
                  <li key={item.href} className={open ? "rise" : ""} style={{ ["--rise-delay" as string]: `${60 + i * 55}ms` }}>
                    <Link
                      href={item.href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between py-5 text-[1.75rem] font-semibold tracking-tight",
                        active ? "text-white" : "text-white/70",
                      )}
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-ui text-xs font-medium tracking-[0.18em] text-brand-50/50">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {item.label}
                      </span>
                      <ArrowRight className="size-5 text-white/40" aria-hidden />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-10 flex flex-col gap-3 rise" style={{ ["--rise-delay" as string]: "420ms" }}>
            <Button href="/contact" size="lg" onClick={close}>
              Discuss a Project
            </Button>
            <Button href="/partnerships" size="lg" variant="outline-light" onClick={close}>
              Explore Partnerships
            </Button>
          </div>

          <p className="mt-auto pt-12 font-ui text-sm text-white/55">
            {site.name}
            <br />
            Nigeria · Serving opportunities across Africa and beyond
          </p>
        </div>
      </div>
    </header>
  );
}
