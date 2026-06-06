import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";

// Edge-compatible config: no Prisma, no bcrypt — JWT validation only.
// Used by middleware. The full config (with DB adapter) lives in auth.ts.
const authConfig: NextAuthConfig = {
  secret: process.env.AUTH_SECRET ?? "dev-secret-change-in-production",
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.id = (user as { id?: string }).id;
      return token;
    },
    session({ session, token }) {
      if (token.id) (session.user as { id?: string }).id = token.id as string;
      return session;
    },
  },
};

export const { auth } = NextAuth(authConfig);
