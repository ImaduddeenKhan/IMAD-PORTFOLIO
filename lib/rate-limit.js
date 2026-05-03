/**
 * Tiny in-memory token-bucket rate limiter. Per-process — fine for low traffic / single Vercel
 * region; replace with Upstash Redis if you scale out.
 */
const buckets = new Map();

export function rateLimit({ key, limit = 10, windowMs = 60_000 }) {
  const now = Date.now();
  const bucket = buckets.get(key) || { count: 0, reset: now + windowMs };
  if (now > bucket.reset) {
    bucket.count = 0;
    bucket.reset = now + windowMs;
  }
  bucket.count += 1;
  buckets.set(key, bucket);
  return {
    ok: bucket.count <= limit,
    remaining: Math.max(0, limit - bucket.count),
    resetIn: bucket.reset - now,
  };
}
