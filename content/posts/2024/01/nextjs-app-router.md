---
title: "Next.js App Router: Complete Guide"
slug: "nextjs-app-router"
excerpt: "Explore the new App Router in Next.js 13+ with file-based routing, layouts, and server components."
thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop"
author: "ZaynTheProgrammer"
publishDate: "2024-01-25"
readTime: "10 min read"
tags: ["Next.js", "React", "App Router", "Server Components"]
category: "Framework"
featured: true
seoKeywords: ["nextjs", "app router", "server components", "nextjs 13", "react server components"]
metaDescription: "Master the Next.js App Router with this complete guide covering layouts, server components, and modern routing patterns."
---

Next.js 13 introduced the App Router, a new paradigm for building React applications with improved performance, better developer experience, and powerful features like Server Components.

## App Router vs Pages Router

The App Router is built on top of React's newest features and provides several improvements over the traditional Pages Router:

• **Server Components**: Render components on the server for better performance
• **Nested Layouts**: Create shared layouts that persist across route changes
• **Loading UI**: Built-in loading states for better user experience
• **Error Handling**: Granular error boundaries for different parts of your app

### File Structure

```text
app/
├── layout.tsx          // Root layout
├── page.tsx           // Home page
├── loading.tsx        // Loading UI
├── error.tsx          // Error UI
├── about/
│   └── page.tsx       // /about
└── blog/
    ├── page.tsx       // /blog
    └── [slug]/
        └── page.tsx   // /blog/[slug]
```

### Creating Pages and Layouts

```tsx
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav>Navigation</nav>
        <main>{children}</main>
        <footer>Footer</footer>
      </body>
    </html>
  )
}

// app/page.tsx
export default function HomePage() {
  return <h1>Welcome to my website!</h1>
}
```