"use client"

import { Button } from "@/components/ui/button"
import { Filter, X } from "lucide-react"
import { type HowToPost } from "@/lib/how-to-api"

interface Category {
  id: string
  name: string
  slug: string
  color: string
  icon: string
}

interface CategoryFilterProps {
  categories: Category[]
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
  loading?: boolean
}

export function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  loading = false 
}: CategoryFilterProps) {
  // Extract unique categories from posts if not provided
  const allCategories = categories.length > 0 ? categories : []
  console.log('CategoryFilter - categories prop:', categories)
  console.log('CategoryFilter - allCategories:', allCategories)

  if (loading) {
    return (
      <div className="w-full">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">Filter by Category</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-muted rounded-full h-8 w-20"></div>
          ))}
        </div>
      </div>
    )
  }

  if (allCategories.length === 0) {
    return (
      <div className="w-full">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">Filter by Category</span>
        </div>
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground">No categories available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">Filter by Category</span>
        </div>
        {selectedCategory && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCategoryChange(null)}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <div className="flex gap-2 flex-wrap">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(null)}
          className="whitespace-nowrap"
        >
          All Categories
        </Button>
        
        {allCategories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.slug ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category.slug)}
            className="whitespace-nowrap flex items-center gap-2"
            style={{
              backgroundColor: selectedCategory === category.slug 
                ? category.color + '20' 
                : undefined,
              borderColor: selectedCategory === category.slug 
                ? category.color 
                : undefined,
              color: selectedCategory === category.slug 
                ? category.color 
                : undefined,
            }}
          >
            <span className="text-sm">{category.icon}</span>
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  )
}

// Helper function to extract categories from posts
export function extractCategoriesFromPosts(posts: HowToPost[]): Category[] {
  console.log('Extracting categories from posts:', posts.length, 'posts')
  
  const categoryMap = new Map<string, Category>()
  
  posts.forEach((post, index) => {
    console.log(`Post ${index}:`, post.category)
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
  
  const extractedCategories = Array.from(categoryMap.values())
  console.log('Final extracted categories:', extractedCategories)
  
  return extractedCategories
}
