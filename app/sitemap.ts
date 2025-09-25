import { MetadataRoute } from 'next'
import { getHowToPosts } from '@/lib/how-to-api'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://zayntheprogrammer.com'

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/how-to`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
    ]

    // Dynamic how-to posts
    let dynamicPages: MetadataRoute.Sitemap = []

    try {
        // Fetch all how-to posts (with a reasonable limit)
        const posts = await getHowToPosts({ limit: 1000 })

        dynamicPages = posts.map((post) => ({
            url: `${baseUrl}/how-to/${post.slug}`,
            lastModified: new Date(post.published_at),
            changeFrequency: 'monthly' as const,
            priority: post.featured ? 0.8 : 0.7,
        }))
    } catch (error) {
        console.error('Error fetching posts for sitemap:', error)
        // Continue with static pages even if dynamic fetch fails
    }

    return [...staticPages, ...dynamicPages]
}
