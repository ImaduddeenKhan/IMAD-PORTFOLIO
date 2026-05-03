import { auth } from "@/lib/auth";
import { uploadToStorage, isStorageConfigured } from "@/lib/storage";
import { ok, fail, unauthorized, serverError } from "@/lib/api";
import { shortId } from "@/lib/utils";
import sharp from "sharp";

export const runtime = "nodejs";

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_KINDS = new Set(["avatar", "thumbnail", "screenshot", "logo", "og", "resume", "image", "file"]);
const ALLOWED_IMAGE = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
const ALLOWED_PDF = ["application/pdf"];

export async function POST(req) {
  try {
    const session = await auth();
    if (!session?.user?.id) return unauthorized();
    if (!isStorageConfigured()) {
      return fail(
        "File storage is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_KEY in .env.local.",
        503,
        "storage_unavailable"
      );
    }

    const form = await req.formData().catch(() => null);
    if (!form) return fail("Invalid form data");

    const file = form.get("file");
    const kind = String(form.get("kind") || "image").toLowerCase();
    if (!file || typeof file === "string") return fail("Missing file");
    if (!ALLOWED_KINDS.has(kind)) return fail("Invalid upload kind");

    const isPdf = file.type === "application/pdf" || kind === "resume";
    const isImage = ALLOWED_IMAGE.includes(file.type);
    if (!isPdf && !isImage) return fail("Unsupported file type");
    if (file.size > MAX_BYTES) return fail("File exceeds 5 MB limit", 413, "too_large");

    const arrayBuf = await file.arrayBuffer();
    let body = Buffer.from(arrayBuf);
    let contentType = file.type;
    let ext = (file.name?.split(".").pop() || "bin").toLowerCase();

    // For raster images, normalize to webp at max 1600px wide.
    if (isImage && file.type !== "image/svg+xml" && file.type !== "image/gif") {
      try {
        body = await sharp(body)
          .rotate()
          .resize({ width: 1600, withoutEnlargement: true })
          .webp({ quality: 82 })
          .toBuffer();
        contentType = "image/webp";
        ext = "webp";
      } catch {
        // Fall through and upload original.
      }
    } else if (isPdf) {
      contentType = "application/pdf";
      ext = "pdf";
    }

    const key = `${session.user.id}/${kind}/${shortId()}-${Date.now()}.${ext}`;
    const { publicUrl, path } = await uploadToStorage({ key, body, contentType });
    return ok({ url: publicUrl, path });
  } catch (err) {
    return serverError(err);
  }
}

export const config = { api: { bodyParser: false } };
