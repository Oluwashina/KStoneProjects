import type { Metadata } from "next";
import { Suspense } from "react";
import { ProjectDetailContent } from "@/components/sections/ProjectDetailContent";
import { ProjectDetailFallback } from "@/components/sections/ProjectDetailFallback";
import { getProject, projectSlugs } from "@/lib/projects";

export function generateStaticParams() {
  return projectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.overview,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

/** URL `params` are resolved inside Suspense (required with `cacheComponents` / PPR). */
export default function ProjectDetailPage(props: PageProps<"/projects/[slug]">) {
  return (
    <Suspense fallback={<ProjectDetailFallback />}>
      <ProjectDetailContent params={props.params} />
    </Suspense>
  );
}
