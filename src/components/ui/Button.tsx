import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "white" | "outline-light" | "outline-dark" | "ghost";
type Size = "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-3 text-left font-ui sm:whitespace-nowrap font-semibold tracking-[0.01em] " +
  "transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-out " +
  "disabled:cursor-not-allowed disabled:opacity-60 aria-disabled:cursor-not-allowed aria-disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-white hover:bg-brand-600 hover:shadow-[0_12px_30px_-12px_rgb(1_85_207/0.7)] active:translate-y-px",
  white: "bg-white text-navy hover:bg-arch hover:shadow-[0_12px_30px_-14px_rgb(0_0_0/0.6)]",
  "outline-light":
    "border border-white/40 text-white hover:border-white hover:bg-white/10",
  "outline-dark":
    "border border-navy/25 text-navy hover:border-navy hover:bg-navy hover:text-white",
  ghost: "text-brand hover:text-brand-600 px-0",
};

const sizes: Record<Size, string> = {
  md: "min-h-12 px-6 py-2.5 text-[0.9375rem]",
  lg: "min-h-14 px-7 py-3 text-base sm:px-8",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  icon?: "arrow" | "up-right" | "none";
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;
type ButtonAsButton = CommonProps & { href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">;

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", icon = "arrow", className, children, ...rest } = props;
  const classes = cn(base, variants[variant], variant !== "ghost" && sizes[size], className);
  const Icon = icon === "up-right" ? ArrowUpRight : ArrowRight;
  const content = (
    <>
      <span>{children}</span>
      {icon !== "none" && (
        <Icon
          aria-hidden
          className="size-[1.1em] shrink-0 transition-transform duration-300 ease-out group-hover/btn:translate-x-1"
          strokeWidth={2}
        />
      )}
    </>
  );

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...linkRest } = rest as Omit<ButtonAsLink, keyof CommonProps>;
    return (
      <Link href={href} className={classes} {...linkRest}>
        {content}
      </Link>
    );
  }
  const { href: _unused, ...buttonRest } = rest as Omit<ButtonAsButton, keyof CommonProps>;
  void _unused;
  return (
    <button type="button" className={classes} {...buttonRest}>
      {content}
    </button>
  );
}
