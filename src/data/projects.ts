import type { SiteImage } from "./images";

export type ProjectCategoryId =
  | "roads-highways"
  | "bridges-infrastructure"
  | "marine-coastal"
  | "buildings-structures"
  | "other-works";

export const projectCategories: { id: ProjectCategoryId; label: string }[] = [
  { id: "roads-highways", label: "Roads & Highways" },
  { id: "bridges-infrastructure", label: "Bridges & Infrastructure" },
  { id: "marine-coastal", label: "Marine & Coastal" },
  { id: "buildings-structures", label: "Buildings & Structures" },
  { id: "other-works", label: "Other Engineering Works" },
];

export type ProjectStatus = "Completed" | "In progress" | "Planned";

export type ProjectVideo = {
  /** Path under /public, e.g. /videos/projects/example.mp4 */
  src: string;
  title: string;
  poster?: SiteImage;
};

export type Project = {
  slug: string;
  title: string;
  location: string;
  category: ProjectCategoryId;
  overview: string;
  scope: string[];
  status: ProjectStatus;
  /** First image is the lead image (cards, hero). */
  images: SiteImage[];
  /** Optional site footage — add files under /public/videos/projects/ */
  videos?: ProjectVideo[];
  client?: string;
};

const pj = (file: string, alt: string, width: number, height: number, position?: string): SiteImage => ({
  src: `/images/projects/${file}`,
  alt,
  width,
  height,
  position,
});

/**
 * Verified portfolio entries. Update titles, locations and status with Kstone’s sign-off.
 * Add videos in `videos[]` when files are supplied.
 */
export const projects: Project[] = [
  {
    slug: "waterfront-jetty-pier-construction",
    title: "Waterfront jetty & pier construction",
    location: "Nigeria",
    category: "marine-coastal",
    overview:
      "On-water construction of jetty and pier infrastructure — pile foundations in the intertidal zone, reinforced concrete deck preparation, marine logistics and specialist welding under site engineering supervision.",
    scope: [
      "Steel pile driving & welding",
      "Reinforced concrete deck & beam works",
      "Marine barge & crane lifts",
      "Temporary timber access",
      "Site engineering supervision",
    ],
    status: "In progress",
    images: [
      pj(
        "marine-welding-supervision.jpg",
        "Site engineer in high-visibility vest supervising welding on a steel pile above open water",
        950,
        1024,
        "50% 35%",
      ),
      pj(
        "marine-barge-crane.jpg",
        "Lattice-boom crane on a working barge positioning steel over brown coastal water",
        473,
        1024,
        "50% 40%",
      ),
      pj(
        "marine-beam-rebar-cages.jpg",
        "Reinforced concrete beam cages and formwork on a platform above green coastal water",
        629,
        1024,
      ),
      pj(
        "marine-deck-rebar-team.jpg",
        "Engineers in hard hats on a rebar deck mat above the waterline at a waterfront site",
        720,
        960,
      ),
      pj(
        "marine-pier-concrete-slab.jpg",
        "Freshly poured concrete pier deck supported on piles above calm water under overcast skies",
        850,
        1024,
      ),
      pj(
        "marine-pile-caps.jpg",
        "Timber pile-cap formwork and starter reinforcement in the tidal zone",
        755,
        1024,
      ),
      pj(
        "marine-pile-formwork-boat.jpg",
        "Crew in a workboat tending rectangular timber pile formworks aligned in shallow water",
        762,
        1024,
      ),
      pj(
        "marine-pile-welding.jpg",
        "Welding operations on a driven steel pile from a timber marine working platform",
        668,
        1024,
      ),
      pj(
        "marine-jetty-timber-deck.jpg",
        "Timber jetty structure under construction with ramp access over green harbour water",
        844,
        1024,
        "50% 45%",
      ),
    ],
  },
  {
    slug: "foundation-piling-site-operations",
    title: "Foundation piling & site crane operations",
    location: "Nigeria",
    category: "other-works",
    overview:
      "Mobilisation of piling plant and crawler crane for deep foundation works and general site lifting — supporting substructure construction with disciplined equipment handling and on-site coordination.",
    scope: ["Piling rig operations", "Crane lifting & positioning", "Foundation preparation", "Site safety coordination"],
    status: "In progress",
    images: [
      pj(
        "foundation-piling-rig.jpg",
        "Piling rig and crew operating beside a cast column on a sandy construction site",
        760,
        1024,
      ),
      pj(
        "site-crane-mobilisation.jpg",
        "Tracked crawler crane on a civil works site with crew in PPE coordinating a lift",
        810,
        810,
      ),
    ],
  },
];

/** Fields every published project will present (used to describe placeholders). */
export const projectFields = [
  "Project title",
  "Location",
  "Project category",
  "Overview",
  "Scope of work",
  "Project status",
  "Project photography",
] as const;
