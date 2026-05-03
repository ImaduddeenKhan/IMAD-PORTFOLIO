import { describe, it, expect } from "vitest";
import { isValidUsername, RESERVED_USERNAMES, slugify, youtubeEmbedUrl, shortId } from "@/lib/utils";

describe("isValidUsername", () => {
  it("accepts simple lowercase usernames", () => {
    expect(isValidUsername("imad")).toBe(true);
    expect(isValidUsername("john-doe")).toBe(true);
    expect(isValidUsername("user123")).toBe(true);
  });

  it("rejects reserved words", () => {
    for (const word of ["admin", "api", "dashboard", "login", "signup"]) {
      expect(isValidUsername(word), word).toBe(false);
    }
    expect(RESERVED_USERNAMES.has("admin")).toBe(true);
  });

  it("rejects invalid characters and shapes", () => {
    expect(isValidUsername("")).toBe(false);
    expect(isValidUsername("-leading")).toBe(false);
    expect(isValidUsername("trailing-")).toBe(false);
    expect(isValidUsername("has space")).toBe(false);
    expect(isValidUsername("has_underscore")).toBe(false);
    expect(isValidUsername("a".repeat(40))).toBe(false);
  });
});

describe("slugify", () => {
  it("converts strings into safe slugs", () => {
    expect(slugify("Hello World!")).toBe("hello-world");
    expect(slugify("Foo___Bar")).toBe("foo-bar");
    expect(slugify("  spaced  ")).toBe("spaced");
  });
});

describe("youtubeEmbedUrl", () => {
  it("handles all common YouTube URL shapes", () => {
    expect(youtubeEmbedUrl("https://www.youtube.com/watch?v=abc123XYZ_-")).toBe(
      "https://www.youtube.com/embed/abc123XYZ_-"
    );
    expect(youtubeEmbedUrl("https://youtu.be/abc123XYZ_-")).toBe(
      "https://www.youtube.com/embed/abc123XYZ_-"
    );
    expect(youtubeEmbedUrl("https://www.youtube.com/embed/abc123")).toBe(
      "https://www.youtube.com/embed/abc123"
    );
    expect(youtubeEmbedUrl("https://www.youtube.com/shorts/abc123")).toBe(
      "https://www.youtube.com/embed/abc123"
    );
    expect(youtubeEmbedUrl("not-a-url")).toBe(null);
    expect(youtubeEmbedUrl("")).toBe(null);
  });
});

describe("shortId", () => {
  it("returns short, unique-ish strings", () => {
    const ids = new Set();
    for (let i = 0; i < 100; i++) ids.add(shortId());
    expect(ids.size).toBe(100);
  });
});
