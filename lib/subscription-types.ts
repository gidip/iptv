export type SubscriptionTier = "free" | "basic" | "premium" | "family"

export interface SubscriptionPlan {
  id: string
  name: string
  description: string
  price: number
  billingCycle: "monthly" | "yearly"
  features: string[]
  isPopular?: boolean
  showAds: boolean
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Free",
    description: "Basic access with limited features",
    price: 0,
    billingCycle: "monthly",
    features: ["Access to free channels", "Standard definition", "Limited content library"],
    showAds: true,
  },
  {
    id: "basic",
    name: "Basic",
    description: "Standard access with more features",
    price: 9.99,
    billingCycle: "monthly",
    features: ["Access to 100+ channels", "HD streaming", "7-day replay", "Watch on 1 device"],
    showAds: true,
  },
  {
    id: "premium",
    name: "Premium",
    description: "Premium access with all features",
    price: 19.99,
    billingCycle: "monthly",
    features: [
      "Access to 200+ channels",
      "HD & 4K streaming",
      "14-day replay",
      "Watch on 2 devices",
      "No advertisements",
      "Offline downloads",
    ],
    isPopular: true,
    showAds: false,
  },
  {
    id: "family",
    name: "Family",
    description: "Premium access for the whole family",
    price: 29.99,
    billingCycle: "monthly",
    features: [
      "Access to 200+ channels",
      "HD & 4K streaming",
      "30-day replay",
      "Watch on 4 devices",
      "No advertisements",
      "Offline downloads",
      "Parental controls",
    ],
    showAds: false,
  },
]

export interface PaymentMethod {
  id: string
  name: string
  icon: string
  enabled: boolean
}

export const paymentMethods: PaymentMethod[] = [
  {
    id: "credit_card",
    name: "Credit Card",
    icon: "credit-card",
    enabled: true,
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: "paypal",
    enabled: true,
  },
  {
    id: "stripe",
    name: "Stripe",
    icon: "stripe",
    enabled: true,
  },
  {
    id: "bank_transfer",
    name: "Bank Transfer",
    icon: "bank",
    enabled: true,
  },
  {
    id: "apple_pay",
    name: "Apple Pay",
    icon: "apple",
    enabled: true,
  },
  {
    id: "google_pay",
    name: "Google Pay",
    icon: "google",
    enabled: true,
  },
]

export interface Transaction {
  id: string
  userId: string
  amount: number
  currency: string
  status: "pending" | "completed" | "failed" | "refunded"
  paymentMethod: string
  subscriptionPlan: string
  createdAt: string
  billingPeriod: {
    start: string
    end: string
  }
}

