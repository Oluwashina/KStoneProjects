import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Official Kstone Projects artwork, used unaltered (proportions, lettering and
 * colours are as supplied). Only the supplied variants are used:
 *
 *  light bg  → blue badge + black wordmark
 *  dark bg   → white badge (blue letters) + white wordmark
 */
const files = {
  horizontal: {
    light: { src: "/brand/lockup-horizontal-badge-blue.png", width: 1024, height: 154 },
    dark: { src: "/brand/lockup-horizontal-mark-blue-whitetext.png", width: 1024, height: 154 },
  },
  stacked: {
    light: { src: "/brand/lockup-stacked-black.png", width: 1024, height: 503 },
    dark: { src: "/brand/lockup-stacked-mark-blue-whitetext.png", width: 1024, height: 503 },
  },
  badge: {
    light: { src: "/brand/ksp-badge-blue.png", width: 1024, height: 337 },
    dark: { src: "/brand/ksp-mark-blue.png", width: 1024, height: 337 },
  },
} as const;

type LogoProps = {
  layout?: "horizontal" | "stacked" | "badge";
  tone: "light" | "dark";
  /** Height utility, e.g. "h-9". Width follows the artwork's aspect ratio. */
  className?: string;
  priority?: boolean;
  /** Decorative when adjacent text already names the company. */
  alt?: string;
};

export function Logo({ layout = "horizontal", tone, className, priority, alt = "Kstone Projects Limited" }: LogoProps) {
  const f = files[layout][tone];
  return (
    <Image
      src={f.src}
      width={f.width}
      height={f.height}
      alt={alt}
      priority={priority}
      // Supplied artwork is already small (≈35–80 KB) and must be shown unaltered, so skip re-encoding.
      unoptimized
      className={cn("w-auto select-none", className)}
    />
  );
}
