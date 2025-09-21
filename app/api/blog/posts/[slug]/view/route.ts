import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const API_BASE = 'http://localhost:8000/api/blog'

    const response = await fetch(`${API_BASE}/posts/${params.slug}/view`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`API responded with ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error tracking view:', error)
    return NextResponse.json({ error: 'Failed to track view' }, { status: 500 })
  }
}