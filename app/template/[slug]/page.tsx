import { TemplatePage } from "@/components/seo-pages/template-page"
import { getTemplateData } from "@/lib/templates"
import { LocalizedTemplateData, TranslatedData } from "@/lib/airtable"
import { notFound } from "next/navigation"
import { Metadata } from 'next'

interface TemplatePageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const templateData = await getTemplateData(params.slug) as TranslatedData<LocalizedTemplateData> | null;
  
  if (!templateData) {
    return {
      title: 'Template Not Found',
      description: 'The requested template could not be found.',
    }
  }

  const localizedData = templateData.translations.en;
  return {
    title: localizedData.meta.title,
    description: localizedData.meta.description,
  }
}

export default async function Template({ params }: TemplatePageProps) {
  const templateData = await getTemplateData(params.slug) as TranslatedData<LocalizedTemplateData> | null;
  
  if (!templateData) {
    notFound();
  }

  const localizedData = templateData.translations.en;

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
  return Object.keys(allTemplates).map((slug) => ({
    slug,
  }));
} 