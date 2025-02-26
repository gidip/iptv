"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface PayPalPaymentButtonProps {
  amount: number
  currency?: string
  onPaymentComplete?: (paymentId: string) => void
  onCancel?: () => void
}

export function PayPalPaymentButton({
  amount,
  currency = "USD",
  onPaymentComplete,
  onCancel,
}: PayPalPaymentButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePayPalClick = () => {
    setIsProcessing(true)
    setError(null)

    // Simulate PayPal redirect and callback
    setTimeout(() => {
      // In a real app, this would redirect to PayPal
      const success = Math.random() > 0.2 // 80% success rate for demo

      if (success) {
        const fakePaymentId = `paypal_${Math.random().toString(36).substring(2, 15)}`
        onPaymentComplete?.(fakePaymentId)
      } else {
        setError("PayPal payment failed. Please try again or use a different payment method.")
      }

      setIsProcessing(false)
    }, 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>PayPal Payment</CardTitle>
        <CardDescription>Pay securely using your PayPal account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <div className="bg-blue-600 text-white font-bold py-3 px-6 rounded-md text-xl w-full text-center">PayPal</div>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>
            You will be redirected to PayPal to complete your payment of{" "}
            <span className="font-medium">
              {amount.toFixed(2)} {currency}
            </span>
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isProcessing}>
          Cancel
        </Button>
        <Button onClick={handlePayPalClick} disabled={isProcessing} className="bg-blue-600 hover:bg-blue-700">
          {isProcessing ? "Processing..." : `Pay with PayPal`}
        </Button>
      </CardFooter>
    </Card>
  )
}

