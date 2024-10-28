import { LandingPageComponent } from '@/components/landing-page';

export default function LocaleHomePage() {
  return <LandingPageComponent />;
}

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'ja' },
    { locale: 'ko' },
    { locale: 'zh-Hant' },
    { locale: 'es' },
    { locale: 'fr' },
    { locale: 'pt' },
    { locale: 'de' },
    { locale: 'it' },
    { locale: 'he' },
    { locale: 'ar' },
  ];
}
