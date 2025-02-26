import type { Channel } from "@/types"

// Sample channel data
const channels: Channel[] = [
  {
    id: "1",
    name: "Sports Central",
    description: "24/7 sports coverage from around the world",
    category: "sports",
    tags: ["sports", "live", "football", "basketball"],
    thumbnail: "/placeholder.svg?height=720&width=1280",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  },
  {
    id: "2",
    name: "News 24",
    description: "Breaking news and current events from around the globe",
    category: "news",
    tags: ["news", "politics", "current events"],
    thumbnail: "/placeholder.svg?height=720&width=1280",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  },
  {
    id: "3",
    name: "Movie Central",
    description: "The best movies from all genres",
    category: "entertainment",
    tags: ["movies", "cinema", "entertainment"],
    thumbnail: "/placeholder.svg?height=720&width=1280",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  },
  {
    id: "4",
    name: "Documentary Channel",
    description: "Fascinating documentaries on nature, history, and science",
    category: "entertainment",
    tags: ["documentaries", "educational", "nature"],
    thumbnail: "/placeholder.svg?height=720&width=1280",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  },
  {
    id: "5",
    name: "Football TV",
    description: "All football, all the time",
    category: "sports",
    tags: ["sports", "football", "soccer"],
    thumbnail: "/placeholder.svg?height=720&width=1280",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  },
  {
    id: "6",
    name: "Business News",
    description: "Financial news and market updates",
    category: "news",
    tags: ["business", "finance", "markets"],
    thumbnail: "/placeholder.svg?height=720&width=1280",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  },
  {
    id: "7",
    name: "Comedy Central",
    description: "Laugh out loud with the best comedy shows",
    category: "entertainment",
    tags: ["comedy", "sitcoms", "stand-up"],
    thumbnail: "/placeholder.svg?height=720&width=1280",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  },
  {
    id: "8",
    name: "Tech Today",
    description: "The latest in technology and gadgets",
    category: "news",
    tags: ["technology", "gadgets", "reviews"],
    thumbnail: "/placeholder.svg?height=720&width=1280",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  },
  {
    id: "9",
    name: "Basketball Zone",
    description: "NBA and international basketball coverage",
    category: "sports",
    tags: ["sports", "basketball", "NBA"],
    thumbnail: "/placeholder.svg?height=720&width=1280",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  },
  {
    id: "10",
    name: "Music TV",
    description: "Music videos and performances from top artists",
    category: "entertainment",
    tags: ["music", "videos", "concerts"],
    thumbnail: "/placeholder.svg?height=720&width=1280",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  },
  {
    id: "11",
    name: "Science Channel",
    description: "Exploring the wonders of science and technology",
    category: "entertainment",
    tags: ["science", "educational", "technology"],
    thumbnail: "/placeholder.svg?height=720&width=1280",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  },
  {
    id: "12",
    name: "Tennis TV",
    description: "Grand slams and tennis tournaments from around the world",
    category: "sports",
    tags: ["sports", "tennis", "tournaments"],
    thumbnail: "/placeholder.svg?height=720&width=1280",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  },
]

// Featured channels (subset of all channels)
export const featuredChannels = channels.slice(0, 3)

// Recently watched channels (different subset)
export const recentlyWatched = [channels[4], channels[7], channels[2], channels[9], channels[5], channels[11]]

// Get all channels
export const getAllChannels = () => channels

// Get channel by ID
export const getChannelById = (id: string) => channels.find((channel) => channel.id === id) || null

// Get channels by category
export const getChannelsByCategory = (category: string) => {
  if (category === "all") {
    return channels
  }
  return channels.filter((channel) => channel.category === category)
}

