"use client"

import { useState } from "react"
import { Plus, Trash2, Edit, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { createIcon, updateIcon, deleteIcon } from "@/lib/actions/element-actions"

// Define icon types
type Icon = {
  id: string
  name: string
  iconKey: string
  category: string
}

// Sample icon data - in a real app, this would come from your database
const initialIcons: Icon[] = [
  { id: "1", name: "Home", iconKey: "home", category: "navigation" },
  { id: "2", name: "Settings", iconKey: "settings", category: "system" },
  { id: "3", name: "User", iconKey: "user", category: "user" },
  { id: "4", name: "Play", iconKey: "play", category: "media" },
]

// Available icon options (this would typically be a more comprehensive list)
const availableIcons = [
  { key: "home", name: "Home" },
  { key: "settings", name: "Settings" },
  { key: "user", name: "User" },
  { key: "play", name: "Play" },
  { key: "pause", name: "Pause" },
  { key: "fast-forward", name: "Fast Forward" },
  { key: "rewind", name: "Rewind" },
  { key: "menu", name: "Menu" },
  { key: "search", name: "Search" },
  { key: "heart", name: "Heart" },
  { key: "star", name: "Star" },
  { key: "info", name: "Info" },
]

// Available categories
const categories = ["navigation", "system", "user", "media", "social", "other"]

export function IconManager() {
  const [icons, setIcons] = useState<Icon[]>(initialIcons)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentIcon, setCurrentIcon] = useState<Icon | null>(null)
  const [newIcon, setNewIcon] = useState({
    name: "",
    iconKey: "",
    category: "navigation",
  })
  const { toast } = useToast()

  // Handle creating a new icon
  const handleCreateIcon = async () => {
    try {
      // Generate a temporary ID for the UI (in a real app, this would come from the database)
      const tempId = Date.now().toString()
      const iconToAdd = { id: tempId, ...newIcon }

      // Update local state
      setIcons([...icons, iconToAdd])

      // Call server action
      await createIcon(newIcon)

      // Reset form and close dialog
      setNewIcon({ name: "", iconKey: "", category: "navigation" })
      setIsAddDialogOpen(false)

      toast({
        title: "Icon created",
        description: `The icon "${newIcon.name}" has been created successfully.`,
      })
    } catch (error) {
      toast({
        title: "Error creating icon",
        description: "There was a problem creating the icon. Please try again.",
        variant: "destructive",
      })
      console.error("Error creating icon:", error)
    }
  }

  // Handle updating an icon
  const handleUpdateIcon = async () => {
    if (!currentIcon) return

    try {
      // Update local state
      const updatedIcons = icons.map((icon) => (icon.id === currentIcon.id ? currentIcon : icon))
      setIcons(updatedIcons)

      // Call server action
      await updateIcon(currentIcon)

      // Close dialog
      setIsEditDialogOpen(false)

      toast({
        title: "Icon updated",
        description: `The icon "${currentIcon.name}" has been updated successfully.`,
      })
    } catch (error) {
      toast({
        title: "Error updating icon",
        description: "There was a problem updating the icon. Please try again.",
        variant: "destructive",
      })
      console.error("Error updating icon:", error)
    }
  }

  // Handle deleting an icon
  const handleDeleteIcon = async () => {
    if (!currentIcon) return

    try {
      // Update local state
      const filteredIcons = icons.filter((icon) => icon.id !== currentIcon.id)
      setIcons(filteredIcons)

      // Call server action
      await deleteIcon(currentIcon.id)

      // Close dialog
      setIsDeleteDialogOpen(false)

      toast({
        title: "Icon deleted",
        description: `The icon "${currentIcon.name}" has been deleted successfully.`,
      })
    } catch (error) {
      toast({
        title: "Error deleting icon",
        description: "There was a problem deleting the icon. Please try again.",
        variant: "destructive",
      })
      console.error("Error deleting icon:", error)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Icon Manager</CardTitle>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Icon
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Icon</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Icon Name</Label>
                <Input
                  id="name"
                  value={newIcon.name}
                  onChange={(e) => setNewIcon({ ...newIcon, name: e.target.value })}
                  placeholder="e.g., Home Button Icon"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="icon">Icon</Label>
                <Select value={newIcon.iconKey} onValueChange={(value) => setNewIcon({ ...newIcon, iconKey: value })}>
                  <SelectTrigger id="icon">
                    <SelectValue placeholder="Select an icon" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableIcons.map((icon) => (
                      <SelectItem key={icon.key} value={icon.key}>
                        {icon.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select value={newIcon.category} onValueChange={(value) => setNewIcon({ ...newIcon, category: value })}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateIcon}>Create Icon</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {icons.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              No icons found. Add your first icon to get started.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {icons.map((icon) => (
                <div key={icon.id} className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center space-x-3">
                    {/* This would render the actual icon in a real implementation */}
                    <div className="w-8 h-8 flex items-center justify-center bg-muted rounded-md">
                      {icon.iconKey === "home" && <Plus className="h-5 w-5" />}
                      {icon.iconKey === "settings" && <Trash2 className="h-5 w-5" />}
                      {icon.iconKey === "user" && <Edit className="h-5 w-5" />}
                      {icon.iconKey === "play" && <Check className="h-5 w-5" />}
                      {icon.iconKey === "pause" && <X className="h-5 w-5" />}
                      {/* Add more icon mappings as needed */}
                    </div>
                    <div>
                      <div className="font-medium">{icon.name}</div>
                      <div className="text-xs text-muted-foreground">{icon.category}</div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Dialog
                      open={isEditDialogOpen && currentIcon?.id === icon.id}
                      onOpenChange={(open) => {
                        setIsEditDialogOpen(open)
                        if (open) setCurrentIcon(icon)
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Icon</DialogTitle>
                        </DialogHeader>
                        {currentIcon && (
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="edit-name">Icon Name</Label>
                              <Input
                                id="edit-name"
                                value={currentIcon.name}
                                onChange={(e) =>
                                  setCurrentIcon({
                                    ...currentIcon,
                                    name: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="edit-icon">Icon</Label>
                              <Select
                                value={currentIcon.iconKey}
                                onValueChange={(value) =>
                                  setCurrentIcon({
                                    ...currentIcon,
                                    iconKey: value,
                                  })
                                }
                              >
                                <SelectTrigger id="edit-icon">
                                  <SelectValue placeholder="Select an icon" />
                                </SelectTrigger>
                                <SelectContent>
                                  {availableIcons.map((icon) => (
                                    <SelectItem key={icon.key} value={icon.key}>
                                      {icon.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="edit-category">Category</Label>
                              <Select
                                value={currentIcon.category}
                                onValueChange={(value) =>
                                  setCurrentIcon({
                                    ...currentIcon,
                                    category: value,
                                  })
                                }
                              >
                                <SelectTrigger id="edit-category">
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                  {categories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                      {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        )}
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleUpdateIcon}>Save Changes</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Dialog
                      open={isDeleteDialogOpen && currentIcon?.id === icon.id}
                      onOpenChange={(open) => {
                        setIsDeleteDialogOpen(open)
                        if (open) setCurrentIcon(icon)
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Delete Icon</DialogTitle>
                        </DialogHeader>
                        <div className="py-4">
                          <p>Are you sure you want to delete the icon "{icon.name}"? This action cannot be undone.</p>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button variant="destructive" onClick={handleDeleteIcon}>
                            Delete
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

