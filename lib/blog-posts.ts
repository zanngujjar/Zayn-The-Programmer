export interface BlogPost {
  id: string;
  title: string;
  thumbnail: string;
  excerpt: string;
  content: BlogContentItem[];
  author: string;
  publishDate: string;
  readTime: string;
  tags: string[];
  category: string;
  featured: boolean;
  seoKeywords: string[];
  metaDescription: string;
}

export interface BlogContentItem {
  type: 'paragraph' | 'heading' | 'code' | 'image';
  text?: string;
  level?: number;
  language?: string;
  code?: string;
  src?: string;
  alt?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "react-hooks-guide",
    title: "Complete Guide to React Hooks",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
    excerpt: "Master React Hooks with this comprehensive guide covering useState, useEffect, and custom hooks with practical examples.",
    content: [
      {
        type: "paragraph",
        text: "React Hooks revolutionized the way we write React components by allowing us to use state and lifecycle methods in functional components. In this comprehensive guide, we'll explore the most important hooks and learn how to use them effectively."
      },
      {
        type: "heading",
        level: 2,
        text: "What are React Hooks?"
      },
      {
        type: "paragraph",
        text: "Hooks are functions that let you <strong>hook into</strong> React state and lifecycle features from function components. They allow you to use state and other React features without writing a class component."
      },
      {
        type: "heading",
        level: 3,
        text: "useState Hook"
      },
      {
        type: "paragraph",
        text: "The useState hook allows you to add state to functional components:"
      },
      {
        type: "code",
        language: "javascript",
        code: "import React, { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>\n        Click me\n      </button>\n    </div>\n  );\n}"
      },
      {
        type: "heading",
        level: 3,
        text: "useEffect Hook"
      },
      {
        type: "paragraph",
        text: "The useEffect hook lets you perform side effects in function components. It serves the same purpose as <em>componentDidMount</em>, <em>componentDidUpdate</em>, and <em>componentWillUnmount</em> combined in React classes."
      },
      {
        type: "code",
        language: "javascript",
        code: "import React, { useState, useEffect } from 'react';\n\nfunction Example() {\n  const [count, setCount] = useState(0);\n\n  useEffect(() => {\n    document.title = `You clicked ${count} times`;\n  });\n\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>\n        Click me\n      </button>\n    </div>\n  );\n}"
      }
    ],
    author: "ZaynTheProgrammer",
    publishDate: "2024-01-15",
    readTime: "8 min read",
    tags: ["React", "Hooks", "JavaScript", "Frontend"],
    category: "Tutorial",
    featured: true,
    seoKeywords: ["react hooks", "useState", "useEffect", "react tutorial", "functional components"],
    metaDescription: "Learn React Hooks with this comprehensive guide covering useState, useEffect, and custom hooks with practical examples and best practices."
  },
  {
    id: "typescript-for-beginners",
    title: "TypeScript for JavaScript Developers",
    thumbnail: "https://images.unsplash.com/photo-1516996087931-5ae405802f9f?w=800&h=400&fit=crop",
    excerpt: "Learn TypeScript fundamentals and how it can improve your JavaScript development with type safety and better tooling.",
    content: [
      {
        type: "paragraph",
        text: "TypeScript is a powerful superset of JavaScript that adds static typing to the language. If you're coming from JavaScript, this guide will help you understand the benefits of TypeScript and how to get started."
      },
      {
        type: "heading",
        level: 2,
        text: "Why TypeScript?"
      },
      {
        type: "paragraph",
        text: "TypeScript provides several advantages over plain JavaScript:\n\n• <strong>Type Safety</strong>: Catch errors at compile time rather than runtime\n• <strong>Better IDE Support</strong>: Enhanced autocomplete, refactoring, and navigation\n• <strong>Self-documenting Code</strong>: Types serve as inline documentation\n• <strong>Easier Refactoring</strong>: Confidence when making changes to large codebases"
      },
      {
        type: "heading",
        level: 3,
        text: "Basic Types"
      },
      {
        type: "code",
        language: "typescript",
        code: "// Basic types\nlet name: string = 'John';\nlet age: number = 30;\nlet isActive: boolean = true;\nlet items: string[] = ['item1', 'item2'];\n\n// Object types\ninterface User {\n  id: number;\n  name: string;\n  email: string;\n}\n\nconst user: User = {\n  id: 1,\n  name: 'John Doe',\n  email: 'john@example.com'\n};"
      },
      {
        type: "heading",
        level: 3,
        text: "Functions with Types"
      },
      {
        type: "code",
        language: "typescript",
        code: "// Function with typed parameters and return type\nfunction greet(name: string): string {\n  return `Hello, ${name}!`;\n}\n\n// Arrow function with types\nconst add = (a: number, b: number): number => {\n  return a + b;\n};\n\n// Optional parameters\nfunction createUser(name: string, age?: number): User {\n  return {\n    id: Math.random(),\n    name,\n    email: `${name.toLowerCase()}@example.com`\n  };\n}"
      }
    ],
    author: "ZaynTheProgrammer",
    publishDate: "2024-01-20",
    readTime: "6 min read",
    tags: ["TypeScript", "JavaScript", "Types", "Development"],
    category: "Tutorial",
    featured: false,
    seoKeywords: ["typescript", "javascript", "type safety", "typescript tutorial", "static typing"],
    metaDescription: "Learn TypeScript fundamentals for JavaScript developers. Understand type safety, interfaces, and how TypeScript improves development workflow."
  },
  {
    id: "nextjs-app-router",
    title: "Next.js App Router: Complete Guide",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
    excerpt: "Explore the new App Router in Next.js 13+ with file-based routing, layouts, and server components.",
    content: [
      {
        type: "paragraph",
        text: "Next.js 13 introduced the App Router, a new paradigm for building React applications with improved performance, better developer experience, and powerful features like Server Components."
      },
      {
        type: "heading",
        level: 2,
        text: "App Router vs Pages Router"
      },
      {
        type: "paragraph",
        text: "The App Router is built on top of React's newest features and provides several improvements over the traditional Pages Router:"
      },
      {
        type: "paragraph",
        text: "• <strong>Server Components</strong>: Render components on the server for better performance\n• <strong>Nested Layouts</strong>: Create shared layouts that persist across route changes\n• <strong>Loading UI</strong>: Built-in loading states for better user experience\n• <strong>Error Handling</strong>: Granular error boundaries for different parts of your app"
      },
      {
        type: "heading",
        level: 3,
        text: "File Structure"
      },
      {
        type: "code",
        language: "text",
        code: "app/\n├── layout.tsx          // Root layout\n├── page.tsx           // Home page\n├── loading.tsx        // Loading UI\n├── error.tsx          // Error UI\n├── about/\n│   └── page.tsx       // /about\n└── blog/\n    ├── page.tsx       // /blog\n    └── [slug]/\n        └── page.tsx   // /blog/[slug]"
      },
      {
        type: "heading",
        level: 3,
        text: "Creating Pages and Layouts"
      },
      {
        type: "code",
        language: "tsx",
        code: "// app/layout.tsx\nexport default function RootLayout({\n  children,\n}: {\n  children: React.ReactNode\n}) {\n  return (\n    <html lang=\"en\">\n      <body>\n        <nav>Navigation</nav>\n        <main>{children}</main>\n        <footer>Footer</footer>\n      </body>\n    </html>\n  )\n}\n\n// app/page.tsx\nexport default function HomePage() {\n  return <h1>Welcome to my website!</h1>\n}"
      }
    ],
    author: "ZaynTheProgrammer",
    publishDate: "2024-01-25",
    readTime: "10 min read",
    tags: ["Next.js", "React", "App Router", "Server Components"],
    category: "Framework",
    featured: true,
    seoKeywords: ["nextjs", "app router", "server components", "nextjs 13", "react server components"],
    metaDescription: "Master the Next.js App Router with this complete guide covering layouts, server components, and modern routing patterns."
  },
  {
    id: "css-grid-flexbox",
    title: "CSS Grid vs Flexbox: When to Use Which",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
    excerpt: "Understand the differences between CSS Grid and Flexbox and learn when to use each layout method for optimal results.",
    content: [
      {
        type: "paragraph",
        text: "CSS Grid and Flexbox are both powerful layout methods, but they solve different problems. Understanding when to use each one will make you a more effective frontend developer."
      },
      {
        type: "heading",
        level: 2,
        text: "Flexbox: One-Dimensional Layouts"
      },
      {
        type: "paragraph",
        text: "Flexbox is designed for <strong>one-dimensional layouts</strong> - either in a row or column. It excels at distributing space and aligning items within a container."
      },
      {
        type: "heading",
        level: 3,
        text: "When to Use Flexbox"
      },
      {
        type: "paragraph",
        text: "• Navigation bars and menus\n• Centering content vertically and horizontally\n• Equal-height columns\n• Space distribution between items"
      },
      {
        type: "code",
        language: "css",
        code: "/* Flexbox example: Navigation bar */\n.navbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem;\n}\n\n.nav-links {\n  display: flex;\n  gap: 2rem;\n  list-style: none;\n}"
      },
      {
        type: "heading",
        level: 2,
        text: "CSS Grid: Two-Dimensional Layouts"
      },
      {
        type: "paragraph",
        text: "CSS Grid is designed for <strong>two-dimensional layouts</strong> - working with both rows and columns simultaneously. It's perfect for complex layouts and precise positioning."
      },
      {
        type: "heading",
        level: 3,
        text: "When to Use CSS Grid"
      },
      {
        type: "paragraph",
        text: "• Page layouts with header, sidebar, main content, and footer\n• Card grids and galleries\n• Complex forms\n• Any layout requiring precise positioning in two dimensions"
      },
      {
        type: "code",
        language: "css",
        code: "/* CSS Grid example: Page layout */\n.page-layout {\n  display: grid;\n  grid-template-areas: \n    \"header header header\"\n    \"sidebar main aside\"\n    \"footer footer footer\";\n  grid-template-columns: 250px 1fr 200px;\n  grid-template-rows: auto 1fr auto;\n  min-height: 100vh;\n}\n\n.header { grid-area: header; }\n.sidebar { grid-area: sidebar; }\n.main { grid-area: main; }\n.aside { grid-area: aside; }\n.footer { grid-area: footer; }"
      }
    ],
    author: "ZaynTheProgrammer",
    publishDate: "2024-02-01",
    readTime: "7 min read",
    tags: ["CSS", "Grid", "Flexbox", "Layout", "Frontend"],
    category: "CSS",
    featured: false,
    seoKeywords: ["css grid", "flexbox", "css layout", "responsive design", "css grid vs flexbox"],
    metaDescription: "Learn the differences between CSS Grid and Flexbox and when to use each layout method for optimal web development results."
  },
  {
    id: "react-performance-optimization",
    title: "React Performance Optimization Techniques",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
    excerpt: "Boost your React app performance with memoization, code splitting, and other optimization techniques.",
    content: [
      {
        type: "paragraph",
        text: "Performance is crucial for user experience. In this guide, we'll explore various techniques to optimize React applications and ensure they run smoothly even as they grow in complexity."
      },
      {
        type: "heading",
        level: 2,
        text: "React.memo and Memoization"
      },
      {
        type: "paragraph",
        text: "React.memo is a higher-order component that prevents unnecessary re-renders by memoizing the result."
      },
      {
        type: "code",
        language: "jsx",
        code: "import React, { memo } from 'react';\n\nconst ExpensiveComponent = memo(({ data, onUpdate }) => {\n  // Expensive calculations here\n  const processedData = useMemo(() => {\n    return data.map(item => ({\n      ...item,\n      processed: expensiveOperation(item)\n    }));\n  }, [data]);\n\n  return (\n    <div>\n      {processedData.map(item => (\n        <div key={item.id}>{item.name}</div>\n      ))}\n    </div>\n  );\n});\n\n// Only re-render if props actually change\nexport default ExpensiveComponent;"
      },
      {
        type: "heading",
        level: 3,
        text: "useMemo and useCallback"
      },
      {
        type: "paragraph",
        text: "Use these hooks to memoize expensive calculations and prevent unnecessary function recreations:"
      },
      {
        type: "code",
        language: "jsx",
        code: "import React, { useMemo, useCallback, useState } from 'react';\n\nfunction OptimizedComponent({ items, filter }) {\n  const [count, setCount] = useState(0);\n\n  // Memoize expensive filtering operation\n  const filteredItems = useMemo(() => {\n    return items.filter(item => item.category === filter);\n  }, [items, filter]);\n\n  // Memoize callback to prevent child re-renders\n  const handleItemClick = useCallback((id) => {\n    // Handle click logic\n    console.log('Item clicked:', id);\n  }, []);\n\n  return (\n    <div>\n      <button onClick={() => setCount(c => c + 1)}>\n        Count: {count}\n      </button>\n      {filteredItems.map(item => (\n        <ItemComponent \n          key={item.id} \n          item={item} \n          onClick={handleItemClick} \n        />\n      ))}\n    </div>\n  );\n}"
      }
    ],
    author: "ZaynTheProgrammer",
    publishDate: "2024-02-10",
    readTime: "9 min read",
    tags: ["React", "Performance", "Optimization", "Memoization"],
    category: "Performance",
    featured: true,
    seoKeywords: ["react performance", "react optimization", "useMemo", "useCallback", "react memo"],
    metaDescription: "Learn essential React performance optimization techniques including memoization, code splitting, and best practices for faster apps."
  }
];

export function getBlogPostById(id: string): BlogPost | undefined {
  return blogPosts.find(post => post.id === id);
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter(post => post.featured);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category === category);
}

export function getPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter(post => post.tags.includes(tag));
}

export function searchPosts(query: string): BlogPost[] {
  const lowercaseQuery = query.toLowerCase();
  return blogPosts.filter(post =>
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    post.category.toLowerCase().includes(lowercaseQuery) ||
    post.seoKeywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery))
  );
}

export function getAllTags(): string[] {
  const allTags = blogPosts.flatMap(post => post.tags);
  return Array.from(new Set(allTags)).sort();
}

export function getAllCategories(): string[] {
  const allCategories = blogPosts.map(post => post.category);
  return Array.from(new Set(allCategories)).sort();
}