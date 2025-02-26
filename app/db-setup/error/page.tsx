import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

export default function ErrorPage({ searchParams }: { searchParams: { message?: string } }) {
  const message = searchParams.message || "An error occurred during database setup."

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 bg-red-100 p-3 rounded-full">
            <AlertCircle className="h-10 w-10 text-red-600" />
          </div>
          <CardTitle className="text-2xl text-red-700">Error</CardTitle>
          <CardDescription className="text-lg">Database Setup Failed</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="font-medium">Error details:</p>
            <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-800 overflow-auto max-h-40">
              {message}
            </div>
            <p>Please check your database connection settings and try again. Make sure:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Your MySQL host, username, password, and database name are correct</li>
              <li>Your database server allows remote connections</li>
              <li>The database user has sufficient privileges</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button asChild>
            <Link href="/db-setup">Try Again</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Go to Homepage</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

