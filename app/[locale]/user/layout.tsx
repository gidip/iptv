import type { ReactNode } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CreditCard, Home, Settings, User, Video } from "lucide-react"

interface UserLayoutProps {
  children: ReactNode
}

export default function UserLayout({ children }: UserLayoutProps) {
  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
        <Card className="p-4 h-fit">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold mb-4">User Account</h2>
            <nav className="space-y-1">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/user/dashboard">
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/user/subscription">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Subscription
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/user/watch-history">
                  <Video className="mr-2 h-4 w-4" />
                  Watch History
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/user/profile">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/user/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </Button>
            </nav>
          </div>
        </Card>
        <main>{children}</main>
      </div>
    </div>
  )
}

