import type { Metadata } from "next"

import { LiveStreamForm } from "@/components/admin/live-streams/live-stream-form"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Add Live Stream",
  description: "Add a new live streaming channel",
}

export default function NewLiveStreamPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <Heading title="Add Live Stream" description="Add a new live streaming channel" />
      <Separator />
      <LiveStreamForm />
    </div>
  )
}

