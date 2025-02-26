import { seedDatabase } from "./actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function DbSetupPage() {
  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Database Setup Tool</CardTitle>
          <CardDescription>
            This tool will set up your database tables and seed initial data for the IPTV application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>This will create all necessary tables and seed them with initial data:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Live streaming channels (200+ channels)</li>
              <li>Live stream page content</li>
              <li>Database tables structure</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <form action={seedDatabase} className="w-full">
            <Button type="submit" className="w-full">
              Set Up Database
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}

