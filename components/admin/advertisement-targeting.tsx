"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Search } from "lucide-react"

interface AdvertisementTargetingProps {
  selectedChannels: string[]
  selectedVideos: string[]
  onChannelsChange: (channels: string[]) => void
  onVideosChange: (videos: string[]) => void
}

// Mock data for channels and videos
const mockChannels = [
  { id: "1", name: "Sports Central", category: "sports" },
  { id: "2", name: "News 24", category: "news" },
  { id: "3", name: "Movie Central", category: "entertainment" },
  { id: "4", name: "Documentary Channel", category: "entertainment" },
  { id: "5", name: "Football TV", category: "sports" },
  { id: "6", name: "Business News", category: "news" },
  { id: "7", name: "Comedy Central", category: "entertainment" },
  { id: "8", name: "Tech Today", category: "news" },
]

const mockVideos = [
  { id: "1", name: "Football Match Highlights", channel: "Sports Central" },
  { id: "2", name: "Morning News Broadcast", channel: "News 24" },
  { id: "3", name: "New Movie Trailer", channel: "Movie Central" },
  { id: "4", name: "Wildlife Documentary", channel: "Documentary Channel" },
  { id: "5", name: "Premier League Recap", channel: "Football TV" },
  { id: "6", name: "Stock Market Analysis", channel: "Business News" },
  { id: "7", name: "Comedy Show Episode 5", channel: "Comedy Central" },
  { id: "8", name: "Tech Review: Latest Gadgets", channel: "Tech Today" },
]

export function AdvertisementTargeting({
  selectedChannels,
  selectedVideos,
  onChannelsChange,
  onVideosChange,
}: AdvertisementTargetingProps) {
  const [channelSearch, setChannelSearch] = useState("")
  const [videoSearch, setVideoSearch] = useState("")

  const filteredChannels = mockChannels.filter((channel) =>
    channel.name.toLowerCase().includes(channelSearch.toLowerCase()),
  )

  const filteredVideos = mockVideos.filter((video) => video.name.toLowerCase().includes(videoSearch.toLowerCase()))

  const handleChannelToggle = (channelId: string) => {
    if (selectedChannels.includes(channelId)) {
      onChannelsChange(selectedChannels.filter((id) => id !== channelId))
    } else {
      onChannelsChange([...selectedChannels, channelId])
    }
  }

  const handleVideoToggle = (videoId: string) => {
    if (selectedVideos.includes(videoId)) {
      onVideosChange(selectedVideos.filter((id) => id !== videoId))
    } else {
      onVideosChange([...selectedVideos, videoId])
    }
  }

  return (
    <Tabs defaultValue="channels" className="w-full">
      <TabsList>
        <TabsTrigger value="channels">Channels</TabsTrigger>
        <TabsTrigger value="videos">Videos</TabsTrigger>
      </TabsList>

      <TabsContent value="channels" className="space-y-4 pt-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search channels..."
            className="pl-8"
            value={channelSearch}
            onChange={(e) => setChannelSearch(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {filteredChannels.map((channel) => (
            <div key={channel.id} className="flex items-center space-x-2 border p-2 rounded-md">
              <Checkbox
                id={`channel-${channel.id}`}
                checked={selectedChannels.includes(channel.id)}
                onCheckedChange={() => handleChannelToggle(channel.id)}
              />
              <Label htmlFor={`channel-${channel.id}`} className="flex-1 cursor-pointer">
                <div>{channel.name}</div>
                <div className="text-xs text-muted-foreground capitalize">{channel.category}</div>
              </Label>
            </div>
          ))}
        </div>

        {filteredChannels.length === 0 && (
          <div className="text-center py-4 text-muted-foreground">No channels found</div>
        )}
      </TabsContent>

      <TabsContent value="videos" className="space-y-4 pt-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search videos..."
            className="pl-8"
            value={videoSearch}
            onChange={(e) => setVideoSearch(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {filteredVideos.map((video) => (
            <div key={video.id} className="flex items-center space-x-2 border p-2 rounded-md">
              <Checkbox
                id={`video-${video.id}`}
                checked={selectedVideos.includes(video.id)}
                onCheckedChange={() => handleVideoToggle(video.id)}
              />
              <Label htmlFor={`video-${video.id}`} className="flex-1 cursor-pointer">
                <div>{video.name}</div>
                <div className="text-xs text-muted-foreground">{video.channel}</div>
              </Label>
            </div>
          ))}
        </div>

        {filteredVideos.length === 0 && <div className="text-center py-4 text-muted-foreground">No videos found</div>}
      </TabsContent>
    </Tabs>
  )
}

