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

// List of categories
const categories = ["News", "Sports", "Movies", "Kids", "Documentary", "Gaming", "Music", "Technology"]

// Form schema
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  streamUrl: z.string().url("Please enter a valid URL"),
  isLive: z.boolean().default(false),
  featured: z.boolean().default(false),
})

type FormValues = z.infer<typeof formSchema>

interface ChannelFormProps {
  initialData?: any
}

export function ChannelForm({ initialData }: ChannelFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [logo, setLogo] = useState<string | null>(initialData?.logo || null)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(initialData?.streamUrl || null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      category: "",
      streamUrl: "",
      isLive: false,
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

      if (initialData) {
        // Update existing channel
        await updateChannel({
          id: initialData.id,
          ...values,
          logo: logo || initialData.logo,
        })

        toast({
          title: "Channel updated",
          description: "The channel has been successfully updated.",
        })
      } else {
        // Create new channel
        await createChannel({
          ...values,
          logo: logo || "/placeholder.svg?height=100&width=100",
        })

        toast({
          title: "Channel created",
          description: "The channel has been successfully created.",
        })
      }

      // Redirect to channels list
      router.push("/admin/channels")
      router.refresh()
    } catch (error) {
      console.error("Error saving channel:", error)
      toast({
        title: "Error",
        description: "Failed to save the channel. Please try again.",
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
                  <FormLabel>Channel Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter channel name" {...field} />
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
                    <Textarea placeholder="Enter channel description" className="min-h-[120px]" {...field} />
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
                  <FormDescription>Enter the URL for the channel stream</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex space-x-4">
              <FormField
                control={form.control}
                name="isLive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Live Stream</FormLabel>
                      <FormDescription>Mark this channel as a live stream</FormDescription>
                    </div>
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
                      <FormDescription>Show this channel in featured sections</FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-8">
            {/* Video Preview */}
            <div>
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
            <div>
              <FormLabel className="block mb-2">Channel Logo</FormLabel>
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

        <div className="flex gap-4 justify-end">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/channels")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : initialData ? "Update Channel" : "Add Channel"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

