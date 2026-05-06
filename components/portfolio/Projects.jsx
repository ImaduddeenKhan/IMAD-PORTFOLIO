import Link from "next/link";
import Image from "next/image";
import { Github, Youtube, ExternalLink, Play } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { youtubeId } from "@/lib/utils";

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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, index) => (
          <ProjectCard key={p.id} project={p} index={index} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const href = `/projects/${project.id}`;
  const ytId = youtubeId(project.youtubeUrl);
  const thumbnail = project.thumbnail || (ytId ? `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg` : null);
  return (
    <article
      className="card motion-card overflow-hidden flex flex-col group transition-all duration-500 animate-fade-up"
      style={{ "--enter-delay": `${index * 60}ms` }}
    >
      <Link href={href} className="motion-media block relative overflow-hidden bg-bg aspect-video">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={project.title}
            fill
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-end justify-between p-4 text-white/90"
            style={{ background: project.gradient || "linear-gradient(135deg,#667eea,#764ba2)" }}
          >
            <div className="text-2xl font-display font-bold tracking-[-0.08em]">
              {project.title.split(" ").map((s) => s[0]).slice(0, 3).join("")}
            </div>
            <div className="text-xs uppercase tracking-[0.25em] text-white/60">{String(index + 1).padStart(2, "0")}</div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" aria-hidden="true" />
        {ytId && !project.thumbnail && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-10 w-10 rounded-full bg-white/85 backdrop-blur-sm flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.22)]">
              <Play className="h-4 w-4 text-fg fill-fg" />
            </div>
          </div>
        )}
        {project.featured && (
          <span className="absolute top-3 left-3 chip bg-[rgb(var(--surface))/0.9] text-fg border-transparent text-[0.6rem]">
            Featured
          </span>
        )}
      </Link>
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <div className="flex-1 min-w-0">
            <div className="eyebrow mb-1.5">Selected work</div>
            <Link href={href} className="font-display font-semibold text-base tracking-[-0.03em] hover:text-primary transition-colors line-clamp-2 leading-snug">
              {project.title}
            </Link>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub repository"
                className="h-8 w-8 rounded-full border border-border bg-surface/75 flex items-center justify-center text-fg/60 hover:text-fg transition-colors"
              >
                <Github className="h-3.5 w-3.5" />
              </a>
            )}
            {project.youtubeUrl && (
              <a
                href={project.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube video"
                className="h-8 w-8 rounded-full border border-border bg-surface/75 flex items-center justify-center text-fg/60 hover:text-red-500 transition-colors"
              >
                <Youtube className="h-3.5 w-3.5" />
              </a>
            )}
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Live demo"
                className="h-8 w-8 rounded-full border border-border bg-surface/75 flex items-center justify-center text-fg/60 hover:text-primary transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
        {project.description && (
          <p className="text-xs text-fg/65 leading-relaxed line-clamp-2">{project.description}</p>
        )}
        {project.tags?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((t) => (
              <span key={t} className="chip text-[0.6rem] px-2 py-1">{t}</span>
            ))}
          </div>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted">
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
