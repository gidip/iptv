export interface TVChannel {
  id: string
  name: string
  slug: string
  logo_url: string | null
  description: string | null
  video_url: string | null
  content: string | null
  featured: boolean
  created_at: Date
  updated_at: Date
}

