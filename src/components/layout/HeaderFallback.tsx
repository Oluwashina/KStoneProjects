import Link from "next/link";
import { Menu } from "lucide-react";
import { navigation } from "@/data/site";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";

/** Static shell shown while the header resolves URL data (see layout Suspense boundary). */
export function HeaderFallback() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/92 shadow-[0_1px_0_0_var(--color-line)] backdrop-blur-xl">
      <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link href="/" aria-label="Kstone Projects Limited — home" className="shrink-0">
          <Logo tone="light" className="h-8 sm:h-9" />
        </Link>
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <span className="block px-4 py-2 font-ui text-[0.9375rem] font-medium text-graphite">{item.label}</span>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <Button href="/contact" size="md" className="!min-h-11" variant="primary">
              Discuss a Project
            </Button>
          </div>
          <span className="inline-flex size-11 items-center justify-center text-navy lg:hidden" aria-hidden>
            <Menu className="size-7" strokeWidth={1.5} />
          </span>
        </div>
      </div>
    </header>
  );
}
