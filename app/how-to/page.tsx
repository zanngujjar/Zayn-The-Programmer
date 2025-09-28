"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Clock, Eye, Star, TrendingUp } from "lucide-react"
import Link from "next/link"
import { 
  getHowToPosts, 
  getFeaturedHowToPosts, 
  getPopularHowToPosts,
  getRecentHowToPosts,
  getHowToPostsByCategory,
  getCategories,
  type HowToPost, 
  type HowToApiParams 
} from "@/lib/how-to-api"
import { FeaturedCarousel } from "@/components/how-to/featured-carousel"
import { SectionCarousel } from "@/components/how-to/section-carousel"
import { CategoryFilter, extractCategoriesFromPosts } from "@/components/how-to/category-filter"
import { PostCard } from "@/components/how-to/post-card"
import { formatDistanceToNow } from "date-fns"
import { SidebarAd, InlineAd } from "@/components/google-ads"
import { getAdSlot } from "@/lib/ads-config"

export default function HowToPage() {
  const searchParams = useSearchParams()
  const [posts, setPosts] = useState<HowToPost[]>([])
  const [featuredPosts, setFeaturedPosts] = useState<HowToPost[]>([])
  const [popularPosts, setPopularPosts] = useState<HowToPost[]>([])
  const [recentPosts, setRecentPosts] = useState<HowToPost[]>([])
  const [categories, setCategories] = useState<Array<{
    id: string
    name: string
    slug: string
    color: string
    icon: string
  }>>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<HowToApiParams['sort']>("recent")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [allGuidesPage, setAllGuidesPage] = useState(1)
  const [allGuidesPosts, setAllGuidesPosts] = useState<HowToPost[]>([])
  const [allGuidesLoading, setAllGuidesLoading] = useState(false)
  const [showFeatured, setShowFeatured] = useState(true)
  const [viewAll, setViewAll] = useState(false)

  const loadAllData = async () => {
    setLoading(true)
    try {
      console.log('Starting to load all data...')
      
      if (viewAll) {
        // In view all mode, load all posts using separate API calls
        const [allPosts, categoriesData] = await Promise.all([
          getHowToPosts({ limit: 9 }),
          getCategories()
        ])
        
        console.log('View all mode - loaded posts:', allPosts.length)
        setPosts(allPosts)
        setAllGuidesPosts(allPosts)
        
        // Use categories from API, or fallback to extracting from posts
        if (categoriesData && categoriesData.length > 0) {
          console.log('Using categories from API:', categoriesData)
          setCategories(categoriesData)
        } else {
          // Fallback: extract categories from posts
          console.log('API categories empty, extracting from posts. Posts count:', allPosts.length)
          const extractedCategories = extractCategoriesFromPosts(allPosts)
          console.log('Extracted categories from posts:', extractedCategories)
          setCategories(extractedCategories)
        }
      } else {
        // Normal mode - load all sections separately
        const [allPosts, featured, popular, recent, categoriesData] = await Promise.all([
          getHowToPosts({ limit: 9 }), // Load 9 posts for "All Guides" section
          getFeaturedHowToPosts(1, 9), // Load 9 featured posts
          getPopularHowToPosts(1, 9), // Load 9 popular posts
          getRecentHowToPosts(1, 9), // Load 9 recent posts
          getCategories()
        ])
        
        console.log('All API calls completed:')
        console.log('- All posts:', allPosts.length)
        console.log('- Featured posts:', featured.length)
        console.log('- Popular posts:', popular.length)
        console.log('- Recent posts:', recent.length)
        console.log('- Categories:', categoriesData.length)
        console.log('- Categories data:', categoriesData)
        
        setPosts(allPosts)
        setAllGuidesPosts(allPosts) // Set all 9 posts for "All Guides" section
        setFeaturedPosts(featured)
        setPopularPosts(popular)
        setRecentPosts(recent)
        
        // Use categories from API, or fallback to extracting from posts
        if (categoriesData && categoriesData.length > 0) {
          console.log('Using categories from API:', categoriesData)
          setCategories(categoriesData)
        } else {
          // Fallback: extract categories from posts
          console.log('API categories empty, extracting from posts. Posts count:', allPosts.length)
          const extractedCategories = extractCategoriesFromPosts(allPosts)
          console.log('Extracted categories from posts:', extractedCategories)
          setCategories(extractedCategories)
        }
      }
    } catch (error) {
      console.error("Error loading data:", error)
      // Even if there's an error, try to extract categories from any posts we might have
      try {
        const fallbackPosts = await getHowToPosts({ limit: 9 })
        setPosts(fallbackPosts)
        const extractedCategories = extractCategoriesFromPosts(fallbackPosts)
        setCategories(extractedCategories)
        console.log('Using fallback categories after error:', extractedCategories)
      } catch (fallbackError) {
        console.error("Fallback also failed:", fallbackError)
      }
    } finally {
      setLoading(false)
    }
  }

  // Initialize state from URL parameters
  useEffect(() => {
    const categoryParam = searchParams.get('category')
    const viewAllParam = searchParams.get('view') === 'all'
    
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }
    if (viewAllParam) {
      setViewAll(true)
    }
  }, [searchParams])

  // Initial load - only runs once on mount
  useEffect(() => {
    loadAllData()
  }, [])

  // Reload data when viewAll changes
  useEffect(() => {
    if (viewAll !== undefined) { // Only run if viewAll has been set
      loadAllData()
    }
  }, [viewAll])

  // Debounce search query to reduce input delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 150) // 150ms debounce

    return () => clearTimeout(timer)
  }, [searchQuery])

  // Debug: Log categories when they change
  useEffect(() => {
    console.log('Categories updated:', categories)
  }, [categories])

  // Debug: Log posts when they change
  useEffect(() => {
    console.log('Posts updated:', posts)
    if (posts.length > 0) {
      console.log('First post category:', posts[0]?.category)
    }
  }, [posts])

  // Debug: Log popular posts when they change
  useEffect(() => {
    console.log('Popular posts updated:', popularPosts)
  }, [popularPosts])

  // Debug: Log recent posts when they change
  useEffect(() => {
    console.log('Recent posts updated:', recentPosts)
  }, [recentPosts])

  // Memoize filtered posts to prevent unnecessary recalculations
  const filteredPosts = useMemo(() => {
    let results = posts
    
    // Apply debounced search query only
    // Category filtering is handled by API calls, not client-side filtering
    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase()
      results = results.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt?.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.name.toLowerCase().includes(query))
      )
    }
    
    console.log('Filtered posts result:', results.length, 'from', posts.length, 'posts')
    console.log('Search query:', debouncedSearchQuery)
    console.log('Selected category:', selectedCategory)
    return results
  }, [posts, debouncedSearchQuery, selectedCategory])

  const handleCategoryChange = useCallback(async (category: string | null) => {
    console.log('=== CATEGORY CHANGE CALLED ===')
    console.log('New category:', category)
    
    setSelectedCategory(category)
    
    // If a category is selected, load posts for that category using separate API call
    if (category) {
      setLoading(true)
      setAllGuidesPage(1) // Reset page counter for new category
      try {
        const categoryPosts = await getHowToPostsByCategory(category, { limit: 9 })
        setPosts(categoryPosts)
        setAllGuidesPosts(categoryPosts)
        console.log('Loaded category posts:', categoryPosts.length)
      } catch (error) {
        console.error('Error loading category posts:', error)
      } finally {
        setLoading(false)
      }
    } else {
      // If no category selected, reload all posts
      setAllGuidesPage(1) // Reset page counter
      loadAllData()
    }
  }, [])

  const loadMoreAllGuides = async () => {
    setAllGuidesLoading(true)
    try {
      const nextPage = allGuidesPage + 1
      console.log('Loading more all guides posts, page:', nextPage)
      
      // If a category is selected, load more posts for that category
      if (selectedCategory) {
        const morePosts = await getHowToPostsByCategory(selectedCategory, { 
          page: nextPage, 
          limit: 9 
        })
        
        if (morePosts.length > 0) {
          setAllGuidesPosts(prev => [...prev, ...morePosts])
          setAllGuidesPage(nextPage)
          console.log('Loaded more category posts, total now:', allGuidesPosts.length + morePosts.length)
        } else {
          console.log('No more category posts to load')
        }
      } else {
        // Load more general posts
        const morePosts = await getHowToPosts({ 
          page: nextPage, 
          limit: 9 
        })
        
        if (morePosts.length > 0) {
          setAllGuidesPosts(prev => [...prev, ...morePosts])
          setAllGuidesPage(nextPage)
          console.log('Loaded more posts, total now:', allGuidesPosts.length + morePosts.length)
        } else {
          console.log('No more posts to load')
        }
      }
    } catch (error) {
      console.error('Error loading more posts:', error)
    } finally {
      setAllGuidesLoading(false)
    }
  }

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      // Search is now handled by filteredPosts memoization
    }
  }, [])

  const hasActiveFilters = debouncedSearchQuery.trim()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        {/* Mobile Inline Ad - Only visible on mobile */}
        <div className="block md:hidden ads-inline">
          <InlineAd adSlot="7596902180" />
        </div>
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-playfair">
            How-To Guides
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn from expert tutorials and step-by-step guides. Master new skills with our comprehensive how-to articles.
          </p>
        </div>

        {/* Search Bar */}
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
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            loading={loading}
          />
        </div>

        {/* Content with Reserved Space */}
        <div className="min-h-[2000px] ads-layout"> {/* Reserve space to prevent layout shift */}
          {/* Main Content */}
          <div className="ads-main-content">
          {loading ? (
            <div className="space-y-12">
              {/* Featured Section Placeholder */}
              <div className="min-h-[400px]">
                <div className="flex items-center gap-2 mb-6">
                  <div className="animate-pulse bg-muted rounded h-6 w-6"></div>
                  <div className="animate-pulse bg-muted rounded h-8 w-48"></div>
                </div>
                <div className="flex gap-4 overflow-hidden">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3">
                      <div className="animate-pulse">
                        <div className="bg-muted rounded-lg h-48 mb-4"></div>
                        <div className="space-y-2">
                          <div className="bg-muted h-4 rounded w-3/4"></div>
                          <div className="bg-muted h-3 rounded w-1/2"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Section Placeholder */}
              <div className="min-h-[350px]">
                <div className="flex items-center gap-2 mb-6">
                  <div className="animate-pulse bg-muted rounded h-5 w-5"></div>
                  <div className="animate-pulse bg-muted rounded h-6 w-40"></div>
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

              {/* Recent Section Placeholder */}
              <div className="min-h-[350px]">
                <div className="flex items-center gap-2 mb-6">
                  <div className="animate-pulse bg-muted rounded h-5 w-5"></div>
                  <div className="animate-pulse bg-muted rounded h-6 w-40"></div>
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

              {/* All Guides Section Placeholder */}
              <div className="min-h-[600px]">
                <div className="flex items-center justify-between mb-6">
                  <div className="animate-pulse bg-muted rounded h-8 w-32"></div>
                  <div className="animate-pulse bg-muted rounded h-10 w-20"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-muted rounded-lg h-48 mb-4"></div>
                      <div className="space-y-2">
                        <div className="bg-muted h-4 rounded w-3/4"></div>
                        <div className="bg-muted h-3 rounded w-1/2"></div>
                        <div className="bg-muted h-3 rounded w-2/3"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
          <>
            {hasActiveFilters ? (
              /* Filtered Results */
              <div className="space-y-8 min-h-[400px]"> {/* Reserve consistent height */}
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">
                    {filteredPosts.length} {filteredPosts.length === 1 ? 'Post' : 'Posts'} Found
                  </h2>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("")
                    }}
                  >
                    Clear Search
                  </Button>
                </div>
                
                {filteredPosts.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold mb-2">No posts found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search terms or category filter.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                    {filteredPosts.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                )}
              </div>
            ) : viewAll ? (
              /* View All Mode - Show all posts in grid format */
              <div className="space-y-8 min-h-[400px]">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">All Posts</h2>
                  <Link href="/how-to">
                    <Button variant="outline">
                      Back to Home
                    </Button>
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                  {allGuidesPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
                
                <div className="text-center">
                  <Button 
                    variant="outline"
                    size="lg"
                    onClick={loadMoreAllGuides}
                    disabled={allGuidesLoading}
                  >
                    {allGuidesLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                        Loading...
                      </>
                    ) : (
                      'Load More Posts'
                    )}
                  </Button>
                </div>
              </div>
            ) : selectedCategory ? (
              /* Category Filtered Layout - Show only filtered posts */
              <div className="space-y-8 min-h-[400px]">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">
                    {categories.find(cat => cat.slug === selectedCategory)?.name || 'Category'} Posts
                  </h2>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedCategory(null)
                    }}
                  >
                    Clear Category
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                  {allGuidesPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
                
                <div className="text-center">
                  <Button 
                    variant="outline"
                    size="lg"
                    onClick={loadMoreAllGuides}
                    disabled={allGuidesLoading}
                  >
                    {allGuidesLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                        Loading...
                      </>
                    ) : (
                      'Load More Posts'
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              /* Full Carousel Layout - Show all sections */
              <div className="space-y-12">
                {/* Featured Carousel */}
                <FeaturedCarousel posts={featuredPosts} loading={loading} />
                
                 {/* Popular Posts Carousel */}
                 <SectionCarousel
                   title="Popular This Week"
                   posts={popularPosts}
                   loading={loading}
                   showViewAll={false}
                   icon={<TrendingUp className="h-5 w-5" />}
                 />
                 
                 {/* Recent Posts Carousel */}
                 <SectionCarousel
                   title="Recently Published"
                   posts={recentPosts}
                   loading={loading}
                   showViewAll={false}
                   icon={<Clock className="h-5 w-5" />}
                 />
                
                 {/* All Posts Grid */}
                 <div className="space-y-6 min-h-[600px]"> {/* Reserve consistent height */}
                   <div className="flex items-center justify-between">
                     <h2 className="text-2xl font-bold text-foreground">All Guides</h2>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                     {allGuidesPosts.map((post) => (
                       <PostCard key={post.id} post={post} />
                     ))}
                   </div>
                   
                   <div className="text-center">
                     <Button 
                       variant="outline"
                       size="lg"
                       onClick={loadMoreAllGuides}
                       disabled={allGuidesLoading}
                     >
                       {allGuidesLoading ? (
                         <>
                           <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                           Loading...
                         </>
                       ) : (
                         'Load More Posts'
                       )}
                     </Button>
                   </div>
                 </div>
              </div>
            )}
          </>
          )}
          </div>
          
          {/* Desktop Sidebar Ad - Only visible on desktop */}
          <div className="hidden lg:block ads-sidebar-container">
            <div className="ads-sidebar">
              <SidebarAd adSlot="3670277222" />
              <SidebarAd adSlot="2671878565" />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
