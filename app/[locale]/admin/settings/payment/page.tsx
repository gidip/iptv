"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { paymentMethods, type PaymentMethod } from "@/lib/subscription-types"
import { AlertCircle, Check, CreditCard, Save } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface PaymentGatewaySettings {
  stripe: {
    enabled: boolean
    testMode: boolean
    publicKey: string
    secretKey: string
  }
  paypal: {
    enabled: boolean
    testMode: boolean
    clientId: string
    clientSecret: string
  }
  bankTransfer: {
    enabled: boolean
    accountName: string
    accountNumber: string
    bankName: string
    swiftCode: string
    instructions: string
  }
}

export default function PaymentSettingsPage() {
  const [availablePaymentMethods, setAvailablePaymentMethods] = useState<PaymentMethod[]>(paymentMethods)
  const [settings, setSettings] = useState<PaymentGatewaySettings>({
    stripe: {
      enabled: true,
      testMode: true,
      publicKey: "pk_test_51HG7",
      secretKey: "sk_test_51HG7",
    },
    paypal: {
      enabled: true,
      testMode: true,
      clientId: "AeJIH18Qpg",
      clientSecret: "EGqgk-BpsE",
    },
    bankTransfer: {
      enabled: true,
      accountName: "IPTV Company Ltd",
      accountNumber: "1234567890",
      bankName: "International Bank",
      swiftCode: "INTLBANK",
      instructions: "Please include your order number in the payment reference.",
    },
  })
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handlePaymentMethodToggle = (id: string, enabled: boolean) => {
    setAvailablePaymentMethods(
      availablePaymentMethods.map((method) => (method.id === id ? { ...method, enabled } : method)),
    )
  }

  const handleStripeChange = (field: keyof typeof settings.stripe, value: any) => {
    setSettings({
      ...settings,
      stripe: {
        ...settings.stripe,
        [field]: value,
      },
    })
  }

  const handlePaypalChange = (field: keyof typeof settings.paypal, value: any) => {
    setSettings({
      ...settings,
      paypal: {
        ...settings.paypal,
        [field]: value,
      },
    })
  }

  const handleBankTransferChange = (field: keyof typeof settings.bankTransfer, value: any) => {
    setSettings({
      ...settings,
      bankTransfer: {
        ...settings.bankTransfer,
        [field]: value,
      },
    })
  }

  const handleSaveSettings = () => {
    // In a real app, this would save to the backend
    console.log("Saving payment settings:", { availablePaymentMethods, settings })
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Payment Settings</h1>
        <Button onClick={handleSaveSettings}>
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </div>

      {saveSuccess && (
        <Alert className="bg-green-50 text-green-600 border-green-200">
          <Check className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Your payment settings have been saved successfully.</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Available Payment Methods</CardTitle>
          <CardDescription>Enable or disable payment methods for your customers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {availablePaymentMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between space-x-2">
                <div className="flex items-center space-x-4">
                  {method.id === "credit_card" ? (
                    <CreditCard className="h-5 w-5" />
                  ) : (
                    <span
                      className={`font-bold text-lg ${method.id === "paypal" ? "text-blue-600" : "text-green-600"}`}
                    >
                      {method.icon === "paypal" ? "P" : "B"}
                    </span>
                  )}
                  <Label htmlFor={`${method.id}-toggle`} className="font-medium">
                    {method.name}
                  </Label>
                </div>
                <Switch
                  id={`${method.id}-toggle`}
                  checked={method.enabled}
                  onCheckedChange={(checked) => handlePaymentMethodToggle(method.id, checked)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="stripe" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="stripe">Stripe</TabsTrigger>
          <TabsTrigger value="paypal">PayPal</TabsTrigger>
          <TabsTrigger value="bank-transfer">Bank Transfer</TabsTrigger>
        </TabsList>

        <TabsContent value="stripe" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Stripe Settings</CardTitle>
              <CardDescription>Configure your Stripe payment gateway</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="stripe-enabled"
                  checked={settings.stripe.enabled}
                  onCheckedChange={(checked) => handleStripeChange("enabled", checked)}
                />
                <Label htmlFor="stripe-enabled">Enable Stripe Payments</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="stripe-test-mode"
                  checked={settings.stripe.testMode}
                  onCheckedChange={(checked) => handleStripeChange("testMode", checked)}
                />
                <Label htmlFor="stripe-test-mode">Test Mode</Label>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="stripe-public-key">Public Key</Label>
                <Input
                  id="stripe-public-key"
                  value={settings.stripe.publicKey}
                  onChange={(e) => handleStripeChange("publicKey", e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="stripe-secret-key">Secret Key</Label>
                <Input
                  id="stripe-secret-key"
                  type="password"
                  value={settings.stripe.secretKey}
                  onChange={(e) => handleStripeChange("secretKey", e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Alert variant="destructive" className="w-full">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  Never share your Stripe secret key. This key can be used to make charges to your account.
                </AlertDescription>
              </Alert>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="paypal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>PayPal Settings</CardTitle>
              <CardDescription>Configure your PayPal payment gateway</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="paypal-enabled"
                  checked={settings.paypal.enabled}
                  onCheckedChange={(checked) => handlePaypalChange("enabled", checked)}
                />
                <Label htmlFor="paypal-enabled">Enable PayPal Payments</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="paypal-test-mode"
                  checked={settings.paypal.testMode}
                  onCheckedChange={(checked) => handlePaypalChange("testMode", checked)}
                />
                <Label htmlFor="paypal-test-mode">Sandbox Mode</Label>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="paypal-client-id">Client ID</Label>
                <Input
                  id="paypal-client-id"
                  value={settings.paypal.clientId}
                  onChange={(e) => handlePaypalChange("clientId", e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="paypal-client-secret">Client Secret</Label>
                <Input
                  id="paypal-client-secret"
                  type="password"
                  value={settings.paypal.clientSecret}
                  onChange={(e) => handlePaypalChange("clientSecret", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bank-transfer" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bank Transfer Settings</CardTitle>
              <CardDescription>Configure bank transfer payment details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="bank-enabled"
                  checked={settings.bankTransfer.enabled}
                  onCheckedChange={(checked) => handleBankTransferChange("enabled", checked)}
                />
                <Label htmlFor="bank-enabled">Enable Bank Transfer Payments</Label>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="bank-name">Bank Name</Label>
                <Input
                  id="bank-name"
                  value={settings.bankTransfer.bankName}
                  onChange={(e) => handleBankTransferChange("bankName", e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="account-name">Account Name</Label>
                <Input
                  id="account-name"
                  value={settings.bankTransfer.accountName}
                  onChange={(e) => handleBankTransferChange("accountName", e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="account-number">Account Number</Label>
                <Input
                  id="account-number"
                  value={settings.bankTransfer.accountNumber}
                  onChange={(e) => handleBankTransferChange("accountNumber", e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="swift-code">SWIFT/BIC Code</Label>
                <Input
                  id="swift-code"
                  value={settings.bankTransfer.swiftCode}
                  onChange={(e) => handleBankTransferChange("swiftCode", e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="instructions">Payment Instructions</Label>
                <Textarea
                  id="instructions"
                  value={settings.bankTransfer.instructions}
                  onChange={(e) => handleBankTransferChange("instructions", e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

