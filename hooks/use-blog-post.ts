import { useState, useEffect, useCallback } from 'react'
import type { BlogPostWithContent } from '@/lib/blog/content'

interface UseBlogPostReturn {
  post: BlogPostWithContent | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useBlogPost(slug: string): UseBlogPostReturn {
  const [post, setPost] = useState<BlogPostWithContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPost = useCallback(async () => {
    if (!slug) return

    try {
      setLoading(true)
      setError(null)

      // Use API endpoint
      const response = await fetch(`/api/posts/${slug}`)

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Post not found')
        }
        throw new Error('Failed to fetch post')
      }

      const result = await response.json()

      if (result.success && result.data) {
        setPost(result.data)
      } else {
        throw new Error('Invalid response format')
      }
    } catch (err) {
      console.error('Error fetching post:', err)
      setError(err instanceof Error ? err.message : 'Failed to load post')
    } finally {
      setLoading(false)
    }
  }, [slug])

  const refetch = useCallback(async () => {
    await fetchPost()
  }, [fetchPost])

  useEffect(() => {
    if (slug) {
      fetchPost()
    } else {
      setPost(null)
      setLoading(false)
      setError(null)
    }
  }, [slug, fetchPost])

  return { post, loading, error, refetch }
}
