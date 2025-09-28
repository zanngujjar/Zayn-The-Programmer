import { Navigation } from "@/components/navigation"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact - Get Your Project Quote Today",
  description: "Ready to start your next project? Contact Zayn The Programmer for expert web development, mobile app development, and custom software solutions. Get a free quote today.",
  keywords: "contact developer, freelance programmer contact, web development quote, mobile app development quote, custom software consultation",
  openGraph: {
    title: "Contact Zayn The Programmer - Get Your Project Quote Today",
    description: "Ready to start your next project? Contact Zayn The Programmer for expert web development, mobile app development, and custom software solutions.",
    type: "website",
    url: "https://zayntheprogrammer.com/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Zayn The Programmer - Get Your Project Quote Today",
    description: "Ready to start your next project? Contact Zayn The Programmer for expert web development, mobile app development, and custom software solutions.",
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
