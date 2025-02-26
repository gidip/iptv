"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowUpRight,
  CheckCircle,
  Clock,
  CreditCard,
  Download,
  Eye,
  MoreHorizontal,
  RefreshCw,
  Search,
  XCircle,
} from "lucide-react"

interface Transaction {
  id: string
  userId: string
  userName: string
  userEmail: string
  amount: number
  currency: string
  status: "pending" | "completed" | "failed" | "refunded"
  paymentMethod: string
  subscriptionPlan: string
  createdAt: string
}

interface Subscription {
  id: string
  userId: string
  userName: string
  userEmail: string
  plan: string
  status: "active" | "canceled" | "expired"
  startDate: string
  endDate: string
  renewalAmount: number
  currency: string
  autoRenew: boolean
}

const mockTransactions: Transaction[] = [
  {
    id: "txn_1",
    userId: "user_1",
    userName: "John Doe",
    userEmail: "john.doe@example.com",
    amount: 19.99,
    currency: "USD",
    status: "completed",
    paymentMethod: "credit_card",
    subscriptionPlan: "premium",
    createdAt: "2023-06-15T10:30:00Z",
  },
  {
    id: "txn_2",
    userId: "user_2",
    userName: "Jane Smith",
    userEmail: "jane.smith@example.com",
    amount: 9.99,
    currency: "USD",
    status: "completed",
    paymentMethod: "paypal",
    subscriptionPlan: "basic",
    createdAt: "2023-06-14T14:45:00Z",
  },
  {
    id: "txn_3",
    userId: "user_3",
    userName: "Robert Johnson",
    userEmail: "robert.johnson@example.com",
    amount: 29.99,
    currency: "USD",
    status: "pending",
    paymentMethod: "bank_transfer",
    subscriptionPlan: "family",
    createdAt: "2023-06-15T09:15:00Z",
  },
  {
    id: "txn_4",
    userId: "user_4",
    userName: "Emily Davis",
    userEmail: "emily.davis@example.com",
    amount: 19.99,
    currency: "USD",
    status: "failed",
    paymentMethod: "credit_card",
    subscriptionPlan: "premium",
    createdAt: "2023-06-13T16:20:00Z",
  },
  {
    id: "txn_5",
    userId: "user_5",
    userName: "Michael Wilson",
    userEmail: "michael.wilson@example.com",
    amount: 19.99,
    currency: "USD",
    status: "refunded",
    paymentMethod: "paypal",
    subscriptionPlan: "premium",
    createdAt: "2023-06-10T11:30:00Z",
  },
]

const mockSubscriptions: Subscription[] = [
  {
    id: "sub_1",
    userId: "user_1",
    userName: "John Doe",
    userEmail: "john.doe@example.com",
    plan: "premium",
    status: "active",
    startDate: "2023-06-01T00:00:00Z",
    endDate: "2023-07-01T00:00:00Z",
    renewalAmount: 19.99,
    currency: "USD",
    autoRenew: true,
  },
  {
    id: "sub_2",
    userId: "user_2",
    userName: "Jane Smith",
    userEmail: "jane.smith@example.com",
    plan: "basic",
    status: "active",
    startDate: "2023-05-15T00:00:00Z",
    endDate: "2023-06-15T00:00:00Z",
    renewalAmount: 9.99,
    currency: "USD",
    autoRenew: true,
  },
  {
    id: "sub_3",
    userId: "user_3",
    userName: "Robert Johnson",
    userEmail: "robert.johnson@example.com",
    plan: "family",
    status: "active",
    startDate: "2023-06-10T00:00:00Z",
    endDate: "2023-07-10T00:00:00Z",
    renewalAmount: 29.99,
    currency: "USD",
    autoRenew: true,
  },
  {
    id: "sub_4",
    userId: "user_4",
    userName: "Emily Davis",
    userEmail: "emily.davis@example.com",
    plan: "premium",
    status: "canceled",
    startDate: "2023-05-01T00:00:00Z",
    endDate: "2023-06-01T00:00:00Z",
    renewalAmount: 19.99,
    currency: "USD",
    autoRenew: false,
  },
  {
    id: "sub_5",
    userId: "user_5",
    userName: "Michael Wilson",
    userEmail: "michael.wilson@example.com",
    plan: "premium",
    status: "expired",
    startDate: "2023-04-15T00:00:00Z",
    endDate: "2023-05-15T00:00:00Z",
    renewalAmount: 19.99,
    currency: "USD",
    autoRenew: false,
  },
]

export default function PaymentsPage() {
  const [transactions] = useState<Transaction[]>(mockTransactions)
  const [subscriptions] = useState<Subscription[]>(mockSubscriptions)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [subscriptionStatusFilter, setSubscriptionStatusFilter] = useState("all")

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.userEmail.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const filteredSubscriptions = subscriptions.filter((subscription) => {
    const matchesSearch =
      subscription.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subscription.userEmail.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = subscriptionStatusFilter === "all" || subscription.status === subscriptionStatusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: Transaction["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
            <CheckCircle className="mr-1 h-3 w-3" />
            Completed
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
            <XCircle className="mr-1 h-3 w-3" />
            Failed
          </Badge>
        )
      case "refunded":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
            <RefreshCw className="mr-1 h-3 w-3" />
            Refunded
          </Badge>
        )
    }
  }

  const getSubscriptionStatusBadge = (status: Subscription["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
            Active
          </Badge>
        )
      case "canceled":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
            Canceled
          </Badge>
        )
      case "expired":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
            Expired
          </Badge>
        )
    }
  }

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "credit_card":
        return <CreditCard className="h-4 w-4" />
      case "paypal":
        return <span className="text-blue-600 font-bold">P</span>
      case "bank_transfer":
        return <span className="text-green-600 font-bold">B</span>
      default:
        return <CreditCard className="h-4 w-4" />
    }
  }

  // Calculate revenue stats
  const totalRevenue = transactions.filter((t) => t.status === "completed").reduce((sum, t) => sum + t.amount, 0)

  const monthlyRevenue = transactions
    .filter((t) => {
      const date = new Date(t.createdAt)
      const now = new Date()
      return t.status === "completed" && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
    })
    .reduce((sum, t) => sum + t.amount, 0)

  const activeSubscriptions = subscriptions.filter((s) => s.status === "active").length

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Payment Management</h1>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Lifetime revenue</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${monthlyRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Current month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSubscriptions}</div>
            <p className="text-xs text-muted-foreground">Paying subscribers</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="w-full">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4 pt-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search transactions..."
                className="pl-8 w-full sm:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead className="hidden md:table-cell">Plan</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-mono text-xs">{transaction.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{transaction.userName}</div>
                          <div className="text-sm text-muted-foreground">{transaction.userEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        ${transaction.amount.toFixed(2)} {transaction.currency}
                      </TableCell>
                      <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getPaymentMethodIcon(transaction.paymentMethod)}
                          <span className="capitalize">{transaction.paymentMethod.replace("_", " ")}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell capitalize">{transaction.subscriptionPlan}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download Receipt
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem disabled={transaction.status !== "completed"}>
                              <RefreshCw className="mr-2 h-4 w-4" />
                              Process Refund
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="subscriptions" className="space-y-4 pt-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search subscriptions..."
                className="pl-8 w-full sm:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Select value={subscriptionStatusFilter} onValueChange={setSubscriptionStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="canceled">Canceled</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Start Date</TableHead>
                    <TableHead className="hidden md:table-cell">End Date</TableHead>
                    <TableHead>Renewal</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubscriptions.map((subscription) => (
                    <TableRow key={subscription.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{subscription.userName}</div>
                          <div className="text-sm text-muted-foreground">{subscription.userEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell className="capitalize">{subscription.plan}</TableCell>
                      <TableCell>{getSubscriptionStatusBadge(subscription.status)}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Date(subscription.startDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Date(subscription.endDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>
                            ${subscription.renewalAmount.toFixed(2)} {subscription.currency}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {subscription.autoRenew ? "Auto-renews" : "No auto-renewal"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            {subscription.status === "active" && (
                              <DropdownMenuItem>
                                <XCircle className="mr-2 h-4 w-4" />
                                Cancel Subscription
                              </DropdownMenuItem>
                            )}
                            {subscription.status !== "active" && (
                              <DropdownMenuItem>
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Reactivate
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

