import { describe, it, expect } from "vitest";
import { resolveTheme, hexToRgbTriplet, googleFontsHref, themeStyleString, THEME_PRESETS, FONTS } from "@/lib/themes";

describe("hexToRgbTriplet", () => {
  it("converts hex strings into space-separated RGB triplets", () => {
    expect(hexToRgbTriplet("#000000")).toBe("0 0 0");
    expect(hexToRgbTriplet("#ffffff")).toBe("255 255 255");
    expect(hexToRgbTriplet("#8b5cf6")).toBe("139 92 246");
  });
  it("returns null for malformed inputs", () => {
    expect(hexToRgbTriplet(null)).toBe(null);
    expect(hexToRgbTriplet("")).toBe(null);
    expect(hexToRgbTriplet("#abc")).toBe(null);
    expect(hexToRgbTriplet("not-hex")).toBe(null);
  });
});

describe("resolveTheme", () => {
  it("returns the dark preset when nothing provided", () => {
    const t = resolveTheme();
    expect(t.mode).toBe("dark");
    expect(t.layout).toBe("sidebar");
    expect(t.vars["--bg"]).toBe(THEME_PRESETS.dark.bg);
    expect(t.vars["--primary"]).toBe(THEME_PRESETS.dark.primary);
  });

  it("falls back to dark when preset is unknown", () => {
    const t = resolveTheme({ preset: "totally-fake" });
    expect(t.vars["--bg"]).toBe(THEME_PRESETS.dark.bg);
  });

  it("applies preset and color overrides correctly", () => {
    const t = resolveTheme({
      preset: "ocean",
      primaryColor: "#ff0000",
      accentColor: "#00ff00",
      fontSans: "poppins",
      fontDisplay: "space-grotesk",
      layout: "topbar",
    });
    expect(t.mode).toBe("ocean" === "ocean" ? THEME_PRESETS.ocean.mode : null);
    expect(t.layout).toBe("topbar");
    expect(t.vars["--primary"]).toBe("255 0 0");
    expect(t.vars["--accent"]).toBe("0 255 0");
    expect(t.vars["--font-sans"]).toBe(FONTS.poppins.stack);
    expect(t.vars["--font-display"]).toBe(FONTS["space-grotesk"].stack);
  });

  it("rejects invalid layouts", () => {
    const t = resolveTheme({ layout: "totally-fake-layout" });
    expect(t.layout).toBe("sidebar");
  });
});

describe("googleFontsHref", () => {
  it("dedupes when sans and display fonts are the same", () => {
    const href = googleFontsHref({ fontSans: "inter", fontDisplay: "inter" });
    const familyMatches = href.match(/family=/g) || [];
    expect(familyMatches.length).toBe(1);
  });

  it("includes both fonts when different", () => {
    const href = googleFontsHref({ fontSans: "inter", fontDisplay: "sora" });
    expect(href).toContain("Inter");
    expect(href).toContain("Sora");
  });
});

describe("themeStyleString", () => {
  it("serializes vars into valid CSS", () => {
    const css = themeStyleString({ "--bg": "0 0 0", "--fg": "255 255 255" });
    expect(css).toBe(":root{--bg:0 0 0;--fg:255 255 255;}");
  });
});
