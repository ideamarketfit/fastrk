import { ReactNode } from 'react';
import { Metadata } from 'next';
import { dir } from 'i18next';
import { HreflangTags } from '@/components/hreflang-tags';
import en from '../../public/locales/en/common.json';
import ja from '../../public/locales/ja/common.json';
import zhHant from '../../public/locales/zh-Hant/common.json';
import fr from '../../public/locales/fr/common.json';
import it from '../../public/locales/it/common.json';
import es from '../../public/locales/es/common.json';
import pt from '../../public/locales/pt/common.json';
import ar from '../../public/locales/ar/common.json';
import de from '../../public/locales/de/common.json';
import he from '../../public/locales/he/common.json';

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'ja' },
    { locale: 'zh-Hant' },
    { locale: 'fr' },
    { locale: 'it' },
    { locale: 'es' },
    { locale: 'pt' },
    { locale: 'ar' },
    { locale: 'de' },
    { locale: 'he' },
  ];
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const translations = {
    en,
    ja,
    'zh-Hant': zhHant,
    fr,
    it,
    es,
    pt,
    ar,
    de,
    he,
  }[locale] || en;

  return {
    title: translations.metaTitle,
    description: translations.metaDescription,
  };
}

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale} dir={dir(locale)}>
      <head>
        <HreflangTags />
      </head>
      <body>{children}</body>
    </html>
  );
}
