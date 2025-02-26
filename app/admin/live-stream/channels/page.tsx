import type { Metadata } from "next"
import Link from "next/link"
import { Plus } from "lucide-react"

import { getLiveStreamingChannels } from "@/lib/actions/live-streaming-channel-actions"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { LiveStreamingChannelsTableColumns } from "./columns"

export const metadata: Metadata = {
  title: "Live Streaming Channels Management",
  description: "Manage live streaming channels",
}

export default async function LiveStreamingChannelsPage() {
  const { data: channels = [] } = (await getLiveStreamingChannels()) || { data: [] }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <Heading title="Live Streaming Channels" description="Manage your live streaming channels" />
        <Link href="/admin/live-stream/channels/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Channel
          </Button>
        </Link>
      </div>
      <Separator />
      <DataTable columns={LiveStreamingChannelsTableColumns} data={channels} searchKey="name" />
    </div>
  )
}

