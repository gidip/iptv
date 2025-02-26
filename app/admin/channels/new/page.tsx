import type { Metadata } from "next"

import { ChannelForm } from "@/components/admin/channels/channel-form"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Add Channel",
  description: "Add a new TV channel or live stream",
}

export default function NewChannelPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <Heading title="Add Channel" description="Add a new TV channel or live stream" />
      <Separator />
      <ChannelForm />
    </div>
  )
}

