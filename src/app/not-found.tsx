import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section aria-labelledby="nf-heading" className="bg-white pb-28 pt-40 md:pb-40 md:pt-52">
      <div className="container-x">
        <p className="eyebrow">Error 404</p>
        <h1 id="nf-heading" className="display mt-6 max-w-3xl text-navy">
          This page isn&apos;t on <span className="serif-accent text-[1.06em]">the plan.</span>
        </h1>
        <p className="lead mt-6 max-w-xl">The page you were looking for may have moved or no longer exists.</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/">Return home</Button>
          <Button href="/contact" variant="outline-dark">
            Contact us
          </Button>
        </div>
      </div>
    </section>
  );
}
