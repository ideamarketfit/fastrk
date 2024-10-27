import { MetadataRoute } from 'next'
import { getToolData, ToolData } from '@/lib/tools'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.chatdiagram.com'
  const languages = ['en', 'ja', 'zh-Hant']
  const routes = ['', '/tools']
  const allTools = getToolData('') as Record<string, ToolData>
  const tools = Object.keys(allTools)

  const pages = routes.concat(tools.map(tool => `/tool/${tool}`))

  return pages.flatMap((route) => {
    return languages.map((lang) => ({
      url: `${baseUrl}${lang === 'en' ? '' : `/${lang}`}${route}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: route === '' ? 1 : route === '/tools' ? 0.9 : 0.8,
      alternateRefs: languages.map((altLang) => ({
        href: `${baseUrl}${altLang === 'en' ? '' : `/${altLang}`}${route}`,
        hreflang: altLang,
      })),
    }))
  })
}
