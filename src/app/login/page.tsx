import Link from "next/link";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  const googleAuthEnabled = process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED === "true";

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-semibold text-stone-900">
            BriefedWed
          </Link>
          <h1 className="text-xl font-semibold text-stone-900 mt-4">Welcome back</h1>
          <p className="text-stone-500 text-sm mt-1">Sign in to your account</p>
        </div>

        <LoginForm googleAuthEnabled={googleAuthEnabled} />

        <p className="text-center text-sm text-stone-500 mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-rose-700 hover:underline font-medium">
            Create one free
          </Link>
        </p>
      </div>
    </div>
  );
}
