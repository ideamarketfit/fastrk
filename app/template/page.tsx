import { TemplateCollection } from "@/components/seo-pages/template-collection"
import { getTemplateData } from "@/lib/templates"
import { LocalizedTemplateData, TranslatedData } from "@/lib/airtable"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Diagram Templates - Find the Perfect Template for Your Needs',
  description: 'Browse our collection of professional diagram templates. Create flowcharts, mind maps, org charts, and more with our customizable templates.',
}

export default async function TemplatesPage() {
  const allTemplates = await getTemplateData("") as Record<string, TranslatedData<LocalizedTemplateData>>;
  if (!allTemplates) return null;

  const templates = Object.entries(allTemplates).map(([slug, template]) => {
    const localizedData = template.translations.en;
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