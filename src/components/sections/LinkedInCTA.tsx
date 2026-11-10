import { ArrowUpRight } from "lucide-react";
import { LinkedinIcon } from "@/components/ui/BrandIcons";
import { ceo, site } from "@/data/site";
import { cn } from "@/lib/cn";

/**
 * LinkedIn call-to-action. Until `site.social.linkedinCeo` is set in
 * src/data/site.ts, it renders as a clearly-marked placeholder rather than
 * linking to a guessed URL.
 */
export function LinkedInCTA({ className }: { className?: string }) {
  const href = site.social.linkedinCeo;
  const classes = cn(
    "group/btn inline-flex h-14 items-center gap-3 bg-white px-7 font-ui text-base font-semibold text-navy transition-colors",
    href ? "hover:bg-arch" : "cursor-not-allowed opacity-80",
    className,
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        <LinkedinIcon className="size-5 text-brand" />
        Connect on LinkedIn
        <ArrowUpRight className="size-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" aria-hidden />
      </a>
    );
  }

  return (
    <div className="inline-flex flex-col items-start gap-3">
      <span role="link" aria-disabled="true" className={classes} title="LinkedIn profile link to be added">
        <LinkedinIcon className="size-5 text-brand" />
        Connect on LinkedIn
      </span>
      <span className="font-ui text-xs text-white/60">
        Profile link to be added — {ceo.shortName}&apos;s LinkedIn URL will go here.
      </span>
    </div>
  );
}
