"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Clock, Eye, Star, Share2, BookOpen, User } from "lucide-react"
import Link from "next/link"
import { getHowToPost, trackHowToPostView, type HowToPost } from "@/lib/how-to-api"
import { sanitizeContent } from "@/lib/how-to-utils"
import { formatDistanceToNow } from "date-fns"
import { notFound } from "next/navigation"

export default function HowToPostPage() {
  const params = useParams()
  const slug = params.slug as string
  
  const [post, setPost] = useState<HowToPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) return
      
      setLoading(true)
      setError(false)
      
      try {
        const postData = await getHowToPost(slug)
        
        if (!postData) {
          setError(true)
          return
        }
        
        setPost(postData)
        
        // Track the view
        await trackHowToPostView(slug, {
          user_agent: navigator.userAgent,
          referrer: document.referrer,
        })
      } catch (err) {
        console.error("Error loading post:", err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [slug])

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      // You could add a toast notification here
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/how-to">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to How-To Guides
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            {/* Category and Featured Badge */}
            <div className="flex items-center gap-2 mb-4">
              <Badge 
                variant="secondary" 
                style={{ backgroundColor: post.category.color + '20', color: post.category.color }}
                className="flex items-center gap-1"
              >
                <span className="text-lg">{post.category.icon}</span>
                {post.category.name}
              </Badge>
              {post.featured && (
                <Badge variant="default" className="bg-yellow-500 hover:bg-yellow-600">
                  <Star className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-playfair leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.read_time}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>{post.view_count.toLocaleString()} views</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>Published {formatDistanceToNow(new Date(post.published_at), { addSuffix: true })}</span>
              </div>
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant="outline"
                    style={{ borderColor: tag.color + '40', color: tag.color }}
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            )}

            {/* Share Button */}
            <div className="flex justify-end mb-8">
              <Button onClick={handleShare} variant="outline" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>

            <Separator className="mb-8" />
          </header>

          {/* Featured Image */}
          {post.thumbnail_url && (
            <div className="mb-8">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <img
                  src={post.thumbnail_url}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <div 
              className="article-content"
              dangerouslySetInnerHTML={{ 
                __html: post.content 
                  ? sanitizeContent(post.content) 
                  : `
                    <div class="text-center py-12">
                      <div class="text-4xl mb-4">📝</div>
                      <h3 class="text-2xl font-semibold mb-2">Content Loading...</h3>
                      <p class="text-muted-foreground">The article content will be displayed here once available.</p>
                    </div>
                  `
              }}
            />
          </div>

          {/* Article Footer */}
          <footer className="mt-12 pt-8 border-t">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">By {post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(post.published_at), { addSuffix: true })}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Category:</span>
                <Badge 
                  variant="secondary" 
                  style={{ backgroundColor: post.category.color + '20', color: post.category.color }}
                >
                  {post.category.name}
                </Badge>
              </div>
            </div>
          </footer>
        </article>
      </main>
      
      <Footer />
    </div>
  )
}
