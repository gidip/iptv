"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AutoTranslate } from "@/components/auto-translate"
import { locales, languageNames } from "@/lib/i18n-config"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Globe, RefreshCw } from "lucide-react"

export default function TranslationsPage() {
  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpdateTranslations = async () => {
    setIsUpdating(true)
    // In a real app, this would trigger a process to update translations
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsUpdating(false)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Translation Management</h1>
        <Button onClick={handleUpdateTranslations} disabled={isUpdating}>
          {isUpdating ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            <>
              <Globe className="mr-2 h-4 w-4" />
              Update All Translations
            </>
          )}
        </Button>
      </div>

      <p className="text-muted-foreground">
        Manage translations for your website content across all supported languages.
      </p>

      <Tabs defaultValue="languages" className="w-full">
        <TabsList>
          <TabsTrigger value="languages">Languages</TabsTrigger>
          <TabsTrigger value="translate">Translate Content</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="languages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Supported Languages</CardTitle>
              <CardDescription>Your website is currently available in {locales.length} languages.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {locales.map((locale) => (
                  <div key={locale} className="flex items-center gap-2 rounded-md border p-3">
                    <div className="flex-1">
                      <div className="font-medium">{languageNames[locale as keyof typeof languageNames]}</div>
                      <div className="text-xs text-muted-foreground">{locale}</div>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Active
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="translate" className="space-y-4">
          <AutoTranslate />
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Translation Settings</CardTitle>
              <CardDescription>Configure how translations are handled on your website.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Automatic Translation</div>
                  <div className="text-sm text-muted-foreground">
                    Automatically translate new content when added to the website
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline">Configure</Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Default Language</div>
                  <div className="text-sm text-muted-foreground">Set the default language for your website</div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline">Change</Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Translation API</div>
                  <div className="text-sm text-muted-foreground">Configure the translation API settings</div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline">Configure</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

