/**
 * Supabase Storage helper. Falls back gracefully if Supabase is not configured —
 * upload routes will return a clear error instead of crashing.
 *
 * NOTE: We use the REST API directly (no @supabase/supabase-js) to keep the
 * dependency footprint small and Vercel cold-starts fast.
 */

function getSupabaseUrl() {
  return process.env.SUPABASE_URL || "";
}

function getSupabaseKey() {
  return process.env.SUPABASE_SERVICE_KEY || "";
}

function getBucket() {
  return process.env.SUPABASE_BUCKET || "portfolios";
}

export function isStorageConfigured() {
  return Boolean(getSupabaseUrl() && getSupabaseKey());
}

/**
 * Upload a file (Buffer/Uint8Array) to Supabase Storage.
 * Returns `{ path, publicUrl }`.
 */
export async function uploadToStorage({ key, body, contentType }) {
  if (!isStorageConfigured()) {
    throw new Error("Storage not configured. Set SUPABASE_URL and SUPABASE_SERVICE_KEY in .env.local.");
  }
  const supabaseUrl = getSupabaseUrl();
  const supabaseKey = getSupabaseKey();
  const bucket = getBucket();
  const url = `${supabaseUrl}/storage/v1/object/${bucket}/${encodeURI(key)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${supabaseKey}`,
      "Content-Type": contentType || "application/octet-stream",
      "x-upsert": "true",
      "cache-control": "max-age=31536000",
    },
    body,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Supabase upload failed (${res.status}): ${text}`);
  }
  return {
    path: key,
    publicUrl: `${supabaseUrl}/storage/v1/object/public/${bucket}/${encodeURI(key)}`,
  };
}

export async function deleteFromStorage(key) {
  if (!isStorageConfigured() || !key) return;
  const supabaseUrl = getSupabaseUrl();
  const supabaseKey = getSupabaseKey();
  const bucket = getBucket();
  const url = `${supabaseUrl}/storage/v1/object/${bucket}/${encodeURI(key)}`;
  await fetch(url, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${supabaseKey}` },
  }).catch(() => null);
}

/**
 * Try to extract the storage key from a public URL we issued, so we can delete it later.
 */
export function keyFromPublicUrl(url) {
  const supabaseUrl = getSupabaseUrl();
  const bucket = getBucket();
  if (!url || !supabaseUrl) return null;
  const prefix = `${supabaseUrl}/storage/v1/object/public/${bucket}/`;
  if (!url.startsWith(prefix)) return null;
  try {
    return decodeURI(url.slice(prefix.length));
  } catch {
    return null;
  }
}
