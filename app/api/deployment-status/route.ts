import { NextResponse } from "next/server"
import { checkDeployment } from "@/lib/deployment-check"

export async function GET() {
  try {
    const status = await checkDeployment()
    return NextResponse.json(status)
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        error: error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 },
    )
  }
}

