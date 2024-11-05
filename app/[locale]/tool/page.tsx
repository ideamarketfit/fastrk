import { AiDiagrammingTools } from "@/components/tool-collection";
import { getToolData, ToolData } from "@/lib/tools";

export default async function LocaleToolsPage({ params }: { params: { locale: string } }) {
  const allTools = await getToolData("") as Record<string, ToolData>;
  if (!allTools) return null;

  const tools = Object.entries(allTools).map(([slug, tool]) => {
    const locale = params.locale as keyof typeof tool.translations;
    return {
      slug,
      name: tool.translations[locale]?.name || tool.translations.en.name,
      description: tool.translations[locale]?.description || tool.translations.en.description,
      image: "/chat-diagram-demo.png",
      category: tool.translations[locale]?.name || tool.translations.en.name,
    };
  });

  return (
    <AiDiagrammingTools tools={tools} />
  );
}
