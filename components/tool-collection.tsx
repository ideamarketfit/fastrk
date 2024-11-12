'use client'

import * as React from "react"
import Link from "next/link"
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { HeaderComponent } from "@/components/header"
import { FooterComponent } from "@/components/footer"
import { useTranslation } from '@/hooks/useTranslation'
import dynamic from 'next/dynamic'

// Add ArtifactPanel dynamic import
const ArtifactPanel = dynamic(() => import('@/components/artifact-panel'), {
  ssr: false,
})

interface Tool {
  slug: string;
  name: string;
  description: string;
  category: string;
  artifact: {
    title: string;
    content: string;
    type: 'diagram' | 'doc' | 'reveal-slides';
  };
}

export function AiDiagrammingTools({ tools }: { tools: Tool[] }) {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null)
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = React.useState(true);

  // Add useEffect to handle loading state
  React.useEffect(() => {
    setIsLoading(false);
  }, []);

  const faqs = [
    {
      question: t('faq1Question'),
      answer: t('faq1Answer')
    },
    {
      question: t('faq2Question'),
      answer: t('faq2Answer')
    },
    {
      question: t('faq3Question'),
      answer: t('faq3Answer')
    },
    {
      question: t('faq4Question'),
      answer: t('faq4Answer')
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderComponent />

      <main id="tool-collection" className="flex-grow container mx-auto px-4 py-12">
        <section className="bg-gradient-to-b from-gray-50 to-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-6 text-gray-900">{t('aiPoweredDiagrammingTools')}</h1>
            <p className="text-xl text-center text-gray-600 mb-12">{t('discoverBestAiTools')}</p>
          </div>
        </section>

        <section className="bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool, index) => (
                <Card key={index} className="flex flex-col overflow-hidden transition duration-300 hover:shadow-lg">
                  <div className="aspect-video overflow-hidden bg-gray-100">
                    {!isLoading && tool.artifact?.content && (
                      <ArtifactPanel
                        title=""
                        onClose={() => {}}
                        showHeader={false}
                        artifactContent={tool.artifact.content}
                        type={tool.artifact.type || 'doc'}
                        avoidDiagramSvgPanZoom={true}
                        className="!m-0 !shadow-none !bg-transparent"
                      />
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle>
                      <Link href={`/tool/${tool.slug}`} className="hover:text-purple-600 transition-colors">
                        {tool.name}
                      </Link>
                    </CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="mt-auto">
                    <Link href={`/tool/${tool.slug}`} className="w-full">
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white transition duration-300">
                        {t('tryNow')}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">{t('frequentlyAskedQuestions')}</h2>
            <div className="space-y-4 max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg">
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
