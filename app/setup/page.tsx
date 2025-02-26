import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SetupPage() {
  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Database Setup</CardTitle>
          <CardDescription>Set up your database tables and seed initial data</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            This will create all necessary tables and seed them with initial data for your IPTV application.
          </p>
          <p className="text-sm text-muted-foreground">
            Make sure your MySQL database connection details are correctly set in your environment variables.
          </p>
        </CardContent>
        <CardFooter>
          <form action="/setup/run" method="POST" className="w-full">
            <Button type="submit" className="w-full">
              Set Up Database
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}

