"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  const t = useTranslations("Error")

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h2 className="text-2xl font-semibold mb-6">{t("title")}</h2>
      <p className="text-muted-foreground mb-8 max-w-md">{t("description")}</p>
      <div className="flex gap-4">
        <Button onClick={() => reset()}>{t("tryAgain")}</Button>
        <Button variant="outline" asChild>
          <a href="/">{t("returnHome")}</a>
        </Button>
      </div>
      {error.digest && (
        <p className="mt-8 text-sm text-muted-foreground">
          {t("errorCode")}: {error.digest}
        </p>
      )}
    </div>
  )
}

