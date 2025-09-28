import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "How-To Guides - Expert Tutorials & Step-by-Step Instructions",
  description: "Learn from expert tutorials and step-by-step guides. Master new skills with our comprehensive how-to articles covering web development, programming, and technology.",
  keywords: "how-to guides, tutorials, step-by-step instructions, programming tutorials, web development guides, coding tutorials, technology guides",
  openGraph: {
    title: "How-To Guides - Expert Tutorials & Step-by-Step Instructions",
    description: "Learn from expert tutorials and step-by-step guides. Master new skills with our comprehensive how-to articles.",
    type: "website",
    url: "https://zayntheprogrammer.com/how-to",
  },
  twitter: {
    card: "summary_large_image",
    title: "How-To Guides - Expert Tutorials & Step-by-Step Instructions",
    description: "Learn from expert tutorials and step-by-step guides. Master new skills with our comprehensive how-to articles.",
  },
}

export default function HowToLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
