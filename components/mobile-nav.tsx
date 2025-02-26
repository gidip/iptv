"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>IPTV Stream</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-8">
          <Link href="/" onClick={() => setOpen(false)} className="text-lg font-medium hover:underline">
            Home
          </Link>
          <Link href="/channels" onClick={() => setOpen(false)} className="text-lg font-medium hover:underline">
            Channels
          </Link>
          <div className="space-y-3">
            <p className="text-lg font-medium">Features</p>
            <div className="grid gap-2 pl-4">
              <Link href="/features/live-tv" onClick={() => setOpen(false)} className="text-base hover:underline">
                Live TV
              </Link>
              <Link href="/features/movies" onClick={() => setOpen(false)} className="text-base hover:underline">
                Movies & Shows
              </Link>
              <Link href="/features/sports" onClick={() => setOpen(false)} className="text-base hover:underline">
                Sports
              </Link>
            </div>
          </div>
          <Link href="/pricing" onClick={() => setOpen(false)} className="text-lg font-medium hover:underline">
            Pricing
          </Link>
          <Link href="/support" onClick={() => setOpen(false)} className="text-lg font-medium hover:underline">
            Support
          </Link>
          <div className="border-t pt-4 mt-4">
            <div className="grid gap-2">
              <Link href="/auth/signin">
                <Button variant="outline" className="w-full" onClick={() => setOpen(false)}>
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="w-full" onClick={() => setOpen(false)}>
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

