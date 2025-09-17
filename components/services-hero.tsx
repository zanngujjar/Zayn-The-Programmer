import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function ServicesHero() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 font-playfair text-balance">
            Professional Development
            <span className="text-primary block mt-2">Services</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed text-pretty">
            From simple websites to complex applications, I deliver high-quality solutions tailored to your specific
            needs and budget.
          </p>

          <Button size="lg" className="text-lg px-8 py-3" asChild>
            <a href="#services-list">
              Browse Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
