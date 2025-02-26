"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
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
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h2 className="text-2xl font-semibold mb-6">Something went wrong!</h2>
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
  )
}

