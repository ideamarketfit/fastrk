import { AirtableRecord, LocalizedToolData, TranslatedData, getAllTools, getToolBySlug } from './airtable';

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

function convertAirtableToToolData(airtableData: AirtableRecord): TranslatedData<LocalizedToolData> {
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

export async function getToolData(
  slug?: string,
  locale?: string
): Promise<LocalizedToolData | TranslatedData<LocalizedToolData> | Record<string, TranslatedData<LocalizedToolData>> | null> {
  if (!slug) {
    const allTools = await getAllTools();
    return allTools.reduce((acc, tool) => ({
      ...acc,
      [tool.slug]: convertAirtableToToolData(tool)
    }), {});
  }
  
  const tool = await getToolBySlug(slug);
  if (!tool) return null;
  
  const toolData = convertAirtableToToolData(tool);
  
  if (locale) {
    return toolData.translations[locale as keyof typeof toolData.translations] || null;
  }
  
  return toolData;
}
