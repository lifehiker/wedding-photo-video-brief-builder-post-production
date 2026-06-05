import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  void req;
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const vendors = await db.vendor.findMany({
    where: { userId: session.user.id },
    orderBy: [{ category: "asc" }, { name: "asc" }],
  });

  return NextResponse.json(vendors);
}
