import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

const routes = [
  { path: "", priority: 1 },
  { path: "/about", priority: 0.8 },
  { path: "/services", priority: 0.9 },
  { path: "/projects", priority: 0.8 },
  { path: "/leadership", priority: 0.8 },
  { path: "/partnerships", priority: 0.8 },
  { path: "/contact", priority: 0.9 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = routes.map((r) => ({
    url: `${site.url}${r.path}`,
    changeFrequency: "monthly" as const,
    priority: r.priority,
  }));
  const projectPages = projects.map((p) => ({
    url: `${site.url}/projects/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...staticPages, ...projectPages];
}
