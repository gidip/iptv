import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Welcome to IPTV App</h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Your ultimate streaming solution for live TV, movies, and more.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/pricing">View Plans</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full aspect-video overflow-hidden rounded-xl border bg-muted/50">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-primary-foreground"
                    >
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Features</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Everything You Need</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Our platform offers a comprehensive set of features to enhance your streaming experience.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            {[
              {
                title: "Live TV",
                description: "Access thousands of live TV channels from around the world.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-10 w-10 mb-4 text-primary"
                  >
                    <rect width="20" height="15" x="2" y="7" rx="2" ry="2" />
                    <polyline points="17 2 12 7 7 2" />
                  </svg>
                ),
              },
              {
                title: "On-Demand Content",
                description: "Enjoy a vast library of movies and TV shows on demand.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-10 w-10 mb-4 text-primary"
                  >
                    <path d="m15 5 4 4-4 4" />
                    <path d="M4 4v7a4 4 0 0 0 4 4h11" />
                  </svg>
                ),
              },
              {
                title: "Multi-Device Support",
                description: "Stream on your TV, computer, tablet, or smartphone.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-10 w-10 mb-4 text-primary"
                  >
                    <rect width="16" height="12" x="4" y="2" rx="2" ry="2" />
                    <rect width="8" height="8" x="8" y="14" rx="2" ry="2" />
                  </svg>
                ),
              },
            ].map((feature, index) => (
              <Card key={index} className="flex flex-col items-center text-center">
                <CardHeader>
                  {feature.icon}
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

