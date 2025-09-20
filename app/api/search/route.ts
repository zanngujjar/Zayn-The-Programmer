import { NextRequest, NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/blog/content'
import { searchPosts, getSearchSuggestions } from '@/lib/blog/search'
import { withCache } from '@/lib/blog/cache'

// GET /api/search - Advanced search functionality
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const query = searchParams.get('q') || ''
    const category = searchParams.get('category') || ''
    const tags = searchParams.get('tags')?.split(',').filter(Boolean) || []
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')
    const suggestions = searchParams.get('suggestions') === 'true'

    // Get all posts from cache
    const posts = await withCache('all-posts-search', async () => {
      return await getAllPosts()
    }, 1800)

    if (suggestions && query) {
      // Return search suggestions
      const suggestionResults = getSearchSuggestions(posts, query, 5)
      return NextResponse.json({
        success: true,
        data: {
          suggestions: suggestionResults
        }
      })
    }

    // Perform search
    const searchResult = searchPosts(posts, {
      query,
      category: category || undefined,
      tags: tags.length > 0 ? tags : undefined,
      limit,
      offset
    })

    // Add search metadata
    const response = {
      success: true,
      data: {
        results: searchResult.results,
        totalResults: searchResult.totalResults,
        query,
        category,
        tags,
        limit,
        offset,
        hasMore: offset + limit < searchResult.totalResults
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error in search:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/search - Advanced search with body parameters
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      query = '',
      category,
      tags = [],
      limit = 10,
      offset = 0,
      sortBy = 'relevance'
    } = body

    const posts = await withCache('all-posts-search', async () => {
      return await getAllPosts()
    }, 1800)

    const searchResult = searchPosts(posts, {
      query,
      category,
      tags,
      limit,
      offset
    })

    // Sort results if needed
    let results = searchResult.results
    if (sortBy === 'date') {
      results = results.sort((a, b) =>
        new Date(b.item.publishDate).getTime() - new Date(a.item.publishDate).getTime()
      )
    } else if (sortBy === 'title') {
      results = results.sort((a, b) =>
        a.item.title.localeCompare(b.item.title)
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        results,
        totalResults: searchResult.totalResults,
        query,
        category,
        tags,
        limit,
        offset,
        sortBy,
        hasMore: offset + limit < searchResult.totalResults
      }
    })
  } catch (error) {
    console.error('Error in search:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}