import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  void req;
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ plan: "free", status: "free", currentPeriodEnd: null });
  }

  const sub = await db.subscription.findUnique({ where: { userId: session.user.id } });
  if (!sub) {
    return NextResponse.json({ plan: "free", status: "free", currentPeriodEnd: null });
  }

  return NextResponse.json({
    plan: sub.plan,
    status: sub.status,
    currentPeriodEnd: sub.currentPeriodEnd,
  });
}
