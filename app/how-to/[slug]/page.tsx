"use client"

import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Suspense } from "react"
import { Navigation } from "@/components/navigation"
import { MarkdownContent } from "@/components/blog/markdown-content"
import { HeaderAd, SidebarAd, FooterAd } from "@/components/blog/ad-space"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useBlogPost } from "@/hooks/use-blog-post"
import { useBlogData } from "@/hooks/use-blog-data"
import { Calendar, Clock, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from "lucide-react"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { post, loading: postLoading, error: postError } = useBlogPost(params.slug)
  const { posts: allPosts } = useBlogData()

  if (postError) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Post</h1>
            <p className="text-muted-foreground">{postError}</p>
          </div>
        </div>
      </div>
    )
  }

  if (postLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-muted rounded w-1/2 mb-8"></div>
            <div className="h-64 bg-muted rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
              <div className="h-4 bg-muted rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    notFound()
  }

  // Get related posts based on shared tags
  const relatedPosts = allPosts
    .filter(p => p.slug !== post.slug && p.tags.some(tag => post.tags.includes(tag)))
    .slice(0, 3)

  // Get previous and next posts
  const currentIndex = allPosts.findIndex(p => p.slug === post.slug)
  const previousPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null

  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://your-domain.com'}/how-to/${post.slug}`

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header Ad */}
      <div className="container mx-auto px-4 pt-8">
        <HeaderAd />
      </div>

      {/* Back Navigation */}
      <div className="container mx-auto px-4 py-6">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/how-to" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to How To Guides
          </Link>
        </Button>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <article className="flex-1 max-w-4xl">
            {/* Post Header */}
            <header className="mb-8">
              {/* Featured Image */}
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-6">
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                />
                {post.featured && (
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                    Featured
                  </Badge>
                )}
              </div>

              {/* Post Meta */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-playfair leading-tight">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Social Share */}
                <div className="flex items-center gap-2 pt-4">
                  <Share2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground mr-2">Share:</span>
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Facebook className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </header>

            {/* Post Content */}
            <Suspense fallback={<div className="animate-pulse bg-muted h-96 rounded"></div>}>
              <MarkdownContent content={post.content} />
            </Suspense>

            {/* Post Navigation */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-12 pt-8 border-t">
              {previousPost ? (
                <Button variant="outline" asChild className="justify-start">
                  <Link href={`/how-to/${previousPost.id}`} className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    <div className="text-left">
                      <div className="text-xs text-muted-foreground">Previous</div>
                      <div className="font-medium">{previousPost.title}</div>
                    </div>
                  </Link>
                </Button>
              ) : (
                <div />
              )}

              {nextPost && (
                <Button variant="outline" asChild className="justify-end">
                  <Link href={`/how-to/${nextPost.id}`} className="flex items-center gap-2">
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">Next</div>
                      <div className="font-medium">{nextPost.title}</div>
                    </div>
                    <ArrowLeft className="h-4 w-4 rotate-180" />
                  </Link>
                </Button>
              )}
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Related Guides</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Card key={relatedPost.id} className="group hover:shadow-lg transition-all">
                      <Link href={`/how-to/${relatedPost.id}`}>
                        <CardHeader className="p-0">
                          <div className="relative aspect-[16/9] rounded-t-lg overflow-hidden">
                            <Image
                              src={relatedPost.thumbnail}
                              alt={relatedPost.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>
                        </CardHeader>
                        <CardContent className="p-4">
                          <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                            {relatedPost.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                            {relatedPost.excerpt}
                          </p>
                          <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                            <span>{new Date(relatedPost.publishDate).toLocaleDateString()}</span>
                            <span>{relatedPost.readTime}</span>
                          </div>
                        </CardContent>
                      </Link>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Ad */}
            <div className="mt-12">
              <FooterAd />
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:w-80 space-y-6">
            {/* Sidebar Ad */}
            <div className="hidden lg:block">
              <SidebarAd />
            </div>

            {/* Post Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Post Overview</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p className="text-muted-foreground">
                  This comprehensive guide covers the key concepts and practical implementation details you need to know.
                </p>
              </CardContent>
            </Card>

            {/* Author Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">About the Author</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{post.author}</h4>
                    <p className="text-sm text-muted-foreground">Developer & Educator</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Passionate about creating comprehensive guides and tutorials to help developers learn and grow.
                </p>
              </CardContent>
            </Card>

            {/* Post Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Post Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Category:</span>
                  <Badge variant="outline">{post.category}</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Reading Time:</span>
                  <span>{post.readTime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Published:</span>
                  <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  )
}