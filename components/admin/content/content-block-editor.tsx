"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Grip, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TipTapEditor } from "@/components/admin/tiptap-editor"
import type { ContentBlock } from "@/app/admin/content/page"

interface ContentBlockEditorProps {
  block: ContentBlock
  updateBlock: (id: string, block: Partial<ContentBlock>) => void
  removeBlock: (id: string) => void
  index: number
  moveBlock: (startIndex: number, endIndex: number) => void
  isLast: boolean
}

export function ContentBlockEditor({
  block,
  updateBlock,
  removeBlock,
  index,
  moveBlock,
  isLast,
}: ContentBlockEditorProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const handleContentChange = (content: string) => {
    updateBlock(block.id, { content })
  }

  const moveUp = () => {
    if (index > 0) {
      moveBlock(index, index - 1)
    }
  }

  const moveDown = () => {
    if (!isLast) {
      moveBlock(index, index + 1)
    }
  }

  return (
    <Card className="border border-gray-200">
      <CardHeader className="p-4 bg-gray-50 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="cursor-grab">
            <Grip className="h-4 w-4" />
            <span className="sr-only">Drag to reorder</span>
          </Button>
          <Input
            value={block.title}
            onChange={(e) => updateBlock(block.id, { title: e.target.value })}
            className="h-8 w-48 font-medium"
          />
          <Select
            value={block.type}
            onValueChange={(value) => updateBlock(block.id, { type: value as ContentBlock["type"] })}
          >
            <SelectTrigger className="w-32 h-8">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hero">Hero</SelectItem>
              <SelectItem value="features">Features</SelectItem>
              <SelectItem value="testimonials">Testimonials</SelectItem>
              <SelectItem value="pricing">Pricing</SelectItem>
              <SelectItem value="cta">Call to Action</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={moveUp} disabled={index === 0}>
            <ChevronUp className="h-4 w-4" />
            <span className="sr-only">Move up</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={moveDown} disabled={isLast}>
            <ChevronDown className="h-4 w-4" />
            <span className="sr-only">Move down</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsExpanded(!isExpanded)}>
            <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
            <span className="sr-only">{isExpanded ? "Collapse" : "Expand"}</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeBlock(block.id)}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="p-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor={`content-${block.id}`}>Content</Label>
              <div className="mt-1 border rounded-md">
                <TipTapEditor content={block.content} onChange={handleContentChange} editorId={`content-${block.id}`} />
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

