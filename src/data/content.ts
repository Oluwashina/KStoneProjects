import type { ImageKey } from "./images";

/** Featured sectors (homepage showcase). */
export const sectors: {
  id: string;
  title: string;
  description: string;
  points: string[];
  image: ImageKey;
  href: string;
}[] = [
  {
    id: "civil",
    title: "Civil Infrastructure",
    description:
      "Roads, bridges and enabling works that move people and goods and support economic growth.",
    points: ["Road construction & rehabilitation", "Bridge infrastructure", "Drainage & earthworks"],
    image: "roadWorks",
    href: "/services#civil-infrastructure",
  },
  {
    id: "marine",
    title: "Marine & Coastal",
    description:
      "Jetties, waterfront structures and shore protection engineered for demanding coastal conditions.",
    points: ["Marine infrastructure", "Jetty construction", "Shore protection"],
    image: "port",
    href: "/services#marine-coastal",
  },
  {
    id: "building",
    title: "Building & Structural Works",
    description:
      "Commercial, residential and institutional buildings supported by disciplined structural and site practice.",
    points: ["Building construction", "Structural works", "Site supervision"],
    image: "towers",
    href: "/services#building-structural",
  },
  {
    id: "real-estate",
    title: "Real Estate",
    description:
      "Construction-informed advisory and delivery support for developers and property investors.",
    points: ["Development advisory", "Materials supply", "Project management"],
    image: "residential",
    href: "/services#support-business",
  },
  {
    id: "industrial",
    title: "Industrial Infrastructure",
    description:
      "Foundation, piling and civil support for industrial, marine and energy-sector facilities — an area of strategic focus.",
    points: ["Piling & foundation engineering", "Oil & gas support (strategic focus)", "Industrial civil works"],
    image: "piling",
    href: "/services#building-structural",
  },
];

/** Our approach — four disciplines. */
export const approach: { n: string; title: string; text: string; points: string[] }[] = [
  {
    n: "01",
    title: "Planning",
    text: "Every successful project begins before mobilisation. We define scope, risk, programme and resources with clarity.",
    points: ["Scope & requirements review", "Programme & resource planning", "Risk identification"],
  },
  {
    n: "02",
    title: "Engineering",
    text: "Sound technical judgement applied to methods, materials and details, in line with recognised engineering practice.",
    points: ["Technical review & methodology", "Materials specification", "Buildability input"],
  },
  {
    n: "03",
    title: "Execution",
    text: "Disciplined site management, clear communication and safe working practices to deliver the works as planned.",
    points: ["Site organisation & supervision", "Cost & programme control", "Stakeholder communication"],
  },
  {
    n: "04",
    title: "Quality Assurance",
    text: "Inspection, testing and verification built into the process, so quality is demonstrated rather than assumed.",
    points: ["Inspection & testing", "Workmanship verification", "Handover & close-out"],
  },
];

export const values: { title: string; text: string }[] = [
  {
    title: "Professional integrity",
    text: "We act honestly and transparently, and we say what we can deliver — and what we cannot.",
  },
  {
    title: "Engineering precision",
    text: "Rigour in planning, detailing and execution, because small tolerances decide long-term performance.",
  },
  {
    title: "Quality",
    text: "Quality materials, verified workmanship and finished work that meets the specification.",
  },
  {
    title: "Safety",
    text: "People come first. Safe methods and sound site practice are a baseline, not an afterthought.",
  },
  {
    title: "Sustainable development",
    text: "Responsible material choices and durable design that serve communities well beyond handover.",
  },
  {
    title: "Partnership",
    text: "Strong projects are built on trust, open communication and relationships that last.",
  },
];

export const commitments: { title: string; text: string; image: ImageKey }[] = [
  {
    title: "Quality",
    text: "We specify quality materials, verify workmanship against drawings and standards, and treat inspection as part of delivery.",
    image: "rebar",
  },
  {
    title: "Safety",
    text: "We plan work with safety in mind, brief teams clearly and expect safe practice from every contributor on site.",
    image: "siteTeam",
  },
  {
    title: "Professional integrity",
    text: "Clear scope, honest reporting and ethical conduct underpin every client and partner relationship.",
    image: "blueprint",
  },
  {
    title: "Sustainable development",
    text: "We favour durable design, responsible sourcing and infrastructure that supports communities and the environment over its full life.",
    image: "bridgePiers",
  },
];

export const partnerTypes: { title: string; text: string }[] = [
  {
    title: "Engineering & construction firms",
    text: "Joint ventures, consortia and sub-contracting arrangements on civil, marine and building works.",
  },
  {
    title: "Infrastructure developers",
    text: "Delivery support and local execution capability for infrastructure programmes in Nigeria.",
  },
  {
    title: "Oil & gas organisations",
    text: "Civil, foundation and piling support for energy-sector facilities — an area of strategic interest.",
  },
  {
    title: "Marine engineering companies",
    text: "Collaboration on jetties, waterfront structures, shore protection and coastal infrastructure.",
  },
  {
    title: "Equipment & materials suppliers",
    text: "Supply relationships built on specification, reliability and consistent quality.",
  },
  {
    title: "Real estate developers",
    text: "Construction-informed advisory, project management and delivery support for property developments.",
  },
  {
    title: "International project stakeholders",
    text: "Investors, development partners and international contractors exploring opportunities in Africa.",
  },
];

export const partnershipPathways: { title: string; text: string }[] = [
  {
    title: "Joint ventures & consortia",
    text: "Combine complementary capability to pursue larger or more specialised projects.",
  },
  {
    title: "Technical collaboration",
    text: "Share engineering knowledge, methods and expertise on specific scopes.",
  },
  {
    title: "Supply & equipment partnerships",
    text: "Establish dependable supply of materials and plant for project delivery.",
  },
  {
    title: "Knowledge exchange & mentorship",
    text: "Professional networking, continuous learning and mentorship across the engineering community.",
  },
];
