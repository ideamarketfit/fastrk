import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID!);

export interface AirtableToolData {
  id: string;
  slug: string;
  en: string;
  ja: string;
  ko: string;
  'zh-Hant': string;
}

export async function getAllTools(): Promise<AirtableToolData[]> {
  try {
    const records = await base('Pages').select({
      view: 'Grid view'
    }).all();
    
    return records.map(record => ({
      id: record.id,
      slug: record.get('slug') as string,
      en: record.get('en') as string,
      ja: record.get('ja') as string,
      ko: record.get('ko') as string,
      'zh-Hant': record.get('zh-Hant') as string,
    }));
  } catch (error) {
    console.error('Error fetching tools from Airtable:', error);
    return [];
  }
}

export async function getToolBySlug(slug: string): Promise<AirtableToolData | null> {
  try {
    const records = await base('Pages').select({
      filterByFormula: `{slug} = '${slug}'`,
      maxRecords: 1
    }).all();
    
    if (records.length === 0) return null;
    
    const record = records[0];
    return {
      id: record.id,
      slug: record.get('slug') as string,
      en: record.get('en') as string,
      ja: record.get('ja') as string,
      ko: record.get('ko') as string,
      'zh-Hant': record.get('zh-Hant') as string,
    };
  } catch (error) {
    console.error('Error fetching tool from Airtable:', error);
    return null;
  }
}
