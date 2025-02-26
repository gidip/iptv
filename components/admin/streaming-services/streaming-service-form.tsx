"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { X, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { VideoPlayer } from "@/components/video-player/video-player"
import { createStreamingService, updateStreamingService } from "@/lib/actions/streaming-service-actions"
import { type StreamingServiceFormData, streamingServiceSchema } from "@/types/streaming-service"
import { RichTextEditor } from "@/components/rich-text-editor"

interface StreamingServiceFormProps {
  initialData?: any
}

export function StreamingServiceForm({ initialData }: StreamingServiceFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [logo, setLogo] = useState<string | null>(initialData?.logo || null)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(initialData?.videoUrl || null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [content, setContent] = useState(initialData?.content || "")

  const form = useForm<StreamingServiceFormData>({
    resolver: zodResolver(streamingServiceSchema),
    defaultValues: initialData || {
      name: "",
      slug: "",
      description: "",
      videoUrl: "",
      featured: false,
      order: 0,
    },
  })

  // Generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, "-")
  }

  const onSubmit = async (values: StreamingServiceFormData) => {
    try {
      setIsSubmitting(true)

      // In a real application, you would:
      // 1. Upload the logo file to storage
      // 2. Get the URL for the logo
      // 3. Save all data to your database

      // For now, we'll just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const formData = {
        ...values,
        content,
        logo: logo || "/placeholder.svg?height=100&width=100",
      }

      if (initialData) {
        // Update existing service
        await updateStreamingService({
          id: initialData.id,
          ...formData,
        })

        toast({
          title: "Service updated",
          description: "The streaming service has been successfully updated.",
        })
      } else {
        // Create new service
        await createStreamingService(formData)

        toast({
          title: "Service created",
          description: "The streaming service has been successfully created.",
        })
      }

      // Redirect to streaming services list
      router.push("/admin/streaming-services")
      router.refresh()
    } catch (error) {
      console.error("Error saving streaming service:", error)
      toast({
        title: "Error",
        description: "Failed to save the streaming service. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLogoFile(file)
      const reader = new FileReader()
      reader.onload = () => {
        setLogo(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeLogo = () => {
    setLogo(null)
    setLogoFile(null)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter service name"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        // Auto-generate slug if slug is empty
                        if (!form.getValues("slug")) {
                          form.setValue("slug", generateSlug(e.target.value))
                        }
                      }}
                    />
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
                    <Input placeholder="service-slug" {...field} />
                  </FormControl>
                  <FormDescription>Used in the URL: /streaming-services/[slug]</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter service description" className="min-h-[120px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://..."
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        setVideoPreviewUrl(e.target.value || null)
                      }}
                    />
                  </FormControl>
                  <FormDescription>Enter the URL for the promotional video (optional)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>Show this service in featured sections</FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Order</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormDescription>Lower numbers appear first</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-8">
            {/* Video Preview */}
            <div>
              <FormLabel className="block mb-2">Video Preview</FormLabel>
              <div className="border rounded-md p-4">
                {videoPreviewUrl ? (
                  <VideoPlayer src={videoPreviewUrl} poster={logo || undefined} title="Video Preview" />
                ) : (
                  <div className="aspect-video bg-muted rounded-md flex flex-col items-center justify-center">
                    <p className="text-sm text-muted-foreground">Enter a video URL to preview</p>
                  </div>
                )}
              </div>
            </div>

            {/* Logo */}
            <div>
              <FormLabel className="block mb-2">Service Logo</FormLabel>
              <div className="border rounded-md p-4">
                {logo ? (
                  <div className="relative">
                    <div className="aspect-square w-48 mx-auto relative rounded-md overflow-hidden">
                      <Image src={logo || "/placeholder.svg"} alt="Logo preview" fill className="object-cover" />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={removeLogo}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="aspect-square w-48 mx-auto bg-muted rounded-md flex flex-col items-center justify-center">
                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-4">Click to upload logo</p>
                    <Input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="logo-upload"
                      onChange={handleLogoChange}
                    />
                    <label htmlFor="logo-upload">
                      <Button type="button" variant="secondary" size="sm">
                        Choose File
                      </Button>
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Rich Text Content */}
        <div>
          <FormLabel className="block mb-2">Content</FormLabel>
          <RichTextEditor
            value={content}
            onChange={setContent}
            placeholder="Enter rich content for the streaming service page..."
          />
        </div>

        <div className="flex gap-4 justify-end">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/streaming-services")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : initialData ? "Update Service" : "Add Service"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

