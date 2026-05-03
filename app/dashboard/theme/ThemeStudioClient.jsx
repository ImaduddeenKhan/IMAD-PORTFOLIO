"use client";

import { useState, useTransition, useMemo } from "react";
import { toast } from "sonner";
import { THEME_PRESETS, FONTS, LAYOUTS } from "@/lib/themes";

export default function ThemeStudioClient({ initialTheme }) {
  const [theme, setTheme] = useState({
    preset: "dark",
    fontSans: "inter",
    fontDisplay: "inter",
    layout: "sidebar",
    primaryColor: null,
    accentColor: null,
    ...initialTheme,
  });
  const [pending, startTransition] = useTransition();

  function update(patch) { setTheme((t) => ({ ...t, ...patch })); }

  async function save() {
    startTransition(async () => {
      const res = await fetch("/api/me/portfolio", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        toast.error(json?.error?.message || "Save failed");
        return;
      }
      toast.success("Theme saved!");
    });
  }

  const presetEntries = useMemo(() => Object.entries(THEME_PRESETS), []);
  const fontEntries = useMemo(() => Object.entries(FONTS), []);
  const previewBust = useMemo(() => Date.now(), [theme]);

  return (
    <div>
      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold">Theme studio</h1>
          <p className="text-sm text-muted">Pick a preset, then customize colors, fonts, and layout.</p>
        </div>
        <button onClick={save} disabled={pending} className="btn-primary disabled:opacity-50">
          {pending ? "Saving…" : "Save theme"}
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="card p-5 space-y-4">
            <h2 className="font-display font-semibold">Preset</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {presetEntries.map(([key, p]) => (
                <button
                  key={key}
                  onClick={() => update({ preset: key, primaryColor: null, accentColor: null })}
                  className={`relative rounded-xl border p-4 text-left transition ${
                    theme.preset === key ? "border-primary ring-2 ring-primary/40" : "border-border hover:border-muted"
                  }`}
                  style={{ background: `rgb(${p.bg})`, color: `rgb(${p.fg})` }}
                >
                  <div className="font-medium text-sm">{p.name}</div>
                  <div className="mt-3 flex gap-1.5">
                    <span className="h-3 w-3 rounded-full" style={{ background: `rgb(${p.primary})` }} />
                    <span className="h-3 w-3 rounded-full" style={{ background: `rgb(${p.accent})` }} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="card p-5 space-y-4">
            <h2 className="font-display font-semibold">Custom colors</h2>
            <p className="text-xs text-muted">Override the preset colors. Leave blank to use the preset defaults.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <ColorPicker label="Primary" value={theme.primaryColor} onChange={(v) => update({ primaryColor: v })} fallback={`#${rgbToHex(THEME_PRESETS[theme.preset]?.primary)}`} />
              <ColorPicker label="Accent" value={theme.accentColor} onChange={(v) => update({ accentColor: v })} fallback={`#${rgbToHex(THEME_PRESETS[theme.preset]?.accent)}`} />
            </div>
          </div>

          <div className="card p-5 space-y-4">
            <h2 className="font-display font-semibold">Typography</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <FontPicker label="Body font" value={theme.fontSans} onChange={(v) => update({ fontSans: v })} entries={fontEntries} />
              <FontPicker label="Display font" value={theme.fontDisplay} onChange={(v) => update({ fontDisplay: v })} entries={fontEntries} />
            </div>
          </div>

          <div className="card p-5 space-y-4">
            <h2 className="font-display font-semibold">Layout</h2>
            <div className="grid grid-cols-3 gap-3">
              {LAYOUTS.map((l) => (
                <button
                  key={l}
                  onClick={() => update({ layout: l })}
                  className={`rounded-xl border p-4 text-sm capitalize ${
                    theme.layout === l ? "border-primary ring-2 ring-primary/40" : "border-border hover:border-muted"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted">More layout variants coming soon — currently all use the sidebar layout.</p>
          </div>
        </div>

        <div className="card p-2 lg:sticky lg:top-6 h-fit">
          <div className="px-3 py-2 text-xs text-muted flex items-center justify-between">
            <span>Live preview · /</span>
            <a href="/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Open ↗</a>
          </div>
          <iframe
            key={previewBust}
            src="/"
            title="Portfolio preview"
            className="w-full h-[640px] rounded-xl border border-border bg-bg"
          />
          <p className="px-3 py-2 text-xs text-muted">Save your theme above, then refresh the preview to see changes.</p>
        </div>
      </div>
    </div>
  );
}

function ColorPicker({ label, value, onChange, fallback }) {
  return (
    <div>
      <label className="label">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value || fallback || "#8b5cf6"}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-14 rounded-md border border-border bg-bg cursor-pointer"
        />
        <input
          type="text"
          value={value || ""}
          placeholder={fallback}
          onChange={(e) => onChange(e.target.value || null)}
          className="input flex-1 font-mono text-xs"
        />
        {value && (
          <button onClick={() => onChange(null)} className="text-xs text-muted hover:text-fg">Reset</button>
        )}
      </div>
    </div>
  );
}

function FontPicker({ label, value, onChange, entries }) {
  return (
    <div>
      <label className="label">{label}</label>
      <select className="input" value={value} onChange={(e) => onChange(e.target.value)}>
        {entries.map(([key, f]) => (
          <option key={key} value={key}>{f.name}</option>
        ))}
      </select>
    </div>
  );
}

function rgbToHex(rgb) {
  if (!rgb) return "8b5cf6";
  return rgb.split(" ").map((n) => Number(n).toString(16).padStart(2, "0")).join("");
}
