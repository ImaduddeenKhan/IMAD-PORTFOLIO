import { Bot, Network, Sparkles, Zap } from "lucide-react";

/**
 * Decorative SVG hero artwork shared across all domain pages.
 * Renders an industry-tinted abstract scene with the domain icon
 * floating in front of a soft node-network. No external image needed.
 */
export default function DomainHeroArt({ Icon = Bot, palette = {} }) {
  const c1 = palette.c1 || "#5B9BFF";
  const c2 = palette.c2 || "#B97EFF";
  const c3 = palette.c3 || "#1B1F23";
  const accent = palette.accent || "#F5C26B";

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.6rem] border border-border bg-surface/70 shadow-[0_30px_70px_rgb(0_0_0_/_0.12)]">
      <svg
        viewBox="0 0 480 360"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="g1" cx="30%" cy="30%" r="80%">
            <stop offset="0%" stopColor={c1} stopOpacity="0.55" />
            <stop offset="60%" stopColor={c2} stopOpacity="0.18" />
            <stop offset="100%" stopColor={c3} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="g2" cx="80%" cy="80%" r="80%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.45" />
            <stop offset="100%" stopColor={c3} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="grid" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={c3} stopOpacity="0.10" />
            <stop offset="100%" stopColor={c3} stopOpacity="0.02" />
          </linearGradient>
          <pattern id="dotgrid" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1.4" cy="1.4" r="1.4" fill={c3} fillOpacity="0.10" />
          </pattern>
        </defs>

        <rect width="480" height="360" fill="url(#g1)" />
        <rect width="480" height="360" fill="url(#g2)" />
        <rect width="480" height="360" fill="url(#dotgrid)" />

        {/* connecting lines */}
        <g stroke={c3} strokeOpacity="0.18" strokeWidth="1">
          <line x1="60" y1="80" x2="220" y2="180" />
          <line x1="220" y1="180" x2="400" y2="100" />
          <line x1="220" y1="180" x2="380" y2="280" />
          <line x1="220" y1="180" x2="100" y2="290" />
          <line x1="60" y1="80" x2="400" y2="100" />
          <line x1="100" y1="290" x2="380" y2="280" />
        </g>

        {/* nodes */}
        {[
          [60, 80, 6],
          [400, 100, 7],
          [380, 280, 7],
          [100, 290, 6],
          [300, 60, 4],
          [50, 200, 4],
          [430, 200, 4],
        ].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill={i % 2 ? c1 : c2} fillOpacity="0.85" />
        ))}

        {/* central glass tile */}
        <g transform="translate(160 110)">
          <rect width="160" height="160" rx="36" fill={c3} fillOpacity="0.85" />
          <rect width="160" height="160" rx="36" fill="url(#grid)" />
          <rect x="1" y="1" width="158" height="158" rx="35" fill="none" stroke={accent} strokeOpacity="0.55" />
        </g>
      </svg>

      {/* Icon overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="relative grid h-[160px] w-[160px] place-items-center rounded-[36px]"
          style={{ color: accent }}
        >
          <Icon className="h-16 w-16" strokeWidth={1.4} />
          <Sparkles className="absolute -right-3 -top-3 h-5 w-5" style={{ color: c1 }} />
          <Zap className="absolute -left-3 bottom-2 h-5 w-5" style={{ color: c2 }} />
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-3 right-4 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-fg/50">
        <Network className="h-3 w-3" /> Imad Khan · AI Automation
      </div>
    </div>
  );
}
