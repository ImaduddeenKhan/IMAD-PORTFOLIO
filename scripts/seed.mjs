#!/usr/bin/env node
/**
 * Seed Imad's portfolio into Supabase. Idempotent — safe to re-run.
 *
 * Usage:
 *   1. Configure .env.local (SUPABASE_URL, SUPABASE_SERVICE_KEY)
 *   2. npm run seed
 */
import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local" });
loadEnv({ path: ".env" });

import { replacePortfolio, isSiteDataConfigured } from "../lib/site-data.js";
import { imadSeed } from "../lib/seed-data.js";

async function main() {
  if (!isSiteDataConfigured()) {
    console.error("✗ SUPABASE_URL or SUPABASE_SERVICE_KEY is missing. Copy .env.example -> .env.local and set them.");
    process.exitCode = 1;
    return;
  }

  await replacePortfolio(imadSeed);
  console.log("✓ Seeded portfolio content into Supabase");
  console.log("\nAdmin login:");
  console.log(`  Email:    ${process.env.ADMIN_EMAIL || "(set ADMIN_EMAIL in .env.local)"}`);
  console.log("  Password: use ADMIN_PASSWORD or ADMIN_PASSWORD_HASH from .env.local");
  console.log("  Public:   /");
  console.log("  Admin:    /admin");
}

main().catch((err) => {
  console.error("✗ Seed failed:", err?.message || err);
  process.exitCode = 1;
});
