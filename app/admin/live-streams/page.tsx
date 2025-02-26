import type { Metadata } from "next"
import Link from "next/link"
import { Plus } from "lucide-react"

import { getChannels } from "@/lib/actions/channel-actions"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { LiveStreamsTableColumns } from "./columns"

export const metadata: Metadata = {
  title: "Live Streams Management",
  description: "Manage live streaming channels",
}

export default async function LiveStreamsPage() {
  const { data: channels = [] } = (await getChannels({ isLive: true })) || { data: [] }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <Heading title="Live Streams Management" description="Manage your live streaming channels" />
        <Link href="/admin/live-streams/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Live Stream
          </Button>
        </Link>
      </div>
      <Separator />
      <DataTable columns={LiveStreamsTableColumns} data={channels} searchKey="name" />
    </div>
  )
}

