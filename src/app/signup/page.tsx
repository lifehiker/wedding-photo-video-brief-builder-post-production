"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signupAction } from "./actions";
import { signIn } from "next-auth/react";
import { trackEvent } from "@/lib/analytics";

export default function SignupPage() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const googleAuthEnabled = process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED === "true";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    trackEvent("signup_started");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signupAction(formData);
      if (result.error) {
        setError(result.error);
        return;
      }

      // Auto sign in after signup
      const signInResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signInResult?.ok) {
        trackEvent("signup_completed");
        router.push("/onboarding");
      } else {
        router.push("/login");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-semibold text-stone-900">
            BriefedWed
          </Link>
          <h1 className="text-xl font-semibold text-stone-900 mt-4">Create your account</h1>
          <p className="text-stone-500 text-sm mt-1">Free to start — no credit card required</p>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
          {googleAuthEnabled && (
            <>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => signIn("google", { callbackUrl: "/onboarding" })}
              >
                Continue with Google
              </Button>
              <div className="my-4 flex items-center gap-3 text-xs text-stone-400">
                <div className="h-px flex-1 bg-stone-200" />
                <span>or</span>
                <div className="h-px flex-1 bg-stone-200" />
              </div>
            </>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Your name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Sarah Johnson"
                required
                autoComplete="name"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="At least 8 characters"
                required
                minLength={8}
                autoComplete="new-password"
              />
            </div>

            {error && (
              <div className="text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-md p-2.5">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-rose-700 hover:bg-rose-800 text-white"
            >
              {isLoading ? "Creating account..." : "Create free account"}
            </Button>

            <p className="text-xs text-stone-400 text-center">
              By creating an account you agree to our terms of service.
            </p>
          </form>
        </div>

        <p className="text-center text-sm text-stone-500 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-rose-700 hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
