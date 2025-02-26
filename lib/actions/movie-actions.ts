import { db } from "@/lib/db"
import type { MovieCategory } from "@/types/movie"
import { v4 as uuidv4 } from "uuid"

export async function getMovieCategories(): Promise<MovieCategory[]> {
  try {
    const categories = await db.query(`SELECT * FROM movie_categories ORDER BY name ASC`)
    return categories || []
  } catch (error) {
    console.error("Failed to fetch movie categories:", error)
    return []
  }
}

export async function getMovieCategoryBySlug(slug: string): Promise<MovieCategory | null> {
  try {
    const categories = await db.query(`SELECT * FROM movie_categories WHERE slug = ?`, [slug])
    return categories && categories.length > 0 ? categories[0] : null
  } catch (error) {
    console.error(`Failed to fetch movie category with slug ${slug}:`, error)
    return null
  }
}

export async function createMovieCategory(
  category: Omit<MovieCategory, "id" | "created_at" | "updated_at">,
): Promise<MovieCategory | null> {
  try {
    const id = uuidv4()
    await db.query(`INSERT INTO movie_categories (id, name, slug, description) VALUES (?, ?, ?, ?)`, [
      id,
      category.name,
      category.slug,
      category.description,
    ])

    return {
      id,
      ...category,
      created_at: new Date(),
      updated_at: new Date(),
    }
  } catch (error) {
    console.error("Failed to create movie category:", error)
    return null
  }
}

export async function updateMovieCategory(id: string, category: Partial<MovieCategory>): Promise<boolean> {
  try {
    const fields = Object.keys(category).filter((key) => key !== "id" && key !== "created_at" && key !== "updated_at")

    if (fields.length === 0) return false

    const setClause = fields.map((field) => `${field} = ?`).join(", ")
    const values = fields.map((field) => category[field as keyof typeof category])

    await db.query(`UPDATE movie_categories SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`, [
      ...values,
      id,
    ])

    return true
  } catch (error) {
    console.error(`Failed to update movie category with id ${id}:`, error)
    return false
  }
}

export async function deleteMovieCategory(id: string): Promise<boolean> {
  try {
    await db.query(`DELETE FROM movie_categories WHERE id = ?`, [id])
    return true
  } catch (error) {
    console.error(`Failed to delete movie category with id ${id}:`, error)
    return false
  }
}

