"use server"

import { revalidatePath } from "next/cache"
import type { StreamingService } from "@/types/streaming-service"

// Database connection is only created on the server side
const getDbConfig = () => ({
  host: process.env.MYSQL_HOST,
  port: Number.parseInt(process.env.MYSQL_PORT || "3306"),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  ssl: process.env.MYSQL_SSL === "true" ? {} : undefined,
})

export async function getStreamingServices(): Promise<StreamingService[]> {
  const mysql = (await import("mysql2/promise")).default
  const connection = await mysql.createConnection(getDbConfig())

  try {
    const [rows] = await connection.execute("SELECT * FROM streaming_services ORDER BY name ASC")
    return rows as StreamingService[]
  } catch (error) {
    console.error("Failed to get streaming services:", error)
    return []
  } finally {
    await connection.end()
  }
}

export async function getStreamingServiceById(id: string): Promise<StreamingService | null> {
  const mysql = (await import("mysql2/promise")).default
  const connection = await mysql.createConnection(getDbConfig())

  try {
    const [rows] = await connection.execute("SELECT * FROM streaming_services WHERE id = ?", [id])
    const services = rows as StreamingService[]
    return services.length > 0 ? services[0] : null
  } catch (error) {
    console.error("Failed to get streaming service:", error)
    return null
  } finally {
    await connection.end()
  }
}

export async function getStreamingServiceBySlug(slug: string): Promise<StreamingService | null> {
  // Dynamic import of mysql2 to ensure it's only loaded on the server
  const mysql = (await import("mysql2/promise")).default
  const connection = await mysql.createConnection(getDbConfig())

  try {
    const [rows] = await connection.execute("SELECT * FROM streaming_services WHERE slug = ?", [slug])
    const services = rows as StreamingService[]
    return services.length > 0 ? services[0] : null
  } catch (error) {
    console.error("Failed to get streaming service:", error)
    return null
  } finally {
    await connection.end()
  }
}

export async function createStreamingService(data: Partial<StreamingService>): Promise<void> {
  const mysql = (await import("mysql2/promise")).default
  const connection = await mysql.createConnection(getDbConfig())

  try {
    const { name, logoUrl, description, videoUrl, content, featured } = data
    const slug = name
      ?.toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-")

    await connection.execute(
      `INSERT INTO streaming_services (name, slug, logo_url, description, video_url, content, featured)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, slug, logoUrl, description, videoUrl, content, featured],
    )

    revalidatePath("/admin/streaming-services")
    revalidatePath("/streaming-services")
  } catch (error) {
    console.error("Failed to create streaming service:", error)
    throw new Error("Failed to create streaming service")
  } finally {
    await connection.end()
  }
}

export async function updateStreamingService(id: string, data: Partial<StreamingService>): Promise<void> {
  const mysql = (await import("mysql2/promise")).default
  const connection = await mysql.createConnection(getDbConfig())

  try {
    const { name, logoUrl, description, videoUrl, content, featured } = data
    const slug = name
      ?.toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-")

    await connection.execute(
      `UPDATE streaming_services 
       SET name = ?, slug = ?, logo_url = ?, description = ?, video_url = ?, content = ?, featured = ?
       WHERE id = ?`,
      [name, slug, logoUrl, description, videoUrl, content, featured, id],
    )

    revalidatePath("/admin/streaming-services")
    revalidatePath("/streaming-services")
    revalidatePath(`/streaming-services/${slug}`)
  } catch (error) {
    console.error("Failed to update streaming service:", error)
    throw new Error("Failed to update streaming service")
  } finally {
    await connection.end()
  }
}

export async function deleteStreamingService(id: string): Promise<void> {
  const mysql = (await import("mysql2/promise")).default
  const connection = await mysql.createConnection(getDbConfig())

  try {
    await connection.execute("DELETE FROM streaming_services WHERE id = ?", [id])
    revalidatePath("/admin/streaming-services")
    revalidatePath("/streaming-services")
  } catch (error) {
    console.error("Failed to delete streaming service:", error)
    throw new Error("Failed to delete streaming service")
  } finally {
    await connection.end()
  }
}

