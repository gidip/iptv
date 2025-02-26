import { nanoid } from "nanoid"
import { executeQuery, executeQuerySingle, executeInsert, executeUpdate, executeDelete } from "@/lib/db"
import type { LiveStreamingChannel } from "@/types/live-streaming-channel"

export async function getLiveStreamingChannels(): Promise<LiveStreamingChannel[]> {
  return executeQuery<LiveStreamingChannel>("SELECT * FROM live_streaming_channels ORDER BY name ASC")
}

export async function getFeaturedLiveStreamingChannels(): Promise<LiveStreamingChannel[]> {
  return executeQuery<LiveStreamingChannel>(
    "SELECT * FROM live_streaming_channels WHERE featured = ? ORDER BY display_order ASC, name ASC",
    [true],
  )
}

export async function getLiveStreamingChannelById(id: string): Promise<LiveStreamingChannel | null> {
  return executeQuerySingle<LiveStreamingChannel>("SELECT * FROM live_streaming_channels WHERE id = ?", [id])
}

export async function getLiveStreamingChannelBySlug(slug: string): Promise<LiveStreamingChannel | null> {
  return executeQuerySingle<LiveStreamingChannel>("SELECT * FROM live_streaming_channels WHERE slug = ?", [slug])
}

export async function createLiveStreamingChannel(
  channel: Omit<LiveStreamingChannel, "id" | "createdAt" | "updatedAt">,
): Promise<LiveStreamingChannel> {
  const id = nanoid()
  await executeInsert(
    `INSERT INTO live_streaming_channels 
     (id, name, slug, logo_url, description, video_url, content, featured, display_order) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      channel.name,
      channel.slug,
      channel.logoUrl,
      channel.description,
      channel.videoUrl,
      channel.content,
      channel.featured,
      channel.displayOrder || 0,
    ],
  )

  const newChannel = await getLiveStreamingChannelById(id)
  if (!newChannel) throw new Error("Failed to create live streaming channel")
  return newChannel
}

export async function updateLiveStreamingChannel(
  id: string,
  channel: Partial<LiveStreamingChannel>,
): Promise<LiveStreamingChannel> {
  const currentChannel = await getLiveStreamingChannelById(id)
  if (!currentChannel) throw new Error("Live streaming channel not found")

  const updates = []
  const params = []

  if (channel.name !== undefined) {
    updates.push("name = ?")
    params.push(channel.name)
  }

  if (channel.slug !== undefined) {
    updates.push("slug = ?")
    params.push(channel.slug)
  }

  if (channel.logoUrl !== undefined) {
    updates.push("logo_url = ?")
    params.push(channel.logoUrl)
  }

  if (channel.description !== undefined) {
    updates.push("description = ?")
    params.push(channel.description)
  }

  if (channel.videoUrl !== undefined) {
    updates.push("video_url = ?")
    params.push(channel.videoUrl)
  }

  if (channel.content !== undefined) {
    updates.push("content = ?")
    params.push(channel.content)
  }

  if (channel.featured !== undefined) {
    updates.push("featured = ?")
    params.push(channel.featured)
  }

  if (channel.displayOrder !== undefined) {
    updates.push("display_order = ?")
    params.push(channel.displayOrder)
  }

  if (updates.length === 0) return currentChannel

  params.push(id)
  await executeUpdate(`UPDATE live_streaming_channels SET ${updates.join(", ")} WHERE id = ?`, params)

  const updatedChannel = await getLiveStreamingChannelById(id)
  if (!updatedChannel) throw new Error("Failed to update live streaming channel")
  return updatedChannel
}

export async function deleteLiveStreamingChannel(id: string): Promise<boolean> {
  const result = await executeDelete("DELETE FROM live_streaming_channels WHERE id = ?", [id])
  return result > 0
}

