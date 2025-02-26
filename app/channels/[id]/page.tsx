import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { getChannelById } from "@/lib/actions/channel-actions"
import { VideoPlayer } from "@/components/video-player/video-player"
import { Heading } from "@/components/ui/heading"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { data: channel } = (await getChannelById(params.id)) || { data: null }

  if (!channel) {
    return {
      title: "Channel Not Found",
      description: "The requested channel could not be found.",
    }
  }

  return {
    title: channel.name,
    description: channel.description,
  }
}

export default async function ChannelPage({ params }: { params: { id: string } }) {
  const { data: channel } = (await getChannelById(params.id)) || { data: null }

  if (!channel) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/channels" className="inline-flex items-center mb-6 text-primary hover:underline">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Channels
      </Link>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {/* Video Player */}
          <VideoPlayer src={channel.streamUrl} poster={channel.logo} title={channel.name} />

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <Heading>{channel.name}</Heading>
              {channel.isLive && <Badge className="bg-red-500 hover:bg-red-600">LIVE</Badge>}
            </div>

            <div className="flex gap-4 text-muted-foreground mt-2">
              <Badge variant="outline">{channel.category}</Badge>
            </div>

            <Separator className="my-6" />

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">About This Channel</h3>
              <p className="text-muted-foreground">{channel.description}</p>
            </div>
          </div>
        </div>

        <div>
          <div className="aspect-square relative rounded-lg overflow-hidden">
            <Image src={channel.logo || "/placeholder.svg"} alt={channel.name} fill className="object-cover" />
          </div>

          <div className="mt-6 space-y-4">
            <Button className="w-full">Add to Favorites</Button>

            <Button variant="outline" className="w-full">
              Share Channel
            </Button>
          </div>

          <div className="mt-6 border rounded-lg p-4">
            <h3 className="font-medium mb-2">Channel Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category:</span>
                <span>{channel.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span>{channel.isLive ? "Live" : "On Demand"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

