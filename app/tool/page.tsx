import { AiDiagrammingTools } from "@/components/tool-collection";
import { getToolData, ToolData } from "@/lib/tools";

export default async function ToolsPage() {
  const allTools = await getToolData("") as Record<string, ToolData>;
  if (!allTools) return null;

  const tools = Object.entries(allTools).map(([slug, tool]) => ({
    slug,
    name: tool.translations.en.name,
    description: tool.translations.en.description,
    image: "/chat-diagram-demo.png",
    category: tool.translations.en.name,
  }));

  return (
        <AiDiagrammingTools tools={tools} />
  );
}
