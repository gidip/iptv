import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const result = await db.testConnection()
    if (result.success) {
      return NextResponse.json({
        status: "healthy",
        message: "Database connection successful",
        data: result.result,
      })
    }
    return NextResponse.json(
      {
        status: "error",
        message: "Database connection failed",
        error: result.error,
      },
      { status: 500 },
    )
  } catch (error) {
    console.error("Health check failed:", error)
    return NextResponse.json(
      {
        status: "error",
        message: "Health check failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

