import Link from "next/link";
import { PlatformIcon } from "@/components/icons";
import ThemeModeToggle from "./ThemeModeToggle";

/**
 * Sidebar nav for portfolio (sticky on desktop, drawer on mobile via PortfolioMobileNav).
 */
export default function PortfolioSidebar({ portfolio, sections, initialMode }) {
  const { personalInfo, socials = [] } = portfolio;
  const initials = (personalInfo.fullName || "?")
    .split(" ")
    .map((s) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 lg:w-[21.5rem] border-r border-border/70 bg-surface/50 backdrop-blur-2xl px-6 py-8 z-30">
      <Link href="/" className="group flex items-start gap-4 mb-10">
        <div className="h-16 w-16 rounded-[1.6rem] bg-primary/10 border border-primary/15 shadow-[0_18px_40px_rgba(0,0,0,0.08)] flex items-center justify-center font-display text-xl font-bold text-fg animate-float-soft">
          {initials}
        </div>
        <div className="pt-1">
          <div className="eyebrow mb-2">Imad Portfolio</div>
          <div className="font-display text-xl font-semibold leading-tight tracking-[-0.03em]">{personalInfo.fullName}</div>
          {personalInfo.role && <div className="text-sm text-muted leading-tight mt-1">{personalInfo.role}</div>}
          {personalInfo.location && <div className="text-xs text-muted/90 mt-3">Based in {personalInfo.location}</div>}
        </div>
      </Link>

      <div className="card p-5 mb-6">
        <div className="eyebrow mb-2">Approach</div>
        <p className="text-sm text-fg/75 leading-relaxed">
          Product-minded AI engineer building polished systems, automations, and portfolio-worthy software.
        </p>
      </div>

      <nav className="flex flex-col gap-2 flex-1 pr-2 overflow-y-auto">
        {sections.map((s, index) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group flex items-center justify-between rounded-2xl border border-transparent px-4 py-3 text-sm text-fg/72 hover:border-border hover:bg-surface/60 hover:text-fg transition-all duration-300"
          >
            <span>{s.label}</span>
            <span className="text-[0.7rem] text-muted/75">{String(index + 1).padStart(2, "0")}</span>
          </a>
        ))}
      </nav>

      <div className="mt-6 pt-6 border-t border-border flex flex-col gap-4">
        <ThemeModeToggle initialMode={initialMode} />

        {socials.length > 0 && (
          <div className="flex flex-wrap gap-2">
          {socials.map((s, i) => (
            <a
              key={i}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.platform}
                className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-fg/70 hover:text-fg hover:border-fg/20 transition-all duration-300 bg-surface/70"
            >
              <PlatformIcon platform={s.platform} />
            </a>
          ))}
          </div>
        )}
      </div>
    </aside>
  );
}
