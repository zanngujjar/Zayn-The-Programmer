// Utility functions for How-To features

import { type HowToPost } from "./how-to-api"

/**
 * Format view count with appropriate suffixes (K, M, etc.)
 */
export function formatViewCount(count: number): string {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + 'M'
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'K'
  }
  return count.toString()
}

/**
 * Get reading time estimate based on content length
 */
export function estimateReadingTime(content: string): string {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}

/**
 * Extract and format tags for display
 */
export function formatTags(tags: HowToPost['tags'], maxDisplay: number = 3) {
  const displayTags = tags.slice(0, maxDisplay)
  const remainingCount = tags.length - maxDisplay
  
  return {
    displayTags,
    remainingCount: remainingCount > 0 ? remainingCount : 0
  }
}

/**
 * Generate SEO-friendly meta description from post data
 */
export function generateMetaDescription(post: HowToPost): string {
  const maxLength = 160
  
  // Use dedicated meta_description if available, otherwise fall back to excerpt
  let description = post.meta_description || post.excerpt || ''
  
  if (description.length > maxLength) {
    description = description.substring(0, maxLength - 3) + '...'
  }
  
  return description
}

/**
 * Generate structured data for SEO
 */
export function generateStructuredData(post: HowToPost) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": post.title,
    "description": post.excerpt,
    "image": post.thumbnail_url,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "datePublished": post.published_at,
    "dateModified": post.created_at,
    "publisher": {
      "@type": "Organization",
      "name": "ZaynTheProgrammer"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://zayntheprogrammer.com/how-to/${post.slug}`
    }
  }
}

/**
 * Check if a post is recently published (within last 7 days)
 */
export function isRecentlyPublished(publishedAt: string): boolean {
  const publishedDate = new Date(publishedAt)
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  
  return publishedDate > sevenDaysAgo
}

/**
 * Get category color with fallback
 */
export function getCategoryColor(category: HowToPost['category']): string {
  return category.color || '#6B7280'
}

/**
 * Get tag color with fallback
 */
export function getTagColor(tag: HowToPost['tags'][0]): string {
  return tag.color || '#6B7280'
}

/**
 * Sanitize and format HTML content for display
 */
export function sanitizeContent(content: string): string {
  // Basic HTML sanitization - in production, use a proper sanitization library
  let sanitized = content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '') // Remove iframe tags
    .replace(/on\w+="[^"]*"/gi, '') // Remove event handlers
    .replace(/javascript:/gi, '') // Remove javascript: URLs

  // Add basic syntax highlighting to code blocks
  sanitized = addBasicSyntaxHighlighting(sanitized)
  
  return sanitized
}

/**
 * Add basic syntax highlighting to code blocks
 */
function addBasicSyntaxHighlighting(content: string): string {
  return content.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/gi, (match, code) => {
    // Detect language from common patterns
    let language = 'text'
    if (code.includes('function') || code.includes('const') || code.includes('let') || code.includes('var')) {
      language = 'javascript'
    } else if (code.includes('import') || code.includes('from') || code.includes('export')) {
      language = 'javascript'
    } else if (code.includes('def ') || code.includes('import ') || code.includes('class ')) {
      language = 'python'
    } else if (code.includes('public class') || code.includes('private ') || code.includes('System.out')) {
      language = 'java'
    } else if (code.includes('<?php') || code.includes('echo ') || code.includes('$')) {
      language = 'php'
    } else if (code.includes('SELECT') || code.includes('FROM') || code.includes('WHERE')) {
      language = 'sql'
    } else if (code.includes('<html') || code.includes('<div') || code.includes('<span')) {
      language = 'html'
    } else if (code.includes('{') && code.includes('}') && code.includes(':')) {
      language = 'css'
    }

    // Basic syntax highlighting
    let highlightedCode = code
      .replace(/\b(function|const|let|var|if|else|for|while|return|class|import|export|from|async|await)\b/g, '<span class="keyword">$1</span>')
      .replace(/\b(\d+\.?\d*)\b/g, '<span class="number">$1</span>')
      .replace(/(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span class="string">$1$2$1</span>')
      .replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, '<span class="comment">$1</span>')
      .replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g, '<span class="function">$1</span>(')

    return `<pre data-language="${language}"><code>${highlightedCode}</code></pre>`
  })
}

/**
 * Example content structure for how-to posts
 */
export const exampleContent = `
<h1>Getting Started with React</h1>

<p>React is a powerful JavaScript library for building user interfaces. In this guide, we'll walk through the basics of setting up a React application.</p>

<h2>Prerequisites</h2>

<p>Before we begin, make sure you have the following installed:</p>

<ul>
  <li>Node.js (version 14 or higher)</li>
  <li>npm or yarn package manager</li>
  <li>A code editor like VS Code</li>
</ul>

<h2>Creating Your First React App</h2>

<p>To create a new React application, use the following command:</p>

<pre><code>npx create-react-app my-app
cd my-app
npm start</code></pre>

<p>This will create a new React application and start the development server. You should see your app running at <code>http://localhost:3000</code>.</p>

<h3>Understanding Components</h3>

<p>React applications are built using components. Here's a simple example:</p>

<pre><code>function Welcome(props) {
  return &lt;h1&gt;Hello, {props.name}!&lt;/h1&gt;;
}

// Using the component
const App = () => {
  return (
    &lt;div&gt;
      &lt;Welcome name="World" /&gt;
    &lt;/div&gt;
  );
};</code></pre>

<h3>State Management</h3>

<p>Here's an example of using React hooks for state management:</p>

<pre><code>import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);
  
  return (
    &lt;div&gt;
      &lt;p&gt;Count: {count}&lt;/p&gt;
      &lt;button onClick={() => setCount(count + 1)}&gt;
        Increment
      &lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>

<h2>Next Steps</h2>

<p>Now that you have a basic understanding of React, you can:</p>

<ol>
  <li>Learn about JSX syntax</li>
  <li>Understand state and props</li>
  <li>Explore React hooks</li>
  <li>Build more complex applications</li>
</ol>

<blockquote>
  <p>Remember: Practice makes perfect! Start with small projects and gradually work your way up to more complex applications.</p>
</blockquote>
`
