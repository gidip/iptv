"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export default function SeedPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  async function seedDatabase() {
    setStatus("loading")
    setMessage("Seeding database...")
    setError("")

    try {
      const response = await fetch("/api/seed-db", {
        method: "POST",
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage(data.message || "Database seeded successfully!")
      } else {
        setStatus("error")
        setError(data.error || "Failed to seed database")
      }
    } catch (err) {
      setStatus("error")
      setError("An unexpected error occurred. Please check the console for details.")
      console.error("Seed error:", err)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Database Seed Tool</CardTitle>
          <CardDescription>
            This tool will populate your database with initial data for the IPTV application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {status === "success" && (
            <Alert className="mb-4 bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">Success</AlertTitle>
              <AlertDescription className="text-green-700">{message}</AlertDescription>
            </Alert>
          )}

          {status === "error" && (
            <Alert className="mb-4 bg-red-50 border-red-200">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertTitle className="text-red-800">Error</AlertTitle>
              <AlertDescription className="text-red-700">{error}</AlertDescription>
            </Alert>
          )}

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
          <Button onClick={seedDatabase} disabled={status === "loading"} className="w-full">
            {status === "loading" ? "Seeding Database..." : "Seed Database"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

