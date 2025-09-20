import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import readingTime from 'reading-time'

export interface BlogContentItem {
  type: 'paragraph' | 'heading' | 'code' | 'image'
  text?: string
  level?: number
  language?: string
  code?: string
  src?: string
  alt?: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  thumbnail: string
  author: string
  publishDate: string
  readTime: string
  tags: string[]
  category: string
  featured: boolean
  seoKeywords: string[]
  metaDescription: string
  content: BlogContentItem[]
}

export interface BlogPostWithContent extends BlogPost {
  content: BlogContentItem[]
}

const postsDirectory = path.join(process.cwd(), 'content/posts')

// Get all markdown files recursively
function getMarkdownFiles(dir: string): string[] {
  const files: string[] = []

  if (!fs.existsSync(dir)) {
    return files
  }

  const items = fs.readdirSync(dir)

  for (const item of items) {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      files.push(...getMarkdownFiles(fullPath))
    } else if (item.endsWith('.md')) {
      files.push(fullPath)
    }
  }

  return files
}

// Convert markdown to structured content
function markdownToContent(markdown: string): BlogContentItem[] {
  // For now, return a simple paragraph structure
  // In a real implementation, you'd parse the markdown into structured content
  const lines = markdown.split('\n').filter(line => line.trim())
  const content: BlogContentItem[] = []
  
  for (const line of lines) {
    if (line.startsWith('# ')) {
      content.push({ type: 'heading', level: 1, text: line.substring(2) })
    } else if (line.startsWith('## ')) {
      content.push({ type: 'heading', level: 2, text: line.substring(3) })
    } else if (line.startsWith('### ')) {
      content.push({ type: 'heading', level: 3, text: line.substring(4) })
    } else if (line.startsWith('```')) {
      // Handle code blocks (simplified)
      content.push({ type: 'code', language: 'javascript', code: line })
    } else if (line.trim()) {
      content.push({ type: 'paragraph', text: line })
    }
  }
  
  return content
}

// Get all blog posts metadata (for listings)
export async function getAllPosts(): Promise<BlogPost[]> {
  const markdownFiles = getMarkdownFiles(postsDirectory)
  const posts: BlogPost[] = []

  for (const filePath of markdownFiles) {
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    // Calculate reading time
    const readingStats = readingTime(content)

    posts.push({
      id: data.slug,
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      thumbnail: data.thumbnail,
      author: data.author,
      publishDate: data.publishDate,
      readTime: data.readTime || readingStats.text,
      tags: data.tags || [],
      category: data.category,
      featured: data.featured || false,
      seoKeywords: data.seoKeywords || [],
      metaDescription: data.metaDescription,
      content: markdownToContent(content)
    })
  }

  // Sort by publication date (newest first)
  return posts.sort((a, b) =>
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  )
}

// Get a single post with content
export async function getPostBySlug(slug: string): Promise<BlogPostWithContent | null> {
  const markdownFiles = getMarkdownFiles(postsDirectory)

  for (const filePath of markdownFiles) {
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    if (data.slug === slug) {
      const structuredContent = markdownToContent(content)
      const readingStats = readingTime(content)

      return {
        id: data.slug,
        slug: data.slug,
        title: data.title,
        excerpt: data.excerpt,
        thumbnail: data.thumbnail,
        author: data.author,
        publishDate: data.publishDate,
        readTime: data.readTime || readingStats.text,
        tags: data.tags || [],
        category: data.category,
        featured: data.featured || false,
        seoKeywords: data.seoKeywords || [],
        metaDescription: data.metaDescription,
        content: structuredContent
      }
    }
  }

  return null
}

// Get featured posts
export async function getFeaturedPosts(): Promise<BlogPost[]> {
  const posts = await getAllPosts()
  return posts.filter(post => post.featured)
}

// Get posts by category
export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const posts = await getAllPosts()
  return posts.filter(post =>
    post.category.toLowerCase() === category.toLowerCase()
  )
}

// Get posts by tag
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await getAllPosts()
  return posts.filter(post =>
    post.tags.some(postTag =>
      postTag.toLowerCase() === tag.toLowerCase()
    )
  )
}

// Get paginated posts
export async function getPostsPage(
  page: number = 1,
  limit: number = 10
): Promise<{
  posts: BlogPost[]
  totalPosts: number
  totalPages: number
  currentPage: number
  hasNextPage: boolean
  hasPrevPage: boolean
}> {
  const allPosts = await getAllPosts()
  const totalPosts = allPosts.length
  const totalPages = Math.ceil(totalPosts / limit)
  const offset = (page - 1) * limit
  const posts = allPosts.slice(offset, offset + limit)

  return {
    posts,
    totalPosts,
    totalPages,
    currentPage: page,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1
  }
}

// Search posts
export async function searchPosts(
  query: string,
  page: number = 1,
  limit: number = 10
): Promise<{
  posts: BlogPost[]
  totalPosts: number
  totalPages: number
  currentPage: number
}> {
  const allPosts = await getAllPosts()
  const lowercaseQuery = query.toLowerCase()

  const filteredPosts = allPosts.filter(post =>
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    post.category.toLowerCase().includes(lowercaseQuery) ||
    post.seoKeywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery))
  )

  const totalPosts = filteredPosts.length
  const totalPages = Math.ceil(totalPosts / limit)
  const offset = (page - 1) * limit
  const posts = filteredPosts.slice(offset, offset + limit)

  return {
    posts,
    totalPosts,
    totalPages,
    currentPage: page
  }
}

// Get all unique tags
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts()
  const allTags = posts.flatMap(post => post.tags)
  return Array.from(new Set(allTags)).sort()
}

// Get all unique categories
export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts()
  const allCategories = posts.map(post => post.category)
  return Array.from(new Set(allCategories)).sort()
}

// Get related posts (posts with similar tags)
export async function getRelatedPosts(
  currentSlug: string,
  limit: number = 3
): Promise<BlogPost[]> {
  const allPosts = await getAllPosts()
  const currentPost = allPosts.find(post => post.slug === currentSlug)

  if (!currentPost) return []

  const relatedPosts = allPosts
    .filter(post =>
      post.slug !== currentSlug &&
      post.tags.some(tag => currentPost.tags.includes(tag))
    )
    .sort((a, b) => {
      // Sort by number of matching tags
      const aMatches = a.tags.filter(tag => currentPost.tags.includes(tag)).length
      const bMatches = b.tags.filter(tag => currentPost.tags.includes(tag)).length
      return bMatches - aMatches
    })
    .slice(0, limit)

  return relatedPosts
}

// Generate static params for all posts (for static generation)
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = await getAllPosts()
  return posts.map(post => ({
    slug: post.slug
  }))
}