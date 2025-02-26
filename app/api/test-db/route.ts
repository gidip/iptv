import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    // Test the connection and get detailed results
    const testResult = await db.testConnection()

    if (testResult.success) {
      return NextResponse.json({
        status: "success",
        message: "Database connection successful",
        config: {
          host: process.env.MYSQL_HOST,
          user: process.env.MYSQL_USER,
          database: process.env.MYSQL_DATABASE,
          port: process.env.MYSQL_PORT || 3306,
        },
        result: testResult.result,
      })
    } else {
      throw new Error(testResult.error)
    }
  } catch (error: any) {
    console.error("Database test failed:", error)

    return NextResponse.json(
      {
        status: "error",
        message: "Database connection failed",
        error: error.message,
        config: {
          host: process.env.MYSQL_HOST,
          user: process.env.MYSQL_USER,
          database: process.env.MYSQL_DATABASE,
          port: process.env.MYSQL_PORT || 3306,
        },
      },
      { status: 500 },
    )
  }
}

