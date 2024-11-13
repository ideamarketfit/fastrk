import { LandingPageComponent } from '@/components/seo-pages/landing-page';
import { getSupportedLanguageCodes } from '@/lib/languages';

export default function LocaleHomePage() {
  return <LandingPageComponent />;
}

export async function generateStaticParams() {
  return getSupportedLanguageCodes().map(locale => ({ locale }));
}
