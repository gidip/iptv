"use client"

import { useState } from "react"
import { useUser } from "@/lib/hooks/use-user"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Check, CreditCard } from "lucide-react"
import { subscriptionPlans, type SubscriptionPlan } from "@/lib/subscription-types"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function SubscriptionPage() {
  const { user, subscription, isLoading } = useUser()
  const [selectedPlan, setSelectedPlan] = useState<string>(user?.subscription?.plan || "free")
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const [paymentMethod, setPaymentMethod] = useState<string>("credit_card")

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading subscription options...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Please Sign In</h2>
          <p className="text-muted-foreground mb-4">You need to be signed in to manage your subscription.</p>
          <Button>Sign In</Button>
        </div>
      </div>
    )
  }

  const yearlyDiscount = 0.2 // 20% discount for yearly billing
  const getYearlyPrice = (plan: SubscriptionPlan) => {
    return (plan.price * 12 * (1 - yearlyDiscount)).toFixed(2)
  }

  const handleSubscribe = () => {
    // In a real app, this would redirect to a payment processor or handle the subscription
    console.log("Subscribing to plan:", selectedPlan, "with billing cycle:", billingCycle)
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Choose Your Subscription Plan</h1>
          <p className="text-muted-foreground">Select the plan that best fits your viewing needs</p>
        </div>

        <Tabs
          defaultValue="monthly"
          className="mb-8"
          onValueChange={(value) => setBillingCycle(value as "monthly" | "yearly")}
        >
          <div className="flex justify-center">
            <TabsList>
              <TabsTrigger value="monthly">Monthly Billing</TabsTrigger>
              <TabsTrigger value="yearly">Yearly Billing (Save 20%)</TabsTrigger>
            </TabsList>
          </div>
        </Tabs>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {subscriptionPlans.map((plan) => {
            const isCurrentPlan = user.subscription?.plan === plan.id
            const price = billingCycle === "yearly" ? getYearlyPrice(plan) : plan.price.toFixed(2)

            return (
              <Card
                key={plan.id}
                className={`relative ${selectedPlan === plan.id ? "border-primary" : ""} ${plan.isPopular ? "border-2" : ""}`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3 left-0 right-0 flex justify-center">
                    <Badge className="bg-primary hover:bg-primary">Most Popular</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">${price}</span>
                    <span className="text-muted-foreground">/{billingCycle === "monthly" ? "month" : "year"}</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={selectedPlan === plan.id ? "default" : "outline"}
                    onClick={() => setSelectedPlan(plan.id)}
                    disabled={isCurrentPlan}
                  >
                    {isCurrentPlan ? "Current Plan" : selectedPlan === plan.id ? "Selected" : "Select Plan"}
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        {selectedPlan !== (user.subscription?.plan || "free") && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Select how you'd like to pay</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div>
                  <RadioGroupItem value="credit_card" id="credit_card" className="peer sr-only" />
                  <Label
                    htmlFor="credit_card"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <CreditCard className="mb-3 h-6 w-6" />
                    Credit Card
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="paypal" id="paypal" className="peer sr-only" />
                  <Label
                    htmlFor="paypal"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <span className="mb-3 text-blue-600 font-bold text-xl">P</span>
                    PayPal
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="bank_transfer" id="bank_transfer" className="peer sr-only" />
                  <Label
                    htmlFor="bank_transfer"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <span className="mb-3 text-green-600 font-bold text-xl">B</span>
                    Bank Transfer
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleSubscribe}>
                Subscribe Now
              </Button>
            </CardFooter>
          </Card>
        )}

        <div className="text-center text-sm text-muted-foreground">
          <p>
            By subscribing, you agree to our Terms of Service and Privacy Policy. You can cancel your subscription at
            any time from your account dashboard.
          </p>
        </div>
      </div>
    </div>
  )
}

