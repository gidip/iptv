import { NextResponse } from "next/server"
import mysql from "mysql2/promise"

export async function GET() {
  let connection
  try {
    // Create a simple connection to test
    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      port: Number.parseInt(process.env.MYSQL_PORT || "3306"),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      ssl: process.env.MYSQL_SSL === "true" ? {} : undefined,
    })

    // Test the connection with a simple query
    await connection.query("SELECT 1")

    await connection.end()

    return NextResponse.json({
      success: true,
      message: "Database connection successful",
    })
  } catch (error) {
    console.error("Database connection error:", error)
    if (connection) await connection.end()

    return NextResponse.json(
      {
        success: false,
        error: String(error),
        message: "Failed to connect to database",
      },
      { status: 500 },
    )
  }
}

