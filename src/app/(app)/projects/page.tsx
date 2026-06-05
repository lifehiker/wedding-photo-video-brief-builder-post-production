import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/app/ProjectCard";

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter = "all" } = await searchParams;
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const projects = await db.weddingProject.findMany({
    where: {
      userId: session.user.id,
      ...(filter === "draft" ? { status: "draft" } : {}),
      ...(filter === "completed" ? { status: "completed" } : {}),
      ...(filter === "exported"
        ? { briefs: { some: { exportCount: { gt: 0 } } } }
        : {}),
    },
    include: { _count: { select: { briefs: true } } },
    orderBy: { updatedAt: "desc" },
  });

  const filters = [
    { label: "All", value: "all" },
    { label: "Draft", value: "draft" },
    { label: "Completed", value: "completed" },
    { label: "Exported", value: "exported" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-stone-900">Projects</h1>
        <Button asChild className="bg-rose-700 hover:bg-rose-800 text-white">
          <Link href="/projects/new">New project</Link>
        </Button>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map((item) => (
          <Button
            key={item.value}
            asChild
            size="sm"
            variant={filter === item.value ? "default" : "outline"}
            className={filter === item.value ? "bg-stone-900 text-white hover:bg-stone-800" : ""}
          >
            <Link href={item.value === "all" ? "/projects" : `/projects?filter=${item.value}`}>
              {item.label}
            </Link>
          </Button>
        ))}
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-stone-300 rounded-xl">
          <p className="text-stone-500 mb-2 text-lg">No wedding projects yet</p>
          <p className="text-stone-400 text-sm mb-6">
            Each project represents a wedding — add couple details, vendors, and generate briefs.
          </p>
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
  );
}
