"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Clock, Eye, ArrowRight, Star } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { type HowToPost } from "@/lib/how-to-api"

interface SectionCarouselProps {
  title: string
  posts: HowToPost[]
  loading?: boolean
  showViewAll?: boolean
  viewAllHref?: string
  icon?: React.ReactNode
}

export function SectionCarousel({ 
  title, 
  posts, 
  loading = false, 
  showViewAll = true, 
  viewAllHref,
  icon 
}: SectionCarouselProps) {
  const [api, setApi] = useState<any>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  if (loading) {
    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            {icon && <div className="text-primary">{icon}</div>}
            <h3 className="text-xl font-semibold text-foreground">{title}</h3>
          </div>
        </div>
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-80">
              <div className="animate-pulse">
                <div className="bg-muted rounded-lg h-40 mb-3"></div>
                <div className="space-y-2">
                  <div className="bg-muted h-4 rounded w-3/4"></div>
                  <div className="bg-muted h-3 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            {icon && <div className="text-primary">{icon}</div>}
            <h3 className="text-xl font-semibold text-foreground">{title}</h3>
          </div>
        </div>
        <div className="text-center py-8">
          <div className="text-3xl mb-3">📝</div>
          <p className="text-muted-foreground">No posts available in this section.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          {icon && <div className="text-primary">{icon}</div>}
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        </div>
        {showViewAll && viewAllHref && (
          <Link href={viewAllHref}>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
              View All
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        )}
      </div>

      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: "start",
          loop: false,
          skipSnaps: false,
          dragFree: true,
          containScroll: "trimSnaps",
          breakpoints: {
            "(min-width: 768px)": { slidesToScroll: 2 },
            "(min-width: 1024px)": { slidesToScroll: 3 },
          },
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {posts.map((post) => (
            <CarouselItem key={post.id} className="pl-2 md:pl-4 basis-80 md:basis-1/2 lg:basis-1/3">
              <Link href={`/how-to/${post.slug}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden h-full">
                  <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                    {post.thumbnail_url ? (
                      <img
                        src={post.thumbnail_url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                        <div className="text-3xl opacity-50">{post.category.icon}</div>
                      </div>
                    )}
                  </div>
                  
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge 
                        variant="secondary" 
                        style={{ backgroundColor: post.category.color + '20', color: post.category.color }}
                        className="flex items-center gap-1"
                      >
                        <span className="text-sm">{post.category.icon}</span>
                        {post.category.name}
                      </Badge>
                      {post.featured && (
                        <Badge variant="default" className="bg-yellow-500 hover:bg-yellow-600">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>
                    
                    <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    
                    <CardDescription className="line-clamp-3 text-sm">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {post.read_time}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {post.view_count.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(post.published_at), { addSuffix: true })}
                      </span>
                      <Button variant="ghost" size="sm" className="h-8 px-2 text-primary hover:text-primary/80">
                        Read
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <CarouselPrevious className="hidden md:flex -left-12" />
        <CarouselNext className="hidden md:flex -right-12" />
      </Carousel>
    </div>
  )
}
