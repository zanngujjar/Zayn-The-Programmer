import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Playfair_Display } from "next/font/google"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"
import "../styles/ads.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700"],
})

export const metadata: Metadata = {
  title: {
    default: "Zayn The Programmer - Professional Development Services",
    template: "%s | Zayn The Programmer"
  },
  description:
    "Expert freelance programmer offering web development, mobile apps, and custom software solutions. Quality code, competitive prices.",
  generator: "Next.js",
  metadataBase: new URL("https://zayntheprogrammer.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zayntheprogrammer.com",
    siteName: "Zayn The Programmer",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@zayntheprogrammer",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8058430989428480"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${playfair.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
