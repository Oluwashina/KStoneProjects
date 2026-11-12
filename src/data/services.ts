import type { ImageKey } from "./images";

export type ServiceCategoryId =
  | "civil-infrastructure"
  | "marine-coastal"
  | "building-structural"
  | "support-business";

export type Service = {
  slug: string;
  title: string;
  category: ServiceCategoryId;
  /** One or two sentences. */
  summary: string;
  /** Plain-language explanation of the value to the client. */
  value: string;
  /** Capability areas — what the service can cover, not a record of past work. */
  scope: string[];
  image: ImageKey;
  /** Label used on the enquiry CTA, e.g. "Enquire about road construction". */
  ctaLabel: string;
};

export type ServiceCategory = {
  id: ServiceCategoryId;
  index: string;
  title: string;
  short: string;
  intro: string;
  image: ImageKey;
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: "civil-infrastructure",
    index: "01",
    title: "Civil & Infrastructure Engineering",
    short: "Civil & Infrastructure",
    intro:
      "Roads, bridges and the enabling works that connect people, markets and industry — planned for durability and delivered to specification.",
    image: "roadWorks",
  },
  {
    id: "marine-coastal",
    index: "02",
    title: "Marine & Coastal Engineering",
    short: "Marine & Coastal",
    intro:
      "Waterfront and coastal works that demand careful design, robust materials and disciplined execution in demanding environments.",
    image: "marineKspWelding",
  },
  {
    id: "building-structural",
    index: "03",
    title: "Building & Structural Works",
    short: "Building & Structural",
    intro:
      "From foundations to finishes, structural integrity and site discipline underpin every building we undertake or supervise.",
    image: "siteCranes",
  },
  {
    id: "support-business",
    index: "04",
    title: "Construction Support & Business Services",
    short: "Support & Business Services",
    intro:
      "The materials, equipment and advisory services that keep projects supplied, mobilised and commercially sound.",
    image: "equipment",
  },
];

export const services: Service[] = [
  // ── Civil & Infrastructure ────────────────────────────────────────────
  {
    slug: "road-construction",
    title: "Road Construction",
    category: "civil-infrastructure",
    summary:
      "Construction and rehabilitation of roads, from earthworks and drainage through to base courses and surfacing.",
    value:
      "Well-built roads depend on what lies beneath the surface. Attention to subgrade, drainage and layer quality reduces premature failure and long-term maintenance cost.",
    scope: [
      "New road construction",
      "Road rehabilitation and reconstruction",
      "Earthworks, drainage and culverts",
      "Base, sub-base and surfacing works",
    ],
    image: "roadWorks",
    ctaLabel: "Enquire about road construction",
  },
  {
    slug: "bridge-infrastructure",
    title: "Bridge Infrastructure",
    category: "civil-infrastructure",
    summary:
      "Bridge and structural crossing works, with emphasis on foundations, substructure quality and construction sequencing.",
    value:
      "Bridges are long-life assets. Careful foundations, material control and sequencing protect structural performance and the safety of the people who rely on them.",
    scope: [
      "Foundations, abutments and piers",
      "Culverts and drainage crossings",
      "Deck and superstructure works",
      "Construction sequencing and supervision",
    ],
    image: "bridgeSpan",
    ctaLabel: "Enquire about bridge infrastructure",
  },
  {
    slug: "civil-engineering-works",
    title: "Civil Engineering Works",
    category: "civil-infrastructure",
    summary:
      "General civil works that enable and support infrastructure, industrial and commercial developments.",
    value:
      "Enabling works set the pace for the whole programme. Getting drainage, retaining structures and site infrastructure right early avoids costly rework later.",
    scope: [
      "Site preparation and bulk earthworks",
      "Drainage and stormwater systems",
      "Retaining structures and hardstanding",
      "Utilities and associated civil works",
    ],
    image: "viaduct",
    ctaLabel: "Enquire about civil engineering works",
  },
  {
    slug: "infrastructure-development",
    title: "Infrastructure Development",
    category: "civil-infrastructure",
    summary:
      "Participation in larger infrastructure programmes as contractor, partner or delivery support.",
    value:
      "Large programmes need dependable delivery partners. We position ourselves to contribute technical capability and disciplined site management to major infrastructure initiatives.",
    scope: [
      "Contracting and sub-contracting support",
      "Joint-venture and consortium participation",
      "Programme and package delivery support",
      "Public and private sector infrastructure",
    ],
    image: "roadInterchange",
    ctaLabel: "Enquire about infrastructure development",
  },

  // ── Marine & Coastal ──────────────────────────────────────────────────
  {
    slug: "marine-infrastructure",
    title: "Marine Infrastructure",
    category: "marine-coastal",
    summary:
      "Waterfront and port-related structures, including quays, landing facilities and associated foundations.",
    value:
      "Marine works are unforgiving. Specification, materials and workmanship need to withstand tide, corrosion and load — and sound planning keeps schedules realistic.",
    scope: [
      "Quay and waterfront structures",
      "Piling and marine foundations",
      "Port-related civil works",
      "Industrial waterfront infrastructure",
    ],
    image: "port",
    ctaLabel: "Enquire about marine infrastructure",
  },
  {
    slug: "shore-protection",
    title: "Shore Protection",
    category: "marine-coastal",
    summary:
      "Coastal defence and erosion control through revetments, seawalls and armour-stone or concrete-unit protection.",
    value:
      "Shorelines are under constant pressure. Effective protection safeguards property, infrastructure and communities, and is designed around local conditions.",
    scope: [
      "Revetments and seawalls",
      "Rock and concrete armour protection",
      "Erosion control",
      "Embankment and bank stabilisation",
    ],
    image: "shoreProtection",
    ctaLabel: "Enquire about shore protection",
  },
  {
    slug: "jetty-construction",
    title: "Jetty Construction",
    category: "marine-coastal",
    summary:
      "Jetties and landing facilities for transport, industrial and community use.",
    value:
      "A jetty is a working asset. Sound structural design, durable materials and safe access make the difference between a facility that serves for decades and one that does not.",
    scope: [
      "Piled jetty structures",
      "Decks, fenders and mooring provisions",
      "Approach and access works",
      "Maintenance and rehabilitation",
    ],
    image: "jetty",
    ctaLabel: "Enquire about jetty construction",
  },
  {
    slug: "coastal-infrastructure",
    title: "Coastal Infrastructure Solutions",
    category: "marine-coastal",
    summary:
      "Integrated coastal works that combine protection, access and resilient infrastructure.",
    value:
      "Coastal sites need solutions that consider the whole system. We approach each location with attention to long-term resilience and environmental responsibility.",
    scope: [
      "Coastal access and promenade works",
      "Drainage and outfall structures",
      "Resilient coastal design input",
      "Sustainable material selection",
    ],
    image: "bridgePiers",
    ctaLabel: "Enquire about coastal infrastructure",
  },

  // ── Building & Structural ─────────────────────────────────────────────
  {
    slug: "building-construction",
    title: "Building Construction",
    category: "building-structural",
    summary:
      "Construction of residential, commercial and institutional buildings, delivered to quality and programme.",
    value:
      "Buildings succeed when design intent meets site reality. Coordinated planning, quality materials and clear communication keep projects on course.",
    scope: [
      "Residential and commercial buildings",
      "Institutional and mixed-use buildings",
      "Foundations through to finishes",
      "Fit-out coordination",
    ],
    image: "siteCranes",
    ctaLabel: "Enquire about building construction",
  },
  {
    slug: "structural-works",
    title: "Structural Works",
    category: "building-structural",
    summary:
      "Reinforced concrete and structural frames, foundations and piling support.",
    value:
      "Structure is where safety and longevity are decided. Disciplined reinforcement, formwork and concrete practice protect performance and reduce defects.",
    scope: [
      "Reinforced concrete frames and slabs",
      "Foundations and piling support",
      "Steel and composite structural works",
      "Structural quality control",
    ],
    image: "piling",
    ctaLabel: "Enquire about structural works",
  },
  {
    slug: "site-supervision",
    title: "Site Supervision",
    category: "building-structural",
    summary:
      "On-site technical supervision to confirm that works are executed to specification and good practice.",
    value:
      "Independent, informed supervision helps clients see that what is specified is what is built — protecting quality, safety and value for money.",
    scope: [
      "Daily site supervision and inspection",
      "Material and workmanship checks",
      "Progress and quality reporting",
      "Safety and compliance monitoring",
    ],
    image: "siteTeam",
    ctaLabel: "Enquire about site supervision",
  },
  {
    slug: "project-management",
    title: "Construction Project Management",
    category: "building-structural",
    summary:
      "Planning, coordination and control of construction projects from mobilisation to handover.",
    value:
      "Clear planning, cost awareness and reporting give clients confidence and control throughout delivery.",
    scope: [
      "Programme planning and control",
      "Cost monitoring and reporting",
      "Contractor and supplier coordination",
      "Handover and close-out",
    ],
    image: "blueprint",
    ctaLabel: "Enquire about project management",
  },

  // ── Support & Business ────────────────────────────────────────────────
  {
    slug: "building-materials-supply",
    title: "Building Materials Supply",
    category: "support-business",
    summary:
      "Supply of construction materials to projects, with attention to specification and consistency.",
    value:
      "Quality outcomes start with quality materials. Reliable sourcing and clear specifications help projects avoid delays and substandard inputs.",
    scope: [
      "Construction materials sourcing",
      "Specification-led procurement",
      "Project and contractor supply",
      "Logistics coordination",
    ],
    image: "rebar",
    ctaLabel: "Enquire about materials supply",
  },
  {
    slug: "construction-equipment-services",
    title: "Construction Equipment Services",
    category: "support-business",
    summary:
      "Equipment support for earthworks, civil and building projects.",
    value:
      "The right equipment, available at the right time, keeps sites productive and programmes protected.",
    scope: [
      "Earthmoving and civil plant support",
      "Equipment mobilisation",
      "Project-based equipment arrangements",
      "Operator and site coordination",
    ],
    image: "equipment",
    ctaLabel: "Enquire about equipment services",
  },
  {
    slug: "real-estate-consultancy",
    title: "Real Estate Consultancy",
    category: "support-business",
    summary:
      "Advisory support for property development and investment decisions with a construction-informed perspective.",
    value:
      "Understanding construction realities early helps developers and investors make sounder decisions about feasibility, scope and delivery.",
    scope: [
      "Development feasibility input",
      "Construction cost and scope advice",
      "Project structuring support",
      "Developer and investor advisory",
    ],
    image: "residential",
    ctaLabel: "Enquire about real estate consultancy",
  },
];

export const getCategory = (id: ServiceCategoryId) =>
  serviceCategories.find((c) => c.id === id)!;

export const servicesByCategory = (id: ServiceCategoryId) =>
  services.filter((s) => s.category === id);
