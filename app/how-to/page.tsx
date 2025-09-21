"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Clock, Eye, Star, Filter } from "lucide-react"
import Link from "next/link"
import { getHowToPosts, getFeaturedHowToPosts, type HowToPost, type HowToApiParams } from "@/lib/how-to-api"
import { formatDistanceToNow } from "date-fns"

export default function HowToPage() {
  const [posts, setPosts] = useState<HowToPost[]>([])
  const [featuredPosts, setFeaturedPosts] = useState<HowToPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<HowToApiParams['sort']>("featured")
  const [currentPage, setCurrentPage] = useState(1)
  const [showFeatured, setShowFeatured] = useState(true)

  const loadPosts = async (params: HowToApiParams = {}) => {
    setLoading(true)
    try {
      const [allPosts, featured] = await Promise.all([
        getHowToPosts({ ...params, limit: 20 }),
        getFeaturedHowToPosts(1, 6)
      ])
      
      setPosts(allPosts)
      setFeaturedPosts(featured)
    } catch (error) {
      console.error("Error loading posts:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPosts({ sort: sortBy })
  }, [sortBy])

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadPosts({ sort: sortBy })
      return
    }

    setLoading(true)
    try {
      // For now, we'll filter client-side since the API doesn't have search
      // In a real implementation, you'd want server-side search
      const allPosts = await getHowToPosts({ sort: sortBy, limit: 100 })
      const filteredPosts = allPosts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.name.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      setPosts(filteredPosts)
    } catch (error) {
      console.error("Error searching posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const displayPosts = showFeatured && !searchQuery ? featuredPosts : posts

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-playfair">
            How-To Guides
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn from expert tutorials and step-by-step guides. Master new skills with our comprehensive how-to articles.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search how-to guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10"
            />
          </div>
          <Button onClick={handleSearch} className="sm:w-auto">
            Search
          </Button>
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as HowToApiParams['sort'])}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="recent">Recent</SelectItem>
                <SelectItem value="popular">Popular</SelectItem>
                <SelectItem value="views">Most Views</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant={showFeatured ? "default" : "outline"}
              onClick={() => setShowFeatured(!showFeatured)}
              className="flex items-center gap-2"
            >
              <Star className="h-4 w-4" />
              Featured
            </Button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Posts Grid */}
        {!loading && (
          <>
            {displayPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  {searchQuery ? "No posts found matching your search." : "No posts available at the moment."}
                </p>
              </div>
            ) : (
              <>
                {showFeatured && !searchQuery && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                      <Star className="h-6 w-6 text-yellow-500" />
                      Featured Guides
                    </h2>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayPosts.map((post) => (
                    <Card key={post.id} className="group hover:shadow-lg transition-shadow duration-300">
                      <Link href={`/how-to/${post.slug}`}>
                        <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                          {post.thumbnail_url ? (
                            <img
                              src={post.thumbnail_url}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                              <div className="text-4xl opacity-50">{post.category.icon}</div>
                            </div>
                          )}
                        </div>
                        <CardHeader>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge 
                              variant="secondary" 
                              style={{ backgroundColor: post.category.color + '20', color: post.category.color }}
                            >
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
                          <CardDescription className="line-clamp-3">
                            {post.excerpt}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {post.read_time}
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                {post.view_count.toLocaleString()}
                              </div>
                            </div>
                            <div>
                              {formatDistanceToNow(new Date(post.published_at), { addSuffix: true })}
                            </div>
                          </div>
                          
                          {post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-3">
                              {post.tags.slice(0, 3).map((tag) => (
                                <Badge
                                  key={tag.id}
                                  variant="outline"
                                  className="text-xs"
                                  style={{ borderColor: tag.color + '40', color: tag.color }}
                                >
                                  {tag.name}
                                </Badge>
                              ))}
                              {post.tags.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{post.tags.length - 3}
                                </Badge>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Link>
                    </Card>
                  ))}
                </div>

                {/* Load More Button */}
                {!showFeatured && posts.length >= 20 && (
                  <div className="text-center mt-12">
                    <Button 
                      onClick={() => setCurrentPage(prev => prev + 1)}
                      variant="outline"
                      size="lg"
                    >
                      Load More Posts
                    </Button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </main>
      
      <Footer />
    </div>
  )
}
