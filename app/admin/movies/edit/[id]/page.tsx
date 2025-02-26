import { notFound } from "next/navigation"
import { Heading } from "@/components/ui/heading"
import { MovieForm } from "@/components/admin/movies/movie-form"

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
      videoUrl: "#", // This would be a real video URL in production
      duration: "2h 15m",
      year: 2023,
      description:
        "Follow the journey of a group of explorers as they discover a hidden world filled with wonders and dangers.",
      director: "Jane Smith",
      cast: ["Actor One", "Actor Two", "Actor Three"],
    },
    {
      id: "2",
      title: "Mystery of the Lost City",
      category: "Mystery",
      thumbnail: "/placeholder.svg?height=400&width=600",
      videoUrl: "#",
      duration: "1h 58m",
      year: 2022,
      description:
        "A detective uncovers secrets of an ancient civilization while investigating a murder in a remote archaeological site.",
      director: "John Doe",
      cast: ["Actor Four", "Actor Five", "Actor Six"],
    },
  ]

  return movies.find((movie) => movie.id === id)
}

export default async function EditMoviePage({ params }: { params: { id: string } }) {
  const movie = await getMovieById(params.id)

  if (!movie) {
    notFound()
  }

  return (
    <div className="p-6">
      <Heading>Edit Movie: {movie.title}</Heading>
      <div className="mt-6">
        <MovieForm initialData={movie} />
      </div>
    </div>
  )
}

