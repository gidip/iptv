"use client"

import { useEffect, useState, useCallback } from "react"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import type { HealthCheckResult } from "@/lib/deployment-check"

export default function DeploymentTest() {
  const [status, setStatus] = useState<HealthCheckResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const checkStatus = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("/api/deployment-status")
      const data = await response.json()
      setStatus(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to check deployment status")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    checkStatus()
  }, [checkStatus])

  return (
    <div className="container max-w-3xl py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Deployment Status</h1>
        <Button onClick={checkStatus} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Checking
            </>
          ) : (
            "Check Again"
          )}
        </Button>
      </div>

      {error ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : status ? (
        <div className="space-y-6">
          <Alert variant={status.status === "healthy" ? "default" : "destructive"}>
            {status.status === "healthy" ? (
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <AlertTitle>Overall Status</AlertTitle>
            <AlertDescription>
              {status.status === "healthy" ? "All systems are operational" : "Some systems require attention"}
            </AlertDescription>
          </Alert>

          <div className="grid gap-4">
            <div className="rounded-lg border p-4">
              <h2 className="font-semibold mb-2">Database Connection</h2>
              {status.database.connected ? (
                <div className="text-sm text-green-600 flex items-center">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Connected successfully
                </div>
              ) : (
                <div className="text-sm text-destructive flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Connection failed: {status.database.error}
                </div>
              )}
            </div>

            <div className="rounded-lg border p-4">
              <h2 className="font-semibold mb-2">Environment Variables</h2>
              {status.environment.valid ? (
                <div className="text-sm text-green-600 flex items-center">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  All required variables are set
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-sm text-destructive flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Missing required variables:
                  </div>
                  <ul className="text-sm list-disc list-inside pl-4">
                    {status.environment.missing.map((variable) => (
                      <li key={variable}>{variable}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

