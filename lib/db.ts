"'use server'
\"next/headers\"
import { createPool, type Pool } from "mysql2/promise"

let globalPool: Pool | null = null

const getPool = () => {
  if (!process.env.MYSQL_HOST || !process.env.MYSQL_USER || !process.env.MYSQL_PASSWORD) {
    throw new Error("Database configuration is missing. Please check your environment variables.")
  }

  if (!globalPool) {
    globalPool = createPool({
      host: process.env.MYSQL_HOST,
      port: Number.parseInt(process.env.MYSQL_PORT || "3306"),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE || "iptvapp",
      ssl: false,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 10000,
      multipleStatements: true,
    })
  }

  return globalPool
}

export async function query<T>(sql: string, params: any[] = []): Promise<T[]> {
  const pool = getPool()
  try {
    const [rows] = await pool.execute(sql, params)
    return rows as T[]
  } catch (error) {
    console.error("Database query error:", error)
    throw new Error(`Database query failed: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export async function querySingle<T>(sql: string, params: any[] = []): Promise<T | null> {
  const results = await query<T>(sql, params)
  return results[0] || null
}

export async function executeInsert(sql: string, params: any[] = []): Promise<number> {
  const pool = getPool()
  try {
    const [result] = await pool.execute(sql, params)
    // @ts-ignore
    return result.insertId
  } catch (error) {
    console.error("Database insert error:", error)
    throw new Error(`Database insert failed: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export async function executeUpdate(sql: string, params: any[] = []): Promise<number> {
  const pool = getPool()
  try {
    const [result] = await pool.execute(sql, params)
    // @ts-ignore
    return result.affectedRows
  } catch (error) {
    console.error("Database update error:", error)
    throw new Error(`Database update failed: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export async function executeDelete(sql: string, params: any[] = []): Promise<number> {
  const pool = getPool()
  try {
    const [result] = await pool.execute(sql, params)
    // @ts-ignore
    return result.affectedRows
  } catch (error) {
    console.error("Database delete error:", error)
    throw new Error(`Database delete failed: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export const db = {
  query,
  querySingle,
  executeInsert,
  executeUpdate,
  executeDelete,
  async testConnection() {
    try {
      const result = await query("SELECT 1 as test")
      return { success: true, result }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  },
}
"

