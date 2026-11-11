import type { Metadata, Viewport } from "next";
import { DM_Sans, Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ceo, site } from "@/data/site";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });
const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"], display: "swap" });
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Engineering, Construction & Infrastructure — Nigeria`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Kstone Projects Limited",
    "civil engineering Nigeria",
    "road construction Nigeria",
    "bridge infrastructure",
    "marine infrastructure",
    "shore protection",
    "jetty construction",
    "building construction",
    "project management",
    "infrastructure development Africa",
  ],
  authors: [{ name: ceo.name }],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
  alternates: { canonical: "./" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#10233f",
  width: "device-width",
  initialScale: 1,
};

const orgSameAs = [site.social.linkedinCompany, site.social.instagram].filter(Boolean) as string[];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      alternateName: site.abbreviation,
      url: site.url,
      logo: `${site.url}/brand/ksp-badge-blue.png`,
      description: site.description,
      areaServed: "Nigeria",
      founder: { "@id": `${site.url}/leadership#person` },
      ...(site.contact.email ? { email: site.contact.email } : {}),
      ...(site.contact.phones.length
        ? { telephone: site.contact.phones.map((p) => p.replace(/\s/g, "")).join(", ") }
        : {}),
      ...(site.contact.addresses.length
        ? {
            address: site.contact.addresses.map((a) => ({
              "@type": "PostalAddress",
              streetAddress: a.lines[0],
              addressLocality: a.lines[1],
              addressRegion: a.label,
              addressCountry: "NG",
            })),
          }
        : {}),
      ...(orgSameAs.length ? { sameAs: orgSameAs } : {}),
    },
    {
      "@type": "Person",
      "@id": `${site.url}/leadership#person`,
      name: ceo.name,
      jobTitle: "Chief Executive Officer",
      worksFor: { "@id": `${site.url}/#organization` },
      alumniOf: "Ladoke Akintola University of Technology (LAUTECH)",
      ...(ceo.portrait ? { image: `${site.url}${ceo.portrait}` } : {}),
      ...(site.social.linkedinCeo ? { sameAs: [site.social.linkedinCeo] } : {}),
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} ${dmSans.variable} ${instrument.variable} h-full`} suppressHydrationWarning>
      <head>
        {/* Enables scroll-reveal styles only when JavaScript is available. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only z-[60] bg-brand px-5 py-3 font-ui font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
