"use client"

import { useState, useEffect } from "react"
import { Download, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"
import { getFormSubmissions, exportFormSubmissions } from "@/lib/actions/content-actions"

type FormType = "contact" | "signup" | "signin"

type FormSubmission = {
  id: string
  formType: FormType
  data: Record<string, any>
  createdAt: string
  status: "new" | "read" | "responded"
}

export function FormSubmissions() {
  const [activeTab, setActiveTab] = useState<FormType>("contact")
  const [submissions, setSubmissions] = useState<FormSubmission[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  useEffect(() => {
    loadSubmissions(activeTab)
  }, [activeTab])

  const loadSubmissions = async (formType: FormType) => {
    try {
      setIsLoading(true)
      const data = await getFormSubmissions(formType)
      setSubmissions(data)
    } catch (error) {
      console.error("Error loading submissions:", error)
      toast({
        title: "Error loading submissions",
        description: "There was a problem loading the form submissions. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const exportData = async () => {
    try {
      await exportFormSubmissions(activeTab)
      toast({
        title: "Export successful",
        description: "Form submissions have been exported to CSV.",
      })
    } catch (error) {
      console.error("Error exporting data:", error)
      toast({
        title: "Export failed",
        description: "There was a problem exporting the form submissions. Please try again.",
        variant: "destructive",
      })
    }
  }

  const filteredSubmissions = submissions.filter((submission) => {
    // Apply status filter
    if (statusFilter !== "all" && submission.status !== statusFilter) {
      return false
    }

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      // Search in all data fields
      return Object.values(submission.data).some(
        (value) => value && typeof value === "string" && value.toLowerCase().includes(searchLower),
      )
    }

    return true
  })

  const renderFormFields = (formType: FormType, data: Record<string, any>) => {
    switch (formType) {
      case "contact":
        return (
          <>
            <TableCell>{data.name || "N/A"}</TableCell>
            <TableCell>{data.email || "N/A"}</TableCell>
            <TableCell className="max-w-xs truncate">{data.message || "N/A"}</TableCell>
          </>
        )
      case "signup":
        return (
          <>
            <TableCell>{data.username || data.name || "N/A"}</TableCell>
            <TableCell>{data.email || "N/A"}</TableCell>
            <TableCell>{data.plan || "N/A"}</TableCell>
          </>
        )
      case "signin":
        return (
          <>
            <TableCell>{data.username || data.email || "N/A"}</TableCell>
            <TableCell>{data.loginMethod || "Password"}</TableCell>
            <TableCell>{data.success ? "Success" : "Failed"}</TableCell>
          </>
        )
      default:
        return <TableCell colSpan={3}>No data available</TableCell>
    }
  }

  const getTableHeaders = (formType: FormType) => {
    switch (formType) {
      case "contact":
        return (
          <>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Message</TableHead>
          </>
        )
      case "signup":
        return (
          <>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Plan</TableHead>
          </>
        )
      case "signin":
        return (
          <>
            <TableHead>Username/Email</TableHead>
            <TableHead>Login Method</TableHead>
            <TableHead>Status</TableHead>
          </>
        )
      default:
        return <TableHead colSpan={3}>No headers available</TableHead>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Form Submissions</CardTitle>
        <CardDescription>View and manage form submissions from your website.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as FormType)}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="contact">Contact Form</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
            <TabsTrigger value="signin">Sign In</TabsTrigger>
          </TabsList>

          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search submissions..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="responded">Responded</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={exportData}>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>

          <TabsContent value="contact">
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    {getTableHeaders("contact")}
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        Loading submissions...
                      </TableCell>
                    </TableRow>
                  ) : filteredSubmissions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        No submissions found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSubmissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell>{new Date(submission.createdAt).toLocaleDateString()}</TableCell>
                        {renderFormFields("contact", submission.data)}
                        <TableCell>
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                              submission.status === "new"
                                ? "bg-blue-100 text-blue-800"
                                : submission.status === "read"
                                  ? "bg-gray-100 text-gray-800"
                                  : "bg-green-100 text-green-800"
                            }`}
                          >
                            {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="signup">
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    {getTableHeaders("signup")}
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        Loading submissions...
                      </TableCell>
                    </TableRow>
                  ) : filteredSubmissions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        No submissions found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSubmissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell>{new Date(submission.createdAt).toLocaleDateString()}</TableCell>
                        {renderFormFields("signup", submission.data)}
                        <TableCell>
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                              submission.status === "new"
                                ? "bg-blue-100 text-blue-800"
                                : submission.status === "read"
                                  ? "bg-gray-100 text-gray-800"
                                  : "bg-green-100 text-green-800"
                            }`}
                          >
                            {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="signin">
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    {getTableHeaders("signin")}
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        Loading submissions...
                      </TableCell>
                    </TableRow>
                  ) : filteredSubmissions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        No submissions found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSubmissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell>{new Date(submission.createdAt).toLocaleDateString()}</TableCell>
                        {renderFormFields("signin", submission.data)}
                        <TableCell>
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                              submission.status === "new"
                                ? "bg-blue-100 text-blue-800"
                                : submission.status === "read"
                                  ? "bg-gray-100 text-gray-800"
                                  : "bg-green-100 text-green-800"
                            }`}
                          >
                            {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

