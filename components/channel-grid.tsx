import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { getChannelsByCategory } from "@/lib/channels"

interface ChannelGridProps {
  category: string
}

export function ChannelGrid({ category }: ChannelGridProps) {
  const channels = getChannelsByCategory(category)

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {channels.map((channel) => (
        <Link key={channel.id} href={`/watch/${channel.id}`}>
          <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardContent className="p-0 relative">
              <div className="aspect-video relative">
                <Image src={channel.thumbnail || "/placeholder.svg"} alt={channel.name} fill className="object-cover" />
              </div>
              <div className="p-3">
                <h3 className="font-medium line-clamp-1">{channel.name}</h3>
                <p className="text-xs text-muted-foreground">{channel.category}</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

