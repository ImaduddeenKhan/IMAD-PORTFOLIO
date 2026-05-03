/**
 * Theme presets and resolver. Each preset defines CSS variables that
 * are injected into the public portfolio page <style>. Users can
 * override `primary`, `accent`, `mode` (light/dark) and fonts on top.
 */

export const FONTS = {
  inter: { name: "Inter", stack: "Inter, system-ui, sans-serif", url: "Inter:wght@400;500;600;700" },
  poppins: { name: "Poppins", stack: "Poppins, system-ui, sans-serif", url: "Poppins:wght@400;500;600;700" },
  "space-grotesk": { name: "Space Grotesk", stack: "'Space Grotesk', system-ui, sans-serif", url: "Space+Grotesk:wght@400;500;600;700" },
  sora: { name: "Sora", stack: "Sora, system-ui, sans-serif", url: "Sora:wght@400;500;600;700" },
  "dm-sans": { name: "DM Sans", stack: "'DM Sans', system-ui, sans-serif", url: "DM+Sans:wght@400;500;600;700" },
  "jetbrains-mono": { name: "JetBrains Mono", stack: "'JetBrains Mono', ui-monospace, monospace", url: "JetBrains+Mono:wght@400;500;700" },
};

export const LAYOUTS = ["sidebar", "topbar", "minimal"];

/** Theme presets. Colors are space-separated RGB triplets (used with `rgb(var(--x) / <alpha>)`). */
export const THEME_PRESETS = {
  dark: {
    name: "Dark",
    mode: "dark",
    bg: "10 10 14",
    surface: "20 22 28",
    border: "40 44 54",
    fg: "240 240 245",
    muted: "150 152 160",
    primary: "139 92 246",
    primaryFg: "255 255 255",
    accent: "236 72 153",
  },
  light: {
    name: "Light",
    mode: "light",
    bg: "250 250 252",
    surface: "255 255 255",
    border: "228 230 236",
    fg: "20 22 28",
    muted: "100 105 115",
    primary: "79 70 229",
    primaryFg: "255 255 255",
    accent: "236 72 153",
  },
  cyberpunk: {
    name: "Cyberpunk",
    mode: "dark",
    bg: "8 4 24",
    surface: "18 10 40",
    border: "60 30 100",
    fg: "240 240 255",
    muted: "160 140 200",
    primary: "0 255 200",
    primaryFg: "8 4 24",
    accent: "255 0 180",
  },
  minimal: {
    name: "Minimal",
    mode: "light",
    bg: "255 255 255",
    surface: "248 248 248",
    border: "230 230 230",
    fg: "20 20 20",
    muted: "120 120 120",
    primary: "20 20 20",
    primaryFg: "255 255 255",
    accent: "120 120 120",
  },
  ocean: {
    name: "Ocean",
    mode: "dark",
    bg: "8 20 40",
    surface: "16 32 56",
    border: "40 70 110",
    fg: "230 240 255",
    muted: "140 170 200",
    primary: "56 189 248",
    primaryFg: "8 20 40",
    accent: "129 140 248",
  },
  sunset: {
    name: "Sunset",
    mode: "dark",
    bg: "30 10 30",
    surface: "50 18 45",
    border: "100 50 90",
    fg: "255 240 240",
    muted: "200 160 170",
    primary: "251 146 60",
    primaryFg: "30 10 30",
    accent: "236 72 153",
  },
};

function buildVars(preset, { primary, accent, fontSans, fontDisplay }) {
  return {
    "--bg": preset.bg,
    "--surface": preset.surface,
    "--border": preset.border,
    "--fg": preset.fg,
    "--muted": preset.muted,
    "--primary": primary,
    "--primary-fg": preset.primaryFg,
    "--accent": accent,
    "--font-sans": fontSans.stack,
    "--font-display": fontDisplay.stack,
  };
}

/** Convert "#rrggbb" -> "r g b" string used by CSS variables. */
export function hexToRgbTriplet(hex) {
  if (!hex) return null;
  const h = hex.replace("#", "");
  if (h.length !== 6) return null;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  if ([r, g, b].some((n) => Number.isNaN(n))) return null;
  return `${r} ${g} ${b}`;
}

/** Resolve final theme tokens given a preset key + user overrides. */
export function resolveTheme(theme = {}) {
  const presetKey = theme.preset && THEME_PRESETS[theme.preset] ? theme.preset : "dark";
  const preset = THEME_PRESETS[presetKey];
  const fontSans = FONTS[theme.fontSans] || FONTS.inter;
  const fontDisplay = FONTS[theme.fontDisplay] || fontSans;

  const primary = hexToRgbTriplet(theme.primaryColor) || preset.primary;
  const accent = hexToRgbTriplet(theme.accentColor) || preset.accent;
  const tokens = { primary, accent, fontSans, fontDisplay };
  const lightPreset = preset.mode === "light"
    ? preset
    : { ...THEME_PRESETS.light, primary, accent, primaryFg: preset.primaryFg };
  const darkPreset = preset.mode === "dark"
    ? preset
    : { ...THEME_PRESETS.dark, primary, accent, primaryFg: preset.primaryFg };

  return {
    mode: preset.mode,
    layout: LAYOUTS.includes(theme.layout) ? theme.layout : "sidebar",
    fontSans,
    fontDisplay,
    vars: buildVars(preset, tokens),
    lightVars: buildVars(lightPreset, tokens),
    darkVars: buildVars(darkPreset, tokens),
  };
}

/** Build the Google Fonts <link> URL for the chosen fonts. */
export function googleFontsHref(theme = {}) {
  const sans = FONTS[theme.fontSans] || FONTS.inter;
  const display = FONTS[theme.fontDisplay] || sans;
  const families = new Set([sans.url, display.url]);
  const params = [...families].map((f) => `family=${f}`).join("&");
  return `https://fonts.googleapis.com/css2?${params}&display=swap`;
}

/** Serialize CSS vars object into a CSS string for injection into <style>. */
function serializeVars(selector, vars) {
  return `${selector}{${Object.entries(vars).map(([k, v]) => `${k}:${v};`).join("")}}`;
}

export function themeStyleString(vars, colorModes) {
  const base = serializeVars(":root", vars);
  if (!colorModes) return base;
  return `${base}${serializeVars('html[data-color-mode="light"]', colorModes.light)}${serializeVars('html[data-color-mode="dark"]', colorModes.dark)}`;
}
