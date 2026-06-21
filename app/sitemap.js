import { DOMAIN_INDEX } from "@/lib/domains";

export default function sitemap() {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://imadkhan.me").replace(/\/$/, "");
  const now = new Date().toISOString();

  const staticRoutes = [
    "",
    "/projects",
    "/arangoxheavyhaul",
  ].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: p === "" ? "weekly" : "monthly",
    priority: p === "" ? 1 : p === "/arangoxheavyhaul" ? 0.85 : 0.7,
  }));

  const domainRoutes = DOMAIN_INDEX.map((d) => ({
    url: `${base}/${d.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [...staticRoutes, ...domainRoutes];
}
