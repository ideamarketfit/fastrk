'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef } from 'react'
import { MessageSquare, ChevronDown, ChevronUp, Paperclip, Send, X, Sparkles, Zap, BarChart, FileText, Image as ImageIcon, Film, Music, Archive, Code, FileSpreadsheet, File } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from 'next/navigation'

export function ToolLandingPage({ 
  toolName, 
  toolDescription, 
  faqs,
  exampleImage,
  command // Add this prop
}: {
  toolName: string;
  toolDescription: string;
  faqs: { question: string; answer: string }[];
  exampleImage: string;
  command: string; // Add this to the props type
}) {
  const router = useRouter()
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [input, setInput] = useState('')
  const [isLoading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [selectedModel, setSelectedModel] = useState('gpt-4o-mini')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim() !== '') {
      // Navigate to /chat with both user_prompt and prompt (command) as query parameters
      router.push(`/chat?user_prompt=${encodeURIComponent(input.trim())}&task_prompt=${encodeURIComponent(command)}`)
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
      <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold text-gray-800">Chat Diagram</span>
          </div>
          <Button className="bg-purple-600 text-white hover:bg-purple-700 transition duration-300">
            Try for Free
          </Button>
        </div>
      </header>

      <main className="flex-grow flex flex-col pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-gray-50 to-white min-h-[calc(100vh-4rem)] flex items-center overflow-hidden">
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
                  placeholder="Describe your flow chart here..."
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
                  <span>Generate</span>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Chat Diagram Section */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Choose Chat Diagram?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 rounded-lg p-6 shadow-md transition duration-300 hover:shadow-lg">
                <Zap className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">AI-Powered Generation</h3>
                <p className="text-gray-600">Transform text descriptions into professional flow charts with our advanced AI technology.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 shadow-md transition duration-300 hover:shadow-lg">
                <BarChart className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Customizable Designs</h3>
                <p className="text-gray-600">Easily customize your flow charts with our intuitive drag-and-drop interface and extensive styling options.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 shadow-md transition duration-300 hover:shadow-lg">
                <Sparkles className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Smart Templates</h3>
                <p className="text-gray-600">Choose from a wide range of smart templates to kickstart your flow chart creation process.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Example Section */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">See It in Action</h2>
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden max-w-4xl mx-auto">
              <div className="bg-gray-200 px-4 py-2 flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="flex-grow text-center text-sm text-gray-600">Flow Chart Example</div>
              </div>
              <div className="frame-image">
                <Image 
                  src={exampleImage}
                  height={400} 
                  width={600} 
                  alt={`${toolName} Example`}
                  className="w-full rounded-md shadow"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Frequently Asked Questions</h2>
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

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-purple-400 transition duration-300">Features</Link></li>
                <li><Link href="#" className="hover:text-purple-400 transition duration-300">Pricing</Link></li>
                <li><Link href="#" className="hover:text-purple-400 transition duration-300">Use Cases</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-purple-400 transition duration-300">About Us</Link></li>
                <li><Link href="#" className="hover:text-purple-400 transition duration-300">Careers</Link></li>
                <li><Link href="#" className="hover:text-purple-400 transition duration-300">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3  className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="#"   className="hover:text-purple-400 transition duration-300">Blog</Link></li>
                <li><Link href="#" className="hover:text-purple-400 transition duration-300">Documentation</Link></li>
                <li><Link href="#" className="hover:text-purple-400 transition duration-300">Community</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-purple-400 transition duration-300">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-purple-400 transition duration-300">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-purple-400 transition duration-300">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 text-center text-gray-400">
            © {new Date().getFullYear()} Chat Diagram. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
