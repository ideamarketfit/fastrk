import { AiDiagrammingTools } from "@/components/tool-collection";
import { getToolData } from "@/lib/tools";
import { LocalizedToolData, TranslatedData } from "@/lib/airtable";
import { getSupportedLanguageCodes } from '@/lib/languages';

interface ToolCollectionPageProps {
  params: {
    locale: keyof TranslatedData<LocalizedToolData>['translations'];
  }
}

export default async function LocaleToolsPage({ params }: ToolCollectionPageProps) {
  const allTools = await getToolData("") as Record<string, TranslatedData<LocalizedToolData>>;
  if (!allTools) return null;

  const tools = Object.entries(allTools).map(([slug, tool]) => {
    const localizedData = tool.translations[params.locale] || tool.translations.en;
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

export async function generateStaticParams() {
  return getSupportedLanguageCodes().map(locale => ({
    locale,
  }));
}
