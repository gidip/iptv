"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  FileText,
  Film,
  Home,
  LayoutDashboard,
  LayoutTemplate,
  Package,
  Settings,
  Users,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin",
      active: pathname === "/admin",
    },
    {
      label: "Users",
      icon: Users,
      href: "/admin/users",
      active: pathname === "/admin/users",
    },
    {
      label: "Content",
      icon: LayoutTemplate,
      href: "/admin/content",
      active: pathname === "/admin/content",
    },
    {
      label: "Pages",
      icon: FileText,
      href: "/admin/pages",
      active: pathname === "/admin/pages",
    },
    {
      label: "Movies",
      icon: Film,
      href: "/admin/movies",
      active: pathname.startsWith("/admin/movies"),
    },
    {
      label: "Analytics",
      icon: BarChart3,
      href: "/admin/analytics",
      active: pathname === "/admin/analytics",
    },
    {
      label: "Products",
      icon: Package,
      href: "/admin/products",
      active: pathname === "/admin/products",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/admin/settings",
      active: pathname === "/admin/settings",
    },
  ]

  return (
    <div className={cn("pb-12 w-64 border-r min-h-screen", className)} {...props}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <Link href="/" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            <h2 className="text-lg font-semibold tracking-tight">IPTV Admin</h2>
          </Link>
        </div>
        <div className="px-3">
          <div className="space-y-1">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={route.active ? "secondary" : "ghost"}
                className={cn("w-full justify-start", route.active ? "bg-primary/10 hover:bg-primary/20" : "")}
                asChild
              >
                <Link href={route.href}>
                  <route.icon className="mr-2 h-4 w-4" />
                  {route.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

