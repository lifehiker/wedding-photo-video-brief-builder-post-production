import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { BRIEF_TYPE_LABELS } from "@/lib/brief-templates";
import { duplicateProject } from "../actions";
import { getUserPermissions } from "@/lib/permissions";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const project = await db.weddingProject.findFirst({
    where: { id: projectId, userId: session.user.id },
    include: {
      briefs: { orderBy: { updatedAt: "desc" } },
      projectVendors: { include: { vendor: true } },
    },
  });

  if (!project) notFound();
  const permissions = await getUserPermissions(session.user.id);

  async function duplicateCurrentProject() {
    "use server";
    await duplicateProject(projectId);
  }

  const formattedDate = project.weddingDate
    ? new Date(project.weddingDate).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Link href="/projects" className="text-sm text-stone-500 hover:text-stone-700">
          ← Back to projects
        </Link>
        <div className="flex items-start justify-between mt-3">
          <div>
            <h1 className="text-2xl font-bold text-stone-900">{project.coupleNames}</h1>
            {formattedDate && (
              <p className="text-stone-500 text-sm mt-0.5">{formattedDate}</p>
            )}
            {(project.venueName || project.venueLocation) && (
              <p className="text-stone-500 text-sm">
                {[project.venueName, project.venueLocation].filter(Boolean).join(" — ")}
              </p>
            )}
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            {permissions.canDuplicateProject ? (
              <form action={duplicateCurrentProject}>
                <Button type="submit" variant="outline">Duplicate</Button>
              </form>
            ) : (
              <Button asChild variant="outline">
                <Link href="/pricing">Duplicate</Link>
              </Button>
            )}
            <Button asChild className="bg-rose-700 hover:bg-rose-800 text-white">
              <Link href={`/projects/${projectId}/briefs/new`}>New brief</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project details */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-xl border border-stone-200 p-4">
            <h2 className="font-semibold text-stone-900 mb-3 text-sm">Project details</h2>
            <dl className="space-y-2">
              {project.brandName && (
                <div>
                  <dt className="text-xs text-stone-400">Studio</dt>
                  <dd className="text-sm text-stone-700">{project.brandName}</dd>
                </div>
              )}
              {project.editorName && (
                <div>
                  <dt className="text-xs text-stone-400">Editor</dt>
                  <dd className="text-sm text-stone-700">
                    {project.editorName}
                    {project.editorEmail && (
                      <span className="text-stone-400 text-xs block">{project.editorEmail}</span>
                    )}
                  </dd>
                </div>
              )}
              {project.notes && (
                <div>
                  <dt className="text-xs text-stone-400">Notes</dt>
                  <dd className="text-sm text-stone-700 leading-relaxed">{project.notes}</dd>
                </div>
              )}
              <div>
                <dt className="text-xs text-stone-400">Status</dt>
                <dd>
                  <Badge variant="outline" className="text-xs mt-0.5">
                    {project.status}
                  </Badge>
                </dd>
              </div>
            </dl>
          </div>

          {/* Vendors */}
          <div className="bg-white rounded-xl border border-stone-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-stone-900 text-sm">Vendors</h2>
              <Link href="/vendors" className="text-xs text-rose-700 hover:underline">
                Manage
              </Link>
            </div>
            {project.projectVendors.length === 0 ? (
              <p className="text-xs text-stone-400">No vendors added yet.</p>
            ) : (
              <ul className="space-y-2">
                {project.projectVendors.map(({ vendor }) => (
                  <li key={vendor.id} className="text-sm">
                    <span className="font-medium text-stone-700">{vendor.name}</span>
                    <span className="text-stone-400 text-xs ml-2">{vendor.category}</span>
                    {vendor.instagramHandle && (
                      <span className="text-stone-400 text-xs block">@{vendor.instagramHandle.replace("@", "")}</span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Briefs */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-stone-900">Briefs ({project.briefs.length})</h2>
            <Button asChild size="sm" variant="outline">
              <Link href={`/projects/${projectId}/briefs/new`}>+ New brief</Link>
            </Button>
          </div>

          {project.briefs.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-stone-300 rounded-xl">
              <p className="text-stone-500 mb-2">No briefs yet</p>
              <p className="text-stone-400 text-sm mb-4">
                Create your first brief for this wedding project.
              </p>
              <Button asChild className="bg-rose-700 hover:bg-rose-800 text-white" size="sm">
                <Link href={`/projects/${projectId}/briefs/new`}>Create brief</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {project.briefs.map((brief) => (
                <Link
                  key={brief.id}
                  href={`/projects/${projectId}/briefs/${brief.id}`}
                  className="block bg-white rounded-xl border border-stone-200 p-4 hover:border-rose-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-medium text-stone-900">{brief.title}</h3>
                      <p className="text-xs text-stone-400 mt-0.5">
                        {BRIEF_TYPE_LABELS[brief.type as keyof typeof BRIEF_TYPE_LABELS] ?? brief.type}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant="outline" className="text-xs">
                        {brief.status}
                      </Badge>
                      {brief.shareToken && (
                        <span className="text-xs text-green-600 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded">
                          Shared
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-stone-400 mt-2">
                    Updated {formatDistanceToNow(new Date(brief.updatedAt), { addSuffix: true })}
                    {brief.exportCount > 0 && ` · ${brief.exportCount} export${brief.exportCount !== 1 ? "s" : ""}`}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
