import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/app/ProjectCard";
import { getUserPermissions } from "@/lib/permissions";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const userId = session.user.id;

  const [projects, permissions, onboarding] = await Promise.all([
    db.weddingProject.findMany({
      where: { userId },
      include: { _count: { select: { briefs: true } } },
      orderBy: { updatedAt: "desc" },
      take: 6,
    }),
    getUserPermissions(userId),
    db.userOnboarding.findUnique({ where: { userId } }),
  ]);

  if (!onboarding?.completed) {
    redirect("/onboarding");
  }

  const totalBriefs = await db.brief.count({ where: { userId } });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">
            Dashboard
          </h1>
          <p className="text-stone-500 text-sm mt-1">
            Welcome back, {session.user.name ?? "there"}
          </p>
        </div>
        <Button asChild className="bg-rose-700 hover:bg-rose-800 text-white">
          <Link href="/projects/new">New project</Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Projects", value: projects.length },
          { label: "Briefs created", value: totalBriefs },
          { label: "Plan", value: permissions.plan.charAt(0).toUpperCase() + permissions.plan.slice(1) },
          { label: "Exports left", value: permissions.maxExports === Infinity ? "Unlimited" : String(permissions.maxExports) },
        ].map((stat) => (
          <div key={stat.label} className="bg-stone-50 rounded-lg p-4 border border-stone-200">
            <p className="text-2xl font-bold text-stone-900">{stat.value}</p>
            <p className="text-xs text-stone-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Free plan upgrade prompt */}
      {permissions.plan === "free" && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-center justify-between gap-4">
          <p className="text-sm text-amber-800">
            You&apos;re on the free plan. Upgrade to unlock unlimited projects, all brief types, and exports.
          </p>
          <Button asChild size="sm" className="shrink-0 bg-rose-700 hover:bg-rose-800 text-white">
            <Link href="/billing">Upgrade</Link>
          </Button>
        </div>
      )}

      {/* Recent projects */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-stone-900">Recent projects</h2>
          <Link href="/projects" className="text-sm text-rose-700 hover:underline">
            View all
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-stone-300 rounded-xl">
            <p className="text-stone-500 mb-4">No projects yet.</p>
            <Button asChild className="bg-rose-700 hover:bg-rose-800 text-white">
              <Link href="/projects/new">Create your first project</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                coupleNames={project.coupleNames}
                weddingDate={project.weddingDate}
                venueName={project.venueName}
                venueLocation={project.venueLocation}
                status={project.status}
                briefCount={project._count.briefs}
                updatedAt={project.updatedAt}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
