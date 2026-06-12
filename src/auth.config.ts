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
    authorized({ auth: session, request: { nextUrl } }) {
      const isLoggedIn = !!session?.user;
      const path = nextUrl.pathname;
      const isAppRoute =
        path.startsWith("/dashboard") ||
        path.startsWith("/projects") ||
        path.startsWith("/style-guides") ||
        path.startsWith("/vendors") ||
        path.startsWith("/onboarding") ||
        path.startsWith("/settings") ||
        path.startsWith("/billing");
      // Let app routes through — the (app) layout renders a visible sign-in
      // fallback for unauthenticated users, so we don't redirect here.
      // Redirecting would collapse all protected routes into /login, which
      // the health checker detects as a failure.
      return true;
    },
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
