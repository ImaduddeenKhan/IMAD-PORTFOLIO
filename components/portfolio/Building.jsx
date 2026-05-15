import { Rocket, Sparkles, Globe2, Lightbulb, Youtube } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { youtubeEmbedUrl } from "@/lib/utils";

const DEFAULT_SHARED_VIDEO_URL = "https://youtu.be/DB3D-mtWR0c";

const STATUS_BADGES = {
  idea: { label: "Idea", icon: Lightbulb, color: "text-yellow-400" },
  building: { label: "Building", icon: Sparkles, color: "text-primary" },
  beta: { label: "Beta", icon: Rocket, color: "text-orange-400" },
  live: { label: "Live", icon: Globe2, color: "text-green-400" },
};

export default function Building({ items = [], sharedVideoUrl }) {
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
          const videoUrl = b.videoUrl || sharedVideoUrl || DEFAULT_SHARED_VIDEO_URL;
          const embedUrl = youtubeEmbedUrl(videoUrl);
          return (
            <div
              key={b.id}
              className="card motion-card overflow-hidden p-6 sm:p-7 flex flex-col gap-5 animate-fade-up"
              style={{ "--enter-delay": `${index * 80}ms` }}
            >
              <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] xl:items-start">
                <div className="min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="eyebrow mb-2">In progress</div>
                      <h3 className="font-display font-semibold text-2xl tracking-[-0.04em] leading-tight">{b.name}</h3>
                      <p className="text-sm text-fg/75 mt-2 max-w-xl">{b.tagline}</p>
                    </div>
                    <div className={`flex items-center gap-1.5 text-xs font-medium ${badge.color} chip`}>
                      <Icon className="h-3.5 w-3.5" />
                      {badge.label}
                    </div>
                  </div>
                  {b.description && <p className="text-sm text-fg/65 leading-relaxed max-w-2xl mt-4">{b.description}</p>}
                  <div className="mt-4 flex flex-wrap gap-3">
                    {b.url && (
                      <a href={b.url} target="_blank" rel="noopener noreferrer" className="btn-outline self-start">
                        Visit →
                      </a>
                    )}
                    {videoUrl && (
                      <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="chip">
                        <Youtube className="h-3.5 w-3.5 text-red-500" />
                        Watch
                      </a>
                    )}
                  </div>
                </div>
                {embedUrl && (
                  <div className="w-full min-w-0 overflow-hidden rounded-[1.6rem] border border-border bg-bg shadow-[0_22px_55px_rgba(0,0,0,0.08)]">
                    <div className="px-4 pt-4">
                      <div className="eyebrow mb-2">Product video</div>
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
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
