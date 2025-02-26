import { notFound } from "next/navigation"
import type { Metadata } from "next"

import { getLiveStreamingChannelById } from "@/lib/actions/live-streaming-channel-actions"
import { LiveStreamingChannelForm } from "@/components/admin/live-stream/live-streaming-channel-form"

export const metadata: Metadata = {
  title: "Edit Live Streaming Channel",
  description: "Edit live streaming channel details",
}

interface EditLiveStreamingChannelPageProps {
  params: {
    id: string
  }
}

export default async function EditLiveStreamingChannelPage({ params }: EditLiveStreamingChannelPageProps) {
  const { data: channel } = (await getLiveStreamingChannelById(params.id)) || {}

  if (!channel) {
    notFound()
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <LiveStreamingChannelForm initialData={channel} />
    </div>
  )
}

