import { ToolLandingPage } from '@/components/tool-landing-page'
import { getToolData } from '@/lib/tools'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { ToolData } from '@/lib/tools'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const tool = getToolData(params.slug) as ToolData | null;
  if (!tool) {
    return {
      title: 'Tool Not Found',
      description: 'The requested tool could not be found.',
    }
  }
  const toolData = tool.translations.en; // Use English as default
  return {
    title: toolData.meta.title,
    description: toolData.meta.description,
  }
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = getToolData(params.slug) as ToolData | null;
  if (!tool) {
    notFound();
  }

  const toolData = tool.translations.en; // Get English translation data

  return (
    <ToolLandingPage
      toolName={toolData.name}
      toolDescription={toolData.description}
      faqs={toolData.faqs}
      exampleImage={toolData.exampleImage}
      command={toolData.command}
    />
  );
}
