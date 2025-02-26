import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft } from "lucide-react"

import { getLiveStreamingChannelBySlug } from "@/lib/actions/live-streaming-channel-actions"
import { VideoPlayer } from "@/components/video-player/video-player"
import { Button } from "@/components/ui/button"

interface LiveStreamingChannelPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: LiveStreamingChannelPageProps) {
  const { data: channel } = (await getLiveStreamingChannelBySlug(params.slug)) || {}

  if (!channel) {
    return {
      title: "Channel Not Found",
      description: "The requested channel could not be found",
    }
  }

  return {
    title: channel.name,
    description: channel.description,
  }
}

export default async function LiveStreamingChannelPage({ params }: LiveStreamingChannelPageProps) {
  const { data: channel } = (await getLiveStreamingChannelBySlug(params.slug)) || {}

  if (!channel) {
    notFound()
  }

  return (
    <div className="container py-8 max-w-5xl">
      <Link href="/live-stream">
        <Button variant="ghost" className="mb-6 pl-0 flex items-center gap-1">
          <ChevronLeft className="h-4 w-4" />
          Back to Live Streaming Channels
        </Button>
      </Link>

      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative w-24 h-24 shrink-0">
            <Image
              src={channel.logo || "/placeholder.svg?height=100&width=100"}
              alt={channel.name}
              fill
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-center sm:text-left">{channel.name}</h1>
            <p className="text-muted-foreground mt-2 text-center sm:text-left">{channel.description}</p>
          </div>
        </div>

        {channel.videoUrl && (
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <VideoPlayer src={channel.videoUrl} />
          </div>
        )}

        <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: channel.content }} />
      </div>
    </div>
  )
}

