import Link from "next/link"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"

export default function LocaleNotFound() {
  const t = useTranslations("NotFound")

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">{t("title")}</h2>
      <p className="text-muted-foreground mb-8 max-w-md">{t("description")}</p>
      <Button asChild>
        <Link href="/">{t("returnHome")}</Link>
      </Button>
    </div>
  )
}

