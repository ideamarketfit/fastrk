import { TemplateCollection } from "@/components/seo-pages/template-collection"
import { getTemplateData } from "@/lib/templates"
import { LocalizedTemplateData, TranslatedData } from "@/lib/airtable"
import { getSupportedLanguageCodes } from '@/lib/languages'

interface TemplateCollectionPageProps {
  params: {
    locale: keyof TranslatedData<LocalizedTemplateData>['translations'];
  }
}

export default async function LocaleTemplatesPage({ params }: TemplateCollectionPageProps) {
  const allTemplates = await getTemplateData("") as Record<string, TranslatedData<LocalizedTemplateData>>;
  if (!allTemplates) return null;

  const templates = Object.entries(allTemplates).map(([slug, template]) => {
    const localizedData = template.translations[params.locale] || template.translations.en;
    return {
      slug,
      title: localizedData.name,
      description: localizedData.meta.description,
      categories: localizedData.categories,
      artifact: localizedData.artifact
    };
  });

  return <TemplateCollection templates={templates} />
}

export async function generateStaticParams() {
  return getSupportedLanguageCodes().map(locale => ({
    locale,
  }));
}
