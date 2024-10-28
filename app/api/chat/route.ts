import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'
import { systemPrompt } from './systemPrompt'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages, model } = await req.json()

  const selectedModel = model || 'gpt-3.5-turbo' // Default to GPT-3.5-turbo if no model is specified

  const response = await openai.chat.completions.create({
    model: selectedModel,
    stream: true,
    messages: [
      {
        role: 'system',
        content: systemPrompt
      },
      ...messages
    ],
  })

  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}
