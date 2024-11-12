import { useParams } from 'next/navigation'

export function useLocalizedNavigate() {
  const params = useParams()
  const locale = params.locale as string

  const getLocalizedPath = (path: string) => {
    // If we're already in a localized route and the path doesn't start with locale
    if (locale && !path.startsWith(`/${locale}`)) {
      // If path starts with /, just add locale before it
      if (path.startsWith('/')) {
        return `/${locale}${path}`
      }
      // If path doesn't start with /, add locale and /
      return `/${locale}/${path}`
    }
    return path
  }

  return {
    getLocalizedPath
  }
} 