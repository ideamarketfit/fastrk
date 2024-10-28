import { ToolLandingPage } from '@/components/tool-landing-page'
import { getToolData, LocalizedToolData, ToolData } from '@/lib/tools'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { slug: string; locale: string } }): Promise<Metadata> {
  const toolData = await getToolData(params.slug, params.locale) as LocalizedToolData;
  if (!toolData) {
    return {
      title: 'Tool Not Found',
      description: 'The requested tool could not be found.',
    }
  }
  return {
    title: toolData.meta.title,
    description: toolData.meta.description,
  }
}

export default async function ToolPage({ params }: { params: { slug: string; locale: string } }) {
  const toolData = await getToolData(params.slug, params.locale) as LocalizedToolData;
  if (!toolData) {
    notFound()
  }

  return (
    <ToolLandingPage
      toolName={toolData.name}
      toolDescription={toolData.description}
      faqs={toolData.faqs}
      command={toolData.command}
    />
  )
}

export async function generateStaticParams() {
  const allTools = await getToolData('') as Record<string, ToolData>;
  const tools = Object.keys(allTools);
  const locales = ['en', 'ja', 'zh-Hant'];
  
  return tools.flatMap(slug => 
    locales.map(locale => ({
      locale,
      slug,
    }))
  );
}
