import { TemplatePage } from "@/components/template-page"

interface TemplatePageProps {
  params: {
    slug: string
  }
}

export default function Template({  }: TemplatePageProps) {
  return <TemplatePage />
}

// Optional: Generate static params if you want to pre-render specific templates
export async function generateStaticParams() {
  // This is just an example - replace with your actual template slugs
  const templates = ['flowchart', 'gantt-chart', 'mind-map']
  
  return templates.map((template) => ({
    slug: template,
  }))
} 