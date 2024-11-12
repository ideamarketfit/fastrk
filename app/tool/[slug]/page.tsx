import { ToolLandingPage } from '@/components/tool-landing-page'
import { getToolData } from '@/lib/tools'
import { LocalizedToolData, TranslatedData } from '@/lib/airtable'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const toolData = await getToolData(params.slug) as TranslatedData<LocalizedToolData> | null;
  if (!toolData) {
    return {
      title: 'Tool Not Found',
      description: 'The requested tool could not be found.',
    }
  }
  const localizedData = toolData.translations.en; // Use English as default
  return {
    title: localizedData.meta.title,
    description: localizedData.meta.description,
  }
}

export default async function ToolPage({ params }: { params: { slug: string } }) {
  const toolData = await getToolData(params.slug) as TranslatedData<LocalizedToolData> | null;
  if (!toolData) {
    notFound();
  }

  const localizedData = toolData.translations.en; // Get English translation data

  return (
    <ToolLandingPage
      toolName={localizedData.name}
      toolDescription={localizedData.description}
      faqs={localizedData.faqs}
      command={localizedData.command}
      artifact={localizedData.artifact}
    />
  );
}
