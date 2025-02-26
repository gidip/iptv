import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Eye } from "lucide-react"
import Link from "next/link"

const recentChannels = [
  {
    id: "1",
    name: "Sports Central",
    category: "sports",
    status: "active",
    updatedAt: "2023-05-15T09:30:00Z",
  },
  {
    id: "2",
    name: "News 24",
    category: "news",
    status: "active",
    updatedAt: "2023-05-14T14:45:00Z",
  },
  {
    id: "3",
    name: "Movie Central",
    category: "entertainment",
    status: "active",
    updatedAt: "2023-05-13T11:20:00Z",
  },
  {
    id: "4",
    name: "Documentary Channel",
    category: "entertainment",
    status: "inactive",
    updatedAt: "2023-05-12T08:15:00Z",
  },
  {
    id: "5",
    name: "Football TV",
    category: "sports",
    status: "active",
    updatedAt: "2023-05-11T16:40:00Z",
  },
]

export function AdminRecentChannels() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Updated</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentChannels.map((channel) => (
          <TableRow key={channel.id}>
            <TableCell className="font-medium">{channel.name}</TableCell>
            <TableCell>
              <Badge variant="outline" className="capitalize">
                {channel.category}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge variant={channel.status === "active" ? "default" : "secondary"} className="capitalize">
                {channel.status}
              </Badge>
            </TableCell>
            <TableCell>{new Date(channel.updatedAt).toLocaleDateString()}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/admin/channels/${channel.id}`}>
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/watch/${channel.id}`} target="_blank">
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Link>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

