import { AiDiagrammingTools } from "@/components/tool-collection";
import { getToolData } from "@/lib/tools";
import { LocalizedToolData, TranslatedData } from "@/lib/airtable";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Diagramming Tools - Create Diagrams with AI',
  description: 'Discover our collection of AI-powered diagramming tools. Create flowcharts, mind maps, and more with the help of artificial intelligence.',
}

export default async function ToolsPage() {
  const allTools = await getToolData("") as Record<string, TranslatedData<LocalizedToolData>>;
  if (!allTools) return null;

  const tools = Object.entries(allTools).map(([slug, tool]) => {
    const localizedData = tool.translations.en; // Always use English for non-localized route
    return {
      slug,
      name: localizedData.name,
      description: localizedData.description,
      category: localizedData.name,
      artifact: localizedData.artifact
    };
  });

  return (
    <AiDiagrammingTools tools={tools} />
  );
}
