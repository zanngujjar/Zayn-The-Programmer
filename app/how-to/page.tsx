"use client"

import { useState, useMemo } from "react"
import { BlogGrid } from "@/components/blog/blog-grid"
import { SearchFilter } from "@/components/blog/search-filter"
import { BlogPagination } from "@/components/blog/blog-pagination"
import { HeaderAd, SidebarAd } from "@/components/blog/ad-space"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { blogPosts, getFeaturedPosts, searchPosts, getPostsByCategory, getPostsByTag } from "@/lib/blog-posts"
import { Star, BookOpen, TrendingUp } from "lucide-react"

const POSTS_PER_PAGE = 6

export default function HowToPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("date")
  const [currentPage, setCurrentPage] = useState(1)

  const featuredPosts = getFeaturedPosts()

  const filteredPosts = useMemo(() => {
    let posts = [...blogPosts]

    // Apply search
    if (searchQuery) {
      posts = searchPosts(searchQuery)
    }

    // Apply category filter
    if (selectedCategory) {
      posts = posts.filter(post => post.category === selectedCategory)
    }

    // Apply tags filter
    if (selectedTags.length > 0) {
      posts = posts.filter(post =>
        selectedTags.every(tag => post.tags.includes(tag))
      )
    }

    // Apply sorting
    posts.sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title)
        case "readTime":
          const aTime = parseInt(a.readTime.split(" ")[0])
          const bTime = parseInt(b.readTime.split(" ")[0])
          return aTime - bTime
        case "date":
        default:
          return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      }
    })

    return posts
  }, [searchQuery, selectedCategory, selectedTags, sortBy])

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  // Reset page when filters change
  useMemo(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory, selectedTags])

  return (
    <div className="min-h-screen bg-background">
      {/* Header Ad */}
      <div className="container mx-auto px-4 pt-8">
        <HeaderAd />
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-playfair">
            How To Guides
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tutorials and guides to help you master web development,
            programming concepts, and build amazing projects.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Guides</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{blogPosts.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Featured</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{featuredPosts.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Array.from(new Set(blogPosts.map(post => post.category))).length}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Featured Posts Section */}
            {featuredPosts.length > 0 && !searchQuery && !selectedCategory && selectedTags.length === 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                  <Star className="h-5 w-5 text-primary" />
                  <h2 className="text-2xl font-bold">Featured Guides</h2>
                </div>
                <BlogGrid posts={featuredPosts} />
              </div>
            )}

            {/* Search and Filters */}
            <div className="mb-8">
              <SearchFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            </div>

            {/* Results Summary */}
            <div className="mb-6">
              <p className="text-muted-foreground">
                {filteredPosts.length === 0
                  ? "No guides found"
                  : `Showing ${paginatedPosts.length} of ${filteredPosts.length} guide${filteredPosts.length === 1 ? '' : 's'}`
                }
              </p>
            </div>

            {/* Posts Grid */}
            <BlogGrid posts={paginatedPosts} />

            {/* Pagination */}
            <BlogPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 space-y-6">
            {/* Sidebar Ad */}
            <div className="hidden lg:block">
              <SidebarAd />
            </div>

            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Popular Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(blogPosts.flatMap(post => post.tags)))
                    .slice(0, 12)
                    .map((tag) => (
                      <Badge
                        key={tag}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer hover:bg-primary/80"
                        onClick={() => {
                          if (selectedTags.includes(tag)) {
                            setSelectedTags(selectedTags.filter(t => t !== tag))
                          } else {
                            setSelectedTags([...selectedTags, tag])
                          }
                        }}
                      >
                        {tag}
                      </Badge>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Posts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Guides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {blogPosts.slice(0, 5).map((post) => (
                    <div key={post.id}>
                      <a
                        href={`/how-to/${post.id}`}
                        className="text-sm font-medium hover:text-primary transition-colors line-clamp-2"
                      >
                        {post.title}
                      </a>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(post.publishDate).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}