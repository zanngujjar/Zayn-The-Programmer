"use client"

import { BlogContentItem } from "@/lib/blog/content"

interface MarkdownContentProps {
  content: BlogContentItem[]
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-foreground prose-a:text-primary prose-strong:text-foreground prose-code:text-foreground prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted prose-pre:border">
      {content.map((item, index) => {
        switch (item.type) {
          case 'paragraph':
            return (
              <p key={index} dangerouslySetInnerHTML={{ __html: item.text || '' }} />
            )
          case 'heading':
            const HeadingTag = `h${item.level || 2}` as keyof JSX.IntrinsicElements
            return (
              <HeadingTag key={index} className="font-bold text-foreground">
                {item.text}
              </HeadingTag>
            )
          case 'code':
            return (
              <pre key={index} className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code className={`language-${item.language || 'javascript'}`}>
                  {item.code}
                </code>
              </pre>
            )
          case 'image':
            return (
              <img 
                key={index} 
                src={item.src} 
                alt={item.alt || ''} 
                className="max-w-full h-auto rounded-lg"
              />
            )
          default:
            return null
        }
      })}
    </div>
  )
}