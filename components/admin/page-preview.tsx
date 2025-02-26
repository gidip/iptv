"use client"

interface PagePreviewProps {
  content: string
}

export function PagePreview({ content }: PagePreviewProps) {
  return (
    <div className="border rounded-md p-4 min-h-[400px] prose prose-sm max-w-none">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}

