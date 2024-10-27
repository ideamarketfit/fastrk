import { ReactNode } from 'react';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { 
  params: { slug: string } 
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

export default function ToolLayout({
  children,
  params: { slug },
}: {
  children: ReactNode;
  params: { slug: string };
}) {
  return <>{children}</>;
}