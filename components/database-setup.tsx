"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react"

export function DatabaseSetup() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const setupDatabase = async () => {
    try {
      setStatus("loading")
      setMessage("Setting up database...")

      // Simple fetch to test connection
      const testResponse = await fetch("/api/test-connection")
      const testData = await testResponse.json()

      if (!testData.success) {
        throw new Error(testData.error || "Failed to connect to database")
      }

      setMessage("Database connection successful. Creating tables...")

      // Create tables
      const tablesResponse = await fetch("/api/create-tables")
      const tablesData = await tablesResponse.json()

      if (!tablesData.success) {
        throw new Error(tablesData.error || "Failed to create tables")
      }

      setMessage("Tables created successfully. Seeding data...")

      // Seed data
      const seedResponse = await fetch("/api/seed-data")
      const seedData = await seedResponse.json()

      if (!seedData.success) {
        throw new Error(seedData.error || "Failed to seed data")
      }

      setStatus("success")
      setMessage("Database setup completed successfully!")
    } catch (error) {
      console.error("Setup error:", error)
      setStatus("error")
      setMessage(error instanceof Error ? error.message : "An unknown error occurred")
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Database Setup</CardTitle>
        <CardDescription>Set up your database tables and seed initial data</CardDescription>
      </CardHeader>
      <CardContent>
        {status === "success" && (
          <Alert className="bg-green-50 border-green-200 text-green-800 mb-4">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {status === "error" && (
          <Alert className="bg-red-50 border-red-200 text-red-800 mb-4">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        <p className="text-sm text-muted-foreground mb-4">
          This will create all necessary tables and seed them with initial data for your IPTV application.
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={setupDatabase} disabled={status === "loading"} className="w-full">
          {status === "loading" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Setting Up...
            </>
          ) : (
            "Set Up Database"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

