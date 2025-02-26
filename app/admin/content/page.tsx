"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Plus, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { ContentBlockEditor } from "@/components/admin/content/content-block-editor"
import { LogoManager } from "@/components/admin/content/logo-manager"
import { NavigationManager } from "@/components/admin/content/navigation-manager"
import { FormSubmissions } from "@/components/admin/content/form-submissions"
import { updateMainPageContent } from "@/lib/actions/content-actions"

// Define the content block types
export type ContentBlock = {
  id: string
  type: "hero" | "features" | "testimonials" | "pricing" | "cta" | "custom"
  title: string
  content: string
  order: number
}

export default function ContentManagementPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("main-content")
  const [isLoading, setIsLoading] = useState(false)
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([
    {
      id: "hero-section",
      type: "hero",
      title: "Hero Section",
      content: "<h1>Welcome to IPTV Service</h1><p>Stream your favorite channels anytime, anywhere.</p>",
      order: 0,
    },
    {
      id: "features-section",
      type: "features",
      title: "Features Section",
      content:
        "<h2>Our Features</h2><ul><li>HD Streaming</li><li>Multi-device Support</li><li>24/7 Customer Service</li></ul>",
      order: 1,
    },
    {
      id: "cta-section",
      type: "cta",
      title: "Call to Action",
      content: "<h2>Ready to start?</h2><p>Sign up today and get access to premium channels.</p>",
      order: 2,
    },
  ])

  const addNewBlock = () => {
    const newId = `block-${Date.now()}`
    const newBlock: ContentBlock = {
      id: newId,
      type: "custom",
      title: "New Section",
      content: "<p>Add your content here</p>",
      order: contentBlocks.length,
    }
    setContentBlocks([...contentBlocks, newBlock])
  }

  const updateBlock = (id: string, updatedBlock: Partial<ContentBlock>) => {
    setContentBlocks(contentBlocks.map((block) => (block.id === id ? { ...block, ...updatedBlock } : block)))
  }

  const removeBlock = (id: string) => {
    setContentBlocks(contentBlocks.filter((block) => block.id !== id))
  }

  const reorderBlocks = (startIndex: number, endIndex: number) => {
    const result = Array.from(contentBlocks)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    // Update order property
    const updatedBlocks = result.map((block, index) => ({
      ...block,
      order: index,
    }))

    setContentBlocks(updatedBlocks)
  }

  const saveContent = async () => {
    try {
      setIsLoading(true)
      await updateMainPageContent(contentBlocks)
      toast({
        title: "Content saved",
        description: "Your changes have been saved successfully.",
      })
      router.refresh()
    } catch (error) {
      console.error("Error saving content:", error)
      toast({
        title: "Error saving content",
        description: "There was a problem saving your changes. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Content Management</h1>
        {activeTab === "main-content" && (
          <div className="flex gap-2">
            <Button onClick={addNewBlock} variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Add Section
            </Button>
            <Button onClick={saveContent} disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="main-content">Main Content</TabsTrigger>
          <TabsTrigger value="logo">Logo</TabsTrigger>
          <TabsTrigger value="navigation">Navigation</TabsTrigger>
          <TabsTrigger value="submissions">Form Submissions</TabsTrigger>
        </TabsList>

        <TabsContent value="main-content" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Main Page Content</CardTitle>
              <CardDescription>Manage the content sections that appear on your main page.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {contentBlocks.map((block, index) => (
                <ContentBlockEditor
                  key={block.id}
                  block={block}
                  updateBlock={updateBlock}
                  removeBlock={removeBlock}
                  index={index}
                  moveBlock={reorderBlocks}
                  isLast={index === contentBlocks.length - 1}
                />
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logo" className="mt-4">
          <LogoManager />
        </TabsContent>

        <TabsContent value="navigation" className="mt-4">
          <NavigationManager />
        </TabsContent>

        <TabsContent value="submissions" className="mt-4">
          <FormSubmissions />
        </TabsContent>
      </Tabs>
    </div>
  )
}

