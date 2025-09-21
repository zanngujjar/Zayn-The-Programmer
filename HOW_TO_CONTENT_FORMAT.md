# How-To Content Formatting Guide

## Overview
The How-To page now supports rich HTML content with proper styling for headers, code blocks, and other elements.

## Content Structure

### Headers
Use standard HTML header tags for proper hierarchy:

```html
<h1>Main Title</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>
<h4>Minor Heading</h4>
<h5>Small Heading</h5>
<h6>Smallest Heading</h6>
```

### Code Blocks
For inline code, use the `<code>` tag:
```html
<p>Use the <code>npm install</code> command to install packages.</p>
```

For code blocks, use `<pre><code>`:
```html
<pre><code>function example() {
  console.log("Hello World");
}</code></pre>
```

**Code Block Features:**
- **Automatic Syntax Highlighting**: Keywords, strings, numbers, and comments are automatically colored
- **Language Detection**: Automatically detects JavaScript, Python, Java, PHP, SQL, HTML, and CSS
- **Card-like Design**: Light gray background with green accent border
- **Language Indicator**: Shows the detected language in the top-right corner
- **Theme Support**: Different colors for light and dark themes

### Lists
For unordered lists:
```html
<ul>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>
```

For ordered lists:
```html
<ol>
  <li>Step one</li>
  <li>Step two</li>
  <li>Step three</li>
</ol>
```

### Other Elements
- **Blockquotes**: `<blockquote><p>Quote text</p></blockquote>`
- **Links**: `<a href="url">Link text</a>`
- **Images**: `<img src="image.jpg" alt="Description" />`
- **Tables**: Standard HTML table structure
- **Horizontal rules**: `<hr />`

## Example Content

Here's a complete example of how content should be structured:

```html
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
```

## API Integration

The content field should be included in your API response:

```json
{
  "id": "uuid",
  "slug": "getting-started-with-react",
  "title": "Getting Started with React",
  "excerpt": "Learn the basics of React development...",
  "content": "<h1>Getting Started with React</h1><p>React is a powerful...</p>",
  "thumbnail_url": "https://example.com/image.jpg",
  "author": "John Doe",
  "category": { ... },
  "tags": [ ... ],
  "featured": true,
  "read_time": "8 min read",
  "view_count": 2500,
  "published_at": "2024-01-15T10:30:00Z",
  "created_at": "2024-01-15T10:30:00Z"
}
```

## Security

The content is automatically sanitized to remove potentially dangerous elements like:
- `<script>` tags
- `<iframe>` tags
- Event handlers (`onclick`, `onload`, etc.)
- `javascript:` URLs

## Styling

All content is styled using Tailwind CSS classes and will automatically adapt to light/dark themes. The styling includes:

- Proper typography hierarchy
- Code syntax highlighting
- Responsive design
- Theme-aware colors
- Proper spacing and margins

## Testing

To test the content formatting, you can:

1. Create a test post with HTML content
2. View it on the individual post page
3. Verify that all elements render correctly
4. Test both light and dark themes
5. Check responsive behavior on different screen sizes
