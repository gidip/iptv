"use client"

export const dynamic = "force-dynamic"

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
import { Badge } from "@/components/ui/badge"
import { Eye, MoreHorizontal, Search, Trash2, Upload } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Mock data for uploads
const uploads = [
  {
    id: "1",
    name: "Sports_Event_2023.mp4",
    size: "1.2 GB",
    type: "video/mp4",
    status: "completed",
    progress: 100,
    uploadedAt: "2023-05-10T09:15:00",
  },
  {
    id: "2",
    name: "News_Segment_May9.mp4",
    size: "450 MB",
    type: "video/mp4",
    status: "completed",
    progress: 100,
    uploadedAt: "2023-05-09T14:22:00",
  },
  {
    id: "3",
    name: "Documentary_Series_E01.mp4",
    size: "2.1 GB",
    type: "video/mp4",
    status: "processing",
    progress: 100,
    uploadedAt: "2023-05-09T11:05:00",
  },
  {
    id: "4",
    name: "Channel_Logo_New.png",
    size: "2.5 MB",
    type: "image/png",
    status: "completed",
    progress: 100,
    uploadedAt: "2023-05-08T16:30:00",
  },
  {
    id: "5",
    name: "Movie_Premiere_Trailer.mp4",
    size: "320 MB",
    type: "video/mp4",
    status: "uploading",
    progress: 65,
    uploadedAt: "2023-05-07T10:45:00",
  },
]

export default function UploadsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredUploads = uploads.filter(
    (upload) =>
      upload.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      upload.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "processing":
        return "bg-blue-500"
      case "uploading":
        return "bg-yellow-500"
      case "failed":
        return "bg-red-500"
      default:
        return "bg-gray-300"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">File Uploads</h1>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload New File
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search uploads..."
            className="pl-8 w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Bulk Delete</Button>
          <Button variant="outline">Download All</Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Size</TableHead>
              <TableHead className="hidden md:table-cell">Type</TableHead>
              <TableHead className="hidden md:table-cell">Uploaded</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUploads.map((upload) => (
              <TableRow key={upload.id}>
                <TableCell className="font-medium">{upload.name}</TableCell>
                <TableCell>{upload.size}</TableCell>
                <TableCell className="hidden md:table-cell">{upload.type}</TableCell>
                <TableCell className="hidden md:table-cell">{formatDate(upload.uploadedAt)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${getStatusColor(upload.status)}`} />
                    <div className="flex flex-col gap-1">
                      <Badge variant="outline" className="capitalize">
                        {upload.status}
                      </Badge>
                      {upload.status === "uploading" && <Progress value={upload.progress} className="h-1 w-[60px]" />}
                    </div>
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
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem>Download</DropdownMenuItem>
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
  )
}

