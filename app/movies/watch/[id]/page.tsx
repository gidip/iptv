import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { VideoPlayer } from "@/components/video-player/video-player"

// This function would fetch a movie by ID from your database
async function getMovieById(id: string) {
  // In a real application, this would be a database query
  // For now, we'll return mock data

  // Mock data for demonstration
  const movies = [
    {
      id: "1",
      title: "The Adventure Begins",
      category: "Adventure",
      thumbnail: "/placeholder.svg?height=400&width=600",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", // Sample video
      duration: "2h 15m",
      year: 2023,
      description:
        "Follow the journey of a group of explorers as they discover a hidden world filled with wonders and dangers.",
      director: "Jane Smith",
      cast: ["Actor One", "Actor Two", "Actor Three"],
      subtitles: [
        {
          src: "#", // In a real app, this would be a URL to a WebVTT file
          label: "English",
          language: "en",
        },
        {
          src: "#",
          label: "Spanish",
          language: "es",
        },
      ],
    },
    {
      id: "2",
      title: "Mystery of the Lost City",
      category: "Mystery",
      thumbnail: "/placeholder.svg?height=400&width=600",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", // Sample video
      duration: "1h 58m",
      year: 2022,
      description:
        "A detective uncovers secrets of an ancient civilization while investigating a murder in a remote archaeological site.",
      director: "John Doe",
      cast: ["Actor Four", "Actor Five", "Actor Six"],
      subtitles: [
        {
          src: "#",
          label: "English",
          language: "en",
        },
      ],
    },
  ]

  return movies.find((movie) => movie.id === id)
}

export default async function MoviePage({ params }: { params: { id: string } }) {
  const movie = await getMovieById(params.id)

  if (!movie) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/movies" className="inline-flex items-center mb-6 text-primary hover:underline">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Movies
      </Link>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {/* Video Player */}
          <VideoPlayer src={movie.videoUrl} poster={movie.thumbnail} title={movie.title} subtitles={movie.subtitles} />

          <div className="mt-6">
            <Heading>{movie.title}</Heading>
            <div className="flex gap-4 text-muted-foreground mt-2">
              <span>{movie.year}</span>
              <span>{movie.duration}</span>
              <span>{movie.category}</span>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <p className="text-muted-foreground">{movie.description}</p>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Director</h3>
              <p className="text-muted-foreground">{movie.director}</p>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Cast</h3>
              <div className="flex flex-wrap gap-2">
                {movie.cast.map((actor) => (
                  <span key={actor} className="bg-muted px-3 py-1 rounded-full text-sm">
                    {actor}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="aspect-[2/3] relative rounded-lg overflow-hidden">
            <Image src={movie.thumbnail || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />
          </div>

          <div className="mt-6">
            <Button className="w-full">Add to Watchlist</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

