import en from '../public/locales/en/common.json';
import ja from '../public/locales/ja/common.json';
import ko from '../public/locales/ko/common.json';
import zhHant from '../public/locales/zh-Hant/common.json';
import fr from '../public/locales/fr/common.json';
import it from '../public/locales/it/common.json';
import es from '../public/locales/es/common.json';
import pt from '../public/locales/pt/common.json';
import ar from '../public/locales/ar/common.json';
import de from '../public/locales/de/common.json';
import he from '../public/locales/he/common.json';

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', translations: en },
  { code: 'ja', name: '日本語', translations: ja },
  { code: 'ko', name: '한국어', translations: ko },
  { code: 'zh-Hant', name: '繁體中文', translations: zhHant },
  { code: 'es', name: 'Español', translations: es },
  { code: 'fr', name: 'Français', translations: fr },
  { code: 'pt', name: 'Português', translations: pt },
  { code: 'de', name: 'Deutsch', translations: de },
  { code: 'it', name: 'Italiano', translations: it },
  { code: 'he', name: 'עברית', translations: he },
  { code: 'ar', name: 'العربية', translations: ar },
] as const;

export type SupportedLanguageCode = typeof SUPPORTED_LANGUAGES[number]['code'];

// Helper functions
export const getSupportedLanguageCodes = () => SUPPORTED_LANGUAGES.map(lang => lang.code);
export const isValidLanguage = (code: string): code is SupportedLanguageCode => 
  SUPPORTED_LANGUAGES.some(lang => lang.code === code);

export const getTranslations = (locale: string) => {
  const language = SUPPORTED_LANGUAGES.find(lang => lang.code === locale);
  return language?.translations || SUPPORTED_LANGUAGES[0].translations;
};
