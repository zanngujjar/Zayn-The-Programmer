"use client"

import { useEffect, useRef } from "react"
import { ADS_CONFIG } from "@/lib/ads-config"

interface GoogleAdsProps {
  /**
   * Google AdSense ad unit ID (e.g., "1234567890")
   */
  adSlot: string
  /**
   * Ad format - determines the size and layout
   */
  format?: "auto" | "rectangle" | "vertical" | "horizontal"
  /**
   * Responsive behavior
   */
  responsive?: boolean
  /**
   * Custom CSS classes
   */
  className?: string
  /**
   * Ad size for non-responsive ads
   */
  adSize?: string
  /**
   * Whether to show on mobile devices
   */
  showOnMobile?: boolean
  /**
   * Whether to show on desktop devices
   */
  showOnDesktop?: boolean
}

export function GoogleAds({
  adSlot,
  format = "auto",
  responsive = true,
  className = "",
  adSize = "auto",
  showOnMobile = true,
  showOnDesktop = true,
}: GoogleAdsProps) {
  const adRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if we're on client side and if ads should be shown
    if (typeof window === "undefined") return

    // Check device type
    const isMobile = window.innerWidth < 768
    const shouldShow = (isMobile && showOnMobile) || (!isMobile && showOnDesktop)
    
    if (!shouldShow) return

    // Load Google AdSense script if not already loaded
    if (!window.adsbygoogle) {
      const script = document.createElement("script")
      script.async = true
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      script.crossOrigin = "anonymous"
      document.head.appendChild(script)
    }

    // Initialize the ad
    const initializeAd = () => {
      if (adRef.current && window.adsbygoogle) {
        try {
          // Clear any existing ads
          adRef.current.innerHTML = ""
          
          // Create the ad element
          const adElement = document.createElement("ins")
          adElement.className = "adsbygoogle"
          adElement.style.display = "block"
          adElement.setAttribute("data-ad-client", ADS_CONFIG.PUBLISHER_ID)
          adElement.setAttribute("data-ad-slot", adSlot)
          adElement.setAttribute("data-ad-format", format)
          
          if (responsive) {
            adElement.setAttribute("data-full-width-responsive", "true")
          } else if (adSize !== "auto") {
            adElement.setAttribute("data-ad-slot", adSize)
          }

          adRef.current.appendChild(adElement)
          
          // Push the ad to Google AdSense
          ;(window.adsbygoogle = window.adsbygoogle || []).push({})
        } catch (error) {
          console.error("Error initializing Google Ad:", error)
        }
      }
    }

    // Wait for the script to load
    if (window.adsbygoogle) {
      initializeAd()
    } else {
      const checkForAds = setInterval(() => {
        if (window.adsbygoogle) {
          clearInterval(checkForAds)
          initializeAd()
        }
      }, 100)
      
      // Cleanup interval after 10 seconds
      setTimeout(() => clearInterval(checkForAds), 10000)
    }

    // Handle window resize
    const handleResize = () => {
      const isMobileNow = window.innerWidth < 768
      const shouldShowNow = (isMobileNow && showOnMobile) || (!isMobileNow && showOnDesktop)
      
      if (adRef.current) {
        adRef.current.style.display = shouldShowNow ? "block" : "none"
      }
    }

    window.addEventListener("resize", handleResize)
    
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [adSlot, format, responsive, adSize, showOnMobile, showOnDesktop])

  return (
    <div 
      ref={adRef}
      className={`google-ads-container ${className}`}
      style={{
        minHeight: format === "auto" ? "250px" : "90px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--muted)",
        borderRadius: "8px",
        border: "1px solid var(--border)",
      }}
    >
      {/* Fallback content while ad loads */}
      <div className="text-muted-foreground text-sm">
        Advertisement
      </div>
    </div>
  )
}

// Predefined ad components for common use cases
export function SidebarAd({ adSlot, className = "" }: { adSlot: string; className?: string }) {
  return (
    <GoogleAds
      adSlot={adSlot}
      format="auto"
      responsive={true}
      className={`w-full max-w-[280px] xl:max-w-[300px] ${className}`}
      showOnMobile={false}
      showOnDesktop={true}
    />
  )
}

export function InlineAd({ adSlot, className = "" }: { adSlot: string; className?: string }) {
  return (
    <GoogleAds
      adSlot={adSlot}
      format="auto"
      responsive={true}
      className={`w-full max-w-[728px] mx-auto ${className}`}
      showOnMobile={true}
      showOnDesktop={true}
    />
  )
}

export function MobileBannerAd({ adSlot, className = "" }: { adSlot: string; className?: string }) {
  return (
    <GoogleAds
      adSlot={adSlot}
      format="auto"
      responsive={true}
      className={`w-full ${className}`}
      showOnMobile={true}
      showOnDesktop={false}
    />
  )
}

export function DesktopBannerAd({ adSlot, className = "" }: { adSlot: string; className?: string }) {
  return (
    <GoogleAds
      adSlot={adSlot}
      format="auto"
      responsive={true}
      className={`w-full max-w-[728px] mx-auto ${className}`}
      showOnMobile={false}
      showOnDesktop={true}
    />
  )
}

// Declare global types for TypeScript
declare global {
  interface Window {
    adsbygoogle: any[]
  }
}
