import type { Metadata } from "next"
import Link from "next/link"
import { Plus } from "lucide-react"

import { getChannels } from "@/lib/actions/channel-actions"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { ChannelsTableColumns } from "./columns"

export const metadata: Metadata = {
  title: "Channels Management",
  description: "Manage TV channels and live streams",
}

export default async function ChannelsPage() {
  const { data: channels = [] } = (await getChannels()) || { data: [] }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <Heading title="Channels Management" description="Manage your TV channels and live streams" />
        <Link href="/admin/channels/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Channel
          </Button>
        </Link>
      </div>
      <Separator />
      <DataTable columns={ChannelsTableColumns} data={channels} searchKey="name" />
    </div>
  )
}

