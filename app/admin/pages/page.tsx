"use client"

export const dynamic = "force-dynamic"

import { useState } from "react"
import Link from "next/link"
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
import { Badge } from "@/components/ui/badge"
import { Edit, Eye, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Mock data for pages
const initialPages = [
  {
    id: "1",
    title: "Home",
    slug: "/",
    lastUpdated: "2023-06-15T10:30:00Z",
    status: "published",
    location: "header",
  },
  {
    id: "2",
    title: "Channels",
    slug: "/channels",
    lastUpdated: "2023-06-14T14:22:00Z",
    status: "published",
    location: "header",
  },
  {
    id: "3",
    title: "Pricing",
    slug: "/pricing",
    lastUpdated: "2023-06-10T11:05:00Z",
    status: "published",
    location: "header",
  },
  {
    id: "4",
    title: "Contact",
    slug: "/contact",
    lastUpdated: "2023-06-08T16:30:00Z",
    status: "published",
    location: "header",
  },
  {
    id: "5",
    title: "Terms",
    slug: "/terms",
    lastUpdated: "2023-05-20T10:45:00Z",
    status: "published",
    location: "footer",
  },
  {
    id: "6",
    title: "Privacy",
    slug: "/privacy",
    lastUpdated: "2023-05-20T10:45:00Z",
    status: "published",
    location: "footer",
  },
  {
    id: "7",
    title: "About Us",
    slug: "/about",
    lastUpdated: "2023-05-15T10:45:00Z",
    status: "draft",
    location: "footer",
  },
]

export default function PagesManagementPage() {
  const [pages, setPages] = useState(initialPages)
  const [searchQuery, setSearchQuery] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const { toast } = useToast()

  const filteredPages = pages.filter((page) => {
    const matchesSearch =
      page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLocation = locationFilter === "all" || page.location === locationFilter
    return matchesSearch && matchesLocation
  })

  const handleDeletePage = (id: string) => {
    setPages(pages.filter((page) => page.id !== id))
    toast({
      title: "Page deleted",
      description: "The page has been deleted successfully.",
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Page Management</h1>
        <Button asChild>
          <Link href="/admin/pages/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Page
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search pages..."
            className="pl-8 w-full sm:w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <select
            className="border rounded-md px-3 py-2 bg-background"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="all">All Locations</option>
            <option value="header">Header</option>
            <option value="footer">Footer</option>
          </select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="hidden md:table-cell">Last Updated</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPages.map((page) => (
              <TableRow key={page.id}>
                <TableCell className="font-medium">{page.title}</TableCell>
                <TableCell>{page.slug}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {page.location}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{formatDate(page.lastUpdated)}</TableCell>
                <TableCell>
                  <Badge variant={page.status === "published" ? "default" : "secondary"} className="capitalize">
                    {page.status}
                  </Badge>
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
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/pages/${page.id}`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={page.slug} target="_blank">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDeletePage(page.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
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
  )
}

