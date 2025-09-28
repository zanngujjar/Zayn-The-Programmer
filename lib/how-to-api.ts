// How-To API integration functions
const API_BASE_URL = 'https://zayn-the-programmer-backend.onrender.com/api/how-to'

export interface HowToPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content?: string
  thumbnail_url: string
  author: string
  category: {
    id: string
    name: string
    slug: string
    color: string
    icon: string
  }
  tags: Array<{
    id: string
    name: string
    slug: string
    color: string
  }>
  featured: boolean
  read_time: string
  view_count: number
  published_at: string
  created_at: string
}

export interface ViewTrackingData {
  ip_address?: string
  user_agent?: string
  referrer?: string
  country?: string
  city?: string
}

export interface HowToApiParams {
  page?: number
  limit?: number
  sort?: 'recent' | 'popular' | 'views' | 'featured'
  category?: string
  tag?: string
  featured?: boolean
}

// Get all how-to posts with pagination and sorting
export async function getHowToPosts(params: HowToApiParams = {}): Promise<HowToPost[]> {
  const searchParams = new URLSearchParams()
  
  if (params.page) searchParams.append('page', params.page.toString())
  if (params.limit) searchParams.append('limit', params.limit.toString())
  if (params.sort) searchParams.append('sort', params.sort)
  if (params.category) searchParams.append('category', params.category)
  if (params.tag) searchParams.append('tag', params.tag)
  if (params.featured !== undefined) searchParams.append('featured', params.featured.toString())

  const url = `${API_BASE_URL}?${searchParams.toString()}`
  
  try {
    const response = await fetch(url, {
      next: { revalidate: 300 } // Cache for 5 minutes
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch how-to posts: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching how-to posts:', error)
    return []
  }
}

// Get single how-to post by slug
export async function getHowToPost(slug: string): Promise<HowToPost | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/${slug}`, {
      next: { revalidate: 300 } // Cache for 5 minutes
    })
    
    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error(`Failed to fetch how-to post: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching how-to post:', error)
    return null
  }
}

// Get featured how-to posts
export async function getFeaturedHowToPosts(page: number = 1, limit: number = 20): Promise<HowToPost[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/featured?page=${page}&limit=${limit}`, {
      next: { revalidate: 300 } // Cache for 5 minutes
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch featured how-to posts: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching featured how-to posts:', error)
    return []
  }
}

// Get how-to posts by category
export async function getHowToPostsByCategory(
  category: string, 
  params: Omit<HowToApiParams, 'category'> = {}
): Promise<HowToPost[]> {
  const searchParams = new URLSearchParams()
  
  if (params.sort) searchParams.append('sort', params.sort)
  if (params.page) searchParams.append('page', params.page.toString())
  if (params.limit) searchParams.append('limit', params.limit.toString())

  const url = `${API_BASE_URL}/category/${category}?${searchParams.toString()}`
  
  try {
    const response = await fetch(url, {
      next: { revalidate: 300 } // Cache for 5 minutes
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch how-to posts by category: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching how-to posts by category:', error)
    return []
  }
}

// Get how-to posts by tag
export async function getHowToPostsByTag(
  tag: string, 
  params: Omit<HowToApiParams, 'tag'> = {}
): Promise<HowToPost[]> {
  const searchParams = new URLSearchParams()
  
  if (params.sort) searchParams.append('sort', params.sort)
  if (params.page) searchParams.append('page', params.page.toString())
  if (params.limit) searchParams.append('limit', params.limit.toString())

  const url = `${API_BASE_URL}/tag/${tag}?${searchParams.toString()}`
  
  try {
    const response = await fetch(url, {
      next: { revalidate: 300 } // Cache for 5 minutes
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch how-to posts by tag: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching how-to posts by tag:', error)
    return []
  }
}

// Track how-to post view
export async function trackHowToPostView(slug: string, data: ViewTrackingData = {}): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/${slug}/view`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ip_address: data.ip_address,
        user_agent: data.user_agent || (typeof window !== 'undefined' ? window.navigator.userAgent : undefined),
        referrer: data.referrer || (typeof window !== 'undefined' ? document.referrer : undefined),
        country: data.country,
        city: data.city,
      }),
    })
    
    return response.ok
  } catch (error) {
    console.error('Error tracking how-to post view:', error)
    return false
  }
}

// Get all categories by extracting from posts
export async function getCategories(): Promise<Array<{
  id: string
  name: string
  slug: string
  color: string
  icon: string
}>> {
  try {
    console.log('Fetching categories by extracting from posts')
    // Get a sample of posts to extract categories from
    const posts = await getHowToPosts({ limit: 100 })
    
    console.log('Posts fetched for category extraction:', posts.length)
    if (posts.length > 0) {
      console.log('First post category:', posts[0]?.category)
    }
    
    if (posts.length === 0) {
      console.log('No posts found to extract categories from')
      return []
    }
    
    // Extract unique categories from posts
    const categoryMap = new Map<string, {
      id: string
      name: string
      slug: string
      color: string
      icon: string
    }>()
    
    posts.forEach(post => {
      if (post.category && !categoryMap.has(post.category.slug)) {
        categoryMap.set(post.category.slug, {
          id: post.category.id,
          name: post.category.name,
          slug: post.category.slug,
          color: post.category.color,
          icon: post.category.icon,
        })
      }
    })
    
    const categories = Array.from(categoryMap.values())
    console.log('Extracted categories from posts:', categories)
    
    return categories
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

// Get popular how-to posts
export async function getPopularHowToPosts(page: number = 1, limit: number = 20): Promise<HowToPost[]> {
  try {
    console.log('Fetching popular posts using getHowToPosts with sort=popular')
    return await getHowToPosts({ sort: 'popular', page, limit })
  } catch (error) {
    console.error('Error fetching popular how-to posts:', error)
    return []
  }
}

// Get recent how-to posts
export async function getRecentHowToPosts(page: number = 1, limit: number = 20): Promise<HowToPost[]> {
  try {
    console.log('Fetching recent posts using getHowToPosts with sort=recent')
    return await getHowToPosts({ sort: 'recent', page, limit })
  } catch (error) {
    console.error('Error fetching recent how-to posts:', error)
    return []
  }
}