import { NextResponse } from "next/server";
import { isSiteDataConfigured } from "@/lib/site-data";
import { isStorageConfigured } from "@/lib/storage";

export async function GET() {
  const supabaseDb = isSiteDataConfigured();
  const supabaseStorage = isStorageConfigured();

  return NextResponse.json({
    ok: true,
    status: "healthy",
    checks: {
      supabaseDb: supabaseDb ? "configured" : "NOT configured — admin saves will fail",
      supabaseStorage: supabaseStorage ? "configured" : "NOT configured — file uploads will fail",
    },
  });
}
