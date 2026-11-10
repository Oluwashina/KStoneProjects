import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { servicesByCategory, type ServiceCategory } from "@/data/services";

/** Image-led capability card used on the homepage. */
export function CategoryCard({ category, delay = 0 }: { category: ServiceCategory; delay?: number }) {
  const list = servicesByCategory(category.id);
  return (
    <Reveal delay={delay}>
      <Link
        href={`/services#${category.id}`}
        className="group block h-full bg-white transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgb(16_35_63/0.35)]"
      >
        <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[5/4] xl:aspect-[4/5]">
          <Photo
            image={category.image}
            sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="absolute inset-0"
            imgClassName="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-navy-900/0 to-navy-900/10" />
          <span className="absolute left-5 top-5 font-ui text-sm font-semibold tracking-[0.18em] text-white">{category.index}</span>
          <span
            aria-hidden
            className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-brand transition-transform duration-700 ease-out group-hover:scale-x-100"
          />
        </div>
        <div className="p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <h3 className="h3 text-navy">{category.title}</h3>
            <ArrowUpRight
              aria-hidden
              className="mt-1 size-6 shrink-0 text-concrete transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand"
            />
          </div>
          <ul className="mt-5 space-y-2 border-t border-line pt-5 font-ui text-[0.9375rem] text-slate">
            {list.map((s) => (
              <li key={s.slug} className="flex items-center gap-3">
                <span aria-hidden className="size-1 bg-brand" />
                {s.title}
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </Reveal>
  );
}
