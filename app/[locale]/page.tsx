import { LandingPageComponent } from '@/components/landing-page';

export default function LocaleHomePage() {
  return <LandingPageComponent />;
}

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'ja' },
    { locale: 'zh-Hant' },
  ];
}
