"use client";

import { useEffect, useState } from "react";
import { MoonStar, SunMedium } from "lucide-react";

const STORAGE_KEY = "portfolio-color-mode";

function applyMode(mode) {
  document.documentElement.setAttribute("data-color-mode", mode);
  window.localStorage.setItem(STORAGE_KEY, mode);
}

export default function ThemeModeToggle({ initialMode = "dark", compact = false }) {
  const [mode, setMode] = useState(initialMode);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const nextMode = stored === "light" || stored === "dark" ? stored : initialMode;
    setMode(nextMode);
    applyMode(nextMode);
  }, [initialMode]);

  function toggleMode() {
    const nextMode = mode === "dark" ? "light" : "dark";
    setMode(nextMode);
    applyMode(nextMode);
  }

  const isDark = mode === "dark";
  const Icon = isDark ? SunMedium : MoonStar;

  return (
    <button
      type="button"
      onClick={toggleMode}
      className={compact ? "mode-toggle mode-toggle-compact" : "mode-toggle"}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <span className="mode-toggle-icon-wrap">
        <Icon className="h-4 w-4" />
      </span>
      {!compact && <span>{isDark ? "Light mode" : "Dark mode"}</span>}
    </button>
  );
}