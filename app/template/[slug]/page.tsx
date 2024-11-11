import { TemplatePage } from "@/components/template-page"
import { getTemplateData, TemplateData } from "@/lib/template"
import { notFound } from "next/navigation"
import { Metadata } from 'next'

interface TemplatePageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const template = await getTemplateData(params.slug) as TemplateData | null;
  if (!template) {
    return {
      title: 'Template Not Found',
      description: 'The requested template could not be found.',
    }
  }

  const templateData = template.translations.en;
  return {
    title: templateData.meta.title,
    description: templateData.meta.description,
  }
}

export default async function Template({ params }: TemplatePageProps) {
  const template = await getTemplateData(params.slug) as TemplateData | null;
  if (!template) {
    notFound();
  }

  const templateData = template.translations.en;

  return <TemplatePage 
    name={templateData.name}
    rating={templateData.rating}
    categories={templateData.categories}
    aboutTemplate={templateData.aboutTemplate}
    artifact={templateData.artifact}
  />
}

export async function generateStaticParams() {
  const allTemplates = await getTemplateData("") as Record<string, TemplateData>;
  return Object.keys(allTemplates).map((slug) => ({
    slug,
  }));
} 