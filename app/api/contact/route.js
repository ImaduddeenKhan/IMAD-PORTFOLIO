import { createContactMessage, getPublicPortfolio, isSiteDataConfigured } from "@/lib/site-data";
import { contactMessageSchema } from "@/lib/schemas";
import { ok, fail, notFound, serverError } from "@/lib/api";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "anon";
    const rl = rateLimit({ key: `contact:${ip}`, limit: 5, windowMs: 60_000 });
    if (!rl.ok) return fail("Too many messages. Try again in a minute.", 429, "rate_limited");

    const body = await req.json().catch(() => null);
    const parsed = contactMessageSchema.safeParse(body);
    if (!parsed.success) {
      return fail("Invalid message", 400, "validation_error", parsed.error.flatten());
    }

    const portfolio = await getPublicPortfolio();
    if (!portfolio) return notFound("Portfolio not found");
    if (!isSiteDataConfigured()) {
      return fail("Contact storage is not configured yet.", 503, "storage_unavailable");
    }

    await createContactMessage(parsed.data);
    return ok({ delivered: true });
  } catch (err) {
    return serverError(err);
  }
}