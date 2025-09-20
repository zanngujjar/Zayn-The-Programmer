const { preGenerateCache } = require('../lib/blog/cache')
const fs = require('fs')
const path = require('path')

async function buildCache() {
  console.log('🚀 Starting cache pre-generation...')

  try {
    // Ensure content directory exists
    const contentDir = path.join(process.cwd(), 'content')
    if (!fs.existsSync(contentDir)) {
      console.log('📁 Content directory not found, skipping cache generation')
      return
    }

    // Pre-generate cache
    await preGenerateCache()

    console.log('✅ Cache pre-generation completed successfully')
  } catch (error) {
    console.error('❌ Error during cache pre-generation:', error)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  buildCache()
}

module.exports = { buildCache }