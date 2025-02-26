"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// List of streaming services
const streamingServices = [
  { name: "Netflix", slug: "netflix" },
  { name: "Disney+", slug: "disney-plus" },
  { name: "Prime Video", slug: "prime-video" },
  { name: "HBO Max", slug: "hbo-max" },
  { name: "Hulu", slug: "hulu" },
  { name: "Apple TV+", slug: "apple-tv-plus" },
  { name: "Paramount+", slug: "paramount-plus" },
  { name: "Peacock", slug: "peacock" },
  { name: "ESPN", slug: "espn" },
  { name: "Crunchyroll", slug: "crunchyroll" },
  // Show only 10 in the dropdown, the rest will be on the streaming services page
]

export function SiteHeader() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/movies",
      label: "Movies",
      active: pathname === "/movies" || pathname.startsWith("/movies/"),
    },
    {
      href: "/channels",
      label: "TV Channels",
      active: pathname === "/channels" || pathname.startsWith("/channels/"),
    },
    {
      href: "/live-stream",
      label: "Live Stream",
      active: pathname === "/live-stream",
    },
    {
      href: "/streaming-services",
      label: "Streaming Services",
      active: pathname === "/streaming-services" || pathname.startsWith("/streaming-services/"),
      dropdown: true,
      items: streamingServices,
    },
    {
      href: "/about",
      label: "About",
      active: pathname === "/about",
    },
    {
      href: "/contact",
      label: "Contact",
      active: pathname === "/contact",
    },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">IPTV App</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {routes.map((route) =>
            route.dropdown ? (
              <div key={route.href} className="relative">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={cn(
                        "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary",
                        route.active ? "text-primary" : "text-muted-foreground",
                      )}
                    >
                      {route.label} <ChevronDown className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <Link href={route.href} className="w-full">
                        View All
                      </Link>
                    </DropdownMenuItem>
                    {route.items?.map((item) => (
                      <DropdownMenuItem key={item.slug} asChild>
                        <Link href={`${route.href}/${item.slug}`} className="w-full">
                          {item.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  route.active ? "text-primary" : "text-muted-foreground",
                )}
              >
                {route.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <Link href="/admin" className="hidden md:block">
            <Button variant="outline" size="sm">
              Admin Panel
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 grid gap-3">
            {routes.map((route) =>
              route.dropdown ? (
                <div key={route.href} className="space-y-2">
                  <Link
                    href={route.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary block py-2",
                      route.active ? "text-primary" : "text-muted-foreground",
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {route.label} (View All)
                  </Link>
                  <div className="pl-4 border-l space-y-2">
                    {route.items?.map((item) => (
                      <Link
                        key={item.slug}
                        href={`${route.href}/${item.slug}`}
                        className="text-sm text-muted-foreground hover:text-primary block py-1"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary block py-2",
                    route.active ? "text-primary" : "text-muted-foreground",
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {route.label}
                </Link>
              ),
            )}
            <Link href="/admin" onClick={() => setIsMenuOpen(false)}>
              <Button variant="outline" size="sm" className="mt-2 w-full">
                Admin Panel
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

