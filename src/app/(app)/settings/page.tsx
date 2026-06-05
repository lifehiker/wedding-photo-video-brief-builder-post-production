import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getUserPermissions } from "@/lib/permissions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const [user, permissions] = await Promise.all([
    db.user.findUnique({
      where: { id: session.user.id },
      select: { id: true, name: true, email: true, createdAt: true },
    }),
    getUserPermissions(session.user.id),
  ]);

  if (!user) redirect("/login");

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-stone-900 mb-6">Account settings</h1>

      <div className="bg-white rounded-xl border border-stone-200 p-5 mb-4">
        <h2 className="font-semibold text-stone-900 mb-4">Your account</h2>
        <dl className="space-y-3">
          <div>
            <dt className="text-xs text-stone-400">Name</dt>
            <dd className="text-sm text-stone-700 font-medium">{user.name ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-xs text-stone-400">Email</dt>
            <dd className="text-sm text-stone-700">{user.email}</dd>
          </div>
          <div>
            <dt className="text-xs text-stone-400">Plan</dt>
            <dd className="mt-0.5">
              <Badge variant="outline" className="text-xs">
                {permissions.plan.charAt(0).toUpperCase() + permissions.plan.slice(1)}
              </Badge>
            </dd>
          </div>
          <div>
            <dt className="text-xs text-stone-400">Member since</dt>
            <dd className="text-sm text-stone-700">
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </dd>
          </div>
        </dl>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 p-5 mb-4">
        <h2 className="font-semibold text-stone-900 mb-3">Subscription</h2>
        <p className="text-sm text-stone-600 mb-4">
          {permissions.plan === "free"
            ? "You're on the free plan. Upgrade for unlimited projects, all brief types, and exports."
            : `You're on the ${permissions.plan} plan with unlimited access.`}
        </p>
        <Button asChild size="sm" className="bg-rose-700 hover:bg-rose-800 text-white">
          <Link href="/billing">
            {permissions.plan === "free" ? "Upgrade plan" : "Manage subscription"}
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 p-5">
        <h2 className="font-semibold text-stone-900 mb-3">Data & privacy</h2>
        <p className="text-sm text-stone-500">
          Your briefs and project data are stored securely. We don&apos;t sell or share your data.
        </p>
      </div>
    </div>
  );
}
