import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { briefId } = await req.json();
  if (!briefId) {
    return NextResponse.json({ error: "Missing briefId" }, { status: 400 });
  }

  const brief = await db.brief.findFirst({
    where: { id: briefId, userId: session.user.id },
  });
  if (!brief) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await db.brief.update({
    where: { id: briefId },
    data: { exportCount: { increment: 1 } },
  });

  return NextResponse.json({ success: true });
}
