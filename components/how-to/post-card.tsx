"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Eye, Star, ArrowRight } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { type HowToPost } from "@/lib/how-to-api"

interface PostCardProps {
  post: HowToPost
  variant?: "default" | "featured" | "compact"
  showReadMore?: boolean
}

export function PostCard({ post, variant = "default", showReadMore = true }: PostCardProps) {
  const isFeatured = variant === "featured"
  const isCompact = variant === "compact"

  return (
    <Link href={`/how-to/${post.slug}`}>
      <Card className={`group hover:shadow-lg transition-all duration-300 overflow-hidden h-full ${
        isFeatured ? "hover:shadow-xl" : ""
      }`}>
        <div className={`bg-muted rounded-t-lg overflow-hidden ${
          isFeatured ? "aspect-video" : isCompact ? "aspect-[4/3]" : "aspect-video"
        }`}>
          {post.thumbnail_url ? (
            <img
              src={post.thumbnail_url}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
              <div className={`opacity-50 ${isFeatured ? "text-4xl" : isCompact ? "text-2xl" : "text-3xl"}`}>
                {post.category.icon}
              </div>
            </div>
          )}
        </div>
        
        <CardHeader className={`${isCompact ? "pb-2" : "pb-3"}`}>
          <div className="flex items-center gap-2 mb-2">
            <Badge 
              variant="secondary" 
              style={{ backgroundColor: post.category.color + '20', color: post.category.color }}
              className="flex items-center gap-1"
            >
              <span className={`${isCompact ? "text-xs" : "text-sm"}`}>
                {post.category.icon}
              </span>
              {post.category.name}
            </Badge>
            {post.featured && (
              <Badge variant="default" className="bg-yellow-500 hover:bg-yellow-600">
                <Star className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
          </div>
          
          <CardTitle className={`line-clamp-2 group-hover:text-primary transition-colors ${
            isFeatured ? "text-lg" : isCompact ? "text-sm" : ""
          }`}>
            {post.title}
          </CardTitle>
          
          <CardDescription className={`line-clamp-3 ${
            isCompact ? "text-xs" : "text-sm"
          }`}>
            {post.excerpt}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className={`flex items-center justify-between text-muted-foreground mb-3 ${
            isCompact ? "text-xs" : "text-sm"
          }`}>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Clock className={`${isCompact ? "h-3 w-3" : "h-4 w-4"}`} />
                {post.read_time}
              </div>
              <div className="flex items-center gap-1">
                <Eye className={`${isCompact ? "h-3 w-3" : "h-4 w-4"}`} />
                {post.view_count.toLocaleString()}
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className={`text-muted-foreground ${
              isCompact ? "text-xs" : "text-xs"
            }`}>
              {formatDistanceToNow(new Date(post.published_at), { addSuffix: true })}
            </span>
            {showReadMore && (
              <Button 
                variant="ghost" 
                size="sm" 
                className={`text-primary hover:text-primary/80 ${
                  isCompact ? "h-6 px-1 text-xs" : "h-8 px-2"
                }`}
              >
                {isFeatured ? "Read More" : isCompact ? "Read" : "Read"}
                <ArrowRight className={`ml-1 ${isCompact ? "h-2 w-2" : "h-3 w-3"}`} />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
