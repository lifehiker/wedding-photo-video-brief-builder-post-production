import { auth } from "@/auth";
import { AppSidebar } from "@/components/app/AppSidebar";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user?.id) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <p className="text-stone-600">
          Please <a href="/login" className="text-rose-700 underline">sign in</a> to continue.
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <AppSidebar
        userName={session.user.name}
        userEmail={session.user.email}
      />
      <main className="flex-1 overflow-auto">
        <div className="p-6 max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
