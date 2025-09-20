"use client"

import { useEffect } from "react"

interface AdSpaceProps {
  slot: string
  className?: string
  style?: React.CSSProperties
  format?: "auto" | "rectangle" | "vertical" | "horizontal"
}

export function AdSpace({
  slot,
  className = "",
  style = {},
  format = "auto"
}: AdSpaceProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (err) {
      console.error("AdSense error:", err)
    }
  }, [])

  return (
    <div className={`ad-container ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", ...style }}
        data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}

// Pre-configured ad components for common placements
export function HeaderAd() {
  return (
    <AdSpace
      slot="HEADER_AD_SLOT"
      className="mb-6"
      style={{ minHeight: "90px" }}
      format="horizontal"
    />
  )
}

export function SidebarAd() {
  return (
    <AdSpace
      slot="SIDEBAR_AD_SLOT"
      className="mb-6"
      style={{ minWidth: "160px", minHeight: "600px" }}
      format="vertical"
    />
  )
}

export function InContentAd() {
  return (
    <AdSpace
      slot="IN_CONTENT_AD_SLOT"
      className="my-6"
      style={{ minHeight: "250px" }}
      format="rectangle"
    />
  )
}

export function FooterAd() {
  return (
    <AdSpace
      slot="FOOTER_AD_SLOT"
      className="mt-6"
      style={{ minHeight: "90px" }}
      format="horizontal"
    />
  )
}