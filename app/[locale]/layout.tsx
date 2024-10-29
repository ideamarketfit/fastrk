import { Metadata } from 'next';
import { dir } from 'i18next';
import { HreflangTags } from '@/components/hreflang-tags';
import { getSupportedLanguageCodes, getTranslations } from '@/lib/languages';

export async function generateStaticParams() {
  return getSupportedLanguageCodes().map(locale => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const translations = getTranslations(locale);

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
