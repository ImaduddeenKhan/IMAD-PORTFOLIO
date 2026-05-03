import { describe, it, expect } from "vitest";
import {
  loginSchema,
  projectSchema,
  themeSchema,
  portfolioSchema,
  contactMessageSchema,
} from "@/lib/schemas";

describe("loginSchema", () => {
  it("requires email and password", () => {
    expect(loginSchema.safeParse({ email: "a@b.com", password: "anything" }).success).toBe(true);
    expect(loginSchema.safeParse({}).success).toBe(false);
  });
});

describe("projectSchema", () => {
  it("accepts a minimal project", () => {
    const r = projectSchema.safeParse({
      id: "abc12345",
      title: "My Project",
      description: "A short description.",
    });
    expect(r.success).toBe(true);
  });

  it("rejects invalid URLs", () => {
    const r = projectSchema.safeParse({
      id: "abc12345",
      title: "X",
      description: "d",
      githubUrl: "not-a-url",
    });
    expect(r.success).toBe(false);
  });
});

describe("themeSchema", () => {
  it("requires hex colors with hash prefix", () => {
    const valid = themeSchema.safeParse({ primaryColor: "#abcdef" });
    expect(valid.success).toBe(true);
    const invalid = themeSchema.safeParse({ primaryColor: "abcdef" });
    expect(invalid.success).toBe(false);
  });

  it("defaults preset/font/layout", () => {
    const r = themeSchema.parse({});
    expect(r.preset).toBe("dark");
    expect(r.fontSans).toBe("inter");
    expect(r.layout).toBe("sidebar");
  });
});

describe("portfolioSchema", () => {
  it("validates a complete minimal portfolio", () => {
    const r = portfolioSchema.safeParse({
      published: true,
      personalInfo: { fullName: "Imad" },
    });
    expect(r.success).toBe(true);
    if (r.success) {
      expect(r.data.published).toBe(true);
      expect(r.data.projects).toEqual([]);
    }
  });
});

describe("contactMessageSchema", () => {
  it("requires name, email, message", () => {
    expect(
      contactMessageSchema.safeParse({ name: "A", email: "a@b.com", message: "hi" }).success
    ).toBe(true);
    expect(
      contactMessageSchema.safeParse({ name: "", email: "a@b.com", message: "hi" }).success
    ).toBe(false);
  });
});
