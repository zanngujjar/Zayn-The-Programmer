import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Search } from "lucide-react"

export default function HowToPostNotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <Search className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-foreground mb-2">Post Not Found</h1>
          <p className="text-muted-foreground">
            The how-to guide you're looking for doesn't exist or may have been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link href="/how-to">
            <Button className="w-full flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to How-To Guides
            </Button>
          </Link>
          
          <Link href="/">
            <Button variant="outline" className="w-full">
              Go to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
