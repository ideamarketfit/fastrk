import { ToolLandingPage } from '@/components/tool-landing-page'
import { getToolData } from '@/lib/tools'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { ToolData } from '@/lib/tools'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const toolData = getToolData(params.slug) as ToolData | undefined;
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

export default function ToolPage({ params }: { params: { slug: string } }) {
  const toolData = getToolData(params.slug) as ToolData;

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
