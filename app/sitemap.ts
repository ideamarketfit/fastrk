import { MetadataRoute } from 'next'
import { getAllTools, getAllTemplates } from '@/lib/airtable'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.chatdiagram.com'
  const languages = ['en', 'ja', 'ko', 'zh-Hant', 'es', 'fr', 'pt', 'de', 'it', 'he', 'ar']
  const routes = ['', '/tool', '/template']

  // Get all tools and templates using airtable functions
  const allTools = await getAllTools()
  const allTemplates = await getAllTemplates()

  // Create maps of slug to lastmod date
  const toolLastMods = Object.fromEntries(
    allTools.map(tool => [`/tool/${tool.slug}`, new Date(tool.lastmod)])
  )
  const templateLastMods = Object.fromEntries(
    allTemplates.map(template => [`/template/${template.slug}`, new Date(template.lastmod)])
  )

  // Combine base routes with dynamic routes
  const pages = [
    ...routes,
    ...allTools.map(tool => `/tool/${tool.slug}`),
    ...allTemplates.map(template => `/template/${template.slug}`)
  ]

  // Generate sitemap entries
  return pages.flatMap((route) => {
    return languages.map((lang) => ({
      url: `${baseUrl}${lang === 'en' ? '' : `/${lang}`}${route}`,
      lastModified: toolLastMods[route] || templateLastMods[route] || new Date(),
      changeFrequency: 'daily' as const,
      priority: getPriority(route),
      alternateRefs: languages.map((altLang) => ({
        href: `${baseUrl}${altLang === 'en' ? '' : `/${altLang}`}${route}`,
        hreflang: altLang,
      })),
    }))
  })
}

// Helper function to determine priority
function getPriority(route: string): number {
  if (route === '') return 1
  if (route === '/tool' || route === '/template') return 0.9
  if (route.startsWith('/tool/') || route.startsWith('/template/')) return 1
  return 0.7
}
