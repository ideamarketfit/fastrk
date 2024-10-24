import { LandingPageComponent } from '@/components/landing-page';

interface Props {
  params: {
    locale: string;
  };
}

export default function LocaleHomePage({ params: { locale } }: Props) {
  return <LandingPageComponent />;
}

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'ja' },
    { locale: 'zh-Hant' },
  ];
}
