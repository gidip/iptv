"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { VideoPlayer } from "@/components/video-player"
import { getChannelById } from "@/lib/channels"
import type { Channel } from "@/types"

export default function WatchPage() {
  const router = useRouter()
  const { id } = useParams()
  const [channel, setChannel] = useState<Channel | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (id) {
      const channelData = getChannelById(id as string)
      setChannel(channelData)
      setIsLoading(false)
    }
  }, [id])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4">Loading channel...</p>
        </div>
      </div>
    )
  }

  if (!channel) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Channel not found</h2>
          <Button variant="outline" className="mt-4" onClick={() => router.push("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to channels
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">{channel.name}</h1>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-5xl">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <VideoPlayer streamUrl={channel.streamUrl} />
            </CardContent>
          </Card>

          <div className="mt-6">
            <h2 className="text-2xl font-bold">{channel.name}</h2>
            <p className="mt-2 text-muted-foreground">{channel.description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {channel.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

