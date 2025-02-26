import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export const dynamic = "force-dynamic"

export async function GET(request: Request, { params }: { params: { locale: string } }) {
  try {
    const locale = params.locale
    const filePath = path.join(process.cwd(), "messages", `${locale}.json`)

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: `Locale '${locale}' not found` }, { status: 404 })
    }

    const fileContent = fs.readFileSync(filePath, "utf8")
    const messages = JSON.parse(fileContent)

    return NextResponse.json(messages)
  } catch (error) {
    console.error("Error loading messages:", error)
    return NextResponse.json({ error: "Failed to load messages" }, { status: 500 })
  }
}

