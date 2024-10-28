import { MetadataRoute } from 'next'
import { getToolData, ToolData } from '@/lib/tools'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {  // Made async
  const baseUrl = 'https://www.chatdiagram.com'
  const languages = ['en', 'ja', 'ko', 'zh-Hant', 'es', 'fr', 'pt', 'de', 'it', 'he', 'ar']
  const routes = ['', '/tool']
  const allTools = await getToolData('') as Record<string, ToolData>  // Added await
  const tools = Object.keys(allTools)

  const pages = routes.concat(tools.map(tool => `/tool/${tool}`))

  return pages.flatMap((route) => {
    return languages.map((lang) => ({
      url: `${baseUrl}${lang === 'en' ? '' : `/${lang}`}${route}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: route === '' ? 1 : route === '/tool' ? 0.9 : 0.8,
      alternateRefs: languages.map((altLang) => ({
        href: `${baseUrl}${altLang === 'en' ? '' : `/${altLang}`}${route}`,
        hreflang: altLang,
      })),
    }))
  })
}
