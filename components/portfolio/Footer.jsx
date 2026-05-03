import Link from "next/link";
import { PlatformIcon } from "@/components/icons";

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "Imad Portfolio";

export default function PortfolioFooter({ portfolio }) {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 pt-8 pb-10 border-t border-border/80">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between text-sm text-muted">
        <div>
          <div className="eyebrow mb-2">Portfolio</div>
          <div className="font-display text-xl text-fg tracking-[-0.04em]">© {year} {portfolio.personalInfo.fullName}</div>
        </div>
        <div className="flex items-center gap-3">
          {portfolio.socials?.slice(0, 6).map((s, i) => (
            <a
              key={i}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.platform}
              className="h-10 w-10 rounded-full border border-border bg-surface/76 flex items-center justify-center hover:text-fg transition-colors"
            >
              <PlatformIcon platform={s.platform} className="h-4 w-4" />
            </a>
          ))}
        </div>
        <Link href="/" className="text-xs hover:text-fg">
          Crafted for <span className="text-fg">{SITE_NAME}</span>
        </Link>
      </div>
    </footer>
  );
}
