import Fuse from 'fuse.js'
import { BlogPost } from './content'

// Fuse.js options for fuzzy search
const fuseOptions = {
  keys: [
    { name: 'title', weight: 0.3 },
    { name: 'excerpt', weight: 0.2 },
    { name: 'tags', weight: 0.2 },
    { name: 'category', weight: 0.15 },
    { name: 'seoKeywords', weight: 0.15 }
  ],
  threshold: 0.4, // Lower = more strict
  includeScore: true,
  includeMatches: true
}

export interface SearchResult {
  item: BlogPost
  score?: number
  matches?: readonly Fuse.FuseResultMatch[]
}

export interface SearchOptions {
  query: string
  category?: string
  tags?: string[]
  limit?: number
  offset?: number
}

// Create search index
function createSearchIndex(posts: BlogPost[]): Fuse<BlogPost> {
  return new Fuse(posts, fuseOptions)
}

// Perform fuzzy search
export function searchPosts(
  posts: BlogPost[],
  options: SearchOptions
): {
  results: SearchResult[]
  totalResults: number
} {
  let filteredPosts = [...posts]

  // Filter by category if specified
  if (options.category) {
    filteredPosts = filteredPosts.filter(post =>
      post.category.toLowerCase() === options.category!.toLowerCase()
    )
  }

  // Filter by tags if specified
  if (options.tags && options.tags.length > 0) {
    filteredPosts = filteredPosts.filter(post =>
      options.tags!.some(tag =>
        post.tags.some(postTag =>
          postTag.toLowerCase() === tag.toLowerCase()
        )
      )
    )
  }

  // If no query, return filtered posts
  if (!options.query.trim()) {
    const { offset = 0, limit } = options
    const results: SearchResult[] = filteredPosts
      .slice(offset, limit ? offset + limit : undefined)
      .map(item => ({ item }))

    return {
      results,
      totalResults: filteredPosts.length
    }
  }

  // Perform fuzzy search on filtered posts
  const fuse = createSearchIndex(filteredPosts)
  const searchResults = fuse.search(options.query)

  // Apply pagination
  const { offset = 0, limit } = options
  const paginatedResults = searchResults.slice(
    offset,
    limit ? offset + limit : undefined
  )

  const results: SearchResult[] = paginatedResults.map(result => ({
    item: result.item,
    score: result.score,
    matches: result.matches
  }))

  return {
    results,
    totalResults: searchResults.length
  }
}

// Get search suggestions based on partial query
export function getSearchSuggestions(
  posts: BlogPost[],
  query: string,
  limit: number = 5
): string[] {
  if (!query.trim()) return []

  const suggestions = new Set<string>()
  const lowercaseQuery = query.toLowerCase()

  // Collect suggestions from titles, tags, and categories
  for (const post of posts) {
    // Title suggestions
    if (post.title.toLowerCase().includes(lowercaseQuery)) {
      suggestions.add(post.title)
    }

    // Tag suggestions
    for (const tag of post.tags) {
      if (tag.toLowerCase().includes(lowercaseQuery)) {
        suggestions.add(tag)
      }
    }

    // Category suggestions
    if (post.category.toLowerCase().includes(lowercaseQuery)) {
      suggestions.add(post.category)
    }

    // Stop when we have enough suggestions
    if (suggestions.size >= limit) break
  }

  return Array.from(suggestions).slice(0, limit)
}

// Highlight search matches in text
export function highlightMatches(
  text: string,
  matches: readonly Fuse.FuseResultMatch[] = [],
  highlightTag: string = 'mark'
): string {
  if (!matches.length) return text

  let highlightedText = text
  const matchedIndices: Array<[number, number]> = []

  // Collect all match indices
  for (const match of matches) {
    if (match.indices) {
      matchedIndices.push(...match.indices)
    }
  }

  // Sort indices by start position (descending to avoid offset issues)
  matchedIndices.sort((a, b) => b[0] - a[0])

  // Apply highlighting
  for (const [start, end] of matchedIndices) {
    const before = highlightedText.slice(0, start)
    const matchedText = highlightedText.slice(start, end + 1)
    const after = highlightedText.slice(end + 1)

    highlightedText = `${before}<${highlightTag}>${matchedText}</${highlightTag}>${after}`
  }

  return highlightedText
}

// Generate search index for static export (for client-side search)
export function generateSearchIndex(posts: BlogPost[]): any {
  return {
    posts: posts.map(post => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      tags: post.tags,
      category: post.category,
      publishDate: post.publishDate
    })),
    options: fuseOptions
  }
}