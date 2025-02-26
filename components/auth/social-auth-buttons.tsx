"use client"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { useTranslations } from "next-intl"

interface SocialAuthButtonsProps {
  isLoading?: boolean
  onGoogleClick?: () => void
  onAppleClick?: () => void
}

export function SocialAuthButtons({ isLoading, onGoogleClick, onAppleClick }: SocialAuthButtonsProps) {
  const t = useTranslations("Auth")

  return (
    <div className="grid gap-2">
      <Button variant="outline" type="button" disabled={isLoading} onClick={onGoogleClick} className="bg-white">
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}
        {t("continueWithGoogle")}
      </Button>
      {/* Apple Sign In button commented out for future use */}
      {/*
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={onAppleClick}
        className="bg-black text-white hover:bg-black/90"
      >
        {isLoading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : <Icons.apple className="mr-2 h-4 w-4" />}
        {t("continueWithApple")}
      </Button>
      */}
    </div>
  )
}

