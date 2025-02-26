import type { Metadata } from "next"
import { LiveStreamingChannelForm } from "@/components/admin/live-stream/live-streaming-channel-form"

export const metadata: Metadata = {
  title: "Add Live Streaming Channel",
  description: "Add a new live streaming channel",
}

export default function NewLiveStreamingChannelPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <LiveStreamingChannelForm />
    </div>
  )
}

