import { headers } from "next/headers"
import { createPool } from "mysql2/promise"

// Create a new pool for each request
const getPool = () => {
  // This ensures we're on the server
  headers()

  return createPool({
    host: process.env.MYSQL_HOST,
    port: Number.parseInt(process.env.MYSQL_PORT || "3306"),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    ssl: process.env.MYSQL_SSL === "true" ? {} : undefined,
    waitForConnections: true,
    connectionLimit: 1,
    maxIdle: 1,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: false,
  })
}

export async function query<T>(sql: string, params: any[] = []): Promise<T[]> {
  const pool = getPool()
  try {
    const [rows] = await pool.execute(sql, params)
    return rows as T[]
  } finally {
    await pool.end()
  }
}

export async function querySingle<T>(sql: string, params: any[] = []): Promise<T | null> {
  const results = await query<T>(sql, params)
  return results[0] || null
}

export const db = {
  query,
  querySingle,
  async transaction<T>(callback: (queries: typeof db) => Promise<T>): Promise<T> {
    const pool = getPool()
    const connection = await pool.getConnection()

    try {
      await connection.beginTransaction()

      const result = await callback({
        query: async (sql, params = []) => {
          const [rows] = await connection.execute(sql, params)
          return rows as any[]
        },
        querySingle: async (sql, params = []) => {
          const [rows] = await connection.execute(sql, params)
          const results = rows as any[]
          return results[0] || null
        },
      })

      await connection.commit()
      return result
    } catch (error) {
      await connection.rollback()
      throw error
    } finally {
      connection.release()
      await pool.end()
    }
  },
}

