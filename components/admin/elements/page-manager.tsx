"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Pencil, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { TipTapEditor } from "@/components/admin/tiptap-editor"
import { createPage, updatePage, deletePage } from "@/lib/actions/page-actions"

// Define the page schema
const pageSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  isPublished: z.boolean().default(false),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  layout: z.enum(["default", "full-width", "sidebar"]).default("default"),
})

type PageFormValues = z.infer<typeof pageSchema>

// Mock data for initial pages
const initialPages = [
  {
    id: "1",
    title: "Home",
    slug: "/",
    description: "Main landing page",
    content: "<h1>Welcome to IPTV</h1><p>Your premium streaming service</p>",
    isPublished: true,
    metaTitle: "IPTV - Premium Streaming",
    metaDescription: "Access thousands of channels with our premium IPTV service",
    layout: "default",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "About Us",
    slug: "/about",
    description: "Learn about our company",
    content: "<h1>About Our Service</h1><p>We provide the best streaming experience</p>",
    isPublished: true,
    metaTitle: "About IPTV Service",
    metaDescription: "Learn about our premium IPTV streaming service",
    layout: "sidebar",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Contact",
    slug: "/contact",
    description: "Get in touch with us",
    content: "<h1>Contact Us</h1><p>We're here to help</p>",
    isPublished: true,
    metaTitle: "Contact IPTV Support",
    metaDescription: "Get in touch with our support team",
    layout: "full-width",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export function PageManager() {
  const [pages, setPages] = useState(initialPages)
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentPage, setCurrentPage] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<PageFormValues>({
    resolver: zodResolver(pageSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      content: "",
      isPublished: false,
      metaTitle: "",
      metaDescription: "",
      layout: "default",
    },
  })

  const filteredPages = pages.filter(
    (page) =>
      page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCreatePage = async (data: PageFormValues) => {
    try {
      // In a real app, this would call the server action
      const newPage = {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      // Call server action
      await createPage(data)

      // Update local state
      setPages([...pages, newPage])
      setIsCreating(false)
      form.reset()

      toast({
        title: "Page created",
        description: `${data.title} has been created successfully.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create page. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleUpdatePage = async (data: PageFormValues) => {
    if (!currentPage) return

    try {
      // In a real app, this would call the server action
      const updatedPage = {
        ...currentPage,
        ...data,
        updatedAt: new Date().toISOString(),
      }

      // Call server action
      await updatePage(currentPage.id, data)

      // Update local state
      setPages(pages.map((page) => (page.id === currentPage.id ? updatedPage : page)))
      setIsEditing(false)
      setCurrentPage(null)

      toast({
        title: "Page updated",
        description: `${data.title} has been updated successfully.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update page. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeletePage = async (id: string) => {
    try {
      // Call server action
      await deletePage(id)

      // Update local state
      setPages(pages.filter((page) => page.id !== id))

      toast({
        title: "Page deleted",
        description: "The page has been deleted successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete page. Please try again.",
        variant: "destructive",
      })
    }
  }

  const openEditDialog = (page: any) => {
    setCurrentPage(page)
    form.reset({
      title: page.title,
      slug: page.slug,
      description: page.description || "",
      content: page.content,
      isPublished: page.isPublished,
      metaTitle: page.metaTitle || "",
      metaDescription: page.metaDescription || "",
      layout: page.layout,
    })
    setIsEditing(true)
  }

  const openCreateDialog = () => {
    form.reset({
      title: "",
      slug: "",
      description: "",
      content: "",
      isPublished: false,
      metaTitle: "",
      metaDescription: "",
      layout: "default",
    })
    setIsCreating(true)
  }

  const handlePreview = (slug: string) => {
    // Open the page in a new tab
    window.open(slug, "_blank")
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search pages..."
          className="max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Add Page
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Page</DialogTitle>
              <DialogDescription>
                Add a new page to your website. Fill out the form below to create a page.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleCreatePage)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Page Title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input placeholder="/page-slug" {...field} />
                        </FormControl>
                        <FormDescription>The URL path for this page</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Brief description of the page" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <TipTapEditor content={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="layout"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Layout</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a layout" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="default">Default</SelectItem>
                            <SelectItem value="full-width">Full Width</SelectItem>
                            <SelectItem value="sidebar">With Sidebar</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isPublished"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Published</FormLabel>
                          <FormDescription>This page will be visible to visitors</FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="metaTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meta Title</FormLabel>
                        <FormControl>
                          <Input placeholder="SEO Title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="metaDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meta Description</FormLabel>
                        <FormControl>
                          <Input placeholder="SEO Description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter>
                  <Button type="submit">Create Page</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPages.map((page) => (
          <Card key={page.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {page.title}
                {page.isPublished ? (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Published</span>
                ) : (
                  <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">Draft</span>
                )}
              </CardTitle>
              <CardDescription>{page.slug}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2">{page.description || "No description"}</p>
              <p className="text-xs text-muted-foreground mt-2">
                Last updated: {new Date(page.updatedAt).toLocaleDateString()}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" onClick={() => handlePreview(page.slug)}>
                <Eye className="h-4 w-4 mr-1" />
                Preview
              </Button>
              <div className="flex gap-2">
                <Dialog open={isEditing} onOpenChange={setIsEditing}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => openEditDialog(page)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Edit Page</DialogTitle>
                      <DialogDescription>Make changes to the page. Click save when you're done.</DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(handleUpdatePage)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                  <Input placeholder="Page Title" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Slug</FormLabel>
                                <FormControl>
                                  <Input placeholder="/page-slug" {...field} />
                                </FormControl>
                                <FormDescription>The URL path for this page</FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Input placeholder="Brief description of the page" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="content"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Content</FormLabel>
                              <FormControl>
                                <TipTapEditor content={field.value} onChange={field.onChange} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="layout"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Layout</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a layout" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="default">Default</SelectItem>
                                    <SelectItem value="full-width">Full Width</SelectItem>
                                    <SelectItem value="sidebar">With Sidebar</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="isPublished"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>Published</FormLabel>
                                  <FormDescription>This page will be visible to visitors</FormDescription>
                                </div>
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="metaTitle"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Meta Title</FormLabel>
                                <FormControl>
                                  <Input placeholder="SEO Title" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="metaDescription"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Meta Description</FormLabel>
                                <FormControl>
                                  <Input placeholder="SEO Description" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <DialogFooter>
                          <Button type="submit">Save Changes</Button>
                        </DialogFooter>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeletePage(page.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

