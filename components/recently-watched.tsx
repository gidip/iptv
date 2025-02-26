import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { recentlyWatched } from "@/lib/channels"

export function RecentlyWatched() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Recently Watched</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {recentlyWatched.map((channel) => (
          <Link key={channel.id} href={`/watch/${channel.id}`}>
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardContent className="p-0 relative">
                <div className="aspect-video relative">
                  <Image
                    src={channel.thumbnail || "/placeholder.svg"}
                    alt={channel.name}
                    fill
                    className="object-cover"
                  />
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
    </section>
  )
}

