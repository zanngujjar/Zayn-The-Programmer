import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function HowToLoading() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <Skeleton className="h-12 w-96 mx-auto mb-4" />
          <Skeleton className="h-6 w-2/3 mx-auto" />
        </div>

        {/* Search Bar Skeleton */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-32" />
        </div>

        {/* Featured Section Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-8 w-48 mb-6" />
        </div>
        
        {/* Posts Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <Skeleton className="aspect-video w-full rounded-t-lg" />
              <CardHeader>
                <div className="flex gap-2 mb-2">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-3">
                  <div className="flex gap-4">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="flex gap-1">
                  <Skeleton className="h-5 w-12" />
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-14" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
