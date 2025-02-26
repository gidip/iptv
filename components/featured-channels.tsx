import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { featuredChannels } from "@/lib/channels"

export function FeaturedChannels() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Featured Channels</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {featuredChannels.map((channel) => (
          <Link key={channel.id} href={`/watch/${channel.id}`}>
            <Card className="overflow-hidden transition-all hover:shadow-lg">
              <CardContent className="p-0 relative">
                <div className="aspect-video relative">
                  <Image
                    src={channel.thumbnail || "/placeholder.svg"}
                    alt={channel.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-lg font-bold text-white">{channel.name}</h3>
                  <p className="text-sm text-white/80">{channel.category}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}

