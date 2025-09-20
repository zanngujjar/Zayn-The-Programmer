import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { clearAllCache, clearCache } from '@/lib/blog/cache'

// POST /api/revalidate - Revalidate specific paths or tags
export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const body = await request.json()

    const secret = searchParams.get('secret')
    const providedSecret = process.env.REVALIDATE_SECRET || 'dev-secret'

    // Check secret for security
    if (secret !== providedSecret) {
      return NextResponse.json(
        { success: false, error: 'Invalid secret' },
        { status: 401 }
      )
    }

    const { path, tag, slug, clearCacheOnly = false } = body

    // Clear blog cache
    if (slug) {
      clearCache(`post-${slug}`)
      clearCache(`api-post-${slug}`)
      clearCache(`related-${slug}`)
      clearCache(`nav-posts-${slug}`)
    } else {
      clearAllCache()
    }

    if (!clearCacheOnly) {
      // Revalidate specific path
      if (path) {
        revalidatePath(path)
      }

      // Revalidate by tag
      if (tag) {
        revalidateTag(tag)
      }

      // Revalidate specific post
      if (slug) {
        revalidatePath(`/how-to/${slug}`)
      }

      // Always revalidate main blog page
      revalidatePath('/how-to')
    }

    return NextResponse.json({
      success: true,
      message: 'Revalidation triggered',
      revalidated: {
        path: path || (slug ? `/how-to/${slug}` : '/how-to'),
        tag,
        slug,
        clearCacheOnly
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error in revalidation:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET /api/revalidate - Health check and info
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const providedSecret = process.env.REVALIDATE_SECRET || 'dev-secret'

  if (secret !== providedSecret) {
    return NextResponse.json(
      { success: false, error: 'Invalid secret' },
      { status: 401 }
    )
  }

  return NextResponse.json({
    success: true,
    message: 'Revalidate API is working',
    usage: {
      'POST /api/revalidate?secret=<secret>': {
        path: 'Specific path to revalidate (optional)',
        tag: 'Tag to revalidate (optional)',
        slug: 'Post slug to revalidate (optional)',
        clearCacheOnly: 'Only clear cache without revalidation (optional, default: false)'
      }
    },
    timestamp: new Date().toISOString()
  })
}