import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { match as matchLocale } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"

const locales = ["en", "es", "fr", "tr", "ar"]
const defaultLocale = "en"

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  return matchLocale(languages, locales, defaultLocale)
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip middleware for assets and api routes
  if (pathname.startsWith("/_next") || pathname.startsWith("/api/") || pathname.includes("/.")) {
    return NextResponse.next()
  }

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    const newUrl = new URL(`/${locale}${pathname}`, request.url)
    return NextResponse.redirect(newUrl)
  }

  const response = NextResponse.next()

  // Add security headers
  response.headers.set("x-frame-options", "DENY")
  response.headers.set("x-content-type-options", "nosniff")
  response.headers.set("referrer-policy", "strict-origin-when-cross-origin")
  response.headers.set(
    "content-security-policy",
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' blob: data:",
      "font-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "block-all-mixed-content",
      "upgrade-insecure-requests",
    ].join("; "),
  )

  return response
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

