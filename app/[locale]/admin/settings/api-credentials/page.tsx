"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

const apiCredentialsSchema = z.object({
  recaptcha: z.object({
    siteKey: z.string().min(1, "Site Key is required"),
    secretKey: z.string().min(1, "Secret Key is required"),
  }),
  google: z.object({
    clientId: z.string().min(1, "Client ID is required"),
    clientSecret: z.string().min(1, "Client Secret is required"),
    redirectUri: z.string().url("Must be a valid URL"),
  }),
  // Apple validation commented out for future use
  /*
  apple: z.object({
    clientId: z.string().min(1, "Client ID is required"),
    teamId: z.string().min(1, "Team ID is required"),
    keyId: z.string().min(1, "Key ID is required"),
    privateKey: z.string().min(1, "Private Key is required"),
  }),
  */
})

type ApiCredentialsValues = z.infer<typeof apiCredentialsSchema>

export default function ApiCredentialsPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<ApiCredentialsValues>({
    resolver: zodResolver(apiCredentialsSchema),
    defaultValues: async () => {
      const response = await fetch("/api/settings/api-credentials")
      if (!response.ok)
        return {
          recaptcha: { siteKey: "", secretKey: "" },
          google: { clientId: "", clientSecret: "", redirectUri: "" },
          // Apple defaults commented out for future use
          /*
          apple: { clientId: "", teamId: "", keyId: "", privateKey: "" },
          */
        }
      const data = await response.json()
      return {
        recaptcha: {
          siteKey: data.recaptcha?.siteKey || "",
          secretKey: data.recaptcha?.secretKey || "",
        },
        google: {
          clientId: data.google?.clientId || "",
          clientSecret: data.google?.clientSecret || "",
          redirectUri: data.google?.redirectUri || "",
        },
        // Apple configuration commented out for future use
        /*
        apple: {
          clientId: data.apple?.clientId || "",
          teamId: data.apple?.teamId || "",
          keyId: data.apple?.keyId || "",
          privateKey: data.apple?.privateKey || "",
        },
        */
      }
    },
  })

  async function onSubmit(data: ApiCredentialsValues) {
    setIsLoading(true)

    try {
      const response = await fetch("/api/settings/api-credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to save API credentials")
      }

      const result = await response.json()

      toast({
        title: "Success",
        description: result.message || "API credentials have been updated successfully.",
      })

      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save API credentials. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">API Credentials</h1>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Tabs defaultValue="recaptcha" className="space-y-4">
          <TabsList>
            <TabsTrigger value="recaptcha">reCAPTCHA</TabsTrigger>
            <TabsTrigger value="google">Google</TabsTrigger>
            {/* Apple tab commented out for future use */}
            {/* <TabsTrigger value="apple">Apple</TabsTrigger> */}
          </TabsList>

          <TabsContent value="recaptcha">
            <Card>
              <CardHeader>
                <CardTitle>Google reCAPTCHA Configuration</CardTitle>
                <CardDescription>Configure your Google reCAPTCHA v2 credentials for form protection.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recaptcha.siteKey">Site Key</Label>
                  <Input
                    id="recaptcha.siteKey"
                    type="text"
                    placeholder="Enter your reCAPTCHA Site Key"
                    {...form.register("recaptcha.siteKey")}
                  />
                  {form.formState.errors.recaptcha?.siteKey && (
                    <p className="text-sm text-destructive">{form.formState.errors.recaptcha.siteKey.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recaptcha.secretKey">Secret Key</Label>
                  <Input
                    id="recaptcha.secretKey"
                    type="password"
                    placeholder="Enter your reCAPTCHA Secret Key"
                    {...form.register("recaptcha.secretKey")}
                  />
                  {form.formState.errors.recaptcha?.secretKey && (
                    <p className="text-sm text-destructive">{form.formState.errors.recaptcha.secretKey.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="google">
            <Card>
              <CardHeader>
                <CardTitle>Google OAuth Configuration</CardTitle>
                <CardDescription>Configure your Google OAuth credentials for social login integration.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="google.clientId">Client ID</Label>
                  <Input
                    id="google.clientId"
                    type="text"
                    placeholder="Enter your Google Client ID"
                    {...form.register("google.clientId")}
                  />
                  {form.formState.errors.google?.clientId && (
                    <p className="text-sm text-destructive">{form.formState.errors.google.clientId.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="google.clientSecret">Client Secret</Label>
                  <Input
                    id="google.clientSecret"
                    type="password"
                    placeholder="Enter your Google Client Secret"
                    {...form.register("google.clientSecret")}
                  />
                  {form.formState.errors.google?.clientSecret && (
                    <p className="text-sm text-destructive">{form.formState.errors.google.clientSecret.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="google.redirectUri">Redirect URI</Label>
                  <Input
                    id="google.redirectUri"
                    type="url"
                    placeholder="https://your-domain.com/api/auth/google/callback"
                    {...form.register("google.redirectUri")}
                  />
                  {form.formState.errors.google?.redirectUri && (
                    <p className="text-sm text-destructive">{form.formState.errors.google.redirectUri.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Apple configuration commented out for future use */}
          {/*
          <TabsContent value="apple">
            <Card>
              <CardHeader>
                <CardTitle>Apple Sign In Configuration</CardTitle>
                <CardDescription>
                  Configure your Apple Sign In credentials for social login integration.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="apple.clientId">Client ID (Service ID)</Label>
                  <Input
                    id="apple.clientId"
                    type="text"
                    placeholder="Enter your Apple Client ID"
                    {...form.register("apple.clientId")}
                  />
                  {form.formState.errors.apple?.clientId && (
                    <p className="text-sm text-destructive">{form.formState.errors.apple.clientId.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apple.teamId">Team ID</Label>
                  <Input
                    id="apple.teamId"
                    type="text"
                    placeholder="Enter your Apple Team ID"
                    {...form.register("apple.teamId")}
                  />
                  {form.formState.errors.apple?.teamId && (
                    <p className="text-sm text-destructive">{form.formState.errors.apple.teamId.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apple.keyId">Key ID</Label>
                  <Input
                    id="apple.keyId"
                    type="text"
                    placeholder="Enter your Apple Key ID"
                    {...form.register("apple.keyId")}
                  />
                  {form.formState.errors.apple?.keyId && (
                    <p className="text-sm text-destructive">{form.formState.errors.apple.keyId.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apple.privateKey">Private Key</Label>
                  <Textarea
                    id="apple.privateKey"
                    placeholder="Enter your Apple Private Key"
                    className="font-mono"
                    {...form.register("apple.privateKey")}
                  />
                  {form.formState.errors.apple?.privateKey && (
                    <p className="text-sm text-destructive">{form.formState.errors.apple.privateKey.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          */}

          <Card className="mt-6">
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                Save All Changes
              </Button>
            </CardFooter>
          </Card>
        </Tabs>
      </form>
    </div>
  )
}

