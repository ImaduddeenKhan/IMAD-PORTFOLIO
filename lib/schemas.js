import { z } from "zod";

export const emailSchema = z.string().email().toLowerCase().max(254);
export const passwordSchema = z.string().min(8).max(128);

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1),
});

const urlOpt = z.string().url().max(500).or(z.literal("")).optional().nullable();
const urlOrInternalPathOpt = z
  .string()
  .max(500)
  .refine((value) => {
    if (!value) return true;
    return /^https?:\/\//.test(value) || value.startsWith("/") || value.startsWith("#");
  }, "Must be an absolute URL, site path, or section anchor")
  .optional()
  .nullable();
const strOpt = (max = 200) => z.string().max(max).optional().nullable();
const longText = (max = 5000) => z.string().max(max).optional().nullable();

export const socialLinkSchema = z.object({
  platform: z.string().max(40),
  url: z.string().url().max(500),
});

export const projectSchema = z.object({
  id: z.string().min(1).max(60),
  title: z.string().min(1).max(120),
  description: z.string().max(500),
  longDescription: longText(8000),
  tags: z.array(z.string().max(40)).max(20).default([]),
  status: z.enum(["active", "wip", "archived"]).default("active"),
  featured: z.boolean().default(false),
  githubUrl: urlOpt,
  liveDemoUrl: urlOpt,
  youtubeUrl: urlOpt,
  thumbnail: urlOpt,
  screenshots: z.array(z.string().url()).max(12).default([]),
  gradient: strOpt(120),
});

export const buildingSchema = z.object({
  id: z.string().min(1).max(60),
  name: z.string().min(1).max(120),
  tagline: z.string().max(200),
  status: z.enum(["idea", "building", "beta", "live"]).default("building"),
  url: urlOpt,
  videoUrl: urlOpt,
  logo: urlOpt,
  description: longText(2000),
});

export const experienceSchema = z.object({
  id: z.string().min(1).max(60),
  date: z.string().max(60),
  role: z.string().min(1).max(120),
  company: z.string().min(1).max(120),
  companyUrl: urlOpt,
  location: strOpt(120),
  points: z.array(z.string().max(500)).max(15).default([]),
  tags: z.array(z.string().max(40)).max(20).default([]),
});

export const educationSchema = z.object({
  id: z.string().min(1).max(60),
  degree: z.string().min(1).max(200),
  institution: z.string().min(1).max(200),
  date: z.string().max(60),
  location: strOpt(120),
  description: longText(2000),
});

export const certificationSchema = z.object({
  id: z.string().min(1).max(60),
  name: z.string().min(1).max(200),
  issuer: z.string().max(120).optional().nullable(),
  date: z.string().max(60).optional().nullable(),
  url: urlOpt,
});

export const achievementSchema = z.object({
  id: z.string().min(1).max(60),
  title: z.string().min(1).max(200),
  description: z.string().max(800).optional().nullable(),
  date: z.string().max(60).optional().nullable(),
});

export const skillGroupSchema = z.object({
  id: z.string().min(1).max(60),
  category: z.string().min(1).max(80),
  items: z.array(z.string().max(60)).max(40).default([]),
});

export const languageSchema = z.object({
  id: z.string().min(1).max(60),
  name: z.string().min(1).max(60),
  level: z.string().max(60).optional().nullable(),
});

export const hobbySchema = z.object({
  id: z.string().min(1).max(60),
  name: z.string().min(1).max(60),
  icon: z.string().max(40).optional().nullable(),
});

export const themeSchema = z.object({
  preset: z.string().max(40).default("dark"),
  primaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional().nullable(),
  accentColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional().nullable(),
  fontSans: z.string().max(40).default("inter"),
  fontDisplay: z.string().max(40).default("inter"),
  layout: z.enum(["sidebar", "topbar", "minimal"]).default("sidebar"),
});

export const personalInfoSchema = z.object({
  fullName: z.string().min(1).max(120),
  role: z.string().max(160).optional().nullable(),
  tagline: z.string().max(280).optional().nullable(),
  location: z.string().max(120).optional().nullable(),
  email: emailSchema.optional().nullable(),
  phone: z.string().max(40).optional().nullable(),
  avatar: urlOpt,
});

export const heroSchema = z.object({
  greeting: z.string().max(120).optional().nullable(),
  headline: z.string().max(200).optional().nullable(),
  description: z.string().max(800).optional().nullable(),
  introVideoUrl: urlOpt,
  ctaLabel: z.string().max(60).optional().nullable(),
  ctaUrl: urlOrInternalPathOpt,
});

export const seoSchema = z.object({
  title: z.string().max(120).optional().nullable(),
  description: z.string().max(280).optional().nullable(),
  ogImage: urlOpt,
});

export const portfolioSchema = z.object({
  published: z.boolean().default(true),
  theme: themeSchema.default({}),
  personalInfo: personalInfoSchema,
  hero: heroSchema.default({}),
  socials: z.array(socialLinkSchema).max(20).default([]),
  skills: z.array(skillGroupSchema).max(12).default([]),
  experience: z.array(experienceSchema).max(40).default([]),
  education: z.array(educationSchema).max(20).default([]),
  projects: z.array(projectSchema).max(60).default([]),
  building: z.array(buildingSchema).max(10).default([]),
  certifications: z.array(certificationSchema).max(40).default([]),
  achievements: z.array(achievementSchema).max(40).default([]),
  languages: z.array(languageSchema).max(20).default([]),
  hobbies: z.array(hobbySchema).max(20).default([]),
  resumeUrl: urlOpt,
  contactEmail: emailSchema.optional().nullable(),
  contactMessage: z.string().max(800).optional().nullable(),
  seo: seoSchema.default({}),
});

export const contactMessageSchema = z.object({
  name: z.string().min(1).max(120),
  email: emailSchema,
  message: z.string().min(1).max(4000),
});
