import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { role, outsource, deliverables } = await req.json();

  await db.userOnboarding.upsert({
    where: { userId: session.user.id },
    create: {
      userId: session.user.id,
      role,
      outsource: !!outsource,
      deliverables,
      completed: true,
    },
    update: {
      role,
      outsource: !!outsource,
      deliverables,
      completed: true,
    },
  });

  return NextResponse.json({ success: true });
}
