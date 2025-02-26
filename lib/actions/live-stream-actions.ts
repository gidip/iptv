"use server"

import { revalidatePath } from "next/cache"
import { query, querySingle } from "@/lib/db"
import type { LiveStreamPage } from "@/types/live-stream-page"

export async function getLiveStreamPage(): Promise<LiveStreamPage | null> {
  return await querySingle<LiveStreamPage>("SELECT * FROM live_stream_page LIMIT 1")
}

export async function updateLiveStreamPage(data: Partial<LiveStreamPage>): Promise<void> {
  const current = await getLiveStreamPage()

  if (!current) {
    await query("INSERT INTO live_stream_page (title, content, video_url) VALUES (?, ?, ?)", [
      data.title || "Live Stream",
      data.content || "",
      data.videoUrl || "",
    ])
  } else {
    const updates: string[] = []
    const values: any[] = []

    if (data.title !== undefined) {
      updates.push("title = ?")
      values.push(data.title)
    }

    if (data.content !== undefined) {
      updates.push("content = ?")
      values.push(data.content)
    }

    if (data.videoUrl !== undefined) {
      updates.push("video_url = ?")
      values.push(data.videoUrl)
    }

    if (updates.length > 0) {
      values.push(current.id)
      await query(`UPDATE live_stream_page SET ${updates.join(", ")} WHERE id = ?`, values)
    }
  }

  revalidatePath("/live-stream")
  revalidatePath("/admin/live-stream")
}

