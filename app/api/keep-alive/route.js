import { NextResponse } from "next/server";

/**
 * Keep-alive endpoint — pings Supabase to prevent free-tier project pausing.
 * Called by GitHub Actions cron every 3 days.
 */
export async function GET() {
  const supabaseUrl = process.env.SUPABASE_URL || "";
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY || "";

  let supabaseStatus = "skipped";

  if (supabaseUrl && supabaseKey) {
    try {
      const res = await fetch(
        `${supabaseUrl}/rest/v1/site_content?select=id&limit=1`,
        {
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
          },
          cache: "no-store",
        }
      );
      supabaseStatus = res.ok ? "alive" : `error-${res.status}`;
    } catch (err) {
      supabaseStatus = `unreachable: ${err.message}`;
    }
  }

  return NextResponse.json({
    ok: true,
    timestamp: new Date().toISOString(),
    supabase: supabaseStatus,
  });
}
