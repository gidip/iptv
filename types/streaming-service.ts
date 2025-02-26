export interface StreamingService {
  id: string
  name: string
  slug: string
  logoUrl?: string
  description?: string
  videoUrl?: string
  content?: string
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

export const streamingServiceSchema = {
  name: "required|string",
  logoUrl: "string|nullable",
  description: "string|nullable",
  videoUrl: "string|nullable",
  content: "string|nullable",
  featured: "boolean",
}

