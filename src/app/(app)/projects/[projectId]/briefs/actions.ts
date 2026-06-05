"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { generateBriefText } from "@/lib/generate-brief";
import { BriefType, FREE_BRIEF_TYPES } from "@/lib/brief-templates";
import { canUserExport, getUserPermissions } from "@/lib/permissions";
import { nanoid } from "nanoid";

const briefSchema = z.object({
  type: z.string().min(1),
  title: z.string().min(1).max(300),
  formData: z.string().default("{}"),
  generatedText: z.string().optional(),
  status: z.enum(["draft", "ready", "sent"]).optional(),
});

export async function createBrief(projectId: string, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  const project = await db.weddingProject.findFirst({
    where: { id: projectId, userId: session.user.id },
    include: {
      projectVendors: { include: { vendor: true } },
    },
  });
  if (!project) return { error: "Project not found" };

  const raw = {
    type: formData.get("type"),
    title: formData.get("title"),
    formData: formData.get("formData") ?? "{}",
    generatedText: formData.get("generatedText"),
    status: formData.get("status"),
  };

  const parsed = briefSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const permissions = await getUserPermissions(session.user.id);
  if (
    !permissions.canUseAllBriefTypes &&
    !FREE_BRIEF_TYPES.includes(parsed.data.type as BriefType)
  ) {
    return {
      error: "upgrade_required",
      message: "Upgrade to use all brief types.",
    };
  }

  let parsedFormData: Record<string, string> = {};
  try {
    parsedFormData = JSON.parse(parsed.data.formData);
  } catch {
    parsedFormData = {};
  }

  const styleGuide = await db.styleGuide.findFirst({
    where: { userId: session.user.id, isDefault: true },
  });

  const generatedText =
    parsed.data.generatedText ||
    generateBriefText({
      briefType: parsed.data.type as BriefType,
      title: parsed.data.title,
      formData: parsedFormData,
      project,
      vendors: project.projectVendors.map((pv) => pv.vendor),
      styleGuide,
    });

  const brief = await db.brief.create({
    data: {
      projectId,
      userId: session.user.id,
      type: parsed.data.type,
      title: parsed.data.title,
      formData: parsed.data.formData,
      generatedText,
      status: parsed.data.status ?? "draft",
    },
  });

  revalidatePath(`/projects/${projectId}`);
  return { success: true, briefId: brief.id };
}

export async function updateBrief(briefId: string, projectId: string, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  const brief = await db.brief.findFirst({
    where: { id: briefId, userId: session.user.id },
  });
  if (!brief) return { error: "Not found" };

  const raw = {
    type: formData.get("type") ?? brief.type,
    title: formData.get("title") ?? brief.title,
    formData: formData.get("formData") ?? brief.formData,
    generatedText: formData.get("generatedText"),
    status: formData.get("status"),
  };

  const parsed = briefSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  await db.brief.update({
    where: { id: briefId },
    data: {
      title: parsed.data.title,
      formData: parsed.data.formData,
      generatedText: parsed.data.generatedText ?? brief.generatedText,
      status: parsed.data.status ?? brief.status,
    },
  });

  revalidatePath(`/projects/${projectId}/briefs/${briefId}`);
  return { success: true };
}

export async function regenerateBrief(briefId: string, projectId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  const brief = await db.brief.findFirst({
    where: { id: briefId, userId: session.user.id },
    include: {
      project: {
        include: {
          projectVendors: { include: { vendor: true } },
        },
      },
    },
  });
  if (!brief) return { error: "Not found" };

  let parsedFormData: Record<string, string> = {};
  try {
    parsedFormData = JSON.parse(brief.formData);
  } catch {
    parsedFormData = {};
  }

  const styleGuide = await db.styleGuide.findFirst({
    where: { userId: session.user.id, isDefault: true },
  });

  const generatedText = generateBriefText({
    briefType: brief.type as BriefType,
    title: brief.title,
    formData: parsedFormData,
    project: brief.project,
    vendors: brief.project.projectVendors.map((pv) => pv.vendor),
    styleGuide,
  });

  await db.brief.update({
    where: { id: briefId },
    data: { generatedText },
  });

  revalidatePath(`/projects/${projectId}/briefs/${briefId}`);
  return { success: true, generatedText };
}

export async function deleteBrief(briefId: string, projectId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  const brief = await db.brief.findFirst({
    where: { id: briefId, userId: session.user.id },
  });
  if (!brief) return { error: "Not found" };

  await db.brief.delete({ where: { id: briefId } });
  revalidatePath(`/projects/${projectId}`);
  return { success: true };
}

export async function generateShareLink(briefId: string, projectId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  const canExport = await canUserExport(session.user.id);
  if (!canExport) {
    return { error: "upgrade_required", message: "Upgrade to generate share links." };
  }

  const brief = await db.brief.findFirst({
    where: { id: briefId, userId: session.user.id },
  });
  if (!brief) return { error: "Not found" };

  const token = brief.shareToken ?? nanoid(12);
  await db.brief.update({
    where: { id: briefId },
    data: { shareToken: token },
  });

  revalidatePath(`/projects/${projectId}/briefs/${briefId}`);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  return { success: true, shareUrl: `${appUrl}/share/${token}` };
}

export async function recordExport(briefId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  const canExport = await canUserExport(session.user.id);
  if (!canExport) {
    return { error: "upgrade_required", message: "Upgrade to export more briefs." };
  }

  await db.brief.update({
    where: { id: briefId },
    data: { exportCount: { increment: 1 } },
  });

  return { success: true };
}
