"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import {
  BarChart3,
  Film,
  Globe,
  LayoutDashboard,
  MessageSquare,
  Package2,
  Settings,
  Upload,
  Users,
  MonitorPlay,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link href="/admin" className="flex items-center gap-2 font-semibold">
          <Package2 className="h-6 w-6" />
          <span className="">MyIPTV Admin</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4">
          <Link href="/" className="text-sm font-medium">
            View Site
          </Link>
        </nav>
      </header>
      <div className="grid flex-1 md:grid-cols-[220px_1fr]">
        <aside className="hidden border-r bg-muted/40 md:block">
          <nav className="grid items-start px-4 py-4 text-sm font-medium">
            <Link
              href="/admin"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                pathname === "/admin" ? "bg-muted text-primary" : "text-muted-foreground",
              )}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/admin/channels"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                pathname?.startsWith("/admin/channels") ? "bg-muted text-primary" : "text-muted-foreground",
              )}
            >
              <Film className="h-4 w-4" />
              Channels
            </Link>
            <Link
              href="/admin/uploads"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                pathname?.startsWith("/admin/uploads") ? "bg-muted text-primary" : "text-muted-foreground",
              )}
            >
              <Upload className="h-4 w-4" />
              Video Uploads
            </Link>
            <Link
              href="/admin/advertisements"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                pathname?.startsWith("/admin/advertisements") ? "bg-muted text-primary" : "text-muted-foreground",
              )}
            >
              <MonitorPlay className="h-4 w-4" />
              Advertisements
            </Link>
            <Link
              href="/admin/users"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                pathname?.startsWith("/admin/users") ? "bg-muted text-primary" : "text-muted-foreground",
              )}
            >
              <Users className="h-4 w-4" />
              Users
            </Link>
            <Link
              href="/admin/contacts"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                pathname?.startsWith("/admin/contacts") ? "bg-muted text-primary" : "text-muted-foreground",
              )}
            >
              <MessageSquare className="h-4 w-4" />
              Contact Messages
            </Link>
            <Link
              href="/admin/analytics"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                pathname?.startsWith("/admin/analytics") ? "bg-muted text-primary" : "text-muted-foreground",
              )}
            >
              <BarChart3 className="h-4 w-4" />
              Analytics
            </Link>
            <Link
              href="/admin/settings"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                pathname?.startsWith("/admin/settings") ? "bg-muted text-primary" : "text-muted-foreground",
              )}
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
            <Link
              href="/admin/settings/translations"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary pl-10",
                pathname?.startsWith("/admin/settings/translations")
                  ? "bg-muted text-primary"
                  : "text-muted-foreground",
              )}
            >
              <Globe className="h-4 w-4" />
              Translations
            </Link>
          </nav>
        </aside>
        <main className="flex flex-1 flex-col p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

