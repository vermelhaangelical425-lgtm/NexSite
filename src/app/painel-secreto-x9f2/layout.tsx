import { getSession, logout } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LogOut, LayoutDashboard } from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session || session.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200 gap-2">
          <img 
            src="https://media.discordapp.net/attachments/1525567087785803856/1551807680224567377/AAAAAGSURBVAMAOtveHKOSHaQAAAAASUVORK5CYII.png?ex=6ab35106&is=6ab1ff86&hm=66712a96a5fe7414435b6a0df35680d668227fcb0f9f49a441eb1fc82b260de3&=&format=webp&quality=lossless" 
            alt="NexSite Logo" 
            className="h-6 w-auto object-contain"
          />
          <span className="text-xl font-bold text-blue-600">Admin</span>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          <Link href="/painel-secreto-x9f2" className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-blue-50 text-blue-700">
            <LayoutDashboard className="mr-3 h-5 w-5" />
            Painel Geral
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <form action={async () => { "use server"; await logout(); redirect("/"); }}>
            <button className="flex w-full items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50">
              <LogOut className="mr-3 h-5 w-5" />
              Sair
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {children}
      </main>
    </div>
  );
}
