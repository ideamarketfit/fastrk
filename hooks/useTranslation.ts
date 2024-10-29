'use client'

import { useParams } from 'next/navigation';
import en from '../public/locales/en/common.json';
import ja from '../public/locales/ja/common.json';
import zhHant from '../public/locales/zh-Hant/common.json';
import ko from '../public/locales/ko/common.json';
import es from '../public/locales/es/common.json';
import fr from '../public/locales/fr/common.json';
import pt from '../public/locales/pt/common.json';
import de from '../public/locales/de/common.json';
import it from '../public/locales/it/common.json';
import he from '../public/locales/he/common.json';
import ar from '../public/locales/ar/common.json';

const translations = {
  en,
  ja,
  ko,
  'zh-Hant': zhHant,
  es,
  fr,
  pt,
  de,
  it,
  he,
  ar,
};

export function useTranslation() {
  const params = useParams();
  const locale = (params.locale as string) || 'en';

  const t = (key: keyof typeof en): string => {
    const localeTranslations = translations[locale as keyof typeof translations] || translations.en;
    return (localeTranslations as typeof en)[key] || translations.en[key] || key;
  };

  return {
    t,
    locale
  };
}

export default useTranslation;
