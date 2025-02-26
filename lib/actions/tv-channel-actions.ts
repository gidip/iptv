import { db } from "@/lib/db"
import type { TVChannel } from "@/types/tv-channel"
import { v4 as uuidv4 } from "uuid"

export async function getTVChannels(): Promise<TVChannel[]> {
  try {
    const channels = await db.query(`SELECT * FROM tv_channels ORDER BY name ASC`)
    return channels || []
  } catch (error) {
    console.error("Failed to fetch TV channels:", error)
    return []
  }
}

export async function getFeaturedTVChannels(limit = 10): Promise<TVChannel[]> {
  try {
    const channels = await db.query(`SELECT * FROM tv_channels WHERE featured = TRUE ORDER BY name ASC LIMIT ?`, [
      limit,
    ])
    return channels || []
  } catch (error) {
    console.error("Failed to fetch featured TV channels:", error)
    return []
  }
}

export async function getTVChannelBySlug(slug: string): Promise<TVChannel | null> {
  try {
    const channels = await db.query(`SELECT * FROM tv_channels WHERE slug = ?`, [slug])
    return channels && channels.length > 0 ? channels[0] : null
  } catch (error) {
    console.error(`Failed to fetch TV channel with slug ${slug}:`, error)
    return null
  }
}

export async function getTVChannelById(id: string): Promise<TVChannel | null> {
  try {
    const channels = await db.query(`SELECT * FROM tv_channels WHERE id = ?`, [id])
    return channels && channels.length > 0 ? channels[0] : null
  } catch (error) {
    console.error(`Failed to fetch TV channel with id ${id}:`, error)
    return null
  }
}

export async function createTVChannel(
  channel: Omit<TVChannel, "id" | "created_at" | "updated_at">,
): Promise<TVChannel | null> {
  try {
    const id = uuidv4()
    await db.query(
      `INSERT INTO tv_channels (id, name, slug, logo_url, description, video_url, content, featured) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        channel.name,
        channel.slug,
        channel.logo_url,
        channel.description,
        channel.video_url,
        channel.content,
        channel.featured,
      ],
    )

    return {
      id,
      ...channel,
      created_at: new Date(),
      updated_at: new Date(),
    }
  } catch (error) {
    console.error("Failed to create TV channel:", error)
    return null
  }
}

export async function updateTVChannel(id: string, channel: Partial<TVChannel>): Promise<boolean> {
  try {
    const fields = Object.keys(channel).filter((key) => key !== "id" && key !== "created_at" && key !== "updated_at")

    if (fields.length === 0) return false

    const setClause = fields.map((field) => `${field} = ?`).join(", ")
    const values = fields.map((field) => channel[field as keyof typeof channel])

    await db.query(`UPDATE tv_channels SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`, [...values, id])

    return true
  } catch (error) {
    console.error(`Failed to update TV channel with id ${id}:`, error)
    return false
  }
}

export async function deleteTVChannel(id: string): Promise<boolean> {
  try {
    await db.query(`DELETE FROM tv_channels WHERE id = ?`, [id])
    return true
  } catch (error) {
    console.error(`Failed to delete TV channel with id ${id}:`, error)
    return false
  }
}

