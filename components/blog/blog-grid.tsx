"use client"

import { BlogCard } from "./blog-card"
import type { BlogPost } from "@/lib/blog-posts"

interface BlogGridProps {
  posts: BlogPost[]
  className?: string
}

export function BlogGrid({ posts, className = "" }: BlogGridProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-muted-foreground mb-2">
          No posts found
        </h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    )
  }

  return (
    <div className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  )
}