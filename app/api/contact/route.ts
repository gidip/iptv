export const runtime = "edge"

import { verifyRecaptchaToken } from "@/lib/recaptcha"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { recaptchaToken, ...formData } = body

    // Verify reCAPTCHA token
    const isValid = await verifyRecaptchaToken(recaptchaToken)

    if (!isValid) {
      return new Response(JSON.stringify({ error: "reCAPTCHA verification failed" }), { status: 400 })
    }

    // Process the contact form submission
    // In a real app, you would send an email, save to database, etc.
    console.log("Contact form submission:", formData)

    return new Response(JSON.stringify({ success: true }))
  } catch (error) {
    console.error("Contact form error:", error)
    return new Response(JSON.stringify({ error: "Failed to process contact form" }), { status: 500 })
  }
}

