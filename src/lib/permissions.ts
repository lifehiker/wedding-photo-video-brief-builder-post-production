import { db } from "./db";

export type Plan = "free" | "solo" | "studio";

export interface UserPermissions {
  plan: Plan;
  canCreateProject: boolean;
  canCreateBrief: boolean;
  canExport: boolean;
  canCreateStyleGuide: boolean;
  canUseAllBriefTypes: boolean;
  canShareLink: boolean;
  canDuplicateProject: boolean;
  maxProjects: number;
  maxExports: number;
}

export async function getUserPlan(userId: string): Promise<Plan> {
  const sub = await db.subscription.findUnique({ where: { userId } });
  if (!sub) return "free";
  if (sub.plan === "studio") return "studio";
  if (sub.plan === "solo") return "solo";
  return "free";
}

export async function getUserPermissions(userId: string): Promise<UserPermissions> {
  const plan = await getUserPlan(userId);
  return getPermissionsForPlan(plan);
}

export function getPermissionsForPlan(plan: Plan): UserPermissions {
  switch (plan) {
    case "studio":
    case "solo":
      return {
        plan,
        canCreateProject: true,
        canCreateBrief: true,
        canExport: true,
        canCreateStyleGuide: true,
        canUseAllBriefTypes: true,
        canShareLink: true,
        canDuplicateProject: true,
        maxProjects: Infinity,
        maxExports: Infinity,
      };
    case "free":
    default:
      return {
        plan: "free",
        canCreateProject: true,
        canCreateBrief: true,
        canExport: true,
        canCreateStyleGuide: false,
        canUseAllBriefTypes: false,
        canShareLink: false,
        canDuplicateProject: false,
        maxProjects: 1,
        maxExports: 1,
      };
  }
}

export async function canUserCreateProject(userId: string): Promise<boolean> {
  const permissions = await getUserPermissions(userId);
  if (permissions.maxProjects === Infinity) return true;
  const count = await db.weddingProject.count({ where: { userId } });
  return count < permissions.maxProjects;
}

export async function canUserExport(userId: string): Promise<boolean> {
  const permissions = await getUserPermissions(userId);
  if (permissions.maxExports === Infinity) return true;
  const totalExports = await db.brief.aggregate({
    where: { userId },
    _sum: { exportCount: true },
  });
  const total = totalExports._sum.exportCount ?? 0;
  return total < permissions.maxExports;
}
