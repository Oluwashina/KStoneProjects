import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import type { ImageKey } from "@/data/images";
import { cn } from "@/lib/cn";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  text: ReactNode;
  image?: ImageKey;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  tone?: "navy" | "blue";
  id?: string;
};

/** Reusable closing call-to-action band. */
export function CTASection({
  eyebrow = "Start a conversation",
  title,
  text,
  image = "towersAlt",
  primary = { label: "Discuss a Project", href: "/contact" },
  secondary,
  tone = "navy",
  id = "cta-heading",
}: Props) {
  return (
    <section aria-labelledby={id} className={cn("on-dark relative isolate overflow-hidden text-white", tone === "navy" ? "bg-navy-900" : "bg-brand")}>
      {tone === "navy" && (
        <>
          <Photo image={image} sizes="100vw" quality={60} className="absolute inset-0 -z-10 opacity-35 !bg-navy-900" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-900 via-navy-900/85 to-navy-900/50" />
        </>
      )}
      <div className="container-x py-24 md:py-32">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <p className="eyebrow">{eyebrow}</p>
            <h2 id={id} className="display mt-6 max-w-4xl">
              {title}
            </h2>
            <p className="lead mt-7 max-w-2xl">{text}</p>
          </Reveal>
          <Reveal delay={150} className="flex flex-wrap gap-4 lg:col-span-4 lg:justify-end">
            <Button href={primary.href} size="lg" variant={tone === "blue" ? "white" : "primary"}>
              {primary.label}
            </Button>
            {secondary && (
              <Button href={secondary.href} size="lg" variant="outline-light">
                {secondary.label}
              </Button>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
