"use client"

import { useState } from "react"
import { useUser } from "@/lib/hooks/use-user"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { CalendarDays, Clock, CreditCard, Download, Film, Mail, MessageSquare } from "lucide-react"
import { subscriptionPlans } from "@/lib/subscription-types"

interface WatchHistoryItem {
  id: string
  title: string
  channel: string
  thumbnail: string
  watchedAt: string
  duration: number
  progress: number
}

interface PaymentHistoryItem {
  id: string
  date: string
  amount: number
  currency: string
  status: "completed" | "pending" | "failed" | "refunded"
  paymentMethod: string
  description: string
}

// Mock data for watch history
const mockWatchHistory: WatchHistoryItem[] = [
  {
    id: "watch_1",
    title: "Morning News",
    channel: "News 24",
    thumbnail: "/placeholder.svg?height=80&width=120",
    watchedAt: "2023-06-15T08:30:00Z",
    duration: 3600, // 1 hour in seconds
    progress: 85,
  },
  {
    id: "watch_2",
    title: "Sports Highlights",
    channel: "Sports Channel",
    thumbnail: "/placeholder.svg?height=80&width=120",
    watchedAt: "2023-06-14T20:15:00Z",
    duration: 1800, // 30 minutes in seconds
    progress: 100,
  },
  {
    id: "watch_3",
    title: "Documentary: Ocean Life",
    channel: "Discovery",
    thumbnail: "/placeholder.svg?height=80&width=120",
    watchedAt: "2023-06-13T14:45:00Z",
    duration: 5400, // 1.5 hours in seconds
    progress: 60,
  },
  {
    id: "watch_4",
    title: "Cooking Show",
    channel: "Food Network",
    thumbnail: "/placeholder.svg?height=80&width=120",
    watchedAt: "2023-06-12T19:20:00Z",
    duration: 1800, // 30 minutes in seconds
    progress: 100,
  },
  {
    id: "watch_5",
    title: "Movie: Adventure Time",
    channel: "Movies Channel",
    thumbnail: "/placeholder.svg?height=80&width=120",
    watchedAt: "2023-06-11T21:00:00Z",
    duration: 7200, // 2 hours in seconds
    progress: 75,
  },
]

// Mock data for payment history
const mockPaymentHistory: PaymentHistoryItem[] = [
  {
    id: "payment_1",
    date: "2023-06-01T10:30:00Z",
    amount: 19.99,
    currency: "USD",
    status: "completed",
    paymentMethod: "credit_card",
    description: "Premium Plan - Monthly Subscription",
  },
  {
    id: "payment_2",
    date: "2023-05-01T10:30:00Z",
    amount: 19.99,
    currency: "USD",
    status: "completed",
    paymentMethod: "credit_card",
    description: "Premium Plan - Monthly Subscription",
  },
  {
    id: "payment_3",
    date: "2023-04-01T10:30:00Z",
    amount: 19.99,
    currency: "USD",
    status: "completed",
    paymentMethod: "paypal",
    description: "Premium Plan - Monthly Subscription",
  },
]

export default function UserDashboard() {
  const { user, subscription, isLoading } = useUser()
  const [watchHistory] = useState<WatchHistoryItem[]>(mockWatchHistory)
  const [paymentHistory] = useState<PaymentHistoryItem[]>(mockPaymentHistory)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Please Sign In</h2>
          <p className="text-muted-foreground mb-4">You need to be signed in to view your dashboard.</p>
          <Button>Sign In</Button>
        </div>
      </div>
    )
  }

  const currentPlan = subscriptionPlans.find((plan) => plan.id === user.subscription?.plan) || subscriptionPlans[0]
  const nextBillingDate = user.subscription?.currentPeriodEnd
    ? new Date(user.subscription.currentPeriodEnd).toLocaleDateString()
    : "N/A"

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours > 0 ? `${hours}h ` : ""}${minutes}m`
  }

  const getStatusBadge = (status: PaymentHistoryItem["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
            Completed
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
            Pending
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
            Failed
          </Badge>
        )
      case "refunded":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
            Refunded
          </Badge>
        )
    }
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <Button>
          <CreditCard className="mr-2 h-4 w-4" />
          Manage Subscription
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Current Plan</CardTitle>
            <CardDescription>Your subscription details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{currentPlan.name}</p>
                <p className="text-muted-foreground">${currentPlan.price}/month</p>
              </div>
              <Badge variant={user.subscription?.status === "active" ? "default" : "destructive"}>
                {user.subscription?.status === "active" ? "Active" : "Inactive"}
              </Badge>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4 flex justify-between">
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarDays className="mr-1 h-4 w-4" />
              Next billing: {nextBillingDate}
            </div>
            {currentPlan.showAds ? (
              <Badge variant="outline">Shows Ads</Badge>
            ) : (
              <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                Ad-Free
              </Badge>
            )}
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Watch Stats</CardTitle>
            <CardDescription>Your viewing activity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">This Week</span>
                <span className="text-sm text-muted-foreground">12.5 hours</span>
              </div>
              <Progress value={65} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">This Month</span>
                <span className="text-sm text-muted-foreground">42 hours</span>
              </div>
              <Progress value={80} />
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <Film className="mr-1 h-4 w-4" />
              25 different channels watched
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Support</CardTitle>
            <CardDescription>Get help with your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full">
              <MessageSquare className="mr-2 h-4 w-4" />
              Contact Support
            </Button>
            <Button variant="outline" className="w-full">
              <Mail className="mr-2 h-4 w-4" />
              Email Us
            </Button>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4" />
              Average response time: 2 hours
            </div>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="watch-history" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="watch-history">Watch History</TabsTrigger>
          <TabsTrigger value="payment-history">Payment History</TabsTrigger>
          <TabsTrigger value="upcoming-bills">Upcoming Bills</TabsTrigger>
        </TabsList>

        <TabsContent value="watch-history" className="space-y-4">
          <div className="rounded-md border overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Content</TableHead>
                    <TableHead>Channel</TableHead>
                    <TableHead className="hidden md:table-cell">Watched On</TableHead>
                    <TableHead className="hidden md:table-cell">Duration</TableHead>
                    <TableHead>Progress</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {watchHistory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={item.thumbnail || "/placeholder.svg"}
                            alt={item.title}
                            className="h-12 w-20 rounded object-cover"
                          />
                          <div>
                            <p className="font-medium">{item.title}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{item.channel}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Date(item.watchedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{formatDuration(item.duration)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={item.progress} className="w-16 md:w-24" />
                          <span className="text-sm">{item.progress}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="flex justify-center">
            <Button variant="outline">Load More</Button>
          </div>
        </TabsContent>

        <TabsContent value="payment-history" className="space-y-4">
          <div className="rounded-md border overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Payment Method</TableHead>
                    <TableHead className="text-right">Receipt</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentHistory.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                      <TableCell>{payment.description}</TableCell>
                      <TableCell>
                        ${payment.amount.toFixed(2)} {payment.currency}
                      </TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
                      <TableCell className="hidden md:table-cell capitalize">
                        {payment.paymentMethod.replace("_", " ")}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="upcoming-bills" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Next Payment</CardTitle>
              <CardDescription>Your upcoming subscription payment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{currentPlan.name} Plan - Monthly Subscription</p>
                  <p className="text-muted-foreground">Due on {nextBillingDate}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">${currentPlan.price.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">USD</p>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t">
                <p className="font-medium">Payment Method</p>
                <div className="flex items-center">
                  <CreditCard className="h-4 w-4 mr-2" />
                  <span>•••• •••• •••• 4242</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Change Payment Method</Button>
              <Button variant="outline">Update Billing Info</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

