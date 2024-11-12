import { MetadataRoute } from 'next'
import { getToolData } from '@/lib/tools'
import { getTemplateData } from '@/lib/templates'
import { LocalizedToolData, LocalizedTemplateData, TranslatedData } from '@/lib/airtable'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.chatdiagram.com'
  const languages = ['en', 'ja', 'ko', 'zh-Hant', 'es', 'fr', 'pt', 'de', 'it', 'he', 'ar']
  const routes = ['', '/tool', '/template']

  // Get all tools and templates
  const allTools = await getToolData('') as Record<string, TranslatedData<LocalizedToolData>>
  const allTemplates = await getTemplateData('') as Record<string, TranslatedData<LocalizedTemplateData>>

  // Get slugs
  const tools = Object.keys(allTools)
  const templates = Object.keys(allTemplates)

  // Combine base routes with dynamic routes
  const pages = [
    ...routes,
    ...tools.map(tool => `/tool/${tool}`),
    ...templates.map(template => `/template/${template}`)
  ]

  // Generate sitemap entries
  return pages.flatMap((route) => {
    return languages.map((lang) => ({
      url: `${baseUrl}${lang === 'en' ? '' : `/${lang}`}${route}`,
      lastModified: new Date(),
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
  if (route.startsWith('/tool/') || route.startsWith('/template/')) return 0.8
  return 0.7
}
