"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface LoadingTransitionProps {
  isLoading: boolean
  children: React.ReactNode
  className?: string
  fallback?: React.ReactNode
}

export function LoadingTransition({ 
  isLoading, 
  children, 
  className,
  fallback 
}: LoadingTransitionProps) {
  const [showContent, setShowContent] = useState(!isLoading)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    if (isLoading) {
      setIsTransitioning(true)
      setShowContent(false)
    } else {
      // Use requestAnimationFrame for smooth transition
      requestAnimationFrame(() => {
        setShowContent(true)
        setIsTransitioning(false)
      })
    }
  }, [isLoading])

  return (
    <div className={cn("relative", className)}>
      {isTransitioning && fallback && (
        <div className="animate-in fade-in-0 duration-200">
          {fallback}
        </div>
      )}
      
      {showContent && (
        <div className={cn(
          "animate-in fade-in-0 duration-300",
          isTransitioning && "opacity-0"
        )}>
          {children}
        </div>
      )}
    </div>
  )
}

