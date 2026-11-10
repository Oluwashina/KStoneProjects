import type { Metadata } from "next";
import { imageCredits } from "@/data/credits";

export const metadata: Metadata = {
  title: "Image Credits",
  description: "Attribution for the third-party photography used on the Kstone Projects Limited website.",
  alternates: { canonical: "/credits" },
  robots: { index: false, follow: true },
};

export default function CreditsPage() {
  return (
    <section aria-labelledby="credits-heading" className="bg-white pb-24 pt-36 md:pb-32 md:pt-44">
      <div className="container-x max-w-5xl">
        <p className="eyebrow">Image credits</p>
        <h1 id="credits-heading" className="h1 mt-6 text-navy">
          Photography credits
        </h1>
        <p className="lead mt-6 max-w-2xl">
          Imagery on this website is illustrative and represents engineering disciplines in general. It does not depict
          projects delivered by Kstone Projects Limited. Photographs have been resized and cropped for web use.
        </p>

        <div className="mt-14 overflow-x-auto">
          <table className="w-full min-w-[40rem] border-collapse text-left font-ui text-sm">
            <caption className="sr-only">Third-party image attribution</caption>
            <thead>
              <tr className="border-b border-navy text-xs uppercase tracking-[0.14em] text-slate">
                <th scope="col" className="py-3 pr-4 font-semibold">Image</th>
                <th scope="col" className="py-3 pr-4 font-semibold">Author</th>
                <th scope="col" className="py-3 pr-4 font-semibold">Licence</th>
                <th scope="col" className="py-3 font-semibold">Source</th>
              </tr>
            </thead>
            <tbody>
              {imageCredits.map((c) => (
                <tr key={c.file} className="border-b border-line align-top">
                  <th scope="row" className="py-4 pr-4 font-medium text-graphite">
                    {c.title}
                  </th>
                  <td className="py-4 pr-4 text-slate">{c.author}</td>
                  <td className="py-4 pr-4 text-slate">{c.license}</td>
                  <td className="py-4">
                    <a href={c.url} target="_blank" rel="noopener noreferrer" className="text-brand underline underline-offset-4 hover:text-brand-600">
                      {c.source}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
