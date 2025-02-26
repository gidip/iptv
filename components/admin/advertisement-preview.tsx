"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Advertisement {
  id: string
  name: string
  type: "video" | "banner" | "overlay"
  content: string
}

interface AdvertisementPreviewProps {
  advertisement: Advertisement
}

export function AdvertisementPreview({ advertisement }: AdvertisementPreviewProps) {
  const [previewContext, setPreviewContext] = useState<"channel" | "video">("channel")
  const [previewTemplate, setPreviewTemplate] = useState<"desktop" | "mobile">("desktop")

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Label>Preview Context</Label>
          <Select value={previewContext} onValueChange={(value: "channel" | "video") => setPreviewContext(value)}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select context" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="channel">Channel Page</SelectItem>
              <SelectItem value="video">Video Player</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Device Template</Label>
          <Select value={previewTemplate} onValueChange={(value: "desktop" | "mobile") => setPreviewTemplate(value)}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select device" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desktop">Desktop</SelectItem>
              <SelectItem value="mobile">Mobile</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="preview" className="w-full">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">HTML Code</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="pt-4">
          <div
            className={`border rounded-lg overflow-hidden ${previewTemplate === "mobile" ? "max-w-[375px] mx-auto" : ""}`}
          >
            {previewContext === "channel" ? (
              <div className="bg-background">
                <div className="p-4 border-b">
                  <h3 className="text-lg font-semibold">Channel Preview</h3>
                </div>
                <div className="p-4">
                  {advertisement.type === "banner" && (
                    <div className="w-full h-[120px] bg-muted rounded-md flex items-center justify-center mb-4 overflow-hidden">
                      {advertisement.content ? (
                        <img
                          src={advertisement.content || "/placeholder.svg"}
                          alt="Advertisement Banner"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-muted-foreground">Banner Advertisement</div>
                      )}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="w-full h-[200px] bg-muted rounded-md"></div>
                    <div className="w-full h-[200px] bg-muted rounded-md"></div>

                    {advertisement.type === "overlay" && (
                      <div className="fixed bottom-4 right-4 w-[300px] h-[100px] bg-background border rounded-md shadow-lg flex items-center justify-center">
                        {advertisement.content ? (
                          <img
                            src={advertisement.content || "/placeholder.svg"}
                            alt="Advertisement Overlay"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-muted-foreground">Overlay Advertisement</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-background">
                <div className="aspect-video bg-black relative">
                  {advertisement.type === "video" ? (
                    advertisement.content ? (
                      <video src={advertisement.content} controls className="w-full h-full object-contain" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-white">
                        Video Advertisement
                      </div>
                    )
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-white">Video Player</div>
                  )}

                  {advertisement.type === "overlay" && (
                    <div className="absolute bottom-4 right-4 w-[200px] h-[100px] bg-background/80 border rounded-md shadow-lg flex items-center justify-center">
                      {advertisement.content ? (
                        <img
                          src={advertisement.content || "/placeholder.svg"}
                          alt="Advertisement Overlay"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-muted-foreground">Overlay Advertisement</div>
                      )}
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold">Video Title</h3>
                  <p className="text-sm text-muted-foreground">Channel Name</p>

                  {advertisement.type === "banner" && (
                    <div className="w-full h-[120px] bg-muted rounded-md flex items-center justify-center my-4 overflow-hidden">
                      {advertisement.content ? (
                        <img
                          src={advertisement.content || "/placeholder.svg"}
                          alt="Advertisement Banner"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-muted-foreground">Banner Advertisement</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="code" className="pt-4">
          <Card>
            <CardContent className="p-4">
              <pre className="bg-muted p-4 rounded-md overflow-x-auto text-xs">
                {`<!-- ${advertisement.type.charAt(0).toUpperCase() + advertisement.type.slice(1)} Advertisement Code -->
${
  advertisement.type === "banner"
    ? `<div class="advertisement-banner">
  <a href="https://example.com/ad-link" target="_blank">
    <img src="${advertisement.content || "/path/to/banner.jpg"}" alt="Advertisement" />
  </a>
</div>`
    : advertisement.type === "video"
      ? `<div class="advertisement-video">
  <video controls autoplay>
    <source src="${advertisement.content || "/path/to/video.mp4"}" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>`
      : `<div class="advertisement-overlay">
  <a href="https://example.com/ad-link" target="_blank">
    <img src="${advertisement.content || "/path/to/overlay.jpg"}" alt="Advertisement" />
  </a>
  <button class="close-button">×</button>
</div>`
}`}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

