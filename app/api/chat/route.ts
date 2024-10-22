import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages } = await req.json()

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'system',
        content: `You are a helpful AI assistant. When appropriate, use Mermaid syntax to create diagrams. 
        Enclose Mermaid diagrams within \`\`\`mermaid\`\`\` tags. For example:
        
        Here's a simple flowchart:
        
        \`\`\`mermaid
        graph TD
          A[Start] --> B[Process]
          B --> C[End]
        \`\`\`
        
        Always explain the diagram after presenting it.`
      },
      ...messages
    ],
  })

  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}

