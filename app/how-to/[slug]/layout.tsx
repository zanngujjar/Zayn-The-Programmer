import type { Metadata } from "next"
import { getHowToPost } from "@/lib/how-to-api"
import { generateMetaDescription } from "@/lib/how-to-utils"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const post = await getHowToPost(params.slug)
    
    if (!post) {
      return {
        title: "Post Not Found",
        description: "The requested how-to guide could not be found.",
      }
    }

    const metaDescription = generateMetaDescription(post)
    
    // Use dedicated seo_title if available, otherwise use title
    const seoTitle = post.seo_title || post.title
    
    return {
      title: `${seoTitle}`,
      description: metaDescription,
      keywords: post.tags.map(tag => tag.name).join(", ") + ", how-to guide, tutorial, step-by-step",
      openGraph: {
        title: seoTitle,
        description: metaDescription,
        type: "article",
        url: `https://zayntheprogrammer.com/how-to/${post.slug}`,
        images: post.thumbnail_url ? [post.thumbnail_url] : undefined,
        publishedTime: post.published_at,
        authors: [post.author],
        tags: post.tags.map(tag => tag.name),
      },
      twitter: {
        card: "summary_large_image",
        title: seoTitle,
        description: metaDescription,
        images: post.thumbnail_url ? [post.thumbnail_url] : undefined,
      },
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: "How-To Guide",
      description: "Expert tutorials and step-by-step guides for developers.",
    }
  }
}

export default function HowToPostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
