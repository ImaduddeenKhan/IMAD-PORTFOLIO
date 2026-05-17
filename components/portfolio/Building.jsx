import { CheckCircle2, Rocket, Sparkles, Globe2, Lightbulb, Youtube } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { youtubeEmbedUrl } from "@/lib/utils";

const STATUS_BADGES = {
  idea: { label: "Idea", icon: Lightbulb, color: "text-yellow-400" },
  building: { label: "Building", icon: Sparkles, color: "text-primary" },
  beta: { label: "Beta", icon: Rocket, color: "text-orange-400" },
  live: { label: "Live", icon: Globe2, color: "text-green-400" },
};

function descriptionToLines(description) {
  if (Array.isArray(description)) return description.filter(Boolean);
  return String(description || "")
    .split(/\s*\|\s*/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export default function Building({ items = [] }) {
  if (!items.length) return null;
  return (
    <section className="section-shell">
      <SectionHeader
        id="building"
        title="What I'm building"
        subtitle="Focused bets I'm working on right now."
      />
      <div className="grid gap-5 lg:grid-cols-2">
        {items.map((b, index) => {
          const badge = STATUS_BADGES[b.status] || STATUS_BADGES.building;
          const Icon = badge.icon;
          const videoUrl = b.videoUrl || "";
          const embedUrl = youtubeEmbedUrl(videoUrl);
          const descriptionLines = descriptionToLines(b.description);

          return (
            <div
              key={b.id}
              className="card motion-card overflow-hidden p-5 sm:p-6 flex flex-col gap-4 animate-fade-up"
              style={{ "--enter-delay": `${index * 80}ms` }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="eyebrow mb-2">In progress</div>
                  <h3 className="font-display font-semibold text-xl sm:text-2xl tracking-[-0.04em] leading-tight">
                    {b.name}
                  </h3>
                  <p className="text-sm text-fg/75 mt-2 max-w-xl leading-relaxed">{b.tagline}</p>
                </div>
                <div className={`flex shrink-0 items-center gap-1.5 text-xs font-medium ${badge.color} chip`}>
                  <Icon className="h-3.5 w-3.5" />
                  {badge.label}
                </div>
              </div>

              {descriptionLines.length > 0 && (
                <div className="grid gap-2 rounded-[1.25rem] border border-border/70 bg-bg/35 p-3.5 sm:p-4">
                  {descriptionLines.map((line) => (
                    <div key={line} className="flex gap-2.5 text-sm text-fg/70 leading-relaxed">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary/65" />
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              )}

              {embedUrl && (
                <div className="w-full max-w-[24rem] min-w-0 overflow-hidden rounded-[1.25rem] border border-border bg-bg shadow-[0_18px_38px_rgba(0,0,0,0.07)]">
                  <div className="flex items-center justify-between gap-3 px-3.5 py-2.5">
                    <div className="eyebrow">Product video</div>
                    <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="chip px-2.5 py-1 text-[0.65rem]">
                      <Youtube className="h-3.5 w-3.5 text-red-500" />
                      Watch
                    </a>
                  </div>
                  <div className="relative w-full aspect-video overflow-hidden">
                    <iframe
                      src={embedUrl}
                      title={`${b.name} video`}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full block"
                    />
                  </div>
                </div>
              )}

              <div className="mt-auto flex flex-wrap gap-3 pt-1">
                {b.url && (
                  <a href={b.url} target="_blank" rel="noopener noreferrer" className="btn-outline self-start px-4 py-2.5">
                    Visit →
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
