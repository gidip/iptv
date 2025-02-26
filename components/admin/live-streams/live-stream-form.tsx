"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { X, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { VideoPlayer } from "@/components/video-player/video-player"
import { createChannel, updateChannel } from "@/lib/actions/channel-actions"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Editor } from "@/components/editor/editor"

// List of categories
const categories = [
  "Gaming",
  "Music",
  "Technology",
  "Sports",
  "News",
  "Entertainment",
  "Education",
  "Lifestyle",
  "Travel",
  "Food",
  "Other",
]

// Form schema
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  streamUrl: z.string().url("Please enter a valid URL"),
  content: z.string().optional(),
  isLive: z.boolean().default(true),
  featured: z.boolean().default(false),
})

type FormValues = z.infer<typeof formSchema>

interface LiveStreamFormProps {
  initialData?: any
}

export function LiveStreamForm({ initialData }: LiveStreamFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [logo, setLogo] = useState<string | null>(initialData?.logo || null)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(initialData?.streamUrl || null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [content, setContent] = useState(initialData?.content || "")

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialData,
      content: initialData?.content || "",
      isLive: initialData?.isLive !== undefined ? initialData.isLive : true,
    } || {
      name: "",
      description: "",
      category: "",
      streamUrl: "",
      content: "",
      isLive: true,
      featured: false,
    },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true)

      // In a real application, you would:
      // 1. Upload the logo file to storage
      // 2. Get the URL for the logo
      // 3. Save all data to your database

      // For now, we'll just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const dataToSave = {
        ...values,
        content,
        logo: logo || "/placeholder.svg?height=100&width=100",
        isLive: true, // Always set isLive to true for live streams
      }

      if (initialData) {
        // Update existing live stream
        await updateChannel({
          id: initialData.id,
          ...dataToSave,
        })

        toast({
          title: "Live stream updated",
          description: "The live stream has been successfully updated.",
        })
      } else {
        // Create new live stream
        await createChannel(dataToSave)

        toast({
          title: "Live stream created",
          description: "The live stream has been successfully created.",
        })
      }

      // Redirect to live streams list
      router.push("/admin/live-streams")
      router.refresh()
    } catch (error) {
      console.error("Error saving live stream:", error)
      toast({
        title: "Error",
        description: "Failed to save the live stream. Please try again.",
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
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="content">Rich Content</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stream Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter stream name" {...field} />
                  </FormControl>
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
                    <Textarea placeholder="Enter stream description" className="min-h-[120px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                    <FormDescription>Show this stream in featured sections</FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </TabsContent>

          <TabsContent value="media" className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="streamUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stream URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://..."
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        setVideoPreviewUrl(e.target.value)
                      }}
                    />
                  </FormControl>
                  <FormDescription>Enter the URL for the live stream</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Video Preview */}
            <div className="mt-6">
              <FormLabel className="block mb-2">Stream Preview</FormLabel>
              <div className="border rounded-md p-4">
                {videoPreviewUrl ? (
                  <VideoPlayer src={videoPreviewUrl} poster={logo || undefined} title="Stream Preview" />
                ) : (
                  <div className="aspect-video bg-muted rounded-md flex flex-col items-center justify-center">
                    <p className="text-sm text-muted-foreground">Enter a stream URL to preview</p>
                  </div>
                )}
              </div>
            </div>

            {/* Logo */}
            <div className="mt-6">
              <FormLabel className="block mb-2">Stream Logo/Thumbnail</FormLabel>
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
                        Choose File variant="secondary" size="sm"> Choose File
                      </Button>
                    </label>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-4 pt-4">
            <div className="space-y-2">
              <FormLabel>Rich Content</FormLabel>
              <FormDescription>
                Add additional content for this live stream page using the rich text editor below.
              </FormDescription>
              <Editor value={content} onChange={setContent} />
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-4 justify-end">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/live-streams")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : initialData ? "Update Stream" : "Add Stream"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

