export interface Movie {
  id: string
  title: string
  slug: string
  description: string | null
  poster_url: string | null
  video_url: string | null
  release_date: Date | null
  duration: number | null
  featured: boolean
  created_at: Date
  updated_at: Date
}

export interface MovieCategory {
  id: string
  name: string
  slug: string
  description: string | null
  created_at: Date
  updated_at: Date
}

export interface MovieWithCategories extends Movie {
  categories: MovieCategory[]
}

