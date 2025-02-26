import { Heading } from "@/components/ui/heading"
import { MovieList } from "@/components/admin/movies/movie-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"

export default function MoviesPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Heading>Movies Management</Heading>
        <Link href="/admin/movies/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Movie
          </Button>
        </Link>
      </div>

      <MovieList />
    </div>
  )
}

