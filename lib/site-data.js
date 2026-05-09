import { contactMessageSchema, portfolioSchema } from "./schemas.js";
import { imadSeed } from "./seed-data.js";

const SITE_ROW_ID = "main";

function getSupabaseUrl() {
  return process.env.SUPABASE_URL || "";
}

function getSupabaseServiceKey() {
  return process.env.SUPABASE_SERVICE_KEY || "";
}

export function isSiteDataConfigured() {
  return Boolean(getSupabaseUrl() && getSupabaseServiceKey());
}

function requireConfig() {
  if (!isSiteDataConfigured()) {
    throw new Error("Supabase database is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_KEY.");
  }
}

function headers(extra = {}) {
  const serviceKey = getSupabaseServiceKey();
  return {
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
    ...extra,
  };
}

function parseSupabaseError(status, text) {
  let payload = null;
  try {
    payload = text ? JSON.parse(text) : null;
  } catch {
    payload = null;
  }

  const error = new Error(`Supabase request failed (${status}): ${text}`);
  error.status = status;
  error.payload = payload;
  return error;
}

function isMissingTableError(err, tableName) {
  return err?.status === 404 && err?.payload?.code === "PGRST205" && String(err?.payload?.message || "").includes(`'public.${tableName}'`);
}

function remapWriteError(err, tableName) {
  if (isMissingTableError(err, tableName)) {
    throw new Error(`Supabase table '${tableName}' is missing. Run supabase/schema.sql in the Supabase SQL editor, then run npm run seed again.`);
  }
  throw err;
}

async function request(path, { method = "GET", body, headers: extraHeaders = {} } = {}) {
  requireConfig();
  const supabaseUrl = getSupabaseUrl();

  let res;
  try {
    res = await fetch(`${supabaseUrl}${path}`, {
      method,
      headers: {
        ...headers(body ? { "Content-Type": "application/json", ...extraHeaders } : extraHeaders),
      },
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });
  } catch (fetchErr) {
    throw new Error(`Cannot reach Supabase (${supabaseUrl}). Check SUPABASE_URL. ${fetchErr.message}`);
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw parseSupabaseError(res.status, text);
  }

  if (res.status === 204) return null;
  const text = await res.text();
  if (!text) return null;
  try { return JSON.parse(text); } catch { return null; }
}

function seedPortfolio() {
  return portfolioSchema.parse(imadSeed);
}

function mergePortfolio(current, patch) {
  return {
    ...current,
    ...patch,
    theme: patch.theme ? { ...(current.theme || {}), ...patch.theme } : current.theme,
    personalInfo: patch.personalInfo ? { ...(current.personalInfo || {}), ...patch.personalInfo } : current.personalInfo,
    hero: patch.hero ? { ...(current.hero || {}), ...patch.hero } : current.hero,
    seo: patch.seo ? { ...(current.seo || {}), ...patch.seo } : current.seo,
  };
}

async function readSiteRow() {
  if (!isSiteDataConfigured()) return null;

  try {
    const rows = await request(
      `/rest/v1/site_content?id=eq.${encodeURIComponent(SITE_ROW_ID)}&select=id,published,data,updated_at&limit=1`
    );
    return rows?.[0] || null;
  } catch (err) {
    if (isMissingTableError(err, "site_content")) return null;
    throw err;
  }
}

export async function getAdminPortfolio() {
  const row = await readSiteRow();
  if (!row) return seedPortfolio();

  const parsed = portfolioSchema.safeParse({
    ...seedPortfolio(),
    ...(row.data || {}),
    published: typeof row.published === "boolean" ? row.published : row.data?.published,
  });

  if (!parsed.success) {
    throw new Error("Stored portfolio data is invalid. Fix the data in Supabase or re-seed the portfolio.");
  }

  return parsed.data;
}

export async function getPublicPortfolio() {
  const row = await readSiteRow();
  if (!row) return seedPortfolio();
  if (row.published === false) return null;
  return getAdminPortfolio();
}

export async function replacePortfolio(portfolio) {
  const parsed = portfolioSchema.safeParse(portfolio);
  if (!parsed.success) {
    throw parsed.error;
  }

  let rows;
  try {
    rows = await request("/rest/v1/site_content", {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=representation" },
      body: [
        {
          id: SITE_ROW_ID,
          published: Boolean(parsed.data.published),
          data: parsed.data,
        },
      ],
    });
  } catch (err) {
    remapWriteError(err, "site_content");
  }

  return rows?.[0]?.data || parsed.data;
}

export async function patchPortfolio(patch) {
  const current = await getAdminPortfolio();
  const next = mergePortfolio(current, patch);
  return replacePortfolio(next);
}

export async function createContactMessage(message) {
  const parsed = contactMessageSchema.safeParse(message);
  if (!parsed.success) throw parsed.error;

  try {
    await request("/rest/v1/contact_messages", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: [parsed.data],
    });
  } catch (err) {
    remapWriteError(err, "contact_messages");
  }

  return parsed.data;
}
