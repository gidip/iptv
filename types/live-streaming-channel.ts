export interface LiveStreamingChannel {
  id: string
  name: string
  slug: string
  logoUrl?: string
  description?: string
  videoUrl?: string
  content?: string
  featured: boolean
  displayOrder: number
  createdAt: Date
  updatedAt: Date
}

