import { Heading } from "@/components/ui/heading"
import { MovieForm } from "@/components/admin/movies/movie-form"

export default function AddMoviePage() {
  return (
    <div className="p-6">
      <Heading>Add New Movie</Heading>
      <div className="mt-6">
        <MovieForm />
      </div>
    </div>
  )
}

