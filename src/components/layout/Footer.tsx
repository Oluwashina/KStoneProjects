import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { footerNavigation, site } from "@/data/site";
import { serviceCategories } from "@/data/services";
import { Logo } from "./Logo";
import { ContactList, SocialList } from "@/components/ui/ContactDetails";

export function Footer() {
  return (
    <footer className="on-dark relative overflow-hidden bg-navy-900 text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Kstone Projects Limited — site footer
      </h2>

      <div className="container-x pb-10 pt-20 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Link href="/" aria-label="Kstone Projects Limited — home" className="inline-block">
              <Logo layout="stacked" tone="dark" className="h-24 sm:h-28" />
            </Link>
            <p className="mt-8 max-w-sm text-[0.9375rem] leading-relaxed text-white/70">
              Engineering, construction and infrastructure development — delivered through precision, innovation and
              professional integrity.
            </p>
            <p className="mt-6 font-ui text-sm text-white/55">
              Nigeria · Serving opportunities across Africa and beyond
            </p>
            <div className="mt-8">
              <SocialList tone="dark" />
            </div>
          </div>

          <div className="grid gap-12 sm:grid-cols-3 lg:col-span-8 lg:pl-10">
            <nav aria-label="Company">
              <h3 className="eyebrow !text-[0.6875rem]">Company</h3>
              <ul className="mt-6 space-y-3">
                {footerNavigation.company.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="font-ui text-[0.9375rem] text-white/75 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Capabilities">
              <h3 className="eyebrow !text-[0.6875rem]">Capabilities</h3>
              <ul className="mt-6 space-y-3">
                {serviceCategories.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/services#${c.id}`}
                      className="font-ui text-[0.9375rem] text-white/75 transition-colors hover:text-white"
                    >
                      {c.short}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h3 className="eyebrow !text-[0.6875rem]">Contact</h3>
              <div className="mt-6 text-[0.9375rem] text-white/80">
                <ContactList tone="dark" />
              </div>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 font-ui text-[0.9375rem] font-semibold text-white underline-offset-4 hover:underline"
              >
                Business enquiries <ArrowUpRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-white/12 pt-8 font-ui text-[0.8125rem] text-white/55 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {site.copyrightYear} {site.name}. All rights reserved.
          </p>
          <p className="max-w-xl lg:text-right">
            Photography on this website is illustrative and does not depict Kstone Projects work.{" "}
            <Link href="/credits" className="underline underline-offset-4 hover:text-white">
              Image credits
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
