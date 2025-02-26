export const runtime = "edge"

import { NextResponse } from "next/server"
import { headers } from "next/headers"

export async function GET() {
  try {
    const values = {
      NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "",
      RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY || "",
      NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
      NEXT_PUBLIC_GOOGLE_REDIRECT_URI: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || "",
      // Apple credentials commented out for future use
      /*
      NEXT_PUBLIC_APPLE_CLIENT_ID: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID || "",
      APPLE_TEAM_ID: process.env.APPLE_TEAM_ID || "",
      APPLE_KEY_ID: process.env.APPLE_KEY_ID || "",
      APPLE_PRIVATE_KEY: process.env.APPLE_PRIVATE_KEY || "",
      */
    }

    return NextResponse.json({
      recaptcha: {
        siteKey: values.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        secretKey: values.RECAPTCHA_SECRET_KEY,
      },
      google: {
        clientId: values.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        clientSecret: values.GOOGLE_CLIENT_SECRET,
        redirectUri: values.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
      },
      // Apple configuration commented out for future use
      /*
      apple: {
        clientId: values.NEXT_PUBLIC_APPLE_CLIENT_ID,
        teamId: values.APPLE_TEAM_ID,
        keyId: values.APPLE_KEY_ID,
        privateKey: values.APPLE_PRIVATE_KEY,
      },
      */
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch API credentials" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const headersList = headers()
    // In a real app, verify admin authentication here

    const body = await request.json()

    // Since we can't use updateEnvFile in Edge runtime, we'll need to create a different approach
    // For now, we'll just return success but in a real app you would:
    // 1. Store these settings in a database
    // 2. Or create a separate API endpoint that runs in Node.js runtime to update the .env file

    return NextResponse.json({
      success: true,
      message:
        "Settings received. In a production environment, these would be saved to a database or environment variables.",
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update API credentials" }, { status: 500 })
  }
}

