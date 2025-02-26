"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
          <h1 className="text-4xl font-bold mb-4">Something went wrong!</h1>
          <p className="text-muted-foreground mb-8 max-w-md">
            We apologize for the inconvenience. Please try again or contact support if the problem persists.
          </p>
          <div className="flex gap-4">
            <Button onClick={() => reset()}>Try again</Button>
            <Button variant="outline" asChild>
              <a href="/">Return Home</a>
            </Button>
          </div>
          {error.digest && <p className="mt-8 text-sm text-muted-foreground">Error code: {error.digest}</p>}
        </div>
      </body>
    </html>
  )
}

