"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { createButton, updateButton, deleteButton } from "@/lib/actions/element-actions"

// Define the button schema
const buttonSchema = z.object({
  name: z.string().min(1, "Name is required"),
  text: z.string().min(1, "Button text is required"),
  url: z.string().optional(),
  variant: z.enum(["default", "destructive", "outline", "secondary", "ghost", "link"]).default("default"),
  size: z.enum(["default", "sm", "lg", "icon"]).default("default"),
  isExternal: z.boolean().default(false),
  location: z.enum(["header", "footer", "sidebar", "content", "custom"]).default("content"),
  customLocation: z.string().optional(),
  icon: z.string().optional(),
  order: z.number().default(0),
  className: z.string().optional(),
})

type ButtonFormValues = z.infer<typeof buttonSchema>

// Mock data for initial buttons
const initialButtons = [
  {
    id: "1",
    name: "Primary CTA",
    text: "Get Started",
    url: "/signup",
    variant: "default",
    size: "lg",
    isExternal: false,
    location: "header",
    icon: "ArrowRight",
    order: 1,
    className: "ml-4",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Secondary CTA",
    text: "Learn More",
    url: "/about",
    variant: "outline",
    size: "default",
    isExternal: false,
    location: "header",
    icon: "",
    order: 2,
    className: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Contact Button",
    text: "Contact Us",
    url: "/contact",
    variant: "secondary",
    size: "default",
    isExternal: false,
    location: "footer",
    icon: "Mail",
    order: 1,
    className: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// Available icons from Lucide React
const availableIcons = [
  "",
  "ArrowRight",
  "ArrowLeft",
  "Mail",
  "Phone",
  "User",
  "Settings",
  "Home",
  "Info",
  "ExternalLink",
  "Download",
  "Upload",
  "Play",
  "Pause",
]

export function ButtonManager() {
  const [buttons, setButtons] = useState(initialButtons)
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentButton, setCurrentButton] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [locationFilter, setLocationFilter] = useState<string>("all")
  const { toast } = useToast()

  const form = useForm<ButtonFormValues>({
    resolver: zodResolver(buttonSchema),
    defaultValues: {
      name: "",
      text: "",
      url: "",
      variant: "default",
      size: "default",
      isExternal: false,
      location: "content",
      customLocation: "",
      icon: "",
      order: 0,
      className: "",
    },
  })

  const filteredButtons = buttons.filter((button) => {
    const matchesSearch =
      button.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      button.text.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesLocation = locationFilter === "all" || button.location === locationFilter

    return matchesSearch && matchesLocation
  })

  const handleCreateButton = async (data: ButtonFormValues) => {
    try {
      // In a real app, this would call the server action
      const newButton = {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      // Call server action
      await createButton(data)

      // Update local state
      setButtons([...buttons, newButton])
      setIsCreating(false)
      form.reset()

      toast({
        title: "Button created",
        description: `${data.name} has been created successfully.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create button. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleUpdateButton = async (data: ButtonFormValues) => {
    if (!currentButton) return

    try {
      // In a real app, this would call the server action
      const updatedButton = {
        ...currentButton,
        ...data,
        updatedAt: new Date().toISOString(),
      }

      // Call server action
      await updateButton(currentButton.id, data)

      // Update local state
      setButtons(buttons.map((button) => (button.id === currentButton.id ? updatedButton : button)))
      setIsEditing(false)
      setCurrentButton(null)

      toast({
        title: "Button updated",
        description: `${data.name} has been updated successfully.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update button. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteButton = async (id: string) => {
    try {
      // Call server action
      await deleteButton(id)

      // Update local state
      setButtons(buttons.filter((button) => button.id !== id))

      toast({
        title: "Button deleted",
        description: "The button has been deleted successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete button. Please try again.",
        variant: "destructive",
      })
    }
  }

  const openEditDialog = (button: any) => {
    setCurrentButton(button)
    form.reset({
      name: button.name,
      text: button.text,
      url: button.url || "",
      variant: button.variant,
      size: button.size,
      isExternal: button.isExternal,
      location: button.location,
      customLocation: button.customLocation || "",
      icon: button.icon || "",
      order: button.order,
      className: button.className || "",
    })
    setIsEditing(true)
  }

  const openCreateDialog = () => {
    form.reset({
      name: "",
      text: "",
      url: "",
      variant: "default",
      size: "default",
      isExternal: false,
      location: "content",
      customLocation: "",
      icon: "",
      order: 0,
      className: "",
    })
    setIsCreating(true)
  }

  const copyButtonCode = (button: any) => {
    const code = `<Button
  variant="${button.variant}"
  size="${button.size}"
  ${button.className ? `className="${button.className}"` : ""}
  ${button.url ? `asChild` : ""}
>
  ${button.url ? `<Link href="${button.url}" ${button.isExternal ? 'target="_blank" rel="noopener noreferrer"' : ""}>` : ""}
  ${button.icon ? `<${button.icon} className="mr-2 h-4 w-4" />` : ""}
  ${button.text}
  ${button.url ? `</Link>` : ""}
</Button>`

    navigator.clipboard.writeText(code)

    toast({
      title: "Code copied",
      description: "Button code has been copied to clipboard.",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Input
            placeholder="Search buttons..."
            className="max-w-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="header">Header</SelectItem>
              <SelectItem value="footer">Footer</SelectItem>
              <SelectItem value="sidebar">Sidebar</SelectItem>
              <SelectItem value="content">Content</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Add Button
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Button</DialogTitle>
              <DialogDescription>
                Add a new button to your website. Fill out the form below to create a button.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleCreateButton)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Button Name" {...field} />
                        </FormControl>
                        <FormDescription>Internal name for this button</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Button Text</FormLabel>
                        <FormControl>
                          <Input placeholder="Click Me" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="/destination-page" {...field} />
                      </FormControl>
                      <FormDescription>Leave empty for action buttons</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="variant"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Variant</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a variant" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="default">Default</SelectItem>
                            <SelectItem value="destructive">Destructive</SelectItem>
                            <SelectItem value="outline">Outline</SelectItem>
                            <SelectItem value="secondary">Secondary</SelectItem>
                            <SelectItem value="ghost">Ghost</SelectItem>
                            <SelectItem value="link">Link</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Size</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a size" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="default">Default</SelectItem>
                            <SelectItem value="sm">Small</SelectItem>
                            <SelectItem value="lg">Large</SelectItem>
                            <SelectItem value="icon">Icon</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a location" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="header">Header</SelectItem>
                            <SelectItem value="footer">Footer</SelectItem>
                            <SelectItem value="sidebar">Sidebar</SelectItem>
                            <SelectItem value="content">Content</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="icon"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Icon (optional)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select an icon" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {availableIcons.map((icon) => (
                              <SelectItem key={icon} value={icon}>
                                {icon || "No Icon"}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="order"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Order</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormDescription>Display order (lower numbers first)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="className"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CSS Class (optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="ml-4 mt-2" {...field} />
                        </FormControl>
                        <FormDescription>Additional Tailwind classes</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="isExternal"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>External Link</FormLabel>
                          <FormDescription>Opens in a new tab</FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  {form.watch("location") === "custom" && (
                    <FormField
                      control={form.control}
                      name="customLocation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Custom Location</FormLabel>
                          <FormControl>
                            <Input placeholder="hero-section" {...field} />
                          </FormControl>
                          <FormDescription>CSS selector or component ID</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
                <DialogFooter>
                  <Button type="submit">Create Button</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredButtons.map((button) => (
          <Card key={button.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {button.name}
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{button.location}</span>
              </CardTitle>
              <CardDescription>{button.text}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center my-2">
                <Button variant={button.variant as any} size={button.size as any} className={button.className}>
                  {button.icon && <span className="mr-2">[{button.icon}]</span>}
                  {button.text}
                </Button>
              </div>
              <div className="text-sm text-muted-foreground mt-4">
                <p>URL: {button.url || "None (Action Button)"}</p>
                <p>Order: {button.order}</p>
                {button.isExternal && <p>Opens in new tab</p>}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" onClick={() => copyButtonCode(button)}>
                <Copy className="h-4 w-4 mr-1" />
                Copy Code
              </Button>
              <div className="flex gap-2">
                <Dialog open={isEditing} onOpenChange={setIsEditing}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => openEditDialog(button)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Edit Button</DialogTitle>
                      <DialogDescription>Make changes to the button. Click save when you're done.</DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(handleUpdateButton)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Button Name" {...field} />
                                </FormControl>
                                <FormDescription>Internal name for this button</FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="text"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Button Text</FormLabel>
                                <FormControl>
                                  <Input placeholder="Click Me" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="url"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>URL (optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="/destination-page" {...field} />
                              </FormControl>
                              <FormDescription>Leave empty for action buttons</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="variant"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Variant</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a variant" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="default">Default</SelectItem>
                                    <SelectItem value="destructive">Destructive</SelectItem>
                                    <SelectItem value="outline">Outline</SelectItem>
                                    <SelectItem value="secondary">Secondary</SelectItem>
                                    <SelectItem value="ghost">Ghost</SelectItem>
                                    <SelectItem value="link">Link</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="size"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Size</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a size" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="default">Default</SelectItem>
                                    <SelectItem value="sm">Small</SelectItem>
                                    <SelectItem value="lg">Large</SelectItem>
                                    <SelectItem value="icon">Icon</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Location</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a location" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="header">Header</SelectItem>
                                    <SelectItem value="footer">Footer</SelectItem>
                                    <SelectItem value="sidebar">Sidebar</SelectItem>
                                    <SelectItem value="content">Content</SelectItem>
                                    <SelectItem value="custom">Custom</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="icon"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Icon (optional)</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select an icon" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {availableIcons.map((icon) => (
                                      <SelectItem key={icon} value={icon}>
                                        {icon || "No Icon"}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="order"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Order</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                                  />
                                </FormControl>
                                <FormDescription>Display order (lower numbers first)</FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="className"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>CSS Class (optional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="ml-4 mt-2" {...field} />
                                </FormControl>
                                <FormDescription>Additional Tailwind classes</FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="isExternal"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>External Link</FormLabel>
                                  <FormDescription>Opens in a new tab</FormDescription>
                                </div>
                              </FormItem>
                            )}
                          />
                          {form.watch("location") === "custom" && (
                            <FormField
                              control={form.control}
                              name="customLocation"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Custom Location</FormLabel>
                                  <FormControl>
                                    <Input placeholder="hero-section" {...field} />
                                  </FormControl>
                                  <FormDescription>CSS selector or component ID</FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}
                        </div>
                        <DialogFooter>
                          <Button type="submit">Save Changes</Button>
                        </DialogFooter>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteButton(button.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

