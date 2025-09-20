"use client"

import Image from "next/image"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import { InContentAd } from "./ad-space"
import type { BlogContentItem } from "@/lib/blog-posts"

interface BlogContentProps {
  content: BlogContentItem[]
  showAds?: boolean
}

export function BlogContent({ content, showAds = true }: BlogContentProps) {
  const renderContentItem = (item: BlogContentItem, index: number) => {
    switch (item.type) {
      case "paragraph":
        return (
          <div key={index} className="mb-6">
            <p
              className="text-foreground leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: item.text?.replace(/\n\n•/g, "<br/><br/>•") || ""
              }}
            />
            {/* Insert ad after every 3rd paragraph */}
            {showAds && (index + 1) % 3 === 0 && index > 0 && (
              <div className="my-8">
                <InContentAd />
              </div>
            )}
          </div>
        )

      case "heading":
        const HeadingTag = `h${item.level || 2}` as keyof JSX.IntrinsicElements
        const headingClasses = {
          1: "text-3xl font-bold mb-6 mt-8",
          2: "text-2xl font-bold mb-4 mt-8",
          3: "text-xl font-semibold mb-3 mt-6",
          4: "text-lg font-semibold mb-2 mt-4",
          5: "text-base font-semibold mb-2 mt-4",
          6: "text-sm font-semibold mb-2 mt-4"
        }

        return (
          <HeadingTag
            key={index}
            className={headingClasses[item.level as keyof typeof headingClasses] || headingClasses[2]}
          >
            {item.text}
          </HeadingTag>
        )

      case "code":
        return (
          <div key={index} className="mb-6">
            <div className="rounded-lg overflow-hidden border">
              <SyntaxHighlighter
                language={item.language || "javascript"}
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  padding: "1rem",
                  fontSize: "0.875rem",
                  lineHeight: "1.5"
                }}
                showLineNumbers
              >
                {item.code || ""}
              </SyntaxHighlighter>
            </div>
          </div>
        )

      case "image":
        return (
          <div key={index} className="mb-6">
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src={item.src || ""}
                alt={item.alt || ""}
                width={800}
                height={400}
                className="w-full h-auto"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
            {item.alt && (
              <p className="text-sm text-muted-foreground text-center mt-2 italic">
                {item.alt}
              </p>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="prose prose-lg max-w-none">
      {content.map((item, index) => renderContentItem(item, index))}
    </div>
  )
}