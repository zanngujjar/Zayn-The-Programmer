"use client"


import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Zap } from "lucide-react"
import Link from "next/link"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const features = [
  {
    icon: Code,
    title: "Clean Code",
    description: "Well-structured, maintainable code following industry best practices",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "Quick turnaround times without compromising on quality",
  },
  {
    icon: ArrowRight,
    title: "Results Focused",
    description: "Solutions that meet your business objectives and user needs",
  },
]

export function HeroSection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 font-playfair text-balance">
            Professional Development Services
            <span className="text-primary block mt-2">That Deliver Results</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed text-pretty">
            Expert freelance programmer specializing in web development, mobile applications, and custom software
            solutions. Quality code, competitive prices, delivered on time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/services">
              <Button size="lg" className="text-lg px-8 py-3">
                View Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#projects">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3 bg-transparent">
                See My Work
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {features.map((feature, index) => (
              <div
                key={index}
                ref={ref}
                className={`text-center transform transition-all duration-700 ease-out ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
