"use client"

import { useState, useTransition } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Check, ChevronsUpDown, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useLocale } from "next-intl"
import { locales, languageNames } from "@/lib/i18n-config"

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale()

  const handleSelect = (locale: string) => {
    startTransition(() => {
      // Remove the current locale from the pathname
      let newPathname = pathname

      // Handle paths with and without locale prefixes
      const segments = pathname.split("/")
      if (segments.length > 1 && locales.includes(segments[1])) {
        segments[1] = locale
        newPathname = segments.join("/")
      } else {
        newPathname = `/${locale}${pathname}`
      }

      router.push(newPathname)
      setOpen(false)
    })
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[180px] justify-between"
          disabled={isPending}
        >
          <Globe className="mr-2 h-4 w-4" />
          {languageNames[currentLocale as keyof typeof languageNames] || currentLocale}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[180px] p-0">
        <Command>
          <CommandInput placeholder="Search language..." />
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {locales.map((locale) => (
                <CommandItem key={locale} value={locale} onSelect={() => handleSelect(locale)}>
                  <Check className={cn("mr-2 h-4 w-4", locale === currentLocale ? "opacity-100" : "opacity-0")} />
                  {languageNames[locale as keyof typeof languageNames]}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

