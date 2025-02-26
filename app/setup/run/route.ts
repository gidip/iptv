import { NextResponse } from "next/server"
import mysql from "mysql2/promise"
import { nanoid } from "nanoid"

export async function POST() {
  let connection
  try {
    console.log("Starting database setup...")

    // Create direct connection
    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      port: Number.parseInt(process.env.MYSQL_PORT || "3306"),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      ssl: process.env.MYSQL_SSL === "true" ? {} : undefined,
    })

    console.log("Database connection established")

    // Create tables
    await createTables(connection)
    console.log("Tables created successfully")

    // Check if we already have data
    const [existingChannels] = await connection.execute("SELECT COUNT(*) as count FROM live_streaming_channels")
    if ((existingChannels[0] as any).count > 0) {
      console.log("Database already seeded")
      await connection.end()
      return NextResponse.redirect(
        new URL("/setup/success?message=Database already seeded", process.env.VERCEL_URL || "http://localhost:3000"),
      )
    }

    // Create Live Stream Page if it doesn't exist
    await connection.execute("INSERT INTO live_stream_page (id, title, content) VALUES (?, ?, ?)", [
      nanoid(),
      "Live Streaming Channels",
      "<p>Explore our collection of live streaming channels from around the world.</p>",
    ])
    console.log("Live stream page created")

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
      "Discovery+",
      "Youku",
      "SkyShowtime",
      "MangoTV",
      "Vidio",
      "ZEES",
      "SonyLIV",
      "bilibili",
      "Starz",
      "iflix",
      "Curiosity Stream",
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
    console.log(`${channels.length} channels seeded`)

    await connection.end()
    console.log("Database setup completed successfully")

    // Redirect to success page
    return NextResponse.redirect(new URL("/setup/success", process.env.VERCEL_URL || "http://localhost:3000"))
  } catch (error) {
    console.error("Database setup error:", error)
    if (connection) await connection.end()
    return NextResponse.redirect(
      new URL(
        `/setup/error?message=${encodeURIComponent(String(error))}`,
        process.env.VERCEL_URL || "http://localhost:3000",
      ),
    )
  }
}

async function createTables(connection: mysql.Connection) {
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

    `CREATE TABLE IF NOT EXISTS movies (
      id VARCHAR(255) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL,
      description TEXT,
      poster_url VARCHAR(255),
      video_url VARCHAR(255),
      release_date DATE,
      duration INT,
      featured BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`,

    `CREATE TABLE IF NOT EXISTS movie_categories (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`,

    `CREATE TABLE IF NOT EXISTS movie_to_category (
      movie_id VARCHAR(255) NOT NULL,
      category_id VARCHAR(255) NOT NULL,
      PRIMARY KEY (movie_id, category_id),
      FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
      FOREIGN KEY (category_id) REFERENCES movie_categories(id) ON DELETE CASCADE
    )`,

    `CREATE TABLE IF NOT EXISTS tv_channels (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL,
      logo_url VARCHAR(255),
      description TEXT,
      video_url VARCHAR(255),
      content TEXT,
      featured BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`,

    `CREATE TABLE IF NOT EXISTS streaming_services (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL,
      logo_url VARCHAR(255),
      description TEXT,
      video_url VARCHAR(255),
      content TEXT,
      featured BOOLEAN DEFAULT false,
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
}

