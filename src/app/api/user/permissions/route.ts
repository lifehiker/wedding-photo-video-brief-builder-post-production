import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getUserPermissions, canUserExport } from "@/lib/permissions";

export async function GET(req: NextRequest) {
  void req;
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ canExport: false, plan: "free" });
  }

  const [permissions, canExport] = await Promise.all([
    getUserPermissions(session.user.id),
    canUserExport(session.user.id),
  ]);

  return NextResponse.json({
    ...permissions,
    canExport,
  });
}
