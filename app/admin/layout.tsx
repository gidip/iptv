import type React from "react"
import type { Metadata } from "next"

import { AdminSidebar } from "@/components/admin/admin-sidebar"

export const metadata: Metadata = {
  title: {
    default: "Admin Dashboard",
    template: "%s | Admin Dashboard",
  },
  description: "Admin dashboard for IPTV App",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // In a real app, you would check if the user is authenticated and has admin privileges
  // const isAuthenticated = ...
  // const isAdmin = ...
  // if (!isAuthenticated || !isAdmin) {
  //   redirect("/login")
  // }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}

