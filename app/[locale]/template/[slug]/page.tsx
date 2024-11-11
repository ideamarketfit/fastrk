import { TemplatePage } from "@/components/template-page"
import { getTemplateData, TemplateData, LocalizedTemplateData } from "@/lib/template"
import { notFound } from "next/navigation"
import { Metadata } from 'next'
import { getSupportedLanguageCodes } from '@/lib/languages'

export async function generateMetadata({ params }: { params: { slug: string; locale: string } }): Promise<Metadata> {
  const templateData = await getTemplateData(params.slug, params.locale) as LocalizedTemplateData;
  if (!templateData) {
    return {
      title: 'Template Not Found',
      description: 'The requested template could not be found.',
    }
  }
  return {
    title: templateData.meta.title,
    description: templateData.meta.description,
  }
}

export default async function getTemplatePage({ params }: { params: { slug: string; locale: string } }) {
  const templateData = await getTemplateData(params.slug, params.locale) as LocalizedTemplateData;
  if (!templateData) {
    notFound()
  }

  return (
    <TemplatePage 
        name={templateData.name}
        rating={templateData.rating}
        categories={templateData.categories}
        aboutTemplate={templateData.aboutTemplate}
        artifact={templateData.artifact}
    />
  )
}

export async function generateStaticParams() {
  const allTemplates = await getTemplateData('') as Record<string, TemplateData>;
  const templates = Object.keys(allTemplates);
  
  return templates.flatMap(slug => 
    getSupportedLanguageCodes().map(locale => ({
      locale,
      slug,
    }))
  );
} 