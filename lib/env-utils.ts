"use server"

import { promises as fs } from "fs"
import path from "path"
import { cache } from "react"

/**
 * Updates the .env file with new values
 * This function can only be used in server components or API routes
 */
export async function updateEnvFile(updates: Record<string, string>): Promise<void> {
  const envPath = path.join(process.cwd(), ".env")
  let envContent: string

  try {
    envContent = await fs.readFile(envPath, "utf-8")
  } catch (error) {
    envContent = ""
  }

  const envLines = envContent.split("\n")
  const updatedLines = [...envLines]

  for (const [key, value] of Object.entries(updates)) {
    const index = envLines.findIndex((line) => line.startsWith(`${key}=`))

    const newLine = `${key}=${value}`

    if (index !== -1) {
      updatedLines[index] = newLine
    } else {
      updatedLines.push(newLine)
    }
  }

  await fs.writeFile(envPath, updatedLines.join("\n"))

  // In production, you might want to restart the server or update environment
  // This is just an example - implement according to your deployment setup
  if (process.env.NODE_ENV === "production") {
    // Implement production environment update logic
    console.log("Environment variables updated. Server restart may be required.")
  }
}

/**
 * Gets values from environment variables
 * This function can only be used in server components or API routes
 */
export const getEnvValues = cache(async function getEnvValues(keys: string[]): Promise<Record<string, string>> {
  const values: Record<string, string> = {}

  for (const key of keys) {
    values[key] = process.env[key] || ""
  }

  return values
})

