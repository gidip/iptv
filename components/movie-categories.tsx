"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const categories = [
  "Family",
  "Action",
  "Animated",
  "Documentaries",
  "Science Fiction",
  "Cartoons",
  "Drama",
  "Fantasy",
  "Thriller",
  "Mystery",
  "Indian",
  "Comedy",
  "Horror",
  "Adventure",
  "Musical",
  "Detective",
  "Psychological",
  "Romantic",
  "War",
  "Crime",
  "History",
  "Western",
  "Local",
]

export function MovieCategories() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollAmount = 300
    const currentScroll = container.scrollLeft

    if (direction === "left") {
      container.scrollTo({
        left: currentScroll - scrollAmount,
        behavior: "smooth",
      })
    } else {
      container.scrollTo({
        left: currentScroll + scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const handleScroll = () => {
    const container = scrollContainerRef.current
    if (!container) return

    setShowLeftArrow(container.scrollLeft > 0)
    setShowRightArrow(container.scrollLeft < container.scrollWidth - container.clientWidth - 10)
  }

  return (
    <div className="relative">
      {showLeftArrow && (
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide gap-2 py-2 px-1"
        onScroll={handleScroll}
      >
        {categories.map((category) => (
          <Link key={category} href={`/movies/${category.toLowerCase().replace(/\s+/g, "-")}`}>
            <Button variant="secondary" className="whitespace-nowrap">
              {category}
            </Button>
          </Link>
        ))}
      </div>

      {showRightArrow && (
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}

