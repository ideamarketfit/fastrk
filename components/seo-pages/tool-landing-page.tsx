'use client'

import { useState, useRef } from 'react'
import { ChevronDown, ChevronUp, Paperclip, Send, X, Sparkles, Zap, FileText, Image as ImageIcon, Film, Music, Archive, Code, FileSpreadsheet, File, Share } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from 'next/navigation'
import { useTranslation } from '@/hooks/useTranslation'
import { HeaderComponent } from '@/components/seo-pages/header'
import { ParticlesEffect } from '@/components/mouse-particles'
import { FooterComponent } from '@/components/seo-pages/footer'
import dynamic from 'next/dynamic'

const ArtifactPanel = dynamic(() => import('@/components/artifact/artifact-panel'), {
  ssr: false,
})

export function ToolLandingPage({ 
  toolName, 
  toolDescription, 
  faqs,
  command,
  artifact
}: {
  toolName: string;
  toolDescription: string;
  faqs: { question: string; answer: string }[];
  command: string;
  artifact?: {
    title: string;
    content: string;
    type: 'diagram' | 'doc' | 'reveal-slides';
  };
}) {

  const router = useRouter()
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [input, setInput] = useState('')
  const [isLoading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [selectedModel, setSelectedModel] = useState('gpt-4o-mini')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { t } = useTranslation()

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim() !== '') {
      // Navigate to /chat with both user_prompt and prompt (command) as query parameters
      router.push(`/chat?cid=new&user_prompt=${encodeURIComponent(input.trim())}&task_prompt=${encodeURIComponent(command)}`)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const getFileIcon = (fileType: string) => {
    const type = fileType.toLowerCase()
    
    if (type.includes('text') || type.includes('pdf')) {
      return <FileText className="h-4 w-4" />
    } else if (type.includes('image')) {
      return <ImageIcon className="h-4 w-4" />
    } else if (type.includes('video')) {
      return <Film className="h-4 w-4" />
    } else if (type.includes('audio')) {
      return <Music className="h-4 w-4" />
    } else if (type.includes('zip') || type.includes('rar') || type.includes('7z')) {
      return <Archive className="h-4 w-4" />
    } else if (type.includes('javascript') || type.includes('typescript') || type.includes('python') || type.includes('java')) {
      return <Code className="h-4 w-4" />
    } else if (type.includes('csv') || type.includes('excel') || type.includes('spreadsheet')) {
      return <FileSpreadsheet className="h-4 w-4" />
    } else {
      return <File className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <ParticlesEffect />
      <HeaderComponent />

      <main className="flex-grow flex flex-col pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-gray-50 to-white min-h-[calc(100vh-12rem)] flex items-center overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
              <div className="w-[600px] h-[500px] bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
            </div>
            <div className="absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2">
              <div className="w-[400px] h-[400px] bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
            </div>
          </div>
          <div className="hero container mx-auto px-4 py-16 flex flex-col justify-center h-full relative z-10 mb-40">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
                {toolName}
                <span className="text-purple-600 ml-2">
                  <Sparkles className="inline-block w-10 h-10 md:w-12 md:h-12 animate-pulse" />
                </span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
                {toolDescription}
              </p>
            </div>
            
            {/* Input Box */}
            <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
              <div className="relative w-full">
                {uploadedFile && (
                  <div className="mb-2 p-2 rounded-lg flex items-center bg-gray-100">
                    {getFileIcon(uploadedFile.type)}
                    <span className="ml-2 text-sm">{uploadedFile.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setUploadedFile(null)}
                      className="ml-auto"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                <Textarea
                  value={input}
                  onChange={handleInputChange}
                  placeholder={t('chatInputPlaceholder')}
                  onKeyPress={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(e as unknown as React.FormEvent<HTMLFormElement>);
                    }
                  }}
                  className="w-full min-h-[120px] pr-12 pl-6 py-4 resize-none rounded-lg border-gray-300 focus:border-purple-500 focus:ring-0 transition duration-200"
                  rows={3}
                />
                <div className="absolute left-2 bottom-2 flex items-center space-x-2 z-10">
                  <Button variant="ghost" size="icon" onClick={() => fileInputRef.current?.click()}>
                    <Paperclip className="h-4 w-4" />
                    <span className="sr-only">Attach file</span>
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger className="w-[140px] border-none focus:ring-0 focus:ring-offset-0">
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
                      <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                      <SelectItem value="claude-v1">Claude v1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSend(e as unknown as React.FormEvent<HTMLFormElement>)} 
                  disabled={isLoading || input.trim() === ''}
                  className={`absolute right-2 bottom-2 z-10 transition duration-200 ${
                    input.trim() === ''
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                >
                  <Send className="h-4 w-4 mr-2" />
                  <span>{t('generateButton')}</span>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Example Section */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">{t('seeItInAction')}</h2>
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden max-w-4xl mx-auto">
              <div className="bg-gray-200 px-4 py-2 flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="flex-grow text-center text-sm text-gray-600">chatdiagram.com</div>
              </div>
              <div style={{ height: '600px' }}>
                <ArtifactPanel
                  title={artifact?.title || "Example Diagram"}
                  onClose={() => {}}
                  showHeader={false}
                  artifactContent={artifact?.content || `
                    graph TD
                    A[Enter Chart Definition] --> B(Preview)
                    B --> C{decide}
                    C --> D[Keep]
                    C --> E[Edit Definition]
                    E --> B
                    D --> F[Save Image and Code]
                    F --> B
                  `}
                  type={artifact?.type || "diagram"}
                  className="!m-0 !p-0"
                />
              </div>
            </div>
          </div>
        </section>

        {/* How it works Section (New) */}
        <section className="py-12 bg-white">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-5 py-16 md:px-10 md:py-20">
            <p className="mb-2 text-center text-sm font-medium text-purple-600">
              {t('tool_landing_3_easy_steps')}
            </p>
            <h2 className="text-center text-3xl font-bold text-gray-900 lg:text-4xl mb-4">
              {t('tool_landing_how_it_works')}
            </h2>
            <p className="mx-auto mb-12 mt-4 max-w-lg px-5 text-center text-base text-gray-600">
              {t('tool_landing_create_flow_charts')}
            </p>
            <div className="flex flex-col items-start justify-center lg:flex-row">
              {/* Step 1 */}
              <div className="relative my-8 flex w-full rounded-md lg:mx-8 lg:flex-col">
                <div className="flex h-16 w-16 items-center justify-center rounded-md bg-purple-100">
                  <h3 className="text-3xl font-medium text-purple-600">1</h3>
                </div>
                <div className="ml-6 lg:ml-0">
                  <h4 className="mb-5 text-xl font-medium text-gray-900 lg:mt-8">
                    {t('tool_landing_step1_title')}
                  </h4>
                  <p className="max-w-md pr-5 text-base text-gray-600">
                    {t('tool_landing_step1_desc')}
                  </p>
                </div>
                <svg className="absolute right-0 top-7 hidden lg:block" width="170" height="12" viewBox="0 0 170 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.226497 6L6 11.7735L11.7735 6L6 0.226497L0.226497 6ZM169.773 6L164 0.226497L158.227 6L164 11.7735L169.773 6ZM6 7H9.95V5H6V7ZM17.85 7H25.75V5H17.85V7ZM33.65 7H41.55V5H33.65V7ZM49.45 7H57.35V5H49.45V7ZM65.25 7H73.15V5H65.25V7ZM81.05 7H88.95V5H81.05V7ZM96.85 7H104.75V5H96.85V7ZM112.65 7H120.55V5H112.65V7ZM128.45 7H136.35V5H128.45V7ZM144.25 7H152.15V5H144.25V7ZM160.05 7H164V5H160.05V7Z" fill="#9333EA"/>
                </svg>
              </div>
              {/* Step 2 */}
              <div className="relative my-8 flex w-full rounded-md lg:mx-8 lg:flex-col">
                <div className="flex h-16 w-16 items-center justify-center rounded-md bg-purple-100">
                  <h3 className="text-3xl font-medium text-purple-600">2</h3>
                </div>
                <div className="ml-6 lg:ml-0">
                  <h4 className="mb-5 text-xl font-medium text-gray-900 lg:mt-8">
                    {t('tool_landing_step2_title')}
                  </h4>
                  <p className="max-w-md pr-5 text-base text-gray-600">
                    {t('tool_landing_step2_desc')}
                  </p>
                </div>
                <svg className="absolute right-0 top-7 hidden lg:block" width="170" height="12" viewBox="0 0 170 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.226497 6L6 11.7735L11.7735 6L6 0.226497L0.226497 6ZM169.773 6L164 0.226497L158.227 6L164 11.7735L169.773 6ZM6 7H9.95V5H6V7ZM17.85 7H25.75V5H17.85V7ZM33.65 7H41.55V5H33.65V7ZM49.45 7H57.35V5H49.45V7ZM65.25 7H73.15V5H65.25V7ZM81.05 7H88.95V5H81.05V7ZM96.85 7H104.75V5H96.85V7ZM112.65 7H120.55V5H112.65V7ZM128.45 7H136.35V5H128.45V7ZM144.25 7H152.15V5H144.25V7ZM160.05 7H164V5H160.05V7Z" fill="#9333EA"/>
                </svg>
              </div>
              {/* Step 3 */}
              <div className="relative my-8 flex w-full rounded-md lg:mx-8 lg:flex-col">
                <div className="flex h-16 w-16 items-center justify-center rounded-md bg-purple-100">
                  <h3 className="text-3xl font-medium text-purple-600">3</h3>
                </div>
                <div className="ml-6 lg:ml-0">
                  <h4 className="mb-5 text-xl font-medium text-gray-900 lg:mt-8">
                    {t('tool_landing_step3_title')}
                  </h4>
                  <p className="max-w-md pr-5 text-base text-gray-600">
                    {t('tool_landing_step3_desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">{t('whyChooseUs')}</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-md transition duration-300 hover:shadow-lg">
                <Zap className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{t('ideaToDiagram')}</h3>
                <p className="text-gray-600">{t('ideaToDiagramDesc')}</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md transition duration-300 hover:shadow-lg">
                <FileText className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{t('importAnything')}</h3>
                <p className="text-gray-600">{t('importAnythingDesc')}</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md transition duration-300 hover:shadow-lg">
                <Sparkles className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{t('fastIterativeUpdates')}</h3>
                <p className="text-gray-600">{t('fastIterativeUpdatesDesc')}</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md transition duration-300 hover:shadow-lg">
                <Share className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{t('exportAnywhere')}</h3>
                <p className="text-gray-600">{t('exportAnywhereDesc')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">{t('frequentlyAskedQuestions')}</h2>
            <div className="space-y-4 max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gray-50 rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg">
                  <button
                    className="flex justify-between items-center w-full p-4 text-left"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span className="font-semibold text-gray-800">{faq.question}</span>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="p-4 bg-white">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <FooterComponent />
    </div>
  )
}
