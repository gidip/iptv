"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Loader2, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { toast } from "@/components/ui/use-toast"
import { updateSiteLogo } from "@/lib/actions/content-actions"

export function LogoManager() {
  const [logoUrl, setLogoUrl] = useState("/logo.png")
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState("/logo.png")
  const [logoWidth, setLogoWidth] = useState(150)
  const [logoHeight, setLogoHeight] = useState(50)
  const [isLoading, setIsLoading] = useState(false)
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true)
  const [originalAspectRatio, setOriginalAspectRatio] = useState(3) // width/height

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (PNG, JPG, SVG, etc.)",
        variant: "destructive",
      })
      return
    }

    setLogoFile(file)

    // Create a preview URL
    const objectUrl = URL.createObjectURL(file)
    setPreviewUrl(objectUrl)

    // Get original dimensions to calculate aspect ratio
    const img = new Image()
    img.onload = () => {
      const ratio = img.width / img.height
      setOriginalAspectRatio(ratio)
      setLogoWidth(img.width)
      setLogoHeight(img.height)
    }
    img.src = objectUrl
  }

  const handleWidthChange = (value: number[]) => {
    const newWidth = value[0]
    setLogoWidth(newWidth)

    if (maintainAspectRatio) {
      setLogoHeight(Math.round(newWidth / originalAspectRatio))
    }
  }

  const handleHeightChange = (value: number[]) => {
    const newHeight = value[0]
    setLogoHeight(newHeight)

    if (maintainAspectRatio) {
      setLogoWidth(Math.round(newHeight * originalAspectRatio))
    }
  }

  const saveLogo = async () => {
    if (!logoFile && logoUrl === "/logo.png") {
      toast({
        title: "No changes to save",
        description: "Please upload a new logo or make changes to the current one.",
      })
      return
    }

    try {
      setIsLoading(true)

      // In a real implementation, you would upload the file to storage
      // and then save the URL and dimensions to your database
      await updateSiteLogo({
        file: logoFile,
        width: logoWidth,
        height: logoHeight,
        url: logoUrl,
      })

      toast({
        title: "Logo updated",
        description: "Your logo has been updated successfully.",
      })
    } catch (error) {
      console.error("Error saving logo:", error)
      toast({
        title: "Error updating logo",
        description: "There was a problem updating your logo. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Logo Management</CardTitle>
        <CardDescription>Upload, resize, and manage your site logo.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="logo-upload">Upload New Logo</Label>
              <div className="mt-1 flex items-center">
                <Input id="logo-upload" type="file" accept="image/*" onChange={handleFileChange} className="flex-1" />
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Recommended format: PNG or SVG with transparent background
              </p>
            </div>

            <div>
              <Label htmlFor="logo-width">Width (px)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="logo-width"
                  min={20}
                  max={500}
                  step={1}
                  value={[logoWidth]}
                  onValueChange={handleWidthChange}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={logoWidth}
                  onChange={(e) => handleWidthChange([Number.parseInt(e.target.value)])}
                  className="w-20"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="logo-height">Height (px)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="logo-height"
                  min={20}
                  max={300}
                  step={1}
                  value={[logoHeight]}
                  onValueChange={handleHeightChange}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={logoHeight}
                  onChange={(e) => handleHeightChange([Number.parseInt(e.target.value)])}
                  className="w-20"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Input
                type="checkbox"
                id="maintain-aspect-ratio"
                checked={maintainAspectRatio}
                onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                className="w-4 h-4"
              />
              <Label htmlFor="maintain-aspect-ratio">Maintain aspect ratio</Label>
            </div>

            <Button onClick={saveLogo} disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Logo
                </>
              )}
            </Button>
          </div>

          <div className="space-y-4">
            <Label>Preview</Label>
            <div className="border rounded-md p-6 flex items-center justify-center bg-white">
              <div
                className="relative"
                style={{
                  width: `${logoWidth}px`,
                  height: `${logoHeight}px`,
                }}
              >
                <Image
                  src={previewUrl || "/placeholder.svg"}
                  alt="Logo Preview"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
            <div className="border rounded-md p-6 flex items-center justify-center bg-gray-900">
              <div
                className="relative"
                style={{
                  width: `${logoWidth}px`,
                  height: `${logoHeight}px`,
                }}
              >
                <Image
                  src={previewUrl || "/placeholder.svg"}
                  alt="Logo Preview (Dark Background)"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

