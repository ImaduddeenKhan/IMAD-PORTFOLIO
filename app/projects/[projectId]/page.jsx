import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Github, Youtube, ExternalLink } from "lucide-react";
import { getPublicPortfolio } from "@/lib/site-data";
import { youtubeEmbedUrl } from "@/lib/utils";
import ScreenshotCarousel from "@/components/portfolio/ScreenshotCarousel";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { projectId } = await params;
  const portfolio = await getPublicPortfolio().catch(() => null);
  const project = portfolio?.projects?.find((item) => item.id === projectId);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} — ${portfolio.personalInfo.fullName}`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }) {
  const { projectId } = await params;
  const portfolio = await getPublicPortfolio();
  if (!portfolio) notFound();

  const project = portfolio.projects?.find((item) => item.id === projectId);
  if (!project) notFound();

  const videoUrl = project.youtubeUrl || portfolio.hero?.introVideoUrl || "https://youtu.be/DB3D-mtWR0c";
  const ytEmbed = youtubeEmbedUrl(videoUrl);

  return (
    <div className="min-h-screen container-page py-8 sm:py-12 max-w-[1120px]">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg mb-8"
      >
        <ArrowLeft className="h-4 w-4" /> Back to portfolio
      </Link>

      <header className="card p-7 sm:p-9 mb-8 overflow-hidden relative">
        <div className="absolute right-0 top-0 h-44 w-44 -translate-y-12 translate-x-10 rounded-full bg-accent/15 blur-3xl" aria-hidden="true" />
        <div className="relative z-10 flex flex-wrap items-start justify-between gap-5">
          <div className="max-w-3xl">
            <div className="eyebrow mb-3">Project case study</div>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-[-0.05em] leading-[0.95]">{project.title}</h1>
            {project.description && (
              <p className="mt-4 text-fg/75 max-w-2xl leading-relaxed">{project.description}</p>
            )}
          </div>
          <div className="flex gap-2 flex-wrap">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
                <Github className="h-4 w-4" /> GitHub
              </a>
            )}
            {project.liveDemoUrl && (
              <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <ExternalLink className="h-4 w-4" /> Live demo
              </a>
            )}
            {videoUrl && (
              <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
                <Youtube className="h-4 w-4 text-red-500" /> Watch
              </a>
            )}
          </div>
        </div>

        {project.tags?.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="chip">{tag}</span>
            ))}
          </div>
        )}
      </header>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_20rem] items-start">
        <div className="space-y-6">
          {project.screenshots?.length > 0 ? (
            <ScreenshotCarousel screenshots={project.screenshots} title={project.title} />
          ) : project.thumbnail ? (
            <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-border bg-bg shadow-[0_26px_60px_rgba(0,0,0,0.08)]">
              <Image src={project.thumbnail} alt={project.title} fill sizes="(max-width:1024px) 100vw, 800px" className="object-cover" priority />
            </div>
          ) : (
            <div
              className="aspect-video rounded-[2rem] border border-border flex items-end justify-between p-6 sm:p-8 text-white/90 shadow-[0_26px_60px_rgba(0,0,0,0.08)]"
              style={{ background: project.gradient || "linear-gradient(135deg,#667eea,#764ba2)" }}
            >
              <div className="text-5xl sm:text-6xl font-display font-bold tracking-[-0.08em]">
                {project.title.split(" ").map((part) => part[0]).slice(0, 3).join("")}
              </div>
              <div className="text-xs uppercase tracking-[0.24em] text-white/70">Project</div>
            </div>
          )}

          {ytEmbed && (
            <div className="card p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div>
                  <div className="eyebrow mb-2">Video walkthrough</div>
                  <p className="text-sm text-fg/70">Project demo embedded directly from YouTube.</p>
                </div>
                {videoUrl && (
                  <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="chip">
                    <Youtube className="h-3.5 w-3.5 mr-1 text-red-500" /> Watch
                  </a>
                )}
              </div>
              <div className="relative aspect-video rounded-[1.5rem] overflow-hidden border border-border">
                <iframe
                  src={ytEmbed}
                  title={`${project.title} demo video`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </div>
          )}

          {project.longDescription && (
            <article className="card p-7 sm:p-8 prose-portfolio max-w-none">
              <div className="eyebrow mb-4">Project story</div>
              {project.longDescription.split(/\n\n+/).map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>
              ))}
            </article>
          )}
        </div>

        <aside className="card p-6 sm:p-7 xl:sticky xl:top-8 space-y-5">
          <div>
            <div className="eyebrow mb-2">Status</div>
            <div className="font-display text-2xl tracking-[-0.04em] capitalize">{project.status || "active"}</div>
          </div>
          {project.tags?.length > 0 && (
            <div>
              <div className="eyebrow mb-3">Stack highlights</div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="chip">{tag}</span>
                ))}
              </div>
            </div>
          )}
          <div>
            <div className="eyebrow mb-3">Links</div>
            <div className="flex flex-col gap-2">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-outline justify-start">
                  <Github className="h-4 w-4" /> Repository
                </a>
              )}
              {project.liveDemoUrl && (
                <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="btn-primary justify-start">
                  <ExternalLink className="h-4 w-4" /> Live demo
                </a>
              )}
              {videoUrl && (
                <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="btn-outline justify-start">
                  <Youtube className="h-4 w-4 text-red-500" /> YouTube demo
                </a>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}