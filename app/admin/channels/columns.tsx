"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { format } from "date-fns"

import type { Channel } from "@/types/channel"
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
import { deleteChannel } from "@/lib/actions/channel-actions"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export const ChannelsTableColumns: ColumnDef<Channel>[] = [
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
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "isLive",
    header: "Type",
    cell: ({ row }) => (
      <Badge variant={row.getValue("isLive") ? "default" : "outline"}>
        {row.getValue("isLive") ? "Live Stream" : "TV Channel"}
      </Badge>
    ),
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
      const channel = row.original
      const router = useRouter()
      const { toast } = useToast()

      const handleDelete = async () => {
        try {
          await deleteChannel(channel.id)
          toast({
            title: "Channel deleted",
            description: "The channel has been successfully deleted.",
          })
          router.refresh()
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to delete the channel.",
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
            <DropdownMenuItem onClick={() => router.push(`/channels/${channel.id}`)}>View</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push(`/admin/channels/${channel.id}`)}>Edit</DropdownMenuItem>
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

