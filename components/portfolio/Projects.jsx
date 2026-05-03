import Link from "next/link";
import Image from "next/image";
import { Github, Youtube, ExternalLink } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const STATUS_LABELS = {
  active: "Active",
  wip: "Work in progress",
  archived: "Archived",
};

export default function Projects({ projects = [] }) {
  if (!projects.length) return null;
  return (
    <section className="section-shell">
      <SectionHeader id="projects" title="Projects" subtitle="Things I've built." />
      <div className="grid gap-5 lg:grid-cols-12">
        {projects.map((p, index) => (
          <ProjectCard key={p.id} project={p} index={index} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const href = `/projects/${project.id}`;
  const large = index === 0;
  return (
    <article
      className={`card motion-card overflow-hidden flex flex-col group transition-all duration-500 ${large ? "lg:col-span-7" : "lg:col-span-5"} animate-fade-up`}
      style={{ "--enter-delay": `${index * 80}ms` }}
    >
      <Link href={href} className={`motion-media block relative overflow-hidden bg-bg ${large ? "aspect-[16/10]" : "aspect-video"}`}>
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            sizes="(max-width:768px) 100vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-end justify-between p-5 sm:p-6 text-white/90"
            style={{ background: project.gradient || "linear-gradient(135deg,#667eea,#764ba2)" }}
          >
            <div className="text-3xl sm:text-4xl font-display font-bold tracking-[-0.08em]">
              {project.title.split(" ").map((s) => s[0]).slice(0, 3).join("")}
            </div>
            <div className="text-xs uppercase tracking-[0.25em] text-white/70">{String(index + 1).padStart(2, "0")}</div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" aria-hidden="true" />
        {project.featured && (
          <span className="absolute top-4 left-4 chip bg-[rgb(var(--surface))/0.9] text-fg border-transparent">
            Featured
          </span>
        )}
        {project.youtubeUrl && (
          <span className="absolute top-4 right-4 chip bg-[rgb(var(--surface))/0.9] text-fg border-transparent">
            Video walkthrough
          </span>
        )}
      </Link>
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <div className="eyebrow mb-2">Selected work</div>
            <Link href={href} className={`font-display font-semibold leading-tight hover:text-primary transition-colors ${large ? "text-2xl tracking-[-0.04em]" : "text-xl tracking-[-0.03em]"}`}>
            {project.title}
            </Link>
          </div>
          <div className="flex items-center gap-2 shrink-0 mt-0.5">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub repository"
                className="h-10 w-10 rounded-full border border-border bg-surface/75 flex items-center justify-center text-fg/60 hover:text-fg transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            {project.youtubeUrl && (
              <a
                href={project.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube video"
                className="h-10 w-10 rounded-full border border-border bg-surface/75 flex items-center justify-center text-fg/60 hover:text-red-500 transition-colors"
              >
                <Youtube className="h-4 w-4" />
              </a>
            )}
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Live demo"
                className="h-10 w-10 rounded-full border border-border bg-surface/75 flex items-center justify-center text-fg/60 hover:text-primary transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
        {project.description && (
          <p className="text-sm text-fg/70 leading-relaxed line-clamp-4 max-w-2xl">{project.description}</p>
        )}
        {project.tags?.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.slice(0, large ? 6 : 4).map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>
        )}
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted">
          {project.youtubeUrl && (
            <a href={project.youtubeUrl} target="_blank" rel="noopener noreferrer" className="hover:text-fg transition-colors">
              Watch on YouTube
            </a>
          )}
          {project.liveDemoUrl && (
            <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="hover:text-fg transition-colors">
              Open live demo
            </a>
          )}
          {project.status && project.status !== "active" && (
            <span>{STATUS_LABELS[project.status] || project.status}</span>
          )}
        </div>
      </div>
    </article>
  );
}
