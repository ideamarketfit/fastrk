import { getAllTemplates, getTemplateBySlug } from './airtable';

export interface LocalizedTemplateData {
  name: string;
  meta: {
    title: string;
    description: string;
  };
  rating: {
    score: number;
    totalRatings: number;
  };
  categories: string[];
  aboutTemplate: string;
  artifact: {
    title: string;
    type: 'diagram' | 'doc' | 'reveal-slides';
    content: string;
  };
}

export interface TemplateData {
  translations: {
    en: LocalizedTemplateData;
    ja: LocalizedTemplateData;
    ko: LocalizedTemplateData;
    'zh-Hant': LocalizedTemplateData;
    es: LocalizedTemplateData;
    fr: LocalizedTemplateData;
    pt: LocalizedTemplateData;
    de: LocalizedTemplateData;
    it: LocalizedTemplateData;
    he: LocalizedTemplateData;
    ar: LocalizedTemplateData;
  };
}

function parseLocaleData(jsonString: string): LocalizedTemplateData {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error parsing template locale data:', error);
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
}

export async function getTemplateData(slug?: string, locale?: string): Promise<LocalizedTemplateData | TemplateData | Record<string, TemplateData> | null> {
  if (!slug) {
    const allTemplates = await getAllTemplates();
    const templatesData: Record<string, TemplateData> = {};
    
    for (const template of allTemplates) {
      templatesData[template.slug] = {
        translations: {
          en: parseLocaleData(template.en),
          ja: parseLocaleData(template.ja),
          ko: parseLocaleData(template.ko),
          'zh-Hant': parseLocaleData(template['zh-Hant']),
          es: parseLocaleData(template.es),
          fr: parseLocaleData(template.fr),
          pt: parseLocaleData(template.pt),
          de: parseLocaleData(template.de),
          it: parseLocaleData(template.it),
          he: parseLocaleData(template.he),
          ar: parseLocaleData(template.ar)
        }
      };
    }
    
    return templatesData;
  }
  
  const template = await getTemplateBySlug(slug);
  
  if (!template) return null;
  
  const templateData = {
    translations: {
      en: parseLocaleData(template.en),
      ja: parseLocaleData(template.ja),
      ko: parseLocaleData(template.ko),
      'zh-Hant': parseLocaleData(template['zh-Hant']),
      es: parseLocaleData(template.es),
      fr: parseLocaleData(template.fr),
      pt: parseLocaleData(template.pt),
      de: parseLocaleData(template.de),
      it: parseLocaleData(template.it),
      he: parseLocaleData(template.he),
      ar: parseLocaleData(template.ar)
    }
  };
  
  
  if (locale) {
    return templateData.translations[locale as keyof typeof templateData.translations] || templateData.translations.en;
  }
  
  return templateData;
} 