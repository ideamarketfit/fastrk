import { ReactNode } from 'react';
import { dir } from 'i18next';
import { languages } from '../../next-i18next.config';

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'ja' },
    { locale: 'zh-Hant' },
  ];
}

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const languages = ['en', 'ja', 'zh-Hant'];
  const currentPath = '/'; // Assuming this is for the home page
  const domain = process.env.NEXT_PUBLIC_DOMAIN || '';

  return (
    <html lang={locale} dir={dir(locale)}>
      <head>
        {languages.map((lang) => (
          <link
            key={lang}
            rel="alternate"
            hrefLang={lang}
            href={`${domain}${lang === 'en' ? '' : `/${lang}`}${currentPath}`}
          />
        ))}
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`${domain}${currentPath}`}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
