import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ServicesHero } from "@/components/services-hero"
import { ServicesList } from "@/components/services-list"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Professional Development Services - Web & Mobile App Development",
  description: "Expert freelance development services including web applications, mobile apps, custom software solutions, and technical consulting. Quality code delivered on time.",
  keywords: "web development services, mobile app development, custom software, freelance developer, React development, Next.js development, full-stack development",
  openGraph: {
    title: "Professional Development Services - Web & Mobile App Development",
    description: "Expert freelance development services including web applications, mobile apps, custom software solutions, and technical consulting.",
    type: "website",
    url: "https://zayntheprogrammer.com/services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Development Services - Web & Mobile App Development",
    description: "Expert freelance development services including web applications, mobile apps, custom software solutions, and technical consulting.",
  },
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <ServicesHero />
        <ServicesList />
      </main>
      <Footer />
    </div>
  )
}
