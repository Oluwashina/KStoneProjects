/**
 * Central site configuration.
 *
 * Anything set to `null` is a deliberate placeholder. The UI renders an honest
 * "to be confirmed" state for these values — NEVER invent contact details.
 * Fill them in here and every page, the footer and the structured data update.
 */

export const site = {
  name: "Kstone Projects Limited",
  shortName: "Kstone Projects",
  abbreviation: "KSP",
  tagline: "Engineering Infrastructure. Building Possibilities.",
  description:
    "Kstone Projects Limited is a Nigerian engineering, construction and infrastructure development company delivering quality-driven civil, marine, structural and building solutions.",
  /** Set NEXT_PUBLIC_SITE_URL in production (e.g. https://www.example.com). */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_NG",
  copyrightYear: 2026,

  contact: {
    email: "kstoneprojectslimited@gmail.com",
    phones: ["0806 344 4584", "0802 658 3587"],
    addresses: [
      {
        label: "Ogun State",
        lines: ["24, Pavilion Blu Road", "Maba, Aseese", "Ogun State, Nigeria"],
      },
      {
        label: "Lagos State",
        lines: ["3, Omojuwa Estate", "Kosofe, Ketu", "Lagos State, Nigeria"],
      },
    ],
  },

  social: {
    /** Company LinkedIn page URL */
    linkedinCompany: null as string | null,
    /** Engr. Salami Kabiru Ayobami personal LinkedIn profile URL */
    linkedinCeo: null as string | null,
    instagram: null as string | null,
    x: null as string | null,
    facebook: null as string | null,
  },
} as const;

export const ceo = {
  name: "Engr. Salami Kabiru Ayobami",
  shortName: "Engr. Kabiru",
  title: "Civil Engineer | Entrepreneur | Infrastructure Development",
  position: "Chief Executive Officer, Kstone Projects Limited",
  /** Drop a portrait in /public/images/leadership/ and set the path here. */
  portrait: null as string | null,
} as const;

export const navigation = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Leadership", href: "/leadership" },
  { label: "Partnerships", href: "/partnerships" },
] as const;

export const footerNavigation = {
  company: [
    { label: "About Kstone", href: "/about" },
    { label: "Leadership", href: "/leadership" },
    { label: "Projects", href: "/projects" },
    { label: "Partnerships", href: "/partnerships" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
