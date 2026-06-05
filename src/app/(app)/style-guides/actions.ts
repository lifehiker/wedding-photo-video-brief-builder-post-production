"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getUserPermissions } from "@/lib/permissions";

const styleGuideSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  editingStyle: z.string().max(1000).optional(),
  colorPreferences: z.string().max(1000).optional(),
  musicPreferences: z.string().max(1000).optional(),
  pacingNotes: z.string().max(1000).optional(),
  socialCaptionStyle: z.string().max(1000).optional(),
  deliveryDefaults: z.string().max(2000).optional(),
  isDefault: z.boolean().optional(),
});

export async function createStyleGuide(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  const permissions = await getUserPermissions(session.user.id);
  if (!permissions.canCreateStyleGuide) {
    return {
      error: "upgrade_required",
      message: "Upgrade to create saved style guides.",
    };
  }

  const raw = {
    name: formData.get("name"),
    editingStyle: formData.get("editingStyle"),
    colorPreferences: formData.get("colorPreferences"),
    musicPreferences: formData.get("musicPreferences"),
    pacingNotes: formData.get("pacingNotes"),
    socialCaptionStyle: formData.get("socialCaptionStyle"),
    deliveryDefaults: formData.get("deliveryDefaults"),
    isDefault: formData.get("isDefault") === "true",
  };

  const parsed = styleGuideSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  if (parsed.data.isDefault) {
    await db.styleGuide.updateMany({
      where: { userId: session.user.id },
      data: { isDefault: false },
    });
  }

  const guide = await db.styleGuide.create({
    data: { ...parsed.data, userId: session.user.id },
  });

  revalidatePath("/style-guides");
  return { success: true, guideId: guide.id };
}

export async function updateStyleGuide(guideId: string, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  const guide = await db.styleGuide.findFirst({
    where: { id: guideId, userId: session.user.id },
  });
  if (!guide) return { error: "Not found" };

  const raw = {
    name: formData.get("name"),
    editingStyle: formData.get("editingStyle"),
    colorPreferences: formData.get("colorPreferences"),
    musicPreferences: formData.get("musicPreferences"),
    pacingNotes: formData.get("pacingNotes"),
    socialCaptionStyle: formData.get("socialCaptionStyle"),
    deliveryDefaults: formData.get("deliveryDefaults"),
    isDefault: formData.get("isDefault") === "true",
  };

  const parsed = styleGuideSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  if (parsed.data.isDefault) {
    await db.styleGuide.updateMany({
      where: { userId: session.user.id, id: { not: guideId } },
      data: { isDefault: false },
    });
  }

  await db.styleGuide.update({ where: { id: guideId }, data: parsed.data });
  revalidatePath("/style-guides");
  return { success: true };
}

export async function deleteStyleGuide(guideId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  const guide = await db.styleGuide.findFirst({
    where: { id: guideId, userId: session.user.id },
  });
  if (!guide) return { error: "Not found" };

  await db.styleGuide.delete({ where: { id: guideId } });
  revalidatePath("/style-guides");
  return { success: true };
}
