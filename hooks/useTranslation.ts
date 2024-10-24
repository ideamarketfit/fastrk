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
  return {
    t: (key: keyof typeof en) => translations[locale as keyof typeof translations][key] || key,
    locale
  };
}

export default useTranslation;

