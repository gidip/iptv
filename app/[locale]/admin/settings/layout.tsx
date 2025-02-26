"use client"

import type { ReactNode } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SettingsLayoutProps {
  children: ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col gap-8">
      <Tabs value={pathname} className="space-y-4">
        <TabsList>
          <Link href="/admin/settings">
            <TabsTrigger value="/admin/settings">General</TabsTrigger>
          </Link>
          <Link href="/admin/settings/api-credentials">
            <TabsTrigger value="/admin/settings/api-credentials">API Credentials</TabsTrigger>
          </Link>
          <Link href="/admin/settings/translations">
            <TabsTrigger value="/admin/settings/translations">Translations</TabsTrigger>
          </Link>
        </TabsList>
      </Tabs>
      {children}
    </div>
  )
}

