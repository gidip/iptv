"use client"

export const dynamic = "force-dynamic"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, BarChart3, Users, Tv, Upload, MessageSquare, Settings } from "lucide-react"

// Mock data for dashboard
const stats = [
  {
    name: "Total Users",
    value: "3,240",
    change: "+12%",
    icon: Users,
  },
  {
    name: "Active Channels",
    value: "132",
    change: "+8%",
    icon: Tv,
  },
  {
    name: "Total Uploads",
    value: "1,240",
    change: "+23%",
    icon: Upload,
  },
  {
    name: "Support Tickets",
    value: "24",
    change: "-4%",
    icon: MessageSquare,
  },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">Download Report</Button>
          <Button>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.name}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className={`text-xs ${stat.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                    {stat.change} from last month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[200px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                  <BarChart3 className="h-8 w-8 text-muted" />
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest actions in the admin panel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { user: "John Smith", action: "added a new channel", time: "2 hours ago" },
                    { user: "Sarah Johnson", action: "updated user settings", time: "5 hours ago" },
                    { user: "Admin", action: "deployed new version", time: "1 day ago" },
                    { user: "System", action: "backup completed", time: "1 day ago" },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          <span className="font-bold">{activity.user}</span> {activity.action}
                        </p>
                        <p className="text-sm text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" asChild className="justify-start">
                    <Link href="/admin/channels">
                      <Tv className="mr-2 h-4 w-4" />
                      Manage Channels
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="justify-start">
                    <Link href="/admin/users">
                      <Users className="mr-2 h-4 w-4" />
                      Manage Users
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="justify-start">
                    <Link href="/admin/uploads">
                      <Upload className="mr-2 h-4 w-4" />
                      Uploads
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="justify-start">
                    <Link href="/admin/contacts">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Support Tickets
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Top Channels</CardTitle>
                <CardDescription>Most viewed channels this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Sports Channel", views: "12.5K", change: "+12%" },
                    { name: "News 24/7", views: "10.2K", change: "+5%" },
                    { name: "Movies HD", views: "8.7K", change: "+18%" },
                  ].map((channel, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{channel.name}</p>
                        <p className="text-sm text-muted-foreground">{channel.views} views</p>
                      </div>
                      <div className={`text-sm ${channel.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                        {channel.change}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>Current system performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Server Uptime", value: "99.9%", status: "operational" },
                    { name: "API Response", value: "210ms", status: "operational" },
                    { name: "Database Load", value: "42%", status: "operational" },
                    { name: "Storage Usage", value: "68%", status: "warning" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.value}</p>
                      </div>
                      <div className="flex items-center">
                        <div
                          className={`h-2 w-2 rounded-full mr-2 ${
                            item.status === "operational" ? "bg-green-500" : "bg-yellow-500"
                          }`}
                        />
                        <span className="text-xs capitalize">{item.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="h-[400px] flex items-center justify-center bg-muted/20 rounded-md">
          <div className="text-center">
            <BarChart3 className="h-10 w-10 text-muted mx-auto mb-4" />
            <h3 className="text-lg font-medium">Analytics Dashboard</h3>
            <p className="text-muted-foreground">Detailed analytics will be displayed here</p>
          </div>
        </TabsContent>
        <TabsContent value="reports" className="h-[400px] flex items-center justify-center bg-muted/20 rounded-md">
          <div className="text-center">
            <ArrowUpRight className="h-10 w-10 text-muted mx-auto mb-4" />
            <h3 className="text-lg font-medium">Reports Dashboard</h3>
            <p className="text-muted-foreground">Generated reports will be displayed here</p>
          </div>
        </TabsContent>
        <TabsContent
          value="notifications"
          className="h-[400px] flex items-center justify-center bg-muted/20 rounded-md"
        >
          <div className="text-center">
            <MessageSquare className="h-10 w-10 text-muted mx-auto mb-4" />
            <h3 className="text-lg font-medium">Notifications Dashboard</h3>
            <p className="text-muted-foreground">System notifications will be displayed here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

