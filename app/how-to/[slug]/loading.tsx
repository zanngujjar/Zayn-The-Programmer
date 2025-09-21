import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function HowToPostLoading() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button Skeleton */}
        <div className="mb-6">
          <Skeleton className="h-10 w-48" />
        </div>

        {/* Article Header Skeleton */}
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            {/* Badges Skeleton */}
            <div className="flex items-center gap-2 mb-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-20" />
            </div>

            {/* Title Skeleton */}
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-12 w-4/5 mb-6" />

            {/* Excerpt Skeleton */}
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-3/4 mb-6" />

            {/* Meta Information Skeleton */}
            <div className="flex flex-wrap items-center gap-6 mb-6">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-32" />
            </div>

            {/* Tags Skeleton */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-14" />
            </div>

            {/* Share Button Skeleton */}
            <div className="flex justify-end mb-8">
              <Skeleton className="h-10 w-20" />
            </div>

            <Skeleton className="h-px w-full mb-8" />
          </header>

          {/* Featured Image Skeleton */}
          <div className="mb-8">
            <Skeleton className="aspect-video w-full rounded-lg" />
          </div>

          {/* Article Content Skeleton */}
          <div className="prose prose-lg max-w-none">
            <div className="space-y-6">
              {/* Header skeleton */}
              <Skeleton className="h-8 w-3/4" />
              
              {/* Paragraph skeletons */}
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
              
              {/* Code block skeleton */}
              <div className="bg-muted p-4 rounded-lg">
                <Skeleton className="h-4 w-1/3 mb-2" />
                <Skeleton className="h-4 w-2/3 mb-1" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              
              {/* More paragraphs */}
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-full" />
              </div>
              
              {/* Subheader */}
              <Skeleton className="h-6 w-1/2" />
              
              {/* List skeleton */}
              <div className="space-y-2 ml-4">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>
          </div>

          {/* Article Footer Skeleton */}
          <footer className="mt-12 pt-8">
            <Skeleton className="h-px w-full mb-6" />
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-6 w-20" />
            </div>
          </footer>
        </article>
      </main>
      
      <Footer />
    </div>
  )
}
