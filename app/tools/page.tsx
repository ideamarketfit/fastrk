import { AiDiagrammingTools } from "@/components/tool-collection";
import { getToolData, ToolData } from "@/lib/tools";

export default function ToolsPage() {
  const allTools = getToolData("") as Record<string, ToolData>;
  if (!allTools) return null;

  const tools = Object.entries(allTools).map(([slug, tool]) => ({
    slug,
    name: tool.translations.en.name,
    description: tool.translations.en.description,
    category: slug.charAt(0).toUpperCase() + slug.slice(1),
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-12">
        <AiDiagrammingTools tools={tools} />
      </main>
    </div>
  );
}
