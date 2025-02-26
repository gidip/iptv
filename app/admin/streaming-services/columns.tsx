"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { format } from "date-fns"

import type { StreamingService } from "@/types/streaming-service"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { deleteStreamingService } from "@/lib/actions/streaming-service-actions"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export const StreamingServicesTableColumns: ColumnDef<StreamingService>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected())
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "slug",
    header: "Slug",
    cell: ({ row }) => <div>{row.getValue("slug")}</div>,
  },
  {
    accessorKey: "featured",
    header: "Featured",
    cell: ({ row }) => (
      <Badge variant={row.getValue("featured") ? "secondary" : "outline"}>
        {row.getValue("featured") ? "Featured" : "Standard"}
      </Badge>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Last Updated",
    cell: ({ row }) => <div>{format(new Date(row.getValue("updatedAt")), "MMM d, yyyy")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const service = row.original
      const router = useRouter()
      const { toast } = useToast()

      const handleDelete = async () => {
        try {
          await deleteStreamingService(service.id)
          toast({
            title: "Service deleted",
            description: "The streaming service has been successfully deleted.",
          })
          router.refresh()
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to delete the streaming service.",
            variant: "destructive",
          })
        }
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => router.push(`/streaming-services/${service.slug}`)}>View</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push(`/admin/streaming-services/${service.id}`)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleDelete} className="text-red-600">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

