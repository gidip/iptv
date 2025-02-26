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
import { useToast } from "@/components/ui/use-toast"
import { VideoPlayer } from "@/components/video-player/video-player"

// List of categories (should match the ones in MovieCategories component)
const categories = [
  "Family",
  "Action",
  "Animated",
  "Documentaries",
  "Science Fiction",
  "Cartoons",
  "Drama",
  "Fantasy",
  "Thriller",
  "Mystery",
  "Indian",
  "Comedy",
  "Horror",
  "Adventure",
  "Musical",
  "Detective",
  "Psychological",
  "Romantic",
  "War",
  "Crime",
  "History",
  "Western",
  "Local",
]

// Form schema
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  year: z.coerce
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear() + 5),
  duration: z.string().min(1, "Duration is required"),
  director: z.string().min(1, "Director is required"),
  cast: z.string().min(1, "Cast is required"),
  videoUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
})

type FormValues = z.infer<typeof formSchema>

interface MovieFormProps {
  initialData?: any
}

export function MovieForm({ initialData }: MovieFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [thumbnail, setThumbnail] = useState<string | null>(initialData?.thumbnail || null)
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(initialData?.videoUrl || null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [subtitles, setSubtitles] = useState<Array<{ file: File; language: string; label: string }>>([])

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      category: "",
      year: new Date().getFullYear(),
      duration: "",
      director: "",
      cast: "",
      videoUrl: "",
    },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      setIsUploading(true)

      // In a real application, you would:
      // 1. Upload the video file to storage
      // 2. Upload the thumbnail to storage
      // 3. Upload subtitle files to storage
      // 4. Get the URLs for all files
      // 5. Save all data to your database

      // For now, we'll just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      if (initialData) {
        // Update existing movie
        // await updateMovie({
        //   id: initialData.id,
        //   ...values,
        //   thumbnail: thumbnail,
        //   // Add video URL from upload
        // })

        toast({
          title: "Movie updated",
          description: "The movie has been successfully updated.",
        })
      } else {
        // Create new movie
        // await createMovie({
        //   ...values,
        //   thumbnail: thumbnail,
        //   // Add video URL from upload
        // })

        toast({
          title: "Movie created",
          description: "The movie has been successfully created.",
        })
      }

      // Redirect to movies list
      router.push("/admin/movies")
      router.refresh()
    } catch (error) {
      console.error("Error saving movie:", error)
      toast({
        title: "Error",
        description: "Failed to save the movie. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setThumbnailFile(file)
      const reader = new FileReader()
      reader.onload = () => {
        setThumbnail(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setVideoFile(file)

      // Create a temporary URL for preview
      const url = URL.createObjectURL(file)
      setVideoPreviewUrl(url)

      // Clean up the URL when component unmounts
      return () => URL.revokeObjectURL(url)
    }
  }

  const handleSubtitleAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.name.endsWith(".vtt")) {
      // Extract language code from filename (e.g., "subtitle-en.vtt" -> "en")
      const langMatch = file.name.match(/-([a-z]{2})\.vtt$/i)
      const language = langMatch ? langMatch[1].toLowerCase() : "en"

      // Get language name
      const languageNames: Record<string, string> = {
        en: "English",
        es: "Spanish",
        fr: "French",
        de: "German",
        it: "Italian",
        pt: "Portuguese",
        ru: "Russian",
        zh: "Chinese",
        ja: "Japanese",
        ko: "Korean",
        ar: "Arabic",
        hi: "Hindi",
      }

      setSubtitles([
        ...subtitles,
        {
          file,
          language,
          label: languageNames[language] || language.toUpperCase(),
        },
      ])
    }
  }

  const removeSubtitle = (index: number) => {
    setSubtitles(subtitles.filter((_, i) => i !== index))
  }

  const removeThumbnail = () => {
    setThumbnail(null)
    setThumbnailFile(null)
  }

  const removeVideo = () => {
    if (videoPreviewUrl) {
      URL.revokeObjectURL(videoPreviewUrl)
    }
    setVideoPreviewUrl(null)
    setVideoFile(null)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter movie title" {...field} />
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
                    <Textarea placeholder="Enter movie description" className="min-h-[120px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
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
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Year" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 2h 15m" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="director"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Director</FormLabel>
                    <FormControl>
                      <Input placeholder="Director name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="cast"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cast</FormLabel>
                  <FormControl>
                    <Input placeholder="Comma separated list of actors" {...field} />
                  </FormControl>
                  <FormDescription>Enter actor names separated by commas</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video URL (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormDescription>External video URL (if not uploading a file)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-8">
            {/* Video Preview */}
            <div>
              <FormLabel className="block mb-2">Video</FormLabel>
              <div className="border rounded-md p-4">
                {videoPreviewUrl ? (
                  <div className="relative">
                    <VideoPlayer src={videoPreviewUrl} poster={thumbnail || undefined} title="Video Preview" />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={removeVideo}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="aspect-video bg-muted rounded-md flex flex-col items-center justify-center">
                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-4">Click to upload video file</p>
                    <Input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      id="video-upload"
                      onChange={handleVideoChange}
                    />
                    <label htmlFor="video-upload">
                      <Button type="button" variant="secondary" size="sm">
                        Choose File
                      </Button>
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail */}
            <div>
              <FormLabel className="block mb-2">Thumbnail</FormLabel>
              <div className="border rounded-md p-4">
                {thumbnail ? (
                  <div className="relative">
                    <div className="aspect-[2/3] relative rounded-md overflow-hidden">
                      <Image
                        src={thumbnail || "/placeholder.svg"}
                        alt="Thumbnail preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={removeThumbnail}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="aspect-[2/3] bg-muted rounded-md flex flex-col items-center justify-center">
                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-4">Click to upload thumbnail</p>
                    <Input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="thumbnail-upload"
                      onChange={handleThumbnailChange}
                    />
                    <label htmlFor="thumbnail-upload">
                      <Button type="button" variant="secondary" size="sm">
                        Choose File
                      </Button>
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Subtitles */}
            <div>
              <FormLabel className="block mb-2">Subtitles</FormLabel>
              <div className="border rounded-md p-4">
                <div className="space-y-4">
                  {subtitles.length > 0 ? (
                    <div className="space-y-2">
                      {subtitles.map((subtitle, index) => (
                        <div key={index} className="flex items-center justify-between bg-muted p-2 rounded-md">
                          <div>
                            <p className="text-sm font-medium">{subtitle.label}</p>
                            <p className="text-xs text-muted-foreground">{subtitle.file.name}</p>
                          </div>
                          <Button type="button" variant="ghost" size="icon" onClick={() => removeSubtitle(index)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-2">No subtitles added</p>
                  )}

                  <div className="flex justify-center">
                    <Input
                      type="file"
                      accept=".vtt"
                      className="hidden"
                      id="subtitle-upload"
                      onChange={handleSubtitleAdd}
                    />
                    <label htmlFor="subtitle-upload">
                      <Button type="button" variant="outline" size="sm">
                        Add Subtitle File (.vtt)
                      </Button>
                    </label>
                  </div>

                  <p className="text-xs text-muted-foreground text-center">
                    Subtitle files should be in WebVTT format (.vtt) with language code in filename (e.g.,
                    subtitle-en.vtt)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-end">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/movies")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isUploading}>
            {isUploading ? "Saving..." : initialData ? "Update Movie" : "Add Movie"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

