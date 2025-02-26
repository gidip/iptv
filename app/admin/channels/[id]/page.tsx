import { notFound } from "next/navigation"
import type { Metadata } from "next"

import { getChannelById } from "@/lib/actions/channel-actions"
import { ChannelForm } from "@/components/admin/channels/channel-form"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Edit Channel",
  description: "Edit an existing channel",
}

export default async function EditChannelPage({ params }: { params: { id: string } }) {
  const { data: channel } = (await getChannelById(params.id)) || { data: null }

  if (!channel) {
    notFound()
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <Heading title="Edit Channel" description="Update an existing channel" />
      <Separator />
      <ChannelForm initialData={channel} />
    </div>
  )
}

