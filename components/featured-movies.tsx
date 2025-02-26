import Image from "next/image"
import Link from "next/link"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"

// This is a placeholder component that would be populated with real data
// from your database in a production environment
export function FeaturedMovies() {
  // Mock data for demonstration
  const featuredMovies = [
    {
      id: "1",
      title: "The Adventure Begins",
      category: "Adventure",
      thumbnail: "/placeholder.svg?height=400&width=600",
      duration: "2h 15m",
    },
    {
      id: "2",
      title: "Mystery of the Lost City",
      category: "Mystery",
      thumbnail: "/placeholder.svg?height=400&width=600",
      duration: "1h 58m",
    },
    {
      id: "3",
      title: "Laugh Out Loud",
      category: "Comedy",
      thumbnail: "/placeholder.svg?height=400&width=600",
      duration: "1h 45m",
    },
    {
      id: "4",
      title: "Galactic Warriors",
      category: "Science Fiction",
      thumbnail: "/placeholder.svg?height=400&width=600",
      duration: "2h 30m",
    },
    {
      id: "5",
      title: "Family Reunion",
      category: "Family",
      thumbnail: "/placeholder.svg?height=400&width=600",
      duration: "1h 52m",
    },
    {
      id: "6",
      title: "The Haunting",
      category: "Horror",
      thumbnail: "/placeholder.svg?height=400&width=600",
      duration: "1h 48m",
    },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold">Featured Movies</h3>
        <Link href="/movies" className="text-primary hover:underline">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {featuredMovies.map((movie) => (
          <div key={movie.id} className="group relative">
            <div className="aspect-[2/3] relative overflow-hidden rounded-lg">
              <Image
                src={movie.thumbnail || "/placeholder.svg"}
                alt={movie.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Link href={`/movies/watch/${movie.id}`}>
                  <Button size="icon" variant="secondary" className="rounded-full">
                    <Play className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <h4 className="font-medium truncate">{movie.title}</h4>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{movie.category}</span>
                <span>{movie.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

