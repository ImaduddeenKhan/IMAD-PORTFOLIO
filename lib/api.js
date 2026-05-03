/**
 * Helpers for API route responses.
 */
import { NextResponse } from "next/server";

export function ok(data, init) {
  return NextResponse.json({ ok: true, data }, init);
}

export function fail(message, status = 400, code = "bad_request", details) {
  return NextResponse.json(
    { ok: false, error: { code, message, ...(details ? { details } : {}) } },
    { status }
  );
}

export function unauthorized(msg = "Sign in required") {
  return fail(msg, 401, "unauthorized");
}

export function forbidden(msg = "Forbidden") {
  return fail(msg, 403, "forbidden");
}

export function notFound(msg = "Not found") {
  return fail(msg, 404, "not_found");
}

export function serverError(err) {
  console.error("[api] server error:", err);
  const message = process.env.NODE_ENV === "development" ? String(err?.message || err) : "Internal server error";
  return fail(message, 500, "server_error");
}
