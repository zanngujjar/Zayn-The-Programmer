"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"

export function useNavigationState() {
  const [isNavigating, setIsNavigating] = useState(false)
  const [navigationStartTime, setNavigationStartTime] = useState<number | null>(null)
  const router = useRouter()

  const navigate = useCallback((href: string) => {
    if (isNavigating) return

    setIsNavigating(true)
    setNavigationStartTime(Date.now())

    // Use requestAnimationFrame to ensure smooth transition
    requestAnimationFrame(() => {
      router.push(href)
    })

    // Reset navigation state after a reasonable delay
    setTimeout(() => {
      setIsNavigating(false)
      setNavigationStartTime(null)
    }, 1000)
  }, [isNavigating, router])

  const getNavigationDuration = useCallback(() => {
    if (!navigationStartTime) return 0
    return Date.now() - navigationStartTime
  }, [navigationStartTime])

  return {
    isNavigating,
    navigate,
    getNavigationDuration
  }
}

