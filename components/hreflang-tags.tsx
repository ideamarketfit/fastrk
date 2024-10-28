'use client'

import { usePathname } from 'next/navigation';

export function HreflangTags() {
  const pathname = usePathname();
  const languages = ['en', 'ja', 'ko', 'zh-Hant', 'es', 'fr', 'pt', 'de', 'it', 'he', 'ar'];
  const domain = process.env.NEXT_PUBLIC_DOMAIN || '';

  // Remove locale prefix from pathname if it exists
  const path = pathname.replace(/^\/(?:en|ja|ko|zh-Hant|es|fr|pt|de|it|he|ar)/, '');

  return (
    <>
      {languages.map((lang) => (
        <link
          key={lang}
          rel="alternate"
          hrefLang={lang}
          href={`${domain}${lang === 'en' ? '' : `/${lang}`}${path}`}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${domain}${path}`}
      />
    </>
  );
}
