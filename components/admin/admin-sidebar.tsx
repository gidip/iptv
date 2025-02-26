"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Settings, FileText, Film, Tv, Radio, ChevronDown, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState } from "react"

interface SidebarItem {
  title: string
  href: string
  icon: React.ReactNode
  submenu?: {
    title: string
    href: string
  }[]
}

export function AdminSidebar() {
  const pathname = usePathname()
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "live-stream": true,
  })

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const sidebarItems: SidebarItem[] = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Pages",
      href: "/admin/pages",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Movies",
      href: "/admin/movies",
      icon: <Film className="h-5 w-5" />,
    },
    {
      title: "TV Channels",
      href: "/admin/channels",
      icon: <Tv className="h-5 w-5" />,
    },
    {
      title: "Live Stream",
      href: "/admin/live-stream",
      icon: <Radio className="h-5 w-5" />,
      submenu: [
        {
          title: "Page Content",
          href: "/admin/live-stream",
        },
        {
          title: "Channels",
          href: "/admin/live-stream/channels",
        },
      ],
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <div className="flex flex-col h-full space-y-2 py-4">
      {sidebarItems.map((item) =>
        item.submenu ? (
          <Collapsible
            key={item.href}
            open={openItems[item.title.toLowerCase().replace(/\s+/g, "-")]}
            onOpenChange={() => toggleItem(item.title.toLowerCase().replace(/\s+/g, "-"))}
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className={cn("w-full justify-start gap-2", pathname.startsWith(item.href) && "bg-muted")}
              >
                {item.icon}
                <span className="flex-1 text-left">{item.title}</span>
                {openItems[item.title.toLowerCase().replace(/\s+/g, "-")] ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-6 space-y-1 mt-1">
              {item.submenu.map((subitem) => (
                <Link key={subitem.href} href={subitem.href}>
                  <Button
                    variant="ghost"
                    className={cn("w-full justify-start", pathname === subitem.href && "bg-muted")}
                  >
                    {subitem.title}
                  </Button>
                </Link>
              ))}
            </CollapsibleContent>
          </Collapsible>
        ) : (
          <Link key={item.href} href={item.href}>
            <Button variant="ghost" className={cn("w-full justify-start gap-2", pathname === item.href && "bg-muted")}>
              {item.icon}
              {item.title}
            </Button>
          </Link>
        ),
      )}
    </div>
  )
}

