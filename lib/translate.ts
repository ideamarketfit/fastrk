import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

interface TranslationContent {
  [key: string]: string | TranslationContent
}

interface Language {
  code: string
  name: string
}

const LOCALES_DIR = path.join(dirname(__dirname), 'public/locales')
const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh-Hant', name: 'Traditional Chinese' },
  { code: 'ar', name: 'Arabic' },
  { code: 'he', name: 'Hebrew' }
]

async function translateJson(content: TranslationContent, existingTranslation: TranslationContent, targetLang: string): Promise<TranslationContent> {
  const translatedContent: TranslationContent = {}

  for (const [key, value] of Object.entries(content)) {
    if (typeof value === 'string') {
      if (!existingTranslation.hasOwnProperty(key)) {
        console.log("translating", key, value)
        try {
          const prompt = `You are a native ${targetLang} speaker and professional translator. 
This is a JSON key-value pair from a website localization file.

Original English text: "${value}"

Instructions:
1. First, understand the context and meaning of the text
2. Then, rewrite it naturally in ${targetLang} as a native speaker would express it
3. Maintain any technical terms, markdown formatting, or special characters
4. Ensure the translation is appropriate for a professional software/web context
5. Return ONLY the translated text without any quotes or extra formatting
6. Do not wrap the output in quotes - the JSON stringification will handle that

The output will be used as a JSON string value, so ensure it's properly formatted.`
          
          const translation = await generateText({
            model: openai('gpt-4o'),
            prompt,
          })

          // Remove any extra quotes that might be in the translation
          const cleanTranslation = translation.text.trim().replace(/^["']|["']$/g, '')
          translatedContent[key] = cleanTranslation || value
          
          await new Promise(resolve => setTimeout(resolve, 500))
        } catch (error) {
          console.error(`Error translating key ${key}:`, error)
          translatedContent[key] = value
        }
      } else {
        // console.log(`Key ${key} already translated, skipping...`);
      }
    } else if (typeof value === 'object') {
      translatedContent[key] = await translateJson(value as TranslationContent, existingTranslation, targetLang)
    } else {
      translatedContent[key] = value
    }
  }

  // Merge existing translation with the newly translated content
  for (const [key, value] of Object.entries(existingTranslation)) {
    if (!translatedContent.hasOwnProperty(key)) {
      translatedContent[key] = value;
    }
  }

  return translatedContent
}

async function main() {
  // Read the English source file
  const sourceFile = path.join(LOCALES_DIR, 'en', 'common.json')
  const sourceContent = JSON.parse(fs.readFileSync(sourceFile, 'utf8'))

  // Create translations for each supported language
  for (const lang of SUPPORTED_LANGUAGES) {
    console.log(`Translating to ${lang.name}...`)
    
    const targetDir = path.join(LOCALES_DIR, lang.code)
    const targetFile = path.join(targetDir, 'common.json')

    // Create directory if it doesn't exist
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true })
    }

    try {
      // Read existing translation file if it exists
      const targetContent = JSON.parse(fs.readFileSync(targetFile, 'utf8'))
      const translatedContent = await translateJson(sourceContent , targetContent, lang.name)
      
      // Preserve the original localeCode
      translatedContent.localeCode = lang.code
      
      // Write the translated content
      fs.writeFileSync(
        targetFile,
        JSON.stringify(translatedContent, null, 2),
        'utf8'
      )
      
      console.log(`✓ ${lang.name} translation complete`)
    } catch (error) {
      console.error(`Error translating to ${lang.name}:`, error)
    }
  }
}

main().catch(console.error) 