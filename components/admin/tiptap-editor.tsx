"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

interface TipTapEditorProps {
  content: string
  onChange: (content: string) => void
  editorId: string
}

export function TipTapEditor({ content, onChange, editorId }: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  if (!editor) {
    return null
  }

  return (
    <div>
      <EditorContent editor={editor} />
    </div>
  )
}

