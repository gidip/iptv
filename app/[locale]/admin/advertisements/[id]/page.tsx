"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { ArrowLeft, CalendarIcon, Clock, Save, Trash2 } from "lucide-react"
import { TimePickerDemo } from "@/components/time-picker"
import { AdvertisementTargeting } from "@/components/admin/advertisement-targeting"
import { AdvertisementPreview } from "@/components/admin/advertisement-preview"

interface Advertisement {
  id: string
  name: string
  description: string
  type: "video" | "banner" | "overlay"
  status: "active" | "scheduled" | "ended" | "draft"
  target: "all" | "specific"
  content: string
  startDate: Date
  endDate: Date
  startTime: string
  endTime: string
  showOnAllDays: boolean
  daysOfWeek: string[]
  targetedChannels: string[]
  targetedVideos: string[]
}

export default function EditAdvertisementPage() {
  const router = useRouter()
  const { id } = useParams()
  const isNew = id === "new"
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState<Advertisement>({
    id: "",
    name: "",
    description: "",
    type: "banner",
    status: "draft",
    target: "all",
    content: "",
    startDate: new Date(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    startTime: "00:00",
    endTime: "23:59",
    showOnAllDays: true,
    daysOfWeek: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    targetedChannels: [],
    targetedVideos: [],
  })

  useEffect(() => {
    if (isNew) {
      setIsLoading(false)
      return
    }

    // In a real app, fetch the advertisement data from API
    setTimeout(() => {
      if (id === "1") {
        setFormData({
          id: "1",
          name: "Summer Sale Promotion",
          description: "Video advertisement for our summer sale campaign",
          type: "video",
          status: "active",
          target: "all",
          content: "/placeholder.svg?height=720&width=1280",
          startDate: new Date("2023-06-01"),
          endDate: new Date("2023-08-31"),
          startTime: "08:00",
          endTime: "22:00",
          showOnAllDays: true,
          daysOfWeek: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
          targetedChannels: [],
          targetedVideos: [],
        })
      }
      setIsLoading(false)
    }, 500)
  }, [id, isNew])

  const handleChange = (field: keyof Advertisement, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, save the advertisement data to API
    console.log("Saving advertisement:", formData)
    router.push("/admin/advertisements")
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
        <Button variant="ghost" size="icon" onClick={() => router.push("/admin/advertisements")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">
          {isNew ? "Add New Advertisement" : `Edit Advertisement: ${formData.name}`}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Tabs defaultValue="details" className="w-full">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
            <TabsTrigger value="targeting">Targeting</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Advertisement Details</CardTitle>
                <CardDescription>Basic information about your advertisement.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Advertisement Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="Enter advertisement name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Advertisement Type</Label>
                    <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="banner">Banner</SelectItem>
                        <SelectItem value="overlay">Overlay</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    placeholder="Enter advertisement description"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Advertisement Content URL</Label>
                  <Input
                    id="content"
                    value={formData.content}
                    onChange={(e) => handleChange("content", e.target.value)}
                    placeholder="Enter URL for advertisement content"
                  />
                  <p className="text-sm text-muted-foreground">
                    Enter the URL for your advertisement image, video, or HTML content.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scheduling" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Advertisement Schedule</CardTitle>
                <CardDescription>Set when your advertisement should be displayed.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.startDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.startDate ? format(formData.startDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.startDate}
                          onSelect={(date) => date && handleChange("startDate", date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.endDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.endDate ? format(formData.endDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.endDate}
                          onSelect={(date) => date && handleChange("endDate", date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Start Time</Label>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <TimePickerDemo
                        value={formData.startTime}
                        onChange={(value) => handleChange("startTime", value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>End Time</Label>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <TimePickerDemo value={formData.endTime} onChange={(value) => handleChange("endTime", value)} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="show-all-days"
                      checked={formData.showOnAllDays}
                      onCheckedChange={(checked) => handleChange("showOnAllDays", checked)}
                    />
                    <Label htmlFor="show-all-days">Show on all days of the week</Label>
                  </div>

                  {!formData.showOnAllDays && (
                    <div className="space-y-2">
                      <Label>Days of Week</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
                          <div key={day} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={`day-${day}`}
                              checked={formData.daysOfWeek.includes(day)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  handleChange("daysOfWeek", [...formData.daysOfWeek, day])
                                } else {
                                  handleChange(
                                    "daysOfWeek",
                                    formData.daysOfWeek.filter((d) => d !== day),
                                  )
                                }
                              }}
                              className="rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <Label htmlFor={`day-${day}`} className="capitalize">
                              {day}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="targeting" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Advertisement Targeting</CardTitle>
                <CardDescription>Choose where your advertisement should appear.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Target Type</Label>
                  <Select value={formData.target} onValueChange={(value) => handleChange("target", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select targeting" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Content</SelectItem>
                      <SelectItem value="specific">Specific Content</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.target === "specific" && (
                  <AdvertisementTargeting
                    selectedChannels={formData.targetedChannels}
                    selectedVideos={formData.targetedVideos}
                    onChannelsChange={(channels) => handleChange("targetedChannels", channels)}
                    onVideosChange={(videos) => handleChange("targetedVideos", videos)}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Advertisement Preview</CardTitle>
                <CardDescription>Preview how your advertisement will appear.</CardDescription>
              </CardHeader>
              <CardContent>
                <AdvertisementPreview advertisement={formData} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between">
          {!isNew && (
            <Button variant="destructive" type="button">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Advertisement
            </Button>
          )}
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            {isNew ? "Create Advertisement" : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  )
}

