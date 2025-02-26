import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getStreamingServiceBySlug } from "@/lib/actions/streaming-service-actions"

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const service = await getStreamingServiceBySlug(params.slug)

  if (!service) {
    return {
      title: "Streaming Service Not Found",
      description: "The requested streaming service could not be found.",
    }
  }

  return {
    title: service.name,
    description: service.description,
  }
}

export default async function StreamingServicePage({ params }: PageProps) {
  const service = await getStreamingServiceBySlug(params.slug)

  if (!service) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{service.name}</h1>
        {service.description && <p className="text-gray-600 mb-6">{service.description}</p>}
        {service.videoUrl && (
          <div className="aspect-video mb-6">
            <video src={service.videoUrl} controls className="w-full h-full rounded-lg" />
          </div>
        )}
        {service.content && <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: service.content }} />}
      </div>
    </div>
  )
}

