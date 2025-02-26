"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle, CreditCard, Lock } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface StripePaymentFormProps {
  amount: number
  currency?: string
  onPaymentComplete?: (paymentId: string) => void
  onCancel?: () => void
}

export function StripePaymentForm({ amount, currency = "USD", onPaymentComplete, onCancel }: StripePaymentFormProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cardDetails, setCardDetails] = useState({
    name: "",
    number: "",
    expMonth: "",
    expYear: "",
    cvc: "",
  })

  const handleInputChange = (field: keyof typeof cardDetails, value: string) => {
    setCardDetails({
      ...cardDetails,
      [field]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setError(null)

    // Simulate payment processing
    setTimeout(() => {
      // In a real app, this would use the Stripe API
      const success = Math.random() > 0.2 // 80% success rate for demo

      if (success) {
        const fakePaymentId = `pi_${Math.random().toString(36).substring(2, 15)}`
        onPaymentComplete?.(fakePaymentId)
      } else {
        setError("Payment failed. Please try again or use a different payment method.")
      }

      setIsProcessing(false)
    }, 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Credit Card Payment</CardTitle>
        <CardDescription>Enter your card details to complete the payment</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Cardholder Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={cardDetails.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="card-number">Card Number</Label>
            <div className="relative">
              <Input
                id="card-number"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.number}
                onChange={(e) => handleInputChange("number", e.target.value.replace(/\D/g, "").slice(0, 16))}
                required
                maxLength={19}
              />
              <CreditCard className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="month">Expiry Month</Label>
              <Select value={cardDetails.expMonth} onValueChange={(value) => handleInputChange("expMonth", value)}>
                <SelectTrigger id="month">
                  <SelectValue placeholder="MM" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => {
                    const month = (i + 1).toString().padStart(2, "0")
                    return (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="year">Expiry Year</Label>
              <Select value={cardDetails.expYear} onValueChange={(value) => handleInputChange("expYear", value)}>
                <SelectTrigger id="year">
                  <SelectValue placeholder="YY" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => {
                    const year = (new Date().getFullYear() + i).toString().slice(-2)
                    return (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input
                id="cvc"
                placeholder="123"
                value={cardDetails.cvc}
                onChange={(e) => handleInputChange("cvc", e.target.value.replace(/\D/g, "").slice(0, 3))}
                required
                maxLength={3}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="save-card" />
            <Label htmlFor="save-card">Save card for future payments</Label>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex items-center justify-between bg-muted p-3 rounded-md">
            <div className="flex items-center space-x-2">
              <Lock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Secure payment</span>
            </div>
            <div className="text-right">
              <p className="font-medium">
                {amount.toFixed(2)} {currency}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isProcessing}>
            Cancel
          </Button>
          <Button type="submit" disabled={isProcessing}>
            {isProcessing ? "Processing..." : `Pay ${amount.toFixed(2)} ${currency}`}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

