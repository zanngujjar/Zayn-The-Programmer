import { useState, useEffect, useCallback } from 'react'

interface UseBlogMetadataReturn {
  categories: string[]
  tags: string[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useBlogMetadata(): UseBlogMetadataReturn {
  const [categories, setCategories] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const API_BASE = 'http://localhost:8000/api/blog'

      const [categoriesResponse, tagsResponse] = await Promise.all([
        fetch(`${API_BASE}/categories`),
        fetch(`${API_BASE}/tags`)
      ])

      if (!categoriesResponse.ok || !tagsResponse.ok) {
        throw new Error('Failed to fetch metadata')
      }

      const [categoriesResult, tagsResult] = await Promise.all([
        categoriesResponse.json(),
        tagsResponse.json()
      ])

      setCategories(categoriesResult.categories || categoriesResult.data || categoriesResult || [])
      setTags(tagsResult.tags || tagsResult.data || tagsResult || [])
    } catch (err) {
      console.error('Error fetching metadata:', err)
      setError(err instanceof Error ? err.message : 'Failed to load metadata')
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
    categories,
    tags,
    loading,
    error,
    refetch
  }
}