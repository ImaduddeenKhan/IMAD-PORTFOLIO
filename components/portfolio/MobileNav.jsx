"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import ThemeModeToggle from "./ThemeModeToggle";

export default function MobileNav({ portfolio, sections, initialMode }) {
  const [open, setOpen] = useState(false);
  const initials = (portfolio.personalInfo.fullName || "?")
    .split(" ").map((s) => s[0]).join("").slice(0, 2).toUpperCase();

  return (
    <>
      <header className="lg:hidden sticky top-0 z-30 backdrop-blur-xl bg-bg/82 border-b border-border/80">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-primary/12 border border-primary/10 flex items-center justify-center font-bold text-fg text-sm shadow-[0_16px_32px_rgba(0,0,0,0.08)]">
              {initials}
            </div>
            <div>
              <div className="font-display font-semibold text-sm tracking-[-0.03em]">{portfolio.personalInfo.fullName}</div>
              {portfolio.personalInfo.role && <div className="text-[11px] text-muted">{portfolio.personalInfo.role}</div>}
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeModeToggle initialMode={initialMode} compact />
            <button onClick={() => setOpen(true)} aria-label="Open menu" className="p-2 -m-2">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="lg:hidden fixed inset-0 z-50 bg-bg/95 backdrop-blur-md">
          <div className="flex items-center justify-between p-4 border-b border-border/70">
            <div>
              <div className="eyebrow mb-1">Navigation</div>
              <div className="font-display text-lg font-semibold">Explore the portfolio</div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2">
              <X className="h-6 w-6" />
            </button>
          </div>
            <nav className="flex flex-col gap-2 px-6 pt-8">
              <div className="mb-3">
              <ThemeModeToggle initialMode={initialMode} />
            </div>
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setOpen(false)}
                  className="px-5 py-4 text-lg font-display rounded-[1.5rem] border border-border bg-surface/75 hover:bg-surface w-full text-left"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
