import Image from "next/image";
import { ceo } from "@/data/site";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/cn";

/**
 * Executive portrait. Until an approved photograph is supplied (see `ceo.portrait`
 * in src/data/site.ts) it renders an architectural placeholder — no stock "person"
 * imagery is ever used to stand in for the CEO.
 */
export function PortraitFrame({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <figure className={cn("relative overflow-hidden bg-navy", className)}>
      {ceo.portrait ? (
        <Image
          src={ceo.portrait}
          alt={`Portrait of ${ceo.name}`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover object-top"
        />
      ) : (
        <div className="blueprint-grid absolute inset-0" role="img" aria-label={`Portrait placeholder — official portrait of ${ceo.name} to be supplied`}>
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent" />
          {/* Silhouette-free composition: brand badge + registration crop marks */}
          <div className="absolute inset-6 border border-white/15" />
          <div className="absolute left-6 top-6 size-6 border-l-2 border-t-2 border-brand" />
          <div className="absolute bottom-6 right-6 size-6 border-b-2 border-r-2 border-brand" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-10 text-center">
            <Logo layout="badge" tone="light" alt="" className="h-14 opacity-95" />
            <p className="font-ui text-xs font-medium uppercase tracking-[0.2em] text-white/60">
              Official portrait
              <br />
              to be supplied
            </p>
          </div>
        </div>
      )}
    </figure>
  );
}
