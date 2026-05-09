"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { PlatformIcon } from "@/components/icons";
import ThemeModeToggle from "./ThemeModeToggle";

export default function TopNav({ portfolio, sections, initialMode }) {
  const [open, setOpen] = useState(false);
  const { personalInfo, socials = [] } = portfolio;

  /* lock body scroll when menu is open */
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* ─── Minimal fixed top bar ─── */}
      <header className="topnav-bar">
        <Link
          href="/"
          className="font-display text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase text-fg/60 hover:text-fg transition-colors"
        >
          {personalInfo.fullName}
        </Link>

        <div className="flex items-center gap-3 sm:gap-4">
          <ThemeModeToggle initialMode={initialMode} compact />
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="topnav-menu-btn"
          >
            <span className="hidden sm:inline">MENU</span>
            <span className="text-base sm:text-lg leading-none">+</span>
          </button>
        </div>
      </header>

      {/* ─── Full-screen overlay menu ─── */}
      {open && (
        <div className="menu-overlay">
          <div className="menu-overlay-inner">
            {/* Header */}
            <div className="flex items-center justify-between px-6 sm:px-10 py-5 border-b border-border/30">
              <span className="eyebrow">Navigation</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="h-10 w-10 rounded-full border border-border/50 flex items-center justify-center text-fg/70 hover:text-fg hover:border-fg/30 transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto px-6 sm:px-10 py-8 flex flex-col gap-1">
              {sections.map((s, i) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  className="menu-overlay-link group"
                >
                  <span className="text-muted/50 font-mono text-xs sm:text-sm w-8">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.04em] group-hover:translate-x-3 transition-transform duration-300">
                    {s.label}
                  </span>
                </a>
              ))}
            </nav>

            {/* Footer: socials + theme */}
            <div className="px-6 sm:px-10 py-5 border-t border-border/30 flex items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {socials.slice(0, 6).map((s, i) => (
                  <a
                    key={i}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.platform}
                    className="h-10 w-10 rounded-full border border-border/50 flex items-center justify-center text-fg/60 hover:text-fg hover:border-fg/30 transition-all bg-surface/40"
                  >
                    <PlatformIcon platform={s.platform} />
                  </a>
                ))}
              </div>
              <ThemeModeToggle initialMode={initialMode} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
