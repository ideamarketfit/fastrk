import { TemplatePage } from "@/components/seo-pages/template-page"
import { getTemplateData } from "@/lib/templates"
import { LocalizedTemplateData, TranslatedData } from "@/lib/airtable"
import { notFound } from "next/navigation"
import { Metadata } from 'next'
import { getSupportedLanguageCodes } from '@/lib/languages'

// Define supported locales type to match TranslatedData interface
type SupportedLocale = keyof TranslatedData<LocalizedTemplateData>['translations'];

interface TemplatePageProps {
  params: {
    slug: string;
    locale: SupportedLocale;
  }
}

export async function generateMetadata({ params }: TemplatePageProps): Promise<Metadata> {
  const templateData = await getTemplateData(params.slug) as TranslatedData<LocalizedTemplateData> | null;
  
  if (!templateData) {
    return {
      title: 'Template Not Found',
      description: 'The requested template could not be found.',
    }
  }

  // Now TypeScript knows that params.locale is a valid key
  const localizedData = templateData.translations[params.locale] || templateData.translations.en;
  return {
    title: localizedData.meta.title,
    description: localizedData.meta.description,
  }
}

export default async function LocaleTemplatePage({ params }: TemplatePageProps) {
  const templateData = await getTemplateData(params.slug) as TranslatedData<LocalizedTemplateData> | null;
  
  if (!templateData) {
    notFound();
  }

  const localizedData = templateData.translations[params.locale] || templateData.translations.en;

  return <TemplatePage 
    name={localizedData.name}
    rating={localizedData.rating}
    categories={localizedData.categories}
    aboutTemplate={localizedData.aboutTemplate}
    artifact={localizedData.artifact}
  />
}

export async function generateStaticParams() {
  const allTemplates = await getTemplateData() as Record<string, TranslatedData<LocalizedTemplateData>>;
  return Object.keys(allTemplates).flatMap((slug) => 
    getSupportedLanguageCodes().map(locale => ({
      locale: locale as SupportedLocale,
      slug,
    }))
  );
} 