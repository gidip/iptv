"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageManager } from "@/components/admin/elements/page-manager"
import { ButtonManager } from "@/components/admin/elements/button-manager"
import { IconManager } from "@/components/admin/elements/icon-manager"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"

export default function ElementsPage() {
  const [activeTab, setActiveTab] = useState("pages")

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <Heading title="Website Elements" description="Manage pages, buttons, and icons across your website" />
      </div>
      <Separator />
      <Tabs defaultValue="pages" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="buttons">Buttons</TabsTrigger>
          <TabsTrigger value="icons">Icons</TabsTrigger>
        </TabsList>
        <TabsContent value="pages" className="space-y-4">
          <PageManager />
        </TabsContent>
        <TabsContent value="buttons" className="space-y-4">
          <ButtonManager />
        </TabsContent>
        <TabsContent value="icons" className="space-y-4">
          <IconManager />
        </TabsContent>
      </Tabs>
    </div>
  )
}

