"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User } from "lucide-react"
import type { BlogPost } from "@/lib/blog-posts"

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link href={`/how-to/${post.id}`}>
        <CardHeader className="p-0">
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {post.featured && (
              <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                Featured
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>

          <p className="text-muted-foreground mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.publishDate).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}