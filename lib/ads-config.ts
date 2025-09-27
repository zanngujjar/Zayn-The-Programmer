/**
 * Google AdSense Configuration
 * 
 * Replace the placeholder values with your actual Google AdSense publisher ID and ad unit IDs
 * You can find these in your Google AdSense dashboard.
 */

export const ADS_CONFIG = {
  // Your Google AdSense Publisher ID (starts with ca-pub-)
  PUBLISHER_ID: "ca-pub-8058430989428480",
  
  // Ad Unit IDs for different placements
  AD_UNITS: {
    // Blog listing page ads
    BLOG_LISTING_MOBILE: "7596902180",
    BLOG_LISTING_SIDEBAR_1: "3670277222", // TODO: Create this ad unit
    BLOG_LISTING_SIDEBAR_2: "2671878565", // TODO: Create this ad unit
    
    // Individual blog post ads
    BLOG_POST_MOBILE_TOP: "1234567893", // TODO: Create this ad unit
    BLOG_POST_MOBILE_INLINE: "1234567894", // TODO: Create this ad unit
    BLOG_POST_SIDEBAR_1: "1234567895", // TODO: Create this ad unit
    BLOG_POST_SIDEBAR_2: "1234567896", // TODO: Create this ad unit
  }
} as const

/**
 * Helper function to get full ad slot ID
 */
export function getAdSlot(adUnitId: string): string {
  return `${ADS_CONFIG.PUBLISHER_ID}/${adUnitId}`
}

/**
 * Helper function to get all ad slots for a specific page
 */
export function getPageAdSlots(page: keyof typeof ADS_CONFIG.AD_UNITS) {
  const adUnits = ADS_CONFIG.AD_UNITS
  switch (page) {
    case 'BLOG_LISTING_MOBILE':
      return getAdSlot(adUnits.BLOG_LISTING_MOBILE)
    case 'BLOG_LISTING_SIDEBAR_1':
      return getAdSlot(adUnits.BLOG_LISTING_SIDEBAR_1)
    case 'BLOG_LISTING_SIDEBAR_2':
      return getAdSlot(adUnits.BLOG_LISTING_SIDEBAR_2)
    case 'BLOG_POST_MOBILE_TOP':
      return getAdSlot(adUnits.BLOG_POST_MOBILE_TOP)
    case 'BLOG_POST_MOBILE_INLINE':
      return getAdSlot(adUnits.BLOG_POST_MOBILE_INLINE)
    case 'BLOG_POST_SIDEBAR_1':
      return getAdSlot(adUnits.BLOG_POST_SIDEBAR_1)
    case 'BLOG_POST_SIDEBAR_2':
      return getAdSlot(adUnits.BLOG_POST_SIDEBAR_2)
    default:
      throw new Error(`Unknown page: ${page}`)
  }
}
