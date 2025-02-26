import { NextResponse } from "next/server"
import mysql from "mysql2/promise"

export async function GET() {
  let connection
  try {
    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      port: Number.parseInt(process.env.MYSQL_PORT || "3306"),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      ssl: process.env.MYSQL_SSL === "true" ? {} : undefined,
    })

    // Create necessary tables if they don't exist
    const tables = [
      `CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255),
        image VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`,

      `CREATE TABLE IF NOT EXISTS pages (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        content TEXT,
        published BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`,

      `CREATE TABLE IF NOT EXISTS live_stream_page (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT,
        video_url VARCHAR(255),
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`,

      `CREATE TABLE IF NOT EXISTS live_streaming_channels (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        logo_url VARCHAR(255),
        description TEXT,
        video_url VARCHAR(255),
        content TEXT,
        featured BOOLEAN DEFAULT false,
        display_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`,
    ]

    for (const tableQuery of tables) {
      await connection.execute(tableQuery)
    }

    await connection.end()

    return NextResponse.json({
      success: true,
      message: "Tables created successfully",
    })
  } catch (error) {
    console.error("Table creation error:", error)
    if (connection) await connection.end()

    return NextResponse.json(
      {
        success: false,
        error: String(error),
        message: "Failed to create tables",
      },
      { status: 500 },
    )
  }
}

