import { notFound } from "next/navigation"
import type { Metadata } from "next"

import { getStreamingServiceById } from "@/lib/actions/streaming-service-actions"
import { StreamingServiceForm } from "@/components/admin/streaming-services/streaming-service-form"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Edit Streaming Service",
  description: "Edit an existing streaming service",
}

export default async function EditStreamingServicePage({ params }: { params: { id: string } }) {
  const service = await getStreamingServiceById(params.id)

  if (!service) {
    notFound()
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <Heading title="Edit Streaming Service" description="Update an existing streaming service" />
      <Separator />
      <StreamingServiceForm initialData={service} />
    </div>
  )
}

