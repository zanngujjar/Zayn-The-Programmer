import { NextRequest, NextResponse } from 'next/server'
import { getPostBySlug } from '@/lib/blog/content'
import { withCache } from '@/lib/blog/cache'

interface RouteParams {
  params: {
    slug: string
  }
}

// GET /api/posts/[slug] - Get single post by slug
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { slug } = params

    if (!slug) {
      return NextResponse.json(
        { success: false, error: 'Slug is required' },
        { status: 400 }
      )
    }

    const post = await withCache(`api-post-${slug}`, async () => {
      return await getPostBySlug(slug)
    })

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: post
    })
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}