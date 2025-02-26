"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { locales, languageNames } from "@/lib/i18n-config"

export function AutoTranslate() {
  const [sourceText, setSourceText] = useState("")
  const [targetLanguage, setTargetLanguage] = useState("en")
  const [translatedText, setTranslatedText] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleTranslate = async () => {
    if (!sourceText) return

    setIsLoading(true)

    try {
      // In a real app, you would call a translation API here
      // For example, Google Translate API, DeepL, or a custom translation service

      // Simulating API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // This is a placeholder. In a real app, you would get the translation from the API
      setTranslatedText(`[Translated to ${languageNames[targetLanguage as keyof typeof languageNames]}]: ${sourceText}`)
    } catch (error) {
      console.error("Translation error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Auto Translation Tool</CardTitle>
        <CardDescription>Translate content to any supported language for your website</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="sourceText">Source Text</Label>
          <Textarea
            id="sourceText"
            placeholder="Enter text to translate..."
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="targetLanguage">Target Language</Label>
          <Select value={targetLanguage} onValueChange={setTargetLanguage}>
            <SelectTrigger id="targetLanguage">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {locales.map((locale) => (
                <SelectItem key={locale} value={locale}>
                  {languageNames[locale as keyof typeof languageNames]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {translatedText && (
          <div className="grid gap-2">
            <Label htmlFor="translatedText">Translated Text</Label>
            <Textarea id="translatedText" value={translatedText} readOnly className="min-h-[100px]" />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleTranslate} disabled={!sourceText || isLoading} className="w-full">
          {isLoading ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              Translating...
            </>
          ) : (
            "Translate"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

