import Airtable, { Record, FieldSet } from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID!);

export interface LocalizedToolData {
  name: string;
  description: string;
  command: string;
  faqs: { question: string; answer: string }[];
  meta: {
    title: string;
    description: string;
  };
  artifact: {
    title: string;
    content: string;
    type: 'diagram' | 'doc' | 'reveal-slides';
  };
}

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
    content: string;
    type: 'diagram' | 'doc' | 'reveal-slides';
  };
}

export interface AirtableRecord {
  id: string;
  slug: string;
  lastmod: string;
  en: string;
  ja: string;
  ko: string;
  'zh-Hant': string;
  es: string;
  fr: string;
  pt: string;
  de: string;
  it: string;
  he: string;
  ar: string;
}

export interface TranslatedData<T> {
  translations: {
    en: T;
    ja: T;
    ko: T;
    'zh-Hant': T;
    es: T;
    fr: T;
    pt: T;
    de: T;
    it: T;
    he: T;
    ar: T;
  };
}

const recordToData = (record: Record<FieldSet>): AirtableRecord => ({
  id: record.id,
  slug: record.get('slug') as string,
  lastmod: record.get('lastmod') as string,
  en: record.get('en') as string,
  ja: record.get('ja') as string,
  ko: record.get('ko') as string,
  'zh-Hant': record.get('zh-Hant') as string,
  es: record.get('es') as string,
  fr: record.get('fr') as string,
  pt: record.get('pt') as string,
  de: record.get('de') as string,
  it: record.get('it') as string,
  he: record.get('he') as string,
  ar: record.get('ar') as string,
});

async function getAllRecords(table: string): Promise<AirtableRecord[]> {
  try {
    const records = await base(table).select({
      view: 'Grid view',
      filterByFormula: 'NOT({en} = "")'
    }).all();
    
    return records.map(recordToData);
  } catch (error) {
    console.error(`Error fetching ${table} from Airtable:`, error);
    return [];
  }
}

async function getRecordBySlug(table: string, slug: string): Promise<AirtableRecord | null> {
  try {
    const records = await base(table).select({
      filterByFormula: `{slug} = '${slug}'`,
      maxRecords: 1
    }).all();
    
    if (records.length === 0) return null;
    return recordToData(records[0]);
  } catch (error) {
    console.error(`Error fetching ${table} from Airtable:`, error);
    return null;
  }
}

export const getAllTools = () => getAllRecords('Tool');
export const getAllTemplates = () => getAllRecords('Template');
export const getToolBySlug = (slug: string) => getRecordBySlug('Tool', slug);
export const getTemplateBySlug = (slug: string) => getRecordBySlug('Template', slug);
