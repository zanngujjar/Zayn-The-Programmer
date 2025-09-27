import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function HowToPostLoading() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[1200px]"> {/* Reserve space to prevent layout shift */}
        {/* Back Button Skeleton */}
        <div className="mb-6">
          <div className="animate-pulse bg-muted rounded h-10 w-48"></div>
        </div>

        {/* Article Header Skeleton */}
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            {/* Badges Skeleton */}
            <div className="flex items-center gap-2 mb-4">
              <div className="animate-pulse bg-muted rounded h-6 w-24"></div>
              <div className="animate-pulse bg-muted rounded h-6 w-20"></div>
            </div>

            {/* Title Skeleton */}
            <div className="animate-pulse bg-muted rounded h-12 w-full mb-4"></div>
            <div className="animate-pulse bg-muted rounded h-12 w-4/5 mb-6"></div>

            {/* Excerpt Skeleton */}
            <div className="animate-pulse bg-muted rounded h-6 w-full mb-2"></div>
            <div className="animate-pulse bg-muted rounded h-6 w-3/4 mb-6"></div>

            {/* Meta Information Skeleton */}
            <div className="flex flex-wrap items-center gap-6 mb-6">
              <div className="animate-pulse bg-muted rounded h-4 w-24"></div>
              <div className="animate-pulse bg-muted rounded h-4 w-20"></div>
              <div className="animate-pulse bg-muted rounded h-4 w-28"></div>
              <div className="animate-pulse bg-muted rounded h-4 w-32"></div>
            </div>

            {/* Tags Skeleton */}
            <div className="flex flex-wrap gap-2 mb-6">
              <div className="animate-pulse bg-muted rounded h-6 w-16"></div>
              <div className="animate-pulse bg-muted rounded h-6 w-20"></div>
              <div className="animate-pulse bg-muted rounded h-6 w-14"></div>
            </div>

            {/* Share Button Skeleton */}
            <div className="flex justify-end mb-8">
              <div className="animate-pulse bg-muted rounded h-10 w-20"></div>
            </div>

            <div className="animate-pulse bg-muted rounded h-px w-full mb-8"></div>
          </header>

          {/* Featured Image Skeleton */}
          <div className="mb-8 min-h-[300px]"> {/* Reserve space for image */}
            <div className="animate-pulse bg-muted rounded-lg aspect-video w-full"></div>
          </div>

          {/* Article Content Skeleton */}
          <div className="prose prose-lg max-w-none min-h-[400px]"> {/* Reserve space for content */}
            <div className="space-y-6">
              {/* Header skeleton */}
              <div className="animate-pulse bg-muted rounded h-8 w-3/4"></div>
              
              {/* Paragraph skeletons */}
              <div className="space-y-3">
                <div className="animate-pulse bg-muted rounded h-4 w-full"></div>
                <div className="animate-pulse bg-muted rounded h-4 w-full"></div>
                <div className="animate-pulse bg-muted rounded h-4 w-5/6"></div>
              </div>
              
              {/* Code block skeleton */}
              <div className="bg-muted p-4 rounded-lg">
                <div className="animate-pulse bg-background rounded h-4 w-1/3 mb-2"></div>
                <div className="animate-pulse bg-background rounded h-4 w-2/3 mb-1"></div>
                <div className="animate-pulse bg-background rounded h-4 w-1/2"></div>
              </div>
              
              {/* More paragraphs */}
              <div className="space-y-3">
                <div className="animate-pulse bg-muted rounded h-4 w-full"></div>
                <div className="animate-pulse bg-muted rounded h-4 w-4/5"></div>
                <div className="animate-pulse bg-muted rounded h-4 w-full"></div>
              </div>
              
              {/* Subheader */}
              <div className="animate-pulse bg-muted rounded h-6 w-1/2"></div>
              
              {/* List skeleton */}
              <div className="space-y-2 ml-4">
                <div className="animate-pulse bg-muted rounded h-4 w-3/4"></div>
                <div className="animate-pulse bg-muted rounded h-4 w-2/3"></div>
                <div className="animate-pulse bg-muted rounded h-4 w-4/5"></div>
              </div>
            </div>
          </div>

          {/* Article Footer Skeleton */}
          <footer className="mt-12 pt-8">
            <div className="animate-pulse bg-muted rounded h-px w-full mb-6"></div>
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <div className="animate-pulse bg-muted rounded h-4 w-32"></div>
                <div className="animate-pulse bg-muted rounded h-4 w-24"></div>
              </div>
              <div className="animate-pulse bg-muted rounded h-6 w-20"></div>
            </div>
          </footer>
        </article>
      </main>
      
      <Footer />
    </div>
  )
}
