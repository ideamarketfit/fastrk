import { AirtableRecord, LocalizedTemplateData, TranslatedData, getAllTemplates, getTemplateBySlug } from './airtable';

function getDefaultTemplateData(): LocalizedTemplateData {
  return {
    name: '',
    meta: {
      title: '',
      description: ''
    },
    rating: {
      score: 0,
      totalRatings: 0
    },
    categories: [],
    aboutTemplate: '',
    artifact: {
      title: '',
      content: '',
      type: 'diagram'
    }
  };
}

function parseLocaleData(jsonString: string): LocalizedTemplateData {
  if (!jsonString || jsonString === 'undefined' || jsonString === 'null') {
    console.warn('Empty or invalid template locale data received');
    return getDefaultTemplateData();
  }

  try {
    const parsed = JSON.parse(jsonString);
    return {
      ...getDefaultTemplateData(),
      ...parsed
    };
  } catch (error) {
    console.error('Error parsing template locale data:', error);
    console.error('Invalid JSON string:', jsonString);
    return getDefaultTemplateData();
  }
}

function convertAirtableToTemplateData(airtableData: AirtableRecord): TranslatedData<LocalizedTemplateData> {
  return {
    translations: {
      en: parseLocaleData(airtableData.en || ''),
      ja: parseLocaleData(airtableData.ja || ''),
      ko: parseLocaleData(airtableData.ko || ''),
      'zh-Hant': parseLocaleData(airtableData['zh-Hant'] || ''),
      es: parseLocaleData(airtableData.es || ''),
      fr: parseLocaleData(airtableData.fr || ''),
      pt: parseLocaleData(airtableData.pt || ''),
      de: parseLocaleData(airtableData.de || ''),
      it: parseLocaleData(airtableData.it || ''),
      he: parseLocaleData(airtableData.he || ''),
      ar: parseLocaleData(airtableData.ar || '')
    }
  };
}

export async function getTemplateData(
  slug?: string,
  locale?: string
): Promise<LocalizedTemplateData | TranslatedData<LocalizedTemplateData> | Record<string, TranslatedData<LocalizedTemplateData>> | null> {
  try {
    if (!slug) {
      const allTemplates = await getAllTemplates();
      return allTemplates.reduce((acc, template) => ({
        ...acc,
        [template.slug]: convertAirtableToTemplateData(template)
      }), {});
    }
    
    const template = await getTemplateBySlug(slug);
    if (!template) return null;
    
    const templateData = convertAirtableToTemplateData(template);
    
    if (locale) {
      return templateData.translations[locale as keyof typeof templateData.translations] || templateData.translations.en;
    }
    
    return templateData;
  } catch (error) {
    console.error('Error in getTemplateData:', error);
    return null;
  }
} 