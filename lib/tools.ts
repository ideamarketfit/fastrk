import { AirtableToolData, getAllTools, getToolBySlug } from './airtable';

export interface LocalizedToolData {
  name: string
  description: string
  command: string
  faqs: { question: string; answer: string }[]
  meta: {
    title: string
    description: string
  }
  artifact?: {
    title: string
    content: string
    type: 'diagram' | 'doc' | 'reveal-slides'
  }
}

export interface ToolData {
  translations: {
    en: LocalizedToolData
    ja: LocalizedToolData
    ko: LocalizedToolData
    'zh-Hant': LocalizedToolData
    es: LocalizedToolData
    fr: LocalizedToolData
    pt: LocalizedToolData
    de: LocalizedToolData
    it: LocalizedToolData
    he: LocalizedToolData
    ar: LocalizedToolData
  }
}

function parseLocaleData(jsonString: string): LocalizedToolData {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error parsing locale data:', error);
    return {
      name: '',
      description: '',
      command: '',
      faqs: [],
      meta: {
        title: '',
        description: ''
      },
      artifact: {
        title: '',
        content: '',
        type: 'diagram'
      }
    };
  }
}

function convertAirtableToToolData(airtableData: AirtableToolData): ToolData {
  return {
    translations: {
      en: parseLocaleData(airtableData.en),
      ja: parseLocaleData(airtableData.ja),
      ko: parseLocaleData(airtableData.ko),
      'zh-Hant': parseLocaleData(airtableData['zh-Hant']),
      es: parseLocaleData(airtableData.es),
      fr: parseLocaleData(airtableData.fr),
      pt: parseLocaleData(airtableData.pt),
      de: parseLocaleData(airtableData.de),
      it: parseLocaleData(airtableData.it),
      he: parseLocaleData(airtableData.he),
      ar: parseLocaleData(airtableData.ar)
    }
  };
}

export async function getToolData(slug?: string, locale?: string): Promise<LocalizedToolData | ToolData | Record<string, ToolData> | null> {
  if (!slug) {
    const allTools = await getAllTools();
    const toolsData: Record<string, ToolData> = {};
    
    for (const tool of allTools) {
      toolsData[tool.slug] = convertAirtableToToolData(tool);
    }
    
    return toolsData;
  }
  
  const tool = await getToolBySlug(slug);
  if (!tool) return null;
  
  const toolData = convertAirtableToToolData(tool);
  
  if (locale) {
    return toolData.translations[locale as keyof typeof toolData.translations] || null;
  }
  
  return toolData;
}
