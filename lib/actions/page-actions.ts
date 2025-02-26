import { nanoid } from "nanoid"
import { executeQuery, executeQuerySingle, executeInsert, executeUpdate, executeDelete } from "@/lib/db"
import type { Page } from "@/types/page"

export async function getPages(): Promise<Page[]> {
  return executeQuery<Page>("SELECT * FROM pages ORDER BY created_at DESC")
}

export async function getPublishedPages(): Promise<Page[]> {
  return executeQuery<Page>("SELECT * FROM pages WHERE published = ? ORDER BY created_at DESC", [true])
}

export async function getPageById(id: string): Promise<Page | null> {
  return executeQuerySingle<Page>("SELECT * FROM pages WHERE id = ?", [id])
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  return executeQuerySingle<Page>("SELECT * FROM pages WHERE slug = ?", [slug])
}

export async function createPage(page: Omit<Page, "id" | "createdAt" | "updatedAt">): Promise<Page> {
  const id = nanoid()
  await executeInsert("INSERT INTO pages (id, title, slug, content, published) VALUES (?, ?, ?, ?, ?)", [
    id,
    page.title,
    page.slug,
    page.content,
    page.published,
  ])

  const newPage = await getPageById(id)
  if (!newPage) throw new Error("Failed to create page")
  return newPage
}

export async function updatePage(id: string, page: Partial<Page>): Promise<Page> {
  const currentPage = await getPageById(id)
  if (!currentPage) throw new Error("Page not found")

  const updates = []
  const params = []

  if (page.title !== undefined) {
    updates.push("title = ?")
    params.push(page.title)
  }

  if (page.slug !== undefined) {
    updates.push("slug = ?")
    params.push(page.slug)
  }

  if (page.content !== undefined) {
    updates.push("content = ?")
    params.push(page.content)
  }

  if (page.published !== undefined) {
    updates.push("published = ?")
    params.push(page.published)
  }

  if (updates.length === 0) return currentPage

  params.push(id)
  await executeUpdate(`UPDATE pages SET ${updates.join(", ")} WHERE id = ?`, params)

  const updatedPage = await getPageById(id)
  if (!updatedPage) throw new Error("Failed to update page")
  return updatedPage
}

export async function deletePage(id: string): Promise<boolean> {
  const result = await executeDelete("DELETE FROM pages WHERE id = ?", [id])
  return result > 0
}

