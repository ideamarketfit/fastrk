import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://example.com'
  const languages = ['en', 'fr', 'es']
  const routes = ['', '/about', '/contact']

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

