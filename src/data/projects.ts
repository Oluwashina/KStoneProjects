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

export type Project = {
  slug: string;
  title: string;
  location: string;
  category: ProjectCategoryId;
  overview: string;
  scope: string[];
  status: ProjectStatus;
  /** First image is the lead image. */
  images: SiteImage[];
  /** Optional: only add facts you can verify. */
  client?: string;
};

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  PROJECT PORTFOLIO — intentionally empty.
 *
 *  Kstone Projects has not yet supplied verified project records, so none are
 *  shown. The /projects page renders designed placeholder states until entries
 *  are added here. Only add projects that are real and approved for publication
 *  (title, location, scope, status and photography).
 *
 *  Example entry shape:
 *
 *  {
 *    slug: "example-road-rehabilitation",
 *    title: "…",
 *    location: "…, Nigeria",
 *    category: "roads-highways",
 *    overview: "…",
 *    scope: ["…", "…"],
 *    status: "Completed",
 *    images: [{ src: "/images/projects/example.jpg", alt: "…", width: 2400, height: 1600 }],
 *  }
 * ─────────────────────────────────────────────────────────────────────────
 */
export const projects: Project[] = [];

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
