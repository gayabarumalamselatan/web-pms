"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  Activity as ActivityIcon, 
  Image as ImageIcon, 
  Share2,
  Home,
  UserCog
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { logoutAction } from "@/app/actions/users";

const sidebarItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Members", href: "/admin/members", icon: Users },
  { label: "Greeting", href: "/admin/greeting", icon: MessageSquare },
  { label: "Activities", href: "/admin/activities", icon: ActivityIcon },
  { label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { label: "Find Us", href: "/admin/socials", icon: Share2 },
  { label: "User Management", href: "/admin/users", icon: UserCog },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col fixed inset-y-0 z-50">
        <div className="p-6">
          <Link href="/admin" className="flex items-center gap-2 font-bold text-xl text-primary">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
              P
            </div>
            <span>PMS CMS</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 transition-colors group"
            >
              <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <Separator className="mb-4" />
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Back to Website</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pl-64">
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-40 flex items-center px-8">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            Control Panel
          </h2>
          <div className="ml-auto flex items-center gap-4">
            <form action={logoutAction}>
              <button className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
                Logout
              </button>
            </form>
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-500">
              A
            </div>
          </div>
        </header>
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
