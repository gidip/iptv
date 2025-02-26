import { notFound } from "next/navigation"
import { MovieCategories } from "@/components/movie-categories"
import { MovieGrid } from "@/components/movie-grid"
import { Heading } from "@/components/ui/heading"

// List of valid categories (should match the ones in MovieCategories component)
const validCategories = [
  "family",
  "action",
  "animated",
  "documentaries",
  "science-fiction",
  "cartoons",
  "drama",
  "fantasy",
  "thriller",
  "mystery",
  "indian",
  "comedy",
  "horror",
  "adventure",
  "musical",
  "detective",
  "psychological",
  "romantic",
  "war",
  "crime",
  "history",
  "western",
  "local",
]

// This function would fetch movies for a specific category from your database
async function getMoviesByCategory(category: string) {
  // In a real application, this would be a database query
  // For now, we'll return mock data

  // Mock data for demonstration
  const movies = [
    {
      id: "1",
      title: "The Adventure Begins",
      category: "adventure",
      thumbnail: "/placeholder.svg?height=400&width=600",
      duration: "2h 15m",
      year: 2023,
    },
    {
      id: "2",
      title: "Mystery of the Lost City",
      category: "mystery",
      thumbnail: "/placeholder.svg?height=400&width=600",
      duration: "1h 58m",
      year: 2022,
    },
    {
      id: "3",
      title: "Laugh Out Loud",
      category: "comedy",
      thumbnail: "/placeholder.svg?height=400&width=600",
      duration: "1h 45m",
      year: 2023,
    },
    {
      id: "4",
      title: "Galactic Warriors",
      category: "science-fiction",
      thumbnail: "/placeholder.svg?height=400&width=600",
      duration: "2h 30m",
      year: 2021,
    },
    {
      id: "5",
      title: "Family Reunion",
      category: "family",
      thumbnail: "/placeholder.svg?height=400&width=600",
      duration: "1h 52m",
      year: 2022,
    },
    {
      id: "6",
      title: "The Haunting",
      category: "horror",
      thumbnail: "/placeholder.svg?height=400&width=600",
      duration: "1h 48m",
      year: 2023,
    },
  ]

  // Filter movies by category
  return movies.filter(
    (movie) =>
      movie.category === category ||
      // For compound categories like "science-fiction"
      movie.category.replace("-", " ") === category.replace("-", " "),
  )
}

// Helper function to format category name for display
function formatCategoryName(category: string) {
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const { category } = params

  // Check if the category is valid
  if (!validCategories.includes(category)) {
    notFound()
  }

  // Get movies for this category
  const movies = await getMoviesByCategory(category)
  const formattedCategory = formatCategoryName(category)

  return (
    <div className="container mx-auto px-4 py-8">
      <Heading>{formattedCategory} Movies</Heading>

      <div className="my-6">
        <MovieCategories />
      </div>

      {movies.length > 0 ? (
        <MovieGrid movies={movies} />
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No movies found in this category yet.</p>
        </div>
      )}
    </div>
  )
}

