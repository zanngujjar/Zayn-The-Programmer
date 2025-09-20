import { NextRequest, NextResponse } from 'next/server'
import { getAllPosts, getPostsPage, searchPosts, getFeaturedPosts } from '@/lib/blog/content'
import { withCache } from '@/lib/blog/cache'

// GET /api/posts - Get paginated posts with optional search and filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const query = searchParams.get('q') || ''
    const category = searchParams.get('category') || ''
    const tag = searchParams.get('tag') || ''
    const featured = searchParams.get('featured') === 'true'

    let result

    if (featured) {
      // Featured posts
      const cacheKey = `featured-posts-api`
      const featuredPosts = await withCache(cacheKey, async () => {
        return await getFeaturedPosts()
      }, 1800) // 30 minutes cache

      result = {
        posts: featuredPosts,
        totalPosts: featuredPosts.length,
        totalPages: 1,
        currentPage: 1,
        hasNextPage: false,
        hasPrevPage: false
      }
    } else if (query || category || tag) {
      // Search with filters
      const cacheKey = `search-${query}-${category}-${tag}-${page}-${limit}`
      result = await withCache(cacheKey, async () => {
        return await searchPosts(query, page, limit)
      }, 600) // 10 minutes cache for search results
    } else {
      // Regular pagination
      const cacheKey = `posts-page-${page}-${limit}`
      result = await withCache(cacheKey, async () => {
        return await getPostsPage(page, limit)
      }, 1800) // 30 minutes cache
    }

    return NextResponse.json({
      success: true,
      data: result
    })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// OPTIONS for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}