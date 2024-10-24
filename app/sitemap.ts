import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.chatdiagram.com'
  const languages = ['en', 'ja', 'zh-Hant']
  const routes = ['']

  return routes.flatMap((route) => {
    return languages.map((lang) => ({
      url: `${baseUrl}${lang === 'en' ? '' : `/${lang}`}${route}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: route === '' ? 1 : 0.8,
      alternateRefs: languages.map((altLang) => ({
        href: `${baseUrl}${altLang === 'en' ? '' : `/${altLang}`}${route}`,
        hreflang: altLang,
      })),
    }))
  })
}

