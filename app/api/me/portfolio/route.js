import { auth } from "@/lib/auth";
import { portfolioSchema } from "@/lib/schemas";
import { getAdminPortfolio, patchPortfolio, replacePortfolio } from "@/lib/site-data";
import { ok, fail, unauthorized, serverError, notFound } from "@/lib/api";

export const runtime = "nodejs";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) return unauthorized();
    const portfolio = await getAdminPortfolio();
    if (!portfolio) return notFound("Portfolio not yet created");
    return ok({ portfolio });
  } catch (err) {
    return serverError(err);
  }
}

/** Create or fully replace the portfolio. */
export async function PUT(req) {
  try {
    const session = await auth();
    if (!session?.user?.id) return unauthorized();

    const body = await req.json().catch(() => null);
    const parsed = portfolioSchema.safeParse(body);
    if (!parsed.success) {
      return fail("Invalid portfolio data", 400, "validation_error", parsed.error.flatten());
    }

    const portfolio = await replacePortfolio(parsed.data);
    return ok({ portfolio });
  } catch (err) {
    return serverError(err);
  }
}

/** Patch top-level fields (theme, published, personalInfo, hero, etc.). */
export async function PATCH(req) {
  try {
    const session = await auth();
    if (!session?.user?.id) return unauthorized();

    const body = await req.json().catch(() => ({}));
    if (!body || typeof body !== "object") return fail("Invalid body");

    const allowed = [
      "theme",
      "published",
      "personalInfo",
      "hero",
      "socials",
      "skills",
      "experience",
      "education",
      "projects",
      "building",
      "certifications",
      "achievements",
      "languages",
      "hobbies",
      "resumeUrl",
      "contactEmail",
      "contactMessage",
      "seo",
    ];
    const update = {};
    for (const k of allowed) if (k in body) update[k] = body[k];
    if (Object.keys(update).length === 0) return fail("No valid fields provided");

    const portfolio = await patchPortfolio(update);
    if (!portfolio) return notFound("Portfolio not found.");
    return ok({ portfolio });
  } catch (err) {
    return serverError(err);
  }
}
