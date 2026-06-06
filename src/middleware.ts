import { auth } from "@/auth.config";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const path = req.nextUrl.pathname;

  const isAppRoute =
    path.startsWith("/dashboard") ||
    path.startsWith("/projects") ||
    path.startsWith("/style-guides") ||
    path.startsWith("/vendors") ||
    path.startsWith("/onboarding") ||
    path.startsWith("/settings") ||
    path.startsWith("/billing");

  if (isAppRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
