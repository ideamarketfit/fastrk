import { ToolLandingPage } from '@/components/tool-landing-page'
import { getToolData } from '@/lib/tools'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { slug: string; locale: string } }): Promise<Metadata> {
  const toolData = getToolData(params.slug, params.locale);
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

export default function ToolPage({ params }: { params: { slug: string; locale: string } }) {
  const toolData = getToolData(params.slug, params.locale);

  if (!toolData) {
    notFound()
  }

  return (
    <ToolLandingPage
      toolName={toolData.name}
      toolDescription={toolData.description}
      faqs={toolData.faqs}
      exampleImage={toolData.exampleImage}
      command={toolData.command}
    />
  )
}

export async function generateStaticParams() {
  const tools = Object.keys(getToolData(''));
  const locales = ['en', 'ja', 'zh-Hant'];
  
  return tools.flatMap(slug => 
    locales.map(locale => ({
      locale,
      slug,
    }))
  );
}
