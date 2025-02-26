import { NextResponse } from "next/server"
import mysql from "mysql2/promise"
import { nanoid } from "nanoid"

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

    // Check if we already have data
    const [existingChannels] = await connection.execute("SELECT COUNT(*) as count FROM live_streaming_channels")
    if ((existingChannels[0] as any).count > 0) {
      await connection.end()
      return NextResponse.json({
        success: true,
        message: "Database already seeded",
      })
    }

    // Create Live Stream Page if it doesn't exist
    await connection.execute("INSERT INTO live_stream_page (id, title, content) VALUES (?, ?, ?)", [
      nanoid(),
      "Live Streaming Channels",
      "<p>Explore our collection of live streaming channels from around the world.</p>",
    ])

    // List of streaming channels to seed (shortened for brevity)
    const channels = [
      "Prime Video",
      "Paramount+",
      "HBO Max",
      "Apple TV+",
      "ESPN",
      "Netflix",
      "Hulu",
      "Max",
      "StarTimes",
      "Pluto",
      "Viki",
      "Canal Plus",
      "DStv",
      "iROKO",
      "WatchIT",
      "Viu",
      "Tencent Video",
      "Fubo",
      "Crunchyroll",
      "Disney+",
      "Peacock",
      "MGM+",
      "iQIYI",
    ]

    // Seed the channels
    for (const channelName of channels) {
      const slug = channelName
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")

      await connection.execute(
        `INSERT INTO live_streaming_channels 
         (id, name, slug, description, featured, display_order) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          nanoid(),
          channelName,
          slug,
          `Watch ${channelName} live streaming content.`,
          Math.random() > 0.8, // Randomly feature some channels
          Math.floor(Math.random() * 100), // Random display order
        ],
      )
    }

    await connection.end()

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${channels.length} live streaming channels`,
    })
  } catch (error) {
    console.error("Seed error:", error)
    if (connection) await connection.end()

    return NextResponse.json(
      {
        success: false,
        error: String(error),
        message: "Failed to seed database",
      },
      { status: 500 },
    )
  }
}

