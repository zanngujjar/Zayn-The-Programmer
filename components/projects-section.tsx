"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useState } from "react"

const projects = [
  {
    title: "Bigbird Portfolios",
    description: "Full-stack portfolio simulator with user authentication and portfolio analysis.",
    images: [
      "/5.png",
      "/4.png",
      "/3.png",
      "/2.png",
    ],
    technologies: ["TypeScript", "React", "PostgreSQL", "Tailwind CSS", "Express", "Node.js"],
    liveUrl: "https://BigbirdPortfolios.com",
    githubUrl: "https://github.com/zanngujjar/Big-Bird-Portfolio.git",
  },
  {
    title: "Personal Trading Terminal",
    description: "Trading terminal with real time data and portfolio analysis, integrated to handle all finances on solana blockchain",
    images: [
      "/tradingterminal.png",
      "/tradingterminal1.png",
      "/tradingterminal2.png"
    ],
    technologies: ["React", "Node.js", "web3", "SQLite", "ElectronJS", "Tailwind CSS", "React"],
    githubUrl: "#",
  },
  {
    title: "Amazon Item Scraper",
    description: "Amazon item scraper with unique fingerprinting, data formatting and extraction",
    images: [
      "/AmazonS.png",
      "/AmazonS1.png",
      "/AmazonS2.png",
      "/AmazonS3.png",
    ],
    technologies: ["Python", "BeautifulSoup", "Data formatting", "ChromeDriver", "Chrome", "Excel"],
    downloadUrl: "Amazon_Web_Scraper.zip",
    githubUrl: "https://github.com/zanngujjar/Amazon-Item-Scrapper.git",
  },
]

interface ProjectImageCarouselProps {
  images: string[]
  title: string
}

function ProjectImageCarousel({ images, title }: ProjectImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  if (images.length === 0) return null

  return (
    <div className="relative overflow-hidden group">
      <Image
        src={images[currentImageIndex] || "/placeholder.svg"}
        alt={`${title} - Image ${currentImageIndex + 1}`}
        width={300}
        height={200}
        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
      />
      
      {/* Navigation arrows - only show if multiple images */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all duration-300 z-10 opacity-80 hover:opacity-100"
            aria-label="Previous image"
            type="button"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all duration-300 z-10 opacity-80 hover:opacity-100"
            aria-label="Next image"
            type="button"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </>
      )}

      {/* Image indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to image ${index + 1}`}
              type="button"
            />
          ))}
        </div>
      )}

      {/* Image counter */}
      {images.length > 1 && (
        <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full z-10">
          {currentImageIndex + 1} / {images.length}
        </div>
      )}

      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
    </div>
  )
}

export function ProjectsSection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 font-playfair">Featured Projects</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            A showcase of recent work demonstrating technical expertise and creative problem-solving
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" ref={ref}>
          {projects.map((project, index) => (
            <div
              key={index}
              className={`transform transition-all duration-700 ease-out ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                <ProjectImageCarousel 
                  images={project.images} 
                  title={project.title} 
                />

                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-foreground">{project.title}</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
  <p className="text-muted-foreground leading-relaxed">{project.description}</p>

  <div className="flex flex-wrap gap-2">
    {project.technologies.map((tech, techIndex) => (
      <span key={techIndex} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
        {tech}
      </span>
    ))}
  </div>

  <div className="flex gap-3 pt-2">
    {/* ✨ Renders the LIVE DEMO button */}
    {project.liveUrl && (
      <Button variant="outline" size="sm" asChild>
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="h-4 w-4 mr-2" />
          Live Demo
        </a>
      </Button>
    )}

    {/* ✨ Renders the DOWNLOAD button */}
    {project.downloadUrl && (
      <Button variant="outline" size="sm" asChild>
        <a href={project.downloadUrl} download> {/* 'download' attribute is key */}
          <ExternalLink className="h-4 w-4 mr-2" />
          Download ZIP
        </a>
      </Button>
    )}

    {/* Renders the CODE button (unchanged) */}
    {project.githubUrl && project.githubUrl !== "#" && (
      <Button variant="outline" size="sm" asChild>
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
          <Github className="h-4 w-4 mr-2" />
          Code
        </a>
      </Button>
    )}
  </div>
</CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
