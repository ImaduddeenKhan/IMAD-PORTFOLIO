import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/** Format YouTube URL into an embeddable URL. Accepts watch?v=, youtu.be/, /embed/, /shorts/. */
export function youtubeEmbedUrl(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    let id = null;
    if (u.hostname.includes("youtu.be")) id = u.pathname.slice(1);
    else if (u.pathname.startsWith("/embed/")) id = u.pathname.split("/")[2];
    else if (u.pathname.startsWith("/shorts/")) id = u.pathname.split("/")[2];
    else id = u.searchParams.get("v");
    if (!id) return null;
    return `https://www.youtube.com/embed/${id}`;
  } catch {
    return null;
  }
}

/** Extract YouTube video id (for thumbnails). */
export function youtubeId(url) {
  const embed = youtubeEmbedUrl(url);
  return embed ? embed.split("/").pop() : null;
}

/** Slugify a string into a safe URL part. */
export function slugify(str) {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

/** Random short id. */
export function shortId() {
  return Math.random().toString(36).slice(2, 10);
}

/** Reserved usernames that conflict with app routes. */
export const RESERVED_USERNAMES = new Set([
  "api",
  "admin",
  "dashboard",
  "login",
  "signup",
  "logout",
  "onboarding",
  "settings",
  "explore",
  "about",
  "pricing",
  "blog",
  "blogs",
  "docs",
  "help",
  "support",
  "terms",
  "privacy",
  "contact",
  "auth",
  "u",
  "user",
  "users",
  "static",
  "_next",
  "404",
  "500",
  "favicon.ico",
  "robots.txt",
  "sitemap.xml",
]);

export const USERNAME_REGEX = /^[a-z0-9](?:[a-z0-9-]{1,28}[a-z0-9])?$/;

export function isValidUsername(name) {
  if (!name || typeof name !== "string") return false;
  const lower = name.toLowerCase();
  if (RESERVED_USERNAMES.has(lower)) return false;
  return USERNAME_REGEX.test(lower);
}
