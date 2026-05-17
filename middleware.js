import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const PROTECTED_PREFIXES = ["/admin", "/dashboard"];

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  if (!isProtected) return NextResponse.next();

  // NextAuth v5 changed cookie names from "next-auth.*" to "authjs.*".
  // Mirror the same useSecureCookies logic NextAuth uses so names always match.
  const useSecure = process.env.NEXTAUTH_URL
    ? new URL(process.env.NEXTAUTH_URL).protocol === "https:"
    : req.nextUrl.protocol === "https:";
  const cookieName = useSecure
    ? "__Secure-authjs.session-token"
    : "authjs.session-token";

  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
    cookieName,
    salt: cookieName,
  });
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
