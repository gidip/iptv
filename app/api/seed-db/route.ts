import { nanoid } from "nanoid"
import { NextResponse } from "next/server"
import mysql from "mysql2/promise"

// Create a connection for this specific API route
async function getConnection() {
  return await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: Number.parseInt(process.env.MYSQL_PORT || "3306"),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    ssl: process.env.MYSQL_SSL === "true" ? {} : undefined,
  })
}

export async function POST() {
  let connection
  try {
    connection = await getConnection()

    // Check if tables exist
    try {
      // Check if we already have data
      const [existingChannels] = await connection.execute("SELECT COUNT(*) as count FROM live_streaming_channels")
      if ((existingChannels[0] as any).count > 0) {
        await connection.end()
        return NextResponse.json({ message: "Database already seeded" })
      }
    } catch (error) {
      console.error("Table check error:", error)
      // Tables might not exist yet, we'll create them
      await createTables(connection)
    }

    // Create Live Stream Page if it doesn't exist
    await connection.execute("INSERT INTO live_stream_page (id, title, content) VALUES (?, ?, ?)", [
      nanoid(),
      "Live Streaming Channels",
      "<p>Explore our collection of live streaming channels from around the world.</p>",
    ])

    // List of streaming channels to seed
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
      "Eros Now",
      "DAZN",
      "VMX",
      "iWantTFC",
      "JioCinema",
      "Mubi",
      "Rakuten TV",
      "Globoplay",
      "Viaplay",
      "TVING",
      "U-Next",
      "Crave",
      "BET+",
      "Hulu Japan",
      "d-anime Store",
      "Noggin",
      "NOW",
      "Stan",
      "Shahid",
      "BritBox",
      "Lemino",
      "Neon",
      "Smash",
      "Royal Bioscope",
      "Aha",
      "Binge",
      "FuboTV",
      "Kayo Sports",
      "Videoland",
      "HayU",
      "Acorn TV",
      "Shudder",
      "Telasa",
      "Philo",
      "Atresplayer Premium",
      "Nebula",
      "Venevision Play",
      "Showmax",
      "ALTBalaji",
      "Dropout",
      "Blaze TV",
      "Sling TV",
      "DirecTV Stream",
      "YouTube TV",
      "Spectrum TV",
      "Pluto.tv",
      "Xumo",
      "KlowdTV",
      "Frndly TV",
      "NOW TV",
      "AMC+",
      "Lifetime Movie Club",
      "History Vault",
      "Hallmark Movies Now",
      "Crackle",
      "Popcornflix",
      "Vudu",
      "Fearless.li",
      "Vimeo",
      "PantaFlix",
      "Volta",
      "Roku",
      "RedBox",
      "Tubi TV",
      "IMDb TV",
      "Apple iTunes",
      "Google Play",
      "Shout Factory TV",
      "FlixFling",
      "Amazon Prime Video",
      "Facebook Watch",
      "Outside TV",
      "Funimation Now",
      "VRV",
      "Dove Channel",
      "KocawaTV",
      "BroadwayHD",
      "DC Universe Infinite",
      "GuideDoc",
      "HIDIVE",
      "UP Faith and Family",
      "Hopster TV",
      "Great American Pure Flix",
      "Fandor",
      "Gaia",
      "Qello",
      "Screambox",
      "Sundance Now",
      "Hoopla",
      "allblk",
      "Revry",
      "Kanopy",
      "Rakuten Viki",
      "NBA League Pass",
      "NFL Game Pass",
      "Willow TV",
      "F1 TV",
      "Ginx",
      "NHL.TV",
      "Twitter",
      "Bleacher Report",
      "MLB.TV",
      "PokerGo",
      "Twitch",
      "MOTORTREND+",
      "UFC Fight Pass",
      "ITV Hub",
      "STV Player",
      "Freeview",
      "UK TV Play",
      "TV Player",
      "BBC iPlayer",
      "All 4",
      "4Seven",
      "My 5",
      "Rakuten TV",
      "Chili",
      "BFI Player",
      "Spectiv",
      "Curzon Home Cinema",
      "TalkTalk TV",
      "Virgin TV Go",
      "Eurosport Player",
      "BT Sport",
      "Bet365",
      "Sky Sports",
      "Slice",
      "CraveTV",
      "Cineplex",
      "Ici TOU TV",
      "FXNow Canada",
      "CBC",
      "CBC Gem",
      "CTV",
      "CBC Sports",
      "Sportsnet Now",
      "Rogers NHL Live",
      "Fetch TV",
      "Foxtel Now",
      "7plus",
      "SBS On Demand",
      "ABC iView",
      "tenplay",
      "DocPlay",
      "AnimeLab",
      "Kayo",
      "Airtel",
      "JioTV",
      "YuppTV",
      "NexGTv",
      "Hotstar",
      "Spuul",
      "Huajiao",
      "Taobao Live",
      "JD Live",
      "Inke",
      "YY Live",
      "Yizhibo",
      "Douyin",
      "Kuaishou",
      "Xigua Video",
      "Sohu Video",
      "Mango TV",
      "Douyu TV",
      "HuoMaoTV",
      "PPTV",
      "RTE Player",
      "ORF TVTHEK",
      "MagentaTV",
      "Maxdome",
      "TIMvision",
      "Rai Play",
      "Mediaset International",
      "C More",
      "Via Play",
      "SVT Play",
      "Movistar+ Lite",
      "myCANAL",
      "France TV",
      "ARTE",
      "Play TV",
      "RTP",
      "Stoiximan",
      "Alphatv",
      "puhutv",
      "Turkish123",
      "Exxen",
      "TV+",
      "Tivubu",
      "Ivi",
      "Kinopoisk",
      "Amediateka",
      "Jio TV",
      "America TV",
      "Zee5",
      "7 Network",
      "TVer",
      "Coupang",
      "TVNZ",
      "Plex",
      "StarzPlay",
      "Nova Play",
      "KinoPoisk",
      "Voyo",
      "MX Player",
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
        message: "Failed to seed database. See error details.",
      },
      { status: 500 },
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

