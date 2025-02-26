import type { Metadata } from "next"

import { StreamingServiceForm } from "@/components/admin/streaming-services/streaming-service-form"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Add Streaming Service",
  description: "Add a new streaming service",
}

export default function NewStreamingServicePage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <Heading title="Add Streaming Service" description="Add a new streaming service" />
      <Separator />
      <StreamingServiceForm />
    </div>
  )
}

