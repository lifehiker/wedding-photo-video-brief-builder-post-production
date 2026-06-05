"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const vendorSchema = z.object({
  name: z.string().min(1, "Vendor name is required").max(200),
  category: z.string().min(1, "Category is required").max(100),
  instagramHandle: z.string().max(100).optional(),
  website: z.string().max(500).optional(),
  notes: z.string().max(1000).optional(),
});

export async function createVendor(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  const raw = {
    name: formData.get("name"),
    category: formData.get("category"),
    instagramHandle: formData.get("instagramHandle"),
    website: formData.get("website"),
    notes: formData.get("notes"),
  };

  const parsed = vendorSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const vendor = await db.vendor.create({
    data: { ...parsed.data, userId: session.user.id },
  });

  revalidatePath("/vendors");
  return { success: true, vendorId: vendor.id };
}

export async function updateVendor(vendorId: string, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  const vendor = await db.vendor.findFirst({
    where: { id: vendorId, userId: session.user.id },
  });
  if (!vendor) return { error: "Not found" };

  const raw = {
    name: formData.get("name"),
    category: formData.get("category"),
    instagramHandle: formData.get("instagramHandle"),
    website: formData.get("website"),
    notes: formData.get("notes"),
  };

  const parsed = vendorSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  await db.vendor.update({ where: { id: vendorId }, data: parsed.data });
  revalidatePath("/vendors");
  return { success: true };
}

export async function deleteVendor(vendorId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  const vendor = await db.vendor.findFirst({
    where: { id: vendorId, userId: session.user.id },
  });
  if (!vendor) return { error: "Not found" };

  await db.vendor.delete({ where: { id: vendorId } });
  revalidatePath("/vendors");
  return { success: true };
}
