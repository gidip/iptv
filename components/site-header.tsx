"use client"

import Link from "next/link"
import { Package2, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useTranslations } from "next-intl"

export function SiteHeader() {
  const t = useTranslations("Navigation")

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <Package2 className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">MyIPTV</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-2 md:justify-between">
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground">
              {t("home")}
            </Link>
            <Link href="/channels" className="transition-colors hover:text-foreground/80 text-foreground/60">
              {t("channels")}
            </Link>
            <Link href="/pricing" className="transition-colors hover:text-foreground/80 text-foreground/60">
              {t("pricing")}
            </Link>
            <Link href="/contact" className="transition-colors hover:text-foreground/80 text-foreground/60">
              {t("contact")}
            </Link>
          </nav>
          <div className="flex items-center space-x-2">
            <nav className="flex items-center space-x-2">
              <Link href="/signin" className="hidden sm:block">
                <Button variant="ghost" size="sm">
                  {t("signIn")}
                </Button>
              </Link>
              <Link href="/signup" className="hidden sm:block">
                <Button size="sm">{t("signUp")}</Button>
              </Link>
            </nav>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-4">
                  <Link href="/" className="text-sm font-medium hover:text-primary">
                    {t("home")}
                  </Link>
                  <Link href="/channels" className="text-sm font-medium hover:text-primary">
                    {t("channels")}
                  </Link>
                  <Link href="/pricing" className="text-sm font-medium hover:text-primary">
                    {t("pricing")}
                  </Link>
                  <Link href="/contact" className="text-sm font-medium hover:text-primary">
                    {t("contact")}
                  </Link>
                  <Link href="/signin" className="text-sm font-medium hover:text-primary">
                    {t("signIn")}
                  </Link>
                  <Link href="/signup" className="text-sm font-medium hover:text-primary">
                    {t("signUp")}
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

