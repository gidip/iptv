"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Eye, Save, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { PageEditor } from "@/components/admin/page-editor"
import { PagePreview } from "@/components/admin/page-preview"

// Mock page data
const mockPages = {
  "1": {
    id: "1",
    title: "Home",
    slug: "/",
    content:
      "<h1>Welcome to IPTV App</h1><p>Your ultimate IPTV streaming solution. Access thousands of channels and on-demand content from around the world.</p>",
    metaTitle: "IPTV App - Your Ultimate Streaming Solution",
    metaDescription: "Access thousands of channels and on-demand content from around the world with IPTV App.",
    status: "published",
    location: "header",
    lastUpdated: "2023-06-15T10:30:00Z",
  },
  "2": {
    id: "2",
    title: "Channels",
    slug: "/channels",
    content: "<h1>Our Channels</h1><p>Browse our extensive collection of channels from around the world.</p>",
    metaTitle: "Channels - IPTV App",
    metaDescription: "Browse our extensive collection of channels from around the world.",
    status: "published",
    location: "header",
    lastUpdated: "2023-06-14T14:22:00Z",
  },
  new: {
    id: "new",
    title: "",
    slug: "",
    content: "",
    metaTitle: "",
    metaDescription: "",
    status: "draft",
    location: "header",
    lastUpdated: new Date().toISOString(),
  },
}

export default function PageEditorPage() {
  const router = useRouter()
  const { id } = useParams()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("editor")

  const [page, setPage] = useState({
    id: "",
    title: "",
    slug: "",
    content: "",
    metaTitle: "",
    metaDescription: "",
    status: "draft",
    location: "header",
    lastUpdated: "",
  })

  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      const pageId = Array.isArray(id) ? id[0] : id
      const pageData = mockPages[pageId as string] || mockPages.new
      setPage(pageData)
      setIsLoading(false)
    }, 500)
  }, [id])

  const handleChange = (field: string, value: string) => {
    setPage((prev) => ({ ...prev, [field]: value }))
  }

  const handleContentChange = (content: string) => {
    setPage((prev) => ({ ...prev, content }))
  }

  const handleSave = () => {
    // In a real app, this would be an API call
    setIsLoading(true)
    setTimeout(() => {
      toast({
        title: "Page saved",
        description: "Your page has been saved successfully.",
      })
      setIsLoading(false)
      router.push("/admin/pages")
    }, 1000)
  }

  const handleDelete = () => {
    // In a real app, this would be an API call
    setIsLoading(true)
    setTimeout(() => {
      toast({
        title: "Page deleted",
        description: "Your page has been deleted successfully.",
      })
      setIsLoading(false)
      router.push("/admin/pages")
    }, 1000)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => router.push("/admin/pages")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">
          {page.id === "new" ? "Create New Page" : `Edit Page: ${page.title}`}
        </h1>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Page Information</CardTitle>
            <CardDescription>Basic information about the page</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Page Title</Label>
                <Input
                  id="title"
                  value={page.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Enter page title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={page.slug}
                  onChange={(e) => handleChange("slug", e.target.value)}
                  placeholder="/page-url"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select value={page.location} onValueChange={(value) => handleChange("location", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="header">Header</SelectItem>
                    <SelectItem value="footer">Footer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={page.status} onValueChange={(value) => handleChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SEO Settings</CardTitle>
            <CardDescription>Search engine optimization settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="metaTitle">Meta Title</Label>
              <Input
                id="metaTitle"
                value={page.metaTitle}
                onChange={(e) => handleChange("metaTitle", e.target.value)}
                placeholder="Enter meta title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="metaDescription">Meta Description</Label>
              <Input
                id="metaDescription"
                value={page.metaDescription}
                onChange={(e) => handleChange("metaDescription", e.target.value)}
                placeholder="Enter meta description"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle>Page Content</CardTitle>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="editor">Editor</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <CardDescription>Edit your page content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="min-h-[500px]">
              {activeTab === "editor" ? (
                <PageEditor content={page.content} onChange={handleContentChange} />
              ) : (
                <PagePreview content={page.content} />
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          {page.id !== "new" && (
            <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Page
            </Button>
          )}
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setActiveTab("preview")} disabled={isLoading}>
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Button onClick={handleSave} disabled={isLoading}>
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? "Saving..." : "Save Page"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

