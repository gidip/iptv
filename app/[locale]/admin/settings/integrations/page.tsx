"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Link2, LogIn, Settings2 } from "lucide-react"

export default function IntegrationsPage() {
  const [isConnected, setIsConnected] = useState(false)

  const handleGoogleConnect = () => {
    // Redirect to Google OAuth page
    // This will be implemented when Google OAuth is set up
    console.log("Google OAuth connection not implemented yet")
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Platform Integrations</h1>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
                  alt="Google"
                  className="h-6 w-6"
                />
                Google Integration
              </div>
              {isConnected ? (
                <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                  <CheckCircle2 className="mr-1 h-3 w-3" />
                  Connected
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">
                  Not Connected
                </Badge>
              )}
            </CardTitle>
            <CardDescription>
              Connect your Google account to enable authentication and other Google services.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">Authentication</h4>
                  <p className="text-sm text-muted-foreground">Enable Google Sign-In for your users.</p>
                </div>
                <Button variant={isConnected ? "outline" : "default"} onClick={handleGoogleConnect}>
                  {isConnected ? (
                    <>
                      <Settings2 className="mr-2 h-4 w-4" />
                      Configure
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" />
                      Connect Account
                    </>
                  )}
                </Button>
              </div>

              {isConnected && (
                <>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">API Access</h4>
                      <p className="text-sm text-muted-foreground">Manage API access and permissions.</p>
                    </div>
                    <Button variant="outline">
                      <Link2 className="mr-2 h-4 w-4" />
                      Manage
                    </Button>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Apple Sign In integration card commented out for future use */}
        {/*
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src="https://www.apple.com/favicon.ico"
                  alt="Apple"
                  className="h-6 w-6"
                />
                Apple Sign In
              </div>
              <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">
                Coming Soon
              </Badge>
            </CardTitle>
            <CardDescription>
              Allow users to sign in with their Apple ID.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Apple Sign In integration will be available soon.
            </p>
          </CardContent>
        </Card>
        */}
      </div>
    </div>
  )
}

