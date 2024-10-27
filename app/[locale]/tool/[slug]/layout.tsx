import { ReactNode } from 'react';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { 
  params: { locale: string; slug: string } 
}): Promise<Metadata> {
  const languages = ['en', 'ja', 'zh-Hant'];
  const domain = process.env.NEXT_PUBLIC_DOMAIN || '';
  const currentPath = `/tool/${params.slug}`;

  return {
    alternates: {
      canonical: `${domain}${currentPath}`,
      languages: {
        'x-default': `${domain}${currentPath}`,
        ...languages.reduce((acc, lang) => ({
          ...acc,
          [lang]: `${domain}${lang === 'en' ? '' : `/${lang}`}${currentPath}`
        }), {})
      }
    }
  };
}

export default function LocaleToolLayout({
  children,
  params: { locale, slug },
}: {
  children: ReactNode;
  params: { locale: string; slug: string };
}) {
  return <>{children}</>;
}