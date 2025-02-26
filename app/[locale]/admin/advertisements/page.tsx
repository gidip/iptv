"use client"

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, Edit, Eye, MoreHorizontal, Plus, Search, Trash2, Video } from "lucide-react"

interface Advertisement {
  id: string
  name: string
  type: "video" | "banner" | "overlay"
  status: "active" | "scheduled" | "ended" | "draft"
  target: "all" | "specific"
  startDate: string
  endDate: string
  impressions: number
  clicks: number
}

const mockAds: Advertisement[] = [
  {
    id: "1",
    name: "Summer Sale Promotion",
    type: "video",
    status: "active",
    target: "all",
    startDate: "2023-06-01T00:00:00Z",
    endDate: "2023-08-31T23:59:59Z",
    impressions: 15420,
    clicks: 1245,
  },
  {
    id: "2",
    name: "Sports Channel Banner",
    type: "banner",
    status: "active",
    target: "specific",
    startDate: "2023-05-15T00:00:00Z",
    endDate: "2023-12-31T23:59:59Z",
    impressions: 8750,
    clicks: 632,
  },
  {
    id: "3",
    name: "New Movie Trailer",
    type: "video",
    status: "scheduled",
    target: "specific",
    startDate: "2023-09-01T00:00:00Z",
    endDate: "2023-09-30T23:59:59Z",
    impressions: 0,
    clicks: 0,
  },
  {
    id: "4",
    name: "Holiday Special Overlay",
    type: "overlay",
    status: "draft",
    target: "all",
    startDate: "2023-12-15T00:00:00Z",
    endDate: "2024-01-05T23:59:59Z",
    impressions: 0,
    clicks: 0,
  },
  {
    id: "5",
    name: "News Channel Sponsorship",
    type: "banner",
    status: "ended",
    target: "specific",
    startDate: "2023-01-01T00:00:00Z",
    endDate: "2023-03-31T23:59:59Z",
    impressions: 45230,
    clicks: 3210,
  },
]

export default function AdvertisementsPage() {
  const [ads] = useState<Advertisement[]>(mockAds)
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredAds = ads.filter((ad) => {
    const matchesSearch = ad.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === "all" || ad.type === typeFilter
    const matchesStatus = statusFilter === "all" || ad.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusBadge = (status: Advertisement["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
            Active
          </Badge>
        )
      case "scheduled":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
            Scheduled
          </Badge>
        )
      case "ended":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
            Ended
          </Badge>
        )
      case "draft":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
            Draft
          </Badge>
        )
    }
  }

  const getTypeBadge = (type: Advertisement["type"]) => {
    switch (type) {
      case "video":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
            <Video className="mr-1 h-3 w-3" />
            Video
          </Badge>
        )
      case "banner":
        return (
          <Badge variant="outline" className="bg-indigo-50 text-indigo-600 border-indigo-200">
            Banner
          </Badge>
        )
      case "overlay":
        return (
          <Badge variant="outline" className="bg-pink-50 text-pink-600 border-pink-200">
            Overlay
          </Badge>
        )
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Advertisement Management</h1>
        <Button asChild>
          <Link href="/admin/advertisements/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Advertisement
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search advertisements..."
            className="pl-8 w-full sm:w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="video">Video</SelectItem>
              <SelectItem value="banner">Banner</SelectItem>
              <SelectItem value="overlay">Overlay</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="ended">Ended</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Target</TableHead>
                <TableHead className="hidden md:table-cell">Schedule</TableHead>
                <TableHead className="hidden lg:table-cell">Performance</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAds.map((ad) => (
                <TableRow key={ad.id}>
                  <TableCell className="font-medium">{ad.name}</TableCell>
                  <TableCell>{getTypeBadge(ad.type)}</TableCell>
                  <TableCell>{getStatusBadge(ad.status)}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {ad.target === "all" ? "All Content" : "Specific Content"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex flex-col text-xs">
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                        <span>
                          {new Date(ad.startDate).toLocaleDateString()} - {new Date(ad.endDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex flex-col text-xs">
                      <span>{ad.impressions.toLocaleString()} impressions</span>
                      <span>{ad.clicks.toLocaleString()} clicks</span>
                      {ad.impressions > 0 && (
                        <span className="text-muted-foreground">
                          CTR: {((ad.clicks / ad.impressions) * 100).toFixed(2)}%
                        </span>
                      )}
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
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/advertisements/${ad.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/advertisements/${ad.id}/preview`}>
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
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
    </div>
  )
}

