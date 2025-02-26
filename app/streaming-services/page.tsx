import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

import { getStreamingServices } from "@/lib/actions/streaming-service-actions"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Streaming Services",
  description: "Browse all streaming services",
}

export default async function StreamingServicesPage() {
  const { data: services = [] } = (await getStreamingServices()) || { data: [] }
  const featuredServices = services.filter((service) => service.featured)

  return (
    <div className="container py-8">
      <Heading>Streaming Services</Heading>
      <p className="text-muted-foreground mt-2">Browse all streaming services available on our platform.</p>

      <Separator className="my-6" />

      {/* Featured Services */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6">Featured Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredServices.map((service) => (
            <Link key={service.id} href={`/streaming-services/${service.slug}`}>
              <div className="group border rounded-lg overflow-hidden hover:shadow-md transition-shadow h-full">
                <div className="aspect-video relative bg-muted">
                  <Image
                    src={service.logo || "/placeholder.svg?height=200&width=300"}
                    alt={service.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-medium group-hover:text-primary transition-colors">{service.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-2">{service.description}</p>
                  <Button className="mt-4 w-full">View Details</Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* All Services */}
      <h2 className="text-2xl font-semibold mb-6">All Streaming Services</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {services.map((service) => (
          <Link key={service.id} href={`/streaming-services/${service.slug}`}>
            <div className="group border rounded-lg overflow-hidden hover:shadow-md transition-shadow h-full">
              <div className="aspect-square relative bg-muted">
                <Image
                  src={service.logo || "/placeholder.svg?height=100&width=100"}
                  alt={service.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="font-medium group-hover:text-primary transition-colors text-center">{service.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {services.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No streaming services found.</p>
        </div>
      )}
    </div>
  )
}

