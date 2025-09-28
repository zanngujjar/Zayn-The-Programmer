import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Expert Web Developer & Software Engineer",
  description: "Professional freelance developer specializing in modern web applications, mobile apps, and custom software solutions. Get quality code delivered on time with competitive pricing.",
  keywords: "web developer, software engineer, freelance programmer, React, Next.js, mobile app development, custom software",
  openGraph: {
    title: "Zayn The Programmer - Expert Web Developer & Software Engineer",
    description: "Professional freelance developer specializing in modern web applications, mobile apps, and custom software solutions.",
    type: "website",
    url: "https://zayntheprogrammer.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zayn The Programmer - Expert Web Developer & Software Engineer",
    description: "Professional freelance developer specializing in modern web applications, mobile apps, and custom software solutions.",
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
