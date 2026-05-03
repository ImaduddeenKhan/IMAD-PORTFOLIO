import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { loginSchema } from "./schemas.js";

const ADMIN_EMAIL = String(process.env.ADMIN_EMAIL || "").toLowerCase();
const ADMIN_NAME = process.env.ADMIN_NAME || "Imaduddeen Khan";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || "";

async function verifyAdminPassword(password) {
  if (ADMIN_PASSWORD_HASH) return bcrypt.compare(password, ADMIN_PASSWORD_HASH);
  return Boolean(ADMIN_PASSWORD) && password === ADMIN_PASSWORD;
}

const providers = [
  Credentials({
    name: "Email",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(raw) {
      const parsed = loginSchema.safeParse(raw);
      if (!parsed.success) return null;
      const { email, password } = parsed.data;

      if (!ADMIN_EMAIL || (!ADMIN_PASSWORD && !ADMIN_PASSWORD_HASH)) {
        console.warn("[auth] ADMIN_EMAIL and ADMIN_PASSWORD or ADMIN_PASSWORD_HASH must be configured.");
        return null;
      }

      if (email.toLowerCase() !== ADMIN_EMAIL) return null;
      const ok = await verifyAdminPassword(password);
      if (!ok) return null;

      return {
        id: "admin",
        email: ADMIN_EMAIL,
        name: ADMIN_NAME,
      };
    },
  }),
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 30 },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  providers,
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) token.userId = user.id;
      if (user?.email) token.email = user.email;
      return token;
    },
    async session({ session, token }) {
      session.user = session.user || {};
      if (token?.userId) session.user.id = token.userId;
      else if (token?.sub) session.user.id = token.sub;
      if (token?.email) session.user.email = token.email;
      if (!session.user.name) session.user.name = ADMIN_NAME;
      return session;
    },
  },
});
