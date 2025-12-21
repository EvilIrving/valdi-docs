// SEO utility functions for managing meta tags dynamically

export interface SeoMetaData {
  title?: string
  description?: string
  keywords?: string
  author?: string
  ogType?: string
  ogImage?: string
  twitterCard?: 'summary' | 'summary_large_image'
  canonical?: string
  robots?: string
}

const DEFAULT_SEO: SeoMetaData = {
  title: 'Vadli Documentation - Cross-Platform App Development Framework',
  description: 'Comprehensive documentation for Vadli, a powerful framework for building cross-platform applications. Learn core concepts, API references, and step-by-step tutorials.',
  keywords: 'Vadli, cross-platform, mobile development, native integration, app framework, documentation, API reference',
  author: 'Vadli',
  ogType: 'website',
  ogImage: 'https://vadli-docs.onecat.dev/og-image.png',
  twitterCard: 'summary_large_image',
  robots: 'index, follow'
}

const SITE_URL = 'https://vadli-docs.onecat.dev'

/**
 * Update document meta tags
 */
export function updateMetaTags(meta: SeoMetaData) {
  const config = { ...DEFAULT_SEO, ...meta }

  // Update title
  if (config.title) {
    document.title = config.title
    updateMetaTag('name', 'title', config.title)
    updateMetaTag('property', 'og:title', config.title)
    updateMetaTag('name', 'twitter:title', config.title)
  }

  // Update description
  if (config.description) {
    updateMetaTag('name', 'description', config.description)
    updateMetaTag('property', 'og:description', config.description)
    updateMetaTag('name', 'twitter:description', config.description)
  }

  // Update keywords
  if (config.keywords) {
    updateMetaTag('name', 'keywords', config.keywords)
  }

  // Update author
  if (config.author) {
    updateMetaTag('name', 'author', config.author)
  }

  // Update Open Graph type
  if (config.ogType) {
    updateMetaTag('property', 'og:type', config.ogType)
  }

  // Update images
  if (config.ogImage) {
    updateMetaTag('property', 'og:image', config.ogImage)
    updateMetaTag('name', 'twitter:image', config.ogImage)
  }

  // Update Twitter card
  if (config.twitterCard) {
    updateMetaTag('name', 'twitter:card', config.twitterCard)
  }

  // Update robots
  if (config.robots) {
    updateMetaTag('name', 'robots', config.robots)
  }

  // Update canonical URL
  if (config.canonical) {
    updateLinkTag('canonical', config.canonical)
    updateMetaTag('property', 'og:url', config.canonical)
    updateMetaTag('name', 'twitter:url', config.canonical)
  }
}

/**
 * Helper function to update or create meta tags
 */
function updateMetaTag(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.querySelector(`meta[${attribute}="${key}"]`)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

/**
 * Helper function to update or create link tags
 */
function updateLinkTag(rel: string, href: string) {
  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement

  if (!element) {
    element = document.createElement('link')
    element.rel = rel
    document.head.appendChild(element)
  }

  element.href = href
}

/**
 * Generate SEO metadata for documentation pages
 */
export function generateDocSeo(category: string, slug: string, title: string, content?: string): SeoMetaData {
  const fullSlug = `${category}/${slug}`
  const url = `${SITE_URL}/${fullSlug}`

  // Extract description from content (first 160 chars)
  let description = DEFAULT_SEO.description
  if (content) {
    const plainText = content.replace(/[#*`]/g, '').trim()
    const firstParagraph = plainText.split('\n').find(line => line.length > 20)
    if (firstParagraph) {
      description = firstParagraph.substring(0, 157) + '...'
    }
  }

  // Generate title with category context
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1)
  const fullTitle = `${title} - ${categoryName} | Vadli Documentation`

  // Generate keywords based on category and title
  const keywords = `${title.toLowerCase()}, Vadli ${category}, ${DEFAULT_SEO.keywords}`

  return {
    title: fullTitle,
    description,
    keywords,
    canonical: url,
    ogType: 'article',
    ogImage: `${SITE_URL}/og-image.png`,
    twitterCard: 'summary_large_image'
  }
}

/**
 * Add JSON-LD structured data
 */
export function addStructuredData(data: object) {
  // Remove existing structured data
  const existing = document.querySelector('script[type="application/ld+json"]')
  if (existing) {
    existing.remove()
  }

  // Add new structured data
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify(data)
  document.head.appendChild(script)
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbData(path: string): object {
  const parts = path.split('/').filter(Boolean)
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_URL
    }
  ]

  let currentPath = ''
  parts.forEach((part, index) => {
    currentPath += `/${part}`
    items.push({
      '@type': 'ListItem',
      position: index + 2,
      name: part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' '),
      item: `${SITE_URL}${currentPath}`
    })
  })

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items
  }
}

/**
 * Generate documentation article structured data
 */
export function generateArticleData(title: string, description: string, url: string): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    description: description,
    url: url,
    publisher: {
      '@type': 'Organization',
      name: 'Vadli',
      url: SITE_URL
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    }
  }
}
