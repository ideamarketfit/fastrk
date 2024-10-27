import { ReactNode } from 'react';
import { Metadata } from 'next';
import { dir } from 'i18next';
import { HreflangTags } from '@/components/hreflang-tags';
import en from '../../public/locales/en/common.json';
import ja from '../../public/locales/ja/common.json';
import zhHant from '../../public/locales/zh-Hant/common.json';

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'ja' },
    { locale: 'zh-Hant' },
  ];
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const translations = locale === 'ja' ? ja : locale === 'zh-Hant' ? zhHant : en;

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
