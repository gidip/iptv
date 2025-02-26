import Link from "next/link"
import { Package2 } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useTranslations } from "next-intl"

export function SiteFooter() {
  const t = useTranslations("Footer")

  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Link href="/" className="flex items-center gap-2">
            <Package2 className="h-5 w-5" />
            <span className="font-bold">MyIPTV</span>
          </Link>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
          <nav className="flex gap-4 md:gap-6">
            <Link
              href="/terms"
              className="text-sm font-medium text-muted-foreground underline-offset-4 hover:underline"
            >
              {t("terms")}
            </Link>
            <Link
              href="/privacy"
              className="text-sm font-medium text-muted-foreground underline-offset-4 hover:underline"
            >
              {t("privacy")}
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-muted-foreground underline-offset-4 hover:underline"
            >
              {t("contact")}
            </Link>
          </nav>
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  )
}

