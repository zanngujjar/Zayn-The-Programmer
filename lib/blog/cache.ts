import fs from 'fs'
import path from 'path'
import { BlogPost } from './content'

const CACHE_DIR = path.join(process.cwd(), '.next/cache/blog')
const CACHE_TTL = 3600 // 1 hour in seconds

interface CacheData<T> {
  data: T
  timestamp: number
  ttl: number
}

// Ensure cache directory exists
function ensureCacheDir() {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true })
  }
}

// Generate cache key
function getCacheKey(key: string): string {
  return path.join(CACHE_DIR, `${key}.json`)
}

// Check if cache is valid
function isCacheValid<T>(cacheData: CacheData<T>): boolean {
  const now = Date.now()
  return now - cacheData.timestamp < cacheData.ttl * 1000
}

// Get data from cache
export function getFromCache<T>(key: string): T | null {
  try {
    ensureCacheDir()
    const cacheFile = getCacheKey(key)

    if (!fs.existsSync(cacheFile)) {
      return null
    }

    const cacheContent = fs.readFileSync(cacheFile, 'utf8')
    const cacheData: CacheData<T> = JSON.parse(cacheContent)

    if (!isCacheValid(cacheData)) {
      // Cache expired, remove it
      fs.unlinkSync(cacheFile)
      return null
    }

    return cacheData.data
  } catch (error) {
    console.error('Error reading from cache:', error)
    return null
  }
}

// Set data to cache
export function setCache<T>(key: string, data: T, ttl: number = CACHE_TTL): void {
  try {
    ensureCacheDir()
    const cacheFile = getCacheKey(key)

    const cacheData: CacheData<T> = {
      data,
      timestamp: Date.now(),
      ttl
    }

    fs.writeFileSync(cacheFile, JSON.stringify(cacheData, null, 2))
  } catch (error) {
    console.error('Error writing to cache:', error)
  }
}

// Clear specific cache entry
export function clearCache(key: string): void {
  try {
    const cacheFile = getCacheKey(key)
    if (fs.existsSync(cacheFile)) {
      fs.unlinkSync(cacheFile)
    }
  } catch (error) {
    console.error('Error clearing cache:', error)
  }
}

// Clear all cache
export function clearAllCache(): void {
  try {
    if (fs.existsSync(CACHE_DIR)) {
      const files = fs.readdirSync(CACHE_DIR)
      for (const file of files) {
        if (file.endsWith('.json')) {
          fs.unlinkSync(path.join(CACHE_DIR, file))
        }
      }
    }
  } catch (error) {
    console.error('Error clearing all cache:', error)
  }
}

// Cache wrapper for async functions
export async function withCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = CACHE_TTL
): Promise<T> {
  // Try to get from cache first
  const cached = getFromCache<T>(key)
  if (cached !== null) {
    return cached
  }

  // Fetch data and cache it
  const data = await fetcher()
  setCache(key, data, ttl)
  return data
}

// Pre-generate cache for build optimization
export async function preGenerateCache(): Promise<void> {
  console.log('Pre-generating cache...')

  try {
    // Import content functions dynamically to avoid circular dependency
    const { getAllPosts, getFeaturedPosts, getAllTags, getAllCategories } = await import('./content')

    // Cache all posts
    const allPosts = await getAllPosts()
    setCache('all-posts', allPosts, 86400) // 24 hours

    // Cache featured posts
    const featuredPosts = await getFeaturedPosts()
    setCache('featured-posts', featuredPosts, 86400)

    // Cache tags and categories
    const tags = await getAllTags()
    const categories = await getAllCategories()
    setCache('all-tags', tags, 86400)
    setCache('all-categories', categories, 86400)

    console.log(`Pre-generated cache for ${allPosts.length} posts`)
  } catch (error) {
    console.error('Error pre-generating cache:', error)
  }
}