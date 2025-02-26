import type { Metadata } from "next"
import Link from "next/link"
import { Plus } from "lucide-react"

import { getStreamingServices } from "@/lib/actions/streaming-service-actions"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { StreamingServicesTableColumns } from "./columns"

export const metadata: Metadata = {
  title: "Streaming Services Management",
  description: "Manage streaming services",
}

export default async function StreamingServicesPage() {
  const { data: services = [] } = (await getStreamingServices()) || { data: [] }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <Heading title="Streaming Services Management" description="Manage your streaming services" />
        <Link href="/admin/streaming-services/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Service
          </Button>
        </Link>
      </div>
      <Separator />
      <DataTable columns={StreamingServicesTableColumns} data={services} searchKey="name" />
    </div>
  )
}

