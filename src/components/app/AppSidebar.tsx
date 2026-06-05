"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "▦" },
  { href: "/projects", label: "Projects", icon: "📁" },
  { href: "/vendors", label: "Vendors", icon: "🤝" },
  { href: "/style-guides", label: "Style Guides", icon: "🎨" },
  { href: "/billing", label: "Billing", icon: "💳" },
  { href: "/settings", label: "Settings", icon: "⚙" },
];

interface AppSidebarProps {
  userName?: string | null;
  userEmail?: string | null;
}

export function AppSidebar({ userName, userEmail }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 hidden md:flex flex-col border-r border-stone-200 bg-stone-50 min-h-screen">
      <div className="p-4 border-b border-stone-200">
        <Link href="/dashboard" className="text-lg font-semibold text-stone-900">
          BriefedWed
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors",
              pathname === item.href || pathname.startsWith(item.href + "/")
                ? "bg-rose-50 text-rose-800 font-medium"
                : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
            )}
          >
            <span className="w-4 text-center text-sm">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-3 border-t border-stone-200">
        <div className="px-3 py-1 mb-2">
          <p className="text-xs font-medium text-stone-700 truncate">{userName ?? "User"}</p>
          <p className="text-xs text-stone-400 truncate">{userEmail ?? ""}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-stone-500 hover:text-stone-700"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Sign out
        </Button>
      </div>
    </aside>
  );
}
