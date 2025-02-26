import Link from "next/link"
import Image from "next/image"
import { getLiveStreamingChannels } from "@/lib/actions/live-streaming-channel-actions"
import { getLiveStreamPage } from "@/lib/actions/live-stream-actions"
import { VideoPlayer } from "@/components/video-player/video-player"

export const metadata = {
  title: "Live Stream",
  description: "Watch our live streaming content",
}

export default async function LiveStreamPage() {
  const pageData = await getLiveStreamPage()
  const { data: channels = [] } = (await getLiveStreamingChannels()) || { data: [] }

  return (
    <div className="container py-8 max-w-7xl">
      <div className="space-y-8">
        <h1 className="text-3xl font-bold tracking-tight">{pageData.title}</h1>

        {pageData.videoUrl && (
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <VideoPlayer src={pageData.videoUrl} />
          </div>
        )}

        <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: pageData.content }} />

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Live Streaming Channels</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {channels.map((channel) => (
              <Link
                key={channel.id}
                href={`/live-stream/${channel.slug}`}
                className="group flex flex-col items-center p-4 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative w-16 h-16 mb-3">
                  <Image
                    src={channel.logo || "/placeholder.svg?height=100&width=100"}
                    alt={channel.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-sm font-medium text-center group-hover:text-primary transition-colors">
                  {channel.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

