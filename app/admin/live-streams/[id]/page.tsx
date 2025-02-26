import { notFound } from "next/navigation"
import type { Metadata } from "next"

import { getChannelById } from "@/lib/actions/channel-actions"
import { LiveStreamForm } from "@/components/admin/live-streams/live-stream-form"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Edit Live Stream",
  description: "Edit an existing live stream",
}

export default async function EditLiveStreamPage({ params }: { params: { id: string } }) {
  const { data: channel } = (await getChannelById(params.id)) || { data: null }

  if (!channel) {
    notFound()
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <Heading title="Edit Live Stream" description="Update an existing live stream" />
      <Separator />
      <LiveStreamForm initialData={channel} />
    </div>
  )
}

