import { ReactNode } from 'react';
import { dir } from 'i18next';
import { languages } from '../../next-i18next.config';
import { useTranslation } from 'next-i18next/serverSideTranslations';

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
  return (
    <html lang={locale} dir={dir(locale)}>
      <body>{children}</body>
    </html>
  );
}

