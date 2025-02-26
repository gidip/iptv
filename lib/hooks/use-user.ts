"use client"

import { useState, useEffect } from "react"
import { type SubscriptionPlan, subscriptionPlans } from "@/lib/subscription-types"

export interface User {
  id: string
  name: string
  email: string
  subscription?: {
    plan: string
    status: "active" | "canceled" | "expired"
    currentPeriodEnd: string
    showAds: boolean
  }
  avatar?: string
}

// Mock function to simulate fetching user data
const fetchUserData = async (): Promise<User | null> => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock user data
      resolve({
        id: "user_123",
        name: "John Doe",
        email: "john.doe@example.com",
        subscription: {
          plan: "premium",
          status: "active",
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          showAds: false,
        },
        avatar: "/placeholder.svg?height=40&width=40",
      })
    }, 500)
  })
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await fetchUserData()
        setUser(userData)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to load user"))
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  const getUserSubscriptionPlan = (): SubscriptionPlan | undefined => {
    if (!user?.subscription?.plan) return undefined
    return subscriptionPlans.find((plan) => plan.id === user.subscription?.plan)
  }

  return {
    user,
    isLoading,
    error,
    subscription: getUserSubscriptionPlan(),
  }
}

