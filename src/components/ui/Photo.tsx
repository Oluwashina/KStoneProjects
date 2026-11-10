import Image from "next/image";
import { images, type ImageKey, type SiteImage } from "@/data/images";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

type PhotoProps = {
  /** Registry key or a full image object. */
  image: ImageKey | SiteImage;
  /** Tailwind aspect / sizing classes for the frame, e.g. "aspect-[4/5]". */
  className?: string;
  imgClassName?: string;
  sizes: string;
  priority?: boolean;
  /** Wipe-reveal on scroll. */
  reveal?: boolean;
  delay?: number;
  /** Override registry alt text, or pass "" for purely decorative imagery. */
  alt?: string;
  quality?: number;
};

export function Photo({
  image,
  className,
  imgClassName,
  sizes,
  priority,
  reveal,
  delay,
  alt,
  quality = 75,
}: PhotoProps) {
  const data = typeof image === "string" ? images[image] : image;
  const positioning = /(^|\s)(absolute|fixed)(\s|$)/.test(className ?? "") ? "" : "relative";

  const picture = (
    <Image
      src={data.src}
      alt={alt ?? data.alt}
      fill
      sizes={sizes}
      priority={priority}
      quality={quality}
      className={cn("object-cover", imgClassName)}
      style={{ objectPosition: data.position }}
    />
  );

  if (reveal) {
    return (
      <Reveal variant="image" delay={delay} className={cn(positioning, "overflow-hidden bg-navy/10", className)}>
        <div className="img-reveal-inner absolute inset-0">{picture}</div>
      </Reveal>
    );
  }

  return <div className={cn(positioning, "overflow-hidden bg-navy/10", className)}>{picture}</div>;
}
