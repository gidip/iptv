"use client"

import { useState } from "react"
import { Loader2, Plus, Save, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { updateNavigation } from "@/lib/actions/content-actions"

type NavItem = {
  id: string
  label: string
  url: string
  isExternal: boolean
  order: number
}

type NavSection = "header" | "footer"

export function NavigationManager() {
  const [activeTab, setActiveTab] = useState<NavSection>("header")
  const [isLoading, setIsLoading] = useState(false)

  const [headerNavItems, setHeaderNavItems] = useState<NavItem[]>([
    { id: "home", label: "Home", url: "/", isExternal: false, order: 0 },
    { id: "channels", label: "Channels", url: "/channels", isExternal: false, order: 1 },
    { id: "pricing", label: "Pricing", url: "/pricing", isExternal: false, order: 2 },
    { id: "contact", label: "Contact", url: "/contact", isExternal: false, order: 3 },
  ])

  const [footerNavItems, setFooterNavItems] = useState<NavItem[]>([
    { id: "about", label: "About Us", url: "/about", isExternal: false, order: 0 },
    { id: "terms", label: "Terms of Service", url: "/terms", isExternal: false, order: 1 },
    { id: "privacy", label: "Privacy Policy", url: "/privacy", isExternal: false, order: 2 },
    { id: "support", label: "Support", url: "/support", isExternal: false, order: 3 },
  ])

  const getNavItems = () => {
    return activeTab === "header" ? headerNavItems : footerNavItems
  }

  const setNavItems = (items: NavItem[]) => {
    if (activeTab === "header") {
      setHeaderNavItems(items)
    } else {
      setFooterNavItems(items)
    }
  }

  const addNavItem = () => {
    const newId = `nav-${Date.now()}`
    const newItem: NavItem = {
      id: newId,
      label: "New Link",
      url: "/",
      isExternal: false,
      order: getNavItems().length,
    }
    setNavItems([...getNavItems(), newItem])
  }

  const updateNavItem = (id: string, updates: Partial<NavItem>) => {
    setNavItems(getNavItems().map((item) => (item.id === id ? { ...item, ...updates } : item)))
  }

  const removeNavItem = (id: string) => {
    setNavItems(getNavItems().filter((item) => item.id !== id))
  }

  const moveNavItem = (id: string, direction: "up" | "down") => {
    const items = [...getNavItems()]
    const index = items.findIndex((item) => item.id === id)

    if (index === -1) return

    if (direction === "up" && index > 0) {
      ;[items[index - 1], items[index]] = [items[index], items[index - 1]]
    } else if (direction === "down" && index < items.length - 1) {
      ;[items[index], items[index + 1]] = [items[index + 1], items[index]]
    }

    // Update order property
    const updatedItems = items.map((item, idx) => ({
      ...item,
      order: idx,
    }))

    setNavItems(updatedItems)
  }

  const saveNavigation = async () => {
    try {
      setIsLoading(true)
      await updateNavigation({
        header: headerNavItems,
        footer: footerNavItems,
      })
      toast({
        title: "Navigation updated",
        description: "Your navigation changes have been saved successfully.",
      })
    } catch (error) {
      console.error("Error saving navigation:", error)
      toast({
        title: "Error updating navigation",
        description: "There was a problem saving your navigation changes. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Navigation Management</CardTitle>
            <CardDescription>Manage the navigation links in your header and footer.</CardDescription>
          </div>
          <Button onClick={saveNavigation} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as NavSection)}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="header">Header Navigation</TabsTrigger>
            <TabsTrigger value="footer">Footer Navigation</TabsTrigger>
          </TabsList>

          <TabsContent value="header" className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={addNavItem} variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Link
              </Button>
            </div>

            {headerNavItems.map((item, index) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="p-4 bg-gray-50 flex flex-row items-center justify-between">
                  <Label className="font-medium">Navigation Link {index + 1}</Label>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => moveNavItem(item.id, "up")}
                      disabled={index === 0}
                    >
                      <span className="sr-only">Move up</span>↑
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => moveNavItem(item.id, "down")}
                      disabled={index === headerNavItems.length - 1}
                    >
                      <span className="sr-only">Move down</span>↓
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeNavItem(item.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4 grid gap-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`label-${item.id}`}>Label</Label>
                      <Input
                        id={`label-${item.id}`}
                        value={item.label}
                        onChange={(e) => updateNavItem(item.id, { label: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`url-${item.id}`}>URL</Label>
                      <Input
                        id={`url-${item.id}`}
                        value={item.url}
                        onChange={(e) => updateNavItem(item.id, { url: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id={`external-${item.id}`}
                      checked={item.isExternal}
                      onCheckedChange={(checked) => updateNavItem(item.id, { isExternal: checked })}
                    />
                    <Label htmlFor={`external-${item.id}`}>Open in new tab</Label>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="footer" className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={addNavItem} variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Link
              </Button>
            </div>

            {footerNavItems.map((item, index) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="p-4 bg-gray-50 flex flex-row items-center justify-between">
                  <Label className="font-medium">Navigation Link {index + 1}</Label>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => moveNavItem(item.id, "up")}
                      disabled={index === 0}
                    >
                      <span className="sr-only">Move up</span>↑
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => moveNavItem(item.id, "down")}
                      disabled={index === footerNavItems.length - 1}
                    >
                      <span className="sr-only">Move down</span>↓
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeNavItem(item.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4 grid gap-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`label-${item.id}`}>Label</Label>
                      <Input
                        id={`label-${item.id}`}
                        value={item.label}
                        onChange={(e) => updateNavItem(item.id, { label: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`url-${item.id}`}>URL</Label>
                      <Input
                        id={`url-${item.id}`}
                        value={item.url}
                        onChange={(e) => updateNavItem(item.id, { url: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id={`external-${item.id}`}
                      checked={item.isExternal}
                      onCheckedChange={(checked) => updateNavItem(item.id, { isExternal: checked })}
                    />
                    <Label htmlFor={`external-${item.id}`}>Open in new tab</Label>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

