import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Simplified middleware that only adds security headers
export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Add security headers
  response.headers.set("x-frame-options", "DENY")
  response.headers.set("x-content-type-options", "nosniff")
  response.headers.set("referrer-policy", "strict-origin-when-cross-origin")

  return response
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
}

