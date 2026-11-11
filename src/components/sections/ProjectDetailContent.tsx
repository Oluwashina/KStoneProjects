import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { projectCategories, type Project } from "@/data/projects";
import { getProject } from "@/lib/projects";

export async function ProjectDetailContent({
  params,
}: {
  params: PageProps<"/projects/[slug]">["params"];
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return <ProjectDetailBody project={project} />;
}

function ProjectDetailBody({ project }: { project: Project }) {
  const category =
    projectCategories.find((c) => c.id === project.category)?.label ?? project.category;
  const [lead, ...gallery] = project.images;

  return (
    <>
      <section aria-labelledby="project-title" className="bg-navy-900 text-white">
        <div className="container-x py-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-ui text-sm text-white/75 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" aria-hidden />
            All projects
          </Link>
        </div>
        <div className="relative min-h-[22rem] overflow-hidden md:min-h-[28rem]">
          {lead ? (
            <Photo
              image={lead}
              priority
              sizes="100vw"
              className="absolute inset-0"
              imgClassName="opacity-90"
              quality={70}
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/55 to-navy-900/20" />
          <div className="container-x relative flex min-h-[22rem] flex-col justify-end pb-12 pt-24 md:min-h-[28rem] md:pb-16">
            <p className="eyebrow !text-[#8fb4f2]">{category}</p>
            <h1 id="project-title" className="display mt-6 max-w-4xl">
              {project.title}
            </h1>
            <p className="mt-4 flex items-center gap-2 font-ui text-base text-white/80">
              <MapPin className="size-4" aria-hidden />
              {project.location}
            </p>
            <p className="mt-8 max-w-2xl text-lg text-white/85">{project.overview}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="bg-brand px-4 py-2 font-ui text-xs font-semibold uppercase tracking-[0.14em]">
                {project.status}
              </span>
              {project.scope.map((s) => (
                <span key={s} className="border border-white/25 px-4 py-2 font-ui text-xs text-white/85">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {gallery.length > 0 && (
        <section aria-labelledby="gallery-heading" className="bg-white py-20 md:py-28">
          <div className="container-x">
            <Reveal>
              <h2 id="gallery-heading" className="h2 text-navy">
                On site
              </h2>
              <p className="lead mt-4 max-w-2xl">
                Photography from Kstone Projects&apos; own records. Additional images and footage can be published as
                they are approved.
              </p>
            </Reveal>
            <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {gallery.map((img, i) => (
                <Reveal as="li" key={img.src} delay={(i % 3) * 80} className="overflow-hidden">
                  <div className="relative aspect-[4/5] bg-arch sm:aspect-[3/4]">
                    <Photo image={img} reveal delay={i * 60} sizes="(min-width: 1024px) 33vw, 50vw" className="absolute inset-0" />
                  </div>
                  <p className="sr-only">{img.alt}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {project.videos && project.videos.length > 0 && (
        <section aria-labelledby="video-heading" className="bg-arch py-20 md:py-28">
          <div className="container-x">
            <h2 id="video-heading" className="h2 text-navy">
              Site footage
            </h2>
            <ul className="mt-12 grid gap-10 lg:grid-cols-2">
              {project.videos.map((v) => (
                <li key={v.src}>
                  <div className="overflow-hidden bg-navy">
                    <video
                      className="aspect-video w-full bg-black"
                      controls
                      preload="metadata"
                      poster={v.poster?.src}
                      aria-label={v.title}
                    >
                      <source src={v.src} />
                      Your browser does not support embedded video.
                    </video>
                  </div>
                  <p className="mt-4 font-ui text-sm font-semibold text-navy">{v.title}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="border-t border-line bg-white py-16">
        <div className="container-x flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-slate">
            Need scope, programme or reference detail for a tender or partnership discussion? Our team can advise what
            can be shared.
          </p>
          <Button href="/contact?service=other#enquiry" variant="outline-dark">
            Discuss this type of work
          </Button>
        </div>
      </section>

      <CTASection
        eyebrow="More from the portfolio"
        title={
          <>
            Explore more <span className="serif-accent text-[1.06em]">Kstone work.</span>
          </>
        }
        text="Browse marine, civil and structural projects — or view the full service offering."
        image="shoreProtection"
        secondary={{ label: "All projects", href: "/projects" }}
      />
    </>
  );
}
