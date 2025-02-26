import { type NextRequest, NextResponse } from "next/server"
import { saveFormSubmission } from "@/lib/actions/content-actions"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { formType, data } = body

    if (!formType || !data) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate formType
    if (!["contact", "signup", "signin"].includes(formType)) {
      return NextResponse.json({ error: "Invalid form type" }, { status: 400 })
    }

    // Save the form submission
    await saveFormSubmission(formType, data)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing form submission:", error)
    return NextResponse.json({ error: "Failed to process form submission" }, { status: 500 })
  }
}

