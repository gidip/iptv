import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

import { getChannels, getChannelCategories } from "@/lib/actions/channel-actions"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Live Streams",
  description: "Watch live streams from around the world",
}

export default async function LiveStreamsPage() {
  const { data: channels = [] } = (await getChannels({ isLive: true })) || { data: [] }
  const { data: categories = [] } = (await getChannelCategories()) || { data: [] }

  return (
    <div className="container py-8">
      <Heading>Live Streams</Heading>
      <p className="text-muted-foreground mt-2">Watch live streams from around the world.</p>

      <Separator className="my-6" />

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Link href="/live-streams">
          <Badge variant="outline" className="cursor-pointer hover:bg-accent">
            All Streams
          </Badge>
        </Link>
        {categories.map((category) => (
          <Link key={category.id} href={`/live-streams?category=${category.slug}`}>
            <Badge variant="outline" className="cursor-pointer hover:bg-accent">
              {category.name}
            </Badge>
          </Link>
        ))}
      </div>

      {/* Featured Streams */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Featured Streams</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {channels
            .filter((channel) => channel.featured)
            .map((channel) => (
              <Link key={channel.id} href={`/channels/${channel.id}`}>
                <div className="group border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video relative bg-muted">
                    <Image
                      src={channel.logo || "/placeholder.svg?height=200&width=300"}
                      alt={channel.name}
                      fill
                      className="object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">LIVE</Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium group-hover:text-primary transition-colors">{channel.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{channel.description}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <Badge variant="outline">{channel.category}</Badge>
                      <Button size="sm" className="ml-auto">
                        Watch Now
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>

      {/* All Live Streams */}
      <h2 className="text-xl font-semibold mb-4">All Live Streams</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {channels.map((channel) => (
          <Link key={channel.id} href={`/channels/${channel.id}`}>
            <div className="group border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video relative bg-muted">
                <Image
                  src={channel.logo || "/placeholder.svg?height=200&width=300"}
                  alt={channel.name}
                  fill
                  className="object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">LIVE</Badge>
              </div>
              <div className="p-4">
                <h3 className="font-medium group-hover:text-primary transition-colors">{channel.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{channel.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <Badge variant="outline">{channel.category}</Badge>
                  <Button size="sm" className="ml-auto">
                    Watch Now
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {channels.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No live streams found.</p>
        </div>
      )}
    </div>
  )
}

