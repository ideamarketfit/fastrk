'use client'

import { useParams } from 'next/navigation';
import en from '../public/locales/en/common.json';
import ja from '../public/locales/ja/common.json';
import zhHant from '../public/locales/zh-Hant/common.json';

const translations = {
  en,
  ja,
  'zh-Hant': zhHant,
};

export function useTranslation() {
  const params = useParams();
  const locale = (params.locale as string) || 'en';

  const t = (key: keyof typeof en): string => {
    // Get the translations for the current locale
    const localeTranslations = translations[locale as keyof typeof translations] || translations.en;
    
    // Try to get the translation, fallback to English, then to the key itself
    return localeTranslations[key] || translations.en[key] || key;
  };

  return {
    t,
    locale
  };
}

export default useTranslation;

