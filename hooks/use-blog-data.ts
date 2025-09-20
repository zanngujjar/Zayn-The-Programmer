import { useState, useEffect, useCallback } from 'react'
import type { BlogPost } from '@/lib/blog/content'

interface UseBlogDataReturn {
  posts: BlogPost[]
  featuredPosts: BlogPost[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useBlogData(): UseBlogDataReturn {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // Use client-side API endpoints
      const [postsResponse, featuredResponse] = await Promise.all([
        fetch('/api/posts?limit=100'),
        fetch('/api/posts?featured=true')
      ])

      if (!postsResponse.ok || !featuredResponse.ok) {
        throw new Error('Failed to fetch blog data')
      }

      const [postsResult, featuredResult] = await Promise.all([
        postsResponse.json(),
        featuredResponse.json()
      ])

      setPosts(postsResult.data?.posts || postsResult.data || [])
      setFeaturedPosts(featuredResult.data?.posts || featuredResult.data || [])
    } catch (err) {
      console.error('Error fetching blog data:', err)
      setError(err instanceof Error ? err.message : 'Failed to load blog data')
    } finally {
      setLoading(false)
    }
  }, [])

  const refetch = useCallback(async () => {
    await fetchData()
  }, [fetchData])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    posts,
    featuredPosts,
    loading,
    error,
    refetch
  }
}
