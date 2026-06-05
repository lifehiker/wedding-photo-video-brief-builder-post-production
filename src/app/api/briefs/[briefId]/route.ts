import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ briefId: string }> }
) {
  const { briefId } = await params;
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const brief = await db.brief.findFirst({
    where: { id: briefId, userId: session.user.id },
    include: { project: { select: { id: true, coupleNames: true } } },
  });

  if (!brief) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(brief);
}
