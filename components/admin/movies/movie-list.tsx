"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Edit, Trash2, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"

// Mock data for demonstration
const mockMovies = [
  {
    id: "1",
    title: "The Adventure Begins",
    category: "Adventure",
    thumbnail: "/placeholder.svg?height=100&width=100",
    duration: "2h 15m",
    year: 2023,
    views: 1245,
  },
  {
    id: "2",
    title: "Mystery of the Lost City",
    category: "Mystery",
    thumbnail: "/placeholder.svg?height=100&width=100",
    duration: "1h 58m",
    year: 2022,
    views: 987,
  },
  {
    id: "3",
    title: "Laugh Out Loud",
    category: "Comedy",
    thumbnail: "/placeholder.svg?height=100&width=100",
    duration: "1h 45m",
    year: 2023,
    views: 2341,
  },
  {
    id: "4",
    title: "Galactic Warriors",
    category: "Science Fiction",
    thumbnail: "/placeholder.svg?height=100&width=100",
    duration: "2h 30m",
    year: 2021,
    views: 1876,
  },
  {
    id: "5",
    title: "Family Reunion",
    category: "Family",
    thumbnail: "/placeholder.svg?height=100&width=100",
    duration: "1h 52m",
    year: 2022,
    views: 1032,
  },
]

export function MovieList() {
  const [movies, setMovies] = useState(mockMovies)
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  // Filter movies based on search term
  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Handle movie deletion
  const handleDelete = async (id: string) => {
    try {
      // In a real application, this would call the server action
      // await deleteMovie(id)

      // For now, just update the UI
      setMovies(movies.filter((movie) => movie.id !== id))

      toast({
        title: "Movie deleted",
        description: "The movie has been successfully deleted.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the movie. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search movies..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setMovies([...movies].sort((a, b) => a.title.localeCompare(b.title)))}>
              Sort by Title
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setMovies([...movies].sort((a, b) => b.year - a.year))}>
              Sort by Year (Newest)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setMovies([...movies].sort((a, b) => b.views - a.views))}>
              Sort by Views
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Thumbnail</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Views</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => (
                <TableRow key={movie.id}>
                  <TableCell>
                    <div className="relative w-12 h-12 rounded overflow-hidden">
                      <Image
                        src={movie.thumbnail || "/placeholder.svg"}
                        alt={movie.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{movie.title}</TableCell>
                  <TableCell>{movie.category}</TableCell>
                  <TableCell>{movie.year}</TableCell>
                  <TableCell>{movie.duration}</TableCell>
                  <TableCell>{movie.views.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/movies/edit/${movie.id}`}>
                        <Button variant="outline" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="outline" size="icon" onClick={() => handleDelete(movie.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No movies found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

