import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const recentUsers = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    joinedAt: "2023-05-14T18:30:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Samantha Lee",
    email: "samantha.lee@example.com",
    joinedAt: "2023-05-14T15:45:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Daniel Kim",
    email: "daniel.kim@example.com",
    joinedAt: "2023-05-14T12:20:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Rachel Green",
    email: "rachel.green@example.com",
    joinedAt: "2023-05-13T22:15:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "Thomas Wilson",
    email: "thomas.wilson@example.com",
    joinedAt: "2023-05-13T19:40:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function AdminRecentUsers() {
  return (
    <div className="space-y-4">
      {recentUsers.map((user) => (
        <div key={user.id} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">{new Date(user.joinedAt).toLocaleDateString()}</div>
        </div>
      ))}
    </div>
  )
}

