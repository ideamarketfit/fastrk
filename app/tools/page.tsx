import { AiDiagrammingTools } from "@/components/tool-collection";
import { getToolData } from "@/lib/tools";

export default function ToolsPage() {
  const allTools = getToolData("") as Record<string, any>;
  const tools = Object.entries(allTools).map(([slug, data]) => ({
    slug,
    name: data.name,
    description: data.description,
    image: data.exampleImage,
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
