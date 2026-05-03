import { Rocket, Sparkles, Globe2, Lightbulb } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const STATUS_BADGES = {
  idea: { label: "Idea", icon: Lightbulb, color: "text-yellow-400" },
  building: { label: "Building", icon: Sparkles, color: "text-primary" },
  beta: { label: "Beta", icon: Rocket, color: "text-orange-400" },
  live: { label: "Live", icon: Globe2, color: "text-green-400" },
};

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
          return (
            <div
              key={b.id}
              className="card motion-card p-6 sm:p-7 flex flex-col gap-4 animate-fade-up"
              style={{ "--enter-delay": `${index * 80}ms` }}
            >
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
              {b.description && <p className="text-sm text-fg/65 leading-relaxed max-w-2xl">{b.description}</p>}
              {b.url && (
                <a href={b.url} target="_blank" rel="noopener noreferrer" className="btn-outline self-start mt-1">
                  Visit →
                </a>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
