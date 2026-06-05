"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { canUserCreateProject, getUserPermissions } from "@/lib/permissions";

const projectSchema = z.object({
  coupleNames: z.string().min(1, "Couple names are required").max(200),
  weddingDate: z.string().optional(),
  venueName: z.string().max(200).optional(),
  venueLocation: z.string().max(200).optional(),
  brandName: z.string().max(200).optional(),
  editorName: z.string().max(200).optional(),
  editorEmail: z.string().email().optional().or(z.literal("")),
  notes: z.string().max(2000).optional(),
  status: z.enum(["draft", "active", "completed"]).optional(),
});

export async function createProject(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  const canCreate = await canUserCreateProject(session.user.id);
  if (!canCreate) {
    return { error: "upgrade_required", message: "Upgrade to create unlimited projects." };
  }

  const raw = {
    coupleNames: formData.get("coupleNames"),
    weddingDate: formData.get("weddingDate"),
    venueName: formData.get("venueName"),
    venueLocation: formData.get("venueLocation"),
    brandName: formData.get("brandName"),
    editorName: formData.get("editorName"),
    editorEmail: formData.get("editorEmail"),
    notes: formData.get("notes"),
  };

  const parsed = projectSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const { weddingDate, editorEmail, ...rest } = parsed.data;

  const project = await db.weddingProject.create({
    data: {
      ...rest,
      editorEmail: editorEmail || null,
      userId: session.user.id,
      weddingDate: weddingDate ? new Date(weddingDate) : null,
    },
  });

  revalidatePath("/projects");
  return { success: true, projectId: project.id };
}

export async function updateProject(projectId: string, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  const project = await db.weddingProject.findFirst({
    where: { id: projectId, userId: session.user.id },
  });
  if (!project) return { error: "Not found" };

  const raw = {
    coupleNames: formData.get("coupleNames"),
    weddingDate: formData.get("weddingDate"),
    venueName: formData.get("venueName"),
    venueLocation: formData.get("venueLocation"),
    brandName: formData.get("brandName"),
    editorName: formData.get("editorName"),
    editorEmail: formData.get("editorEmail"),
    notes: formData.get("notes"),
    status: formData.get("status"),
  };

  const parsed = projectSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const { weddingDate, editorEmail, ...rest } = parsed.data;

  await db.weddingProject.update({
    where: { id: projectId },
    data: {
      ...rest,
      editorEmail: editorEmail || null,
      weddingDate: weddingDate ? new Date(weddingDate) : null,
    },
  });

  revalidatePath(`/projects/${projectId}`);
  revalidatePath("/projects");
  return { success: true };
}

export async function deleteProject(projectId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  const project = await db.weddingProject.findFirst({
    where: { id: projectId, userId: session.user.id },
  });
  if (!project) return { error: "Not found" };

  await db.weddingProject.delete({ where: { id: projectId } });
  revalidatePath("/projects");
  return { success: true };
}

export async function duplicateProject(projectId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };
  const userId = session.user.id;

  const permissions = await getUserPermissions(userId);
  if (!permissions.canDuplicateProject) {
    return { error: "upgrade_required", message: "Upgrade to duplicate projects." };
  }

  const canCreate = await canUserCreateProject(userId);
  if (!canCreate) {
    return { error: "upgrade_required", message: "Upgrade to create another project." };
  }

  const project = await db.weddingProject.findFirst({
    where: { id: projectId, userId },
    include: {
      briefs: true,
      projectVendors: true,
    },
  });
  if (!project) return { error: "Not found" };

  const duplicated = await db.weddingProject.create({
    data: {
      userId: session.user.id,
      coupleNames: `${project.coupleNames} Copy`,
      weddingDate: project.weddingDate,
      venueName: project.venueName,
      venueLocation: project.venueLocation,
      brandName: project.brandName,
      editorName: project.editorName,
      editorEmail: project.editorEmail,
      notes: project.notes,
      status: "draft",
      projectVendors: {
        create: project.projectVendors.map((projectVendor) => ({
          vendorId: projectVendor.vendorId,
        })),
      },
      briefs: {
        create: project.briefs.map((brief) => ({
          user: { connect: { id: userId } },
          type: brief.type,
          title: `${brief.title} Copy`,
          formData: brief.formData,
          generatedText: brief.generatedText,
          status: "draft",
        })),
      },
    },
  });

  revalidatePath("/projects");
  redirect(`/projects/${duplicated.id}`);
}

export async function addVendorToProject(projectId: string, vendorId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  const project = await db.weddingProject.findFirst({
    where: { id: projectId, userId: session.user.id },
  });
  if (!project) return { error: "Not found" };

  await db.projectVendor.upsert({
    where: { projectId_vendorId: { projectId, vendorId } },
    create: { projectId, vendorId },
    update: {},
  });

  revalidatePath(`/projects/${projectId}`);
  return { success: true };
}

export async function removeVendorFromProject(projectId: string, vendorId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  await db.projectVendor.deleteMany({ where: { projectId, vendorId } });
  revalidatePath(`/projects/${projectId}`);
  return { success: true };
}
