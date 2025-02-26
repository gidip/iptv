import type { Metadata } from "next"
import { getLiveStreamPage } from "@/lib/actions/live-stream-actions"
import { LiveStreamPageForm } from "@/components/admin/live-stream/live-stream-page-form"

export const metadata: Metadata = {
  title: "Manage Live Stream Page",
  description: "Manage the live stream page content",
}

export default async function AdminLiveStreamPage() {
  const pageData = await getLiveStreamPage()

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Manage Live Stream Page</h1>
      </div>
      <div className="mt-8">
        <LiveStreamPageForm initialData={pageData} />
      </div>
    </div>
  )
}

