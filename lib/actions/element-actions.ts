"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"

// Define schemas for validation
const buttonSchema = z.object({
  id: z.string().optional(),
  label: z.string().min(1, "Button label is required"),
  url: z.string().url("Must be a valid URL").or(z.string().min(1, "URL is required")),
  variant: z.string().optional(),
  size: z.string().optional(),
  icon: z.string().optional(),
  position: z.string().optional(),
  isExternal: z.boolean().optional(),
  order: z.number().optional(),
})

const iconSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Icon name is required"),
  iconKey: z.string().min(1, "Icon key is required"),
  category: z.string().optional(),
})

// Type definitions
export type Button = z.infer<typeof buttonSchema>
export type Icon = z.infer<typeof iconSchema>

// Mock database functions
// In a real application, these would interact with your database
async function saveButton(button: Button): Promise<Button> {
  // This would save to your database
  console.log("Saving button:", button)

  // Mock return with ID
  return {
    ...button,
    id: button.id || `button-${Date.now()}`,
  }
}

async function removeButton(id: string): Promise<void> {
  // This would delete from your database
  console.log("Deleting button with ID:", id)
}

async function saveIcon(icon: Icon): Promise<Icon> {
  // This would save to your database
  console.log("Saving icon:", icon)

  // Mock return with ID
  return {
    ...icon,
    id: icon.id || `icon-${Date.now()}`,
  }
}

async function removeIcon(id: string): Promise<void> {
  // This would delete from your database
  console.log("Deleting icon with ID:", id)
}

// Button actions
export async function createButton(formData: FormData | Button) {
  try {
    // Parse and validate the input
    const rawData = formData instanceof FormData ? Object.fromEntries(formData.entries()) : formData

    // Convert isExternal to boolean if it's a string
    if (typeof rawData.isExternal === "string") {
      rawData.isExternal = rawData.isExternal === "true"
    }

    // Convert order to number if it's a string
    if (typeof rawData.order === "string") {
      rawData.order = Number.parseInt(rawData.order, 10)
    }

    const validatedData = buttonSchema.parse(rawData)

    // Save to database
    const savedButton = await saveButton(validatedData)

    // Revalidate relevant paths
    revalidatePath("/admin/elements")
    revalidatePath("/")

    return { success: true, data: savedButton }
  } catch (error) {
    console.error("Error creating button:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create button",
    }
  }
}

export async function updateButton(formData: FormData | Button) {
  try {
    // Parse and validate the input
    const rawData = formData instanceof FormData ? Object.fromEntries(formData.entries()) : formData

    // Convert isExternal to boolean if it's a string
    if (typeof rawData.isExternal === "string") {
      rawData.isExternal = rawData.isExternal === "true"
    }

    // Convert order to number if it's a string
    if (typeof rawData.order === "string") {
      rawData.order = Number.parseInt(rawData.order, 10)
    }

    const validatedData = buttonSchema.parse(rawData)

    if (!validatedData.id) {
      throw new Error("Button ID is required for updates")
    }

    // Save to database
    const updatedButton = await saveButton(validatedData)

    // Revalidate relevant paths
    revalidatePath("/admin/elements")
    revalidatePath("/")

    return { success: true, data: updatedButton }
  } catch (error) {
    console.error("Error updating button:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update button",
    }
  }
}

export async function deleteButton(id: string) {
  try {
    // Validate input
    if (!id) {
      throw new Error("Button ID is required")
    }

    // Delete from database
    await removeButton(id)

    // Revalidate relevant paths
    revalidatePath("/admin/elements")
    revalidatePath("/")

    return { success: true }
  } catch (error) {
    console.error("Error deleting button:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete button",
    }
  }
}

// Icon actions
export async function createIcon(formData: FormData | Icon) {
  try {
    // Parse and validate the input
    const rawData = formData instanceof FormData ? Object.fromEntries(formData.entries()) : formData

    const validatedData = iconSchema.parse(rawData)

    // Save to database
    const savedIcon = await saveIcon(validatedData)

    // Revalidate relevant paths
    revalidatePath("/admin/elements")

    return { success: true, data: savedIcon }
  } catch (error) {
    console.error("Error creating icon:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create icon",
    }
  }
}

export async function updateIcon(formData: FormData | Icon) {
  try {
    // Parse and validate the input
    const rawData = formData instanceof FormData ? Object.fromEntries(formData.entries()) : formData

    const validatedData = iconSchema.parse(rawData)

    if (!validatedData.id) {
      throw new Error("Icon ID is required for updates")
    }

    // Save to database
    const updatedIcon = await saveIcon(validatedData)

    // Revalidate relevant paths
    revalidatePath("/admin/elements")

    return { success: true, data: updatedIcon }
  } catch (error) {
    console.error("Error updating icon:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update icon",
    }
  }
}

export async function deleteIcon(id: string) {
  try {
    // Validate input
    if (!id) {
      throw new Error("Icon ID is required")
    }

    // Delete from database
    await removeIcon(id)

    // Revalidate relevant paths
    revalidatePath("/admin/elements")

    return { success: true }
  } catch (error) {
    console.error("Error deleting icon:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete icon",
    }
  }
}

