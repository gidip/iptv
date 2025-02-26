import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function SuccessPage({ searchParams }: { searchParams: { message?: string } }) {
  const message = searchParams.message || "Database setup completed successfully!"

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 bg-green-100 p-3 rounded-full">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-700">Success!</CardTitle>
          <CardDescription className="text-lg">{message}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>Your database has been set up successfully. You can now:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>View the live streaming channels on the Live Stream page</li>
              <li>Manage content through the admin panel</li>
              <li>Add more channels and content as needed</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button asChild>
            <Link href="/">Go to Homepage</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/live-stream">View Live Streams</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

