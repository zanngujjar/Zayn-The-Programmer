import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const API_BASE = 'http://localhost:8000/api/blog'

    const response = await fetch(`${API_BASE}/recent`)

    if (!response.ok) {
      throw new Error(`API responded with ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching recent posts:', error)
    return NextResponse.json({ error: 'Failed to fetch recent posts' }, { status: 500 })
  }
}