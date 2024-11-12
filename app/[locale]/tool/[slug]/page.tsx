import { ToolLandingPage } from '@/components/tool-landing-page'
import { getToolData } from '@/lib/tools'
import { LocalizedToolData, TranslatedData } from '@/lib/airtable'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getSupportedLanguageCodes } from '@/lib/languages'

interface ToolPageProps {
  params: {
    slug: string;
    locale: keyof TranslatedData<LocalizedToolData>['translations'];
  }
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const toolData = await getToolData(params.slug) as TranslatedData<LocalizedToolData> | null;
  if (!toolData) {
    return {
      title: 'Tool Not Found',
      description: 'The requested tool could not be found.',
    }
  }
  const localizedData = toolData.translations[params.locale] || toolData.translations.en;
  return {
    title: localizedData.meta.title,
    description: localizedData.meta.description,
  }
}

export default async function LocaleToolPage({ params }: ToolPageProps) {
  const toolData = await getToolData(params.slug) as TranslatedData<LocalizedToolData> | null;
  if (!toolData) {
    notFound();
  }

  const localizedData = toolData.translations[params.locale] || toolData.translations.en;

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

export async function generateStaticParams() {
  const allTools = await getToolData() as Record<string, TranslatedData<LocalizedToolData>>;
  return Object.keys(allTools).flatMap(slug => 
    getSupportedLanguageCodes().map(locale => ({
      locale,
      slug,
    }))
  );
}
