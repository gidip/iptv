export interface Channel {
  id: string
  name: string
  description: string
  logo: string
  streamUrl: string
  category: string
  isLive: boolean
  featured: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

export interface ChannelCategory {
  id: string
  name: string
  slug: string
  description?: string
  order: number
}

export interface ChannelFormData {
  name: string
  description: string
  logo: string
  streamUrl: string
  category: string
  isLive: boolean
  featured: boolean
}

