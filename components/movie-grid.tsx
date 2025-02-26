import Image from "next/image"
import Link from "next/link"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Movie {
  id: string
  title: string
  category: string
  thumbnail: string
  duration: string
  year?: number
}

interface MovieGridProps {
  movies: Movie[]
}

export function MovieGrid({ movies }: MovieGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.map((movie) => (
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
              <span>{movie.year}</span>
              <span>{movie.duration}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

