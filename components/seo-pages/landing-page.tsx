'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ChevronDown, ChevronUp, FileText, MapIcon as Diagram, Presentation, Repeat, Sparkles, Users, Clock, Download } from 'lucide-react'
import { HeaderComponent } from '@/components/seo-pages/header'
import { FooterComponent } from '@/components/seo-pages/footer'
import useTranslation from '@/hooks/useTranslation'

export function LandingPageComponent() {
  const { t } = useTranslation();

  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      question: t("home-faq-howDoesFastrkAIWork"),
      answer: t("home-faq-howFastrkWorksAnswer")
    },
    {
      question: t("home-faq-canICollaborate"),
      answer: t("home-faq-canICollaborateAnswer")
    },
    {
      question: t("home-faq-typesOfContent"),
      answer: t("home-faq-typesOfContentAnswer")
    },
    {
      question: t("home-faq-exportMyWork"),
      answer: t("home-faq-exportMyWorkAnswer")
    }
  ]

  const features = [
    {
      icon: FileText,
      title: t("home-feature-documents"),
      description: t("home-feature-documentsDescription")
    },
    {
      icon: Diagram,
      title: t("home-feature-diagrams"),
      description: t("home-feature-diagramsDescription")
    },
    {
      icon: Presentation,
      title: t("home-feature-slides"),
      description: t("home-feature-slidesDescription")
    },
    {
      icon: Repeat,
      title: t("home-feature-iterativeProcess"),
      description: t("home-feature-iterativeProcessDescription")
    },
    {
      icon: Sparkles,
      title: t("home-feature-aiEnhancement"),
      description: t("home-feature-aiEnhancementDescription")
    },
    {
      icon: Users,
      title: t("home-feature-collaboration"),
      description: t("home-feature-collaborationDescription")
    },
    {
      icon: Clock,
      title: t("home-feature-timeSaving"),
      description: t("home-feature-timeSavingDescription")
    },
    {
      icon: Download,
      title: t("home-feature-easyExport"),
      description: t("home-feature-easyExportDescription")
    }
  ]

  return (
    <div className="min-h-screen bg-sky-50">
      <HeaderComponent />
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-20 relative">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">{t("hero-title")}</h1>
          <p className="text-lg md:text-xl text-gray-600 mb-12">
            {t("hero-description")}
          </p>
          <Link href="/chat">
            <button className="bg-yellow-400 text-white px-6 py-3 rounded-md text-lg hover:bg-yellow-500 transition duration-300 mb-4">
              {t("hero-startCreating")}
            </button>
          </Link>
          <p className="text-sm text-gray-500 mb-16">{t("hero-noCreditCard")}</p>

          {/* Window Frame for Demo */}
          <div className="mt-16 bg-white rounded-lg shadow-2xl overflow-hidden max-w-4xl mx-auto relative">
            <div className="bg-gray-200 px-4 py-2 flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="flex-grow text-center text-sm text-gray-600">fastrk.ai</div>
            </div>
            <div className="p-4">
              <Image 
                src="/chat-diagram-demo.png" 
                height={400} 
                width={600} 
                alt="Fastrk.AI Demo" 
                className="w-full rounded-md shadow"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-sky-100 mb-20 rounded-lg">
          <div className="container mx-auto px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <feature.icon className="w-12 h-12 text-yellow-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">How Fastrk.AI Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">1. Start Your Project</h3>
              <p className="text-gray-600">Begin with your ideas or initial content. Choose from documents, diagrams, or slides.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">2. AI-Powered Iteration</h3>
              <p className="text-gray-600">Our AI analyzes your work and suggests improvements, helping you refine your content step-by-step.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">3. Collaborate & Finalize</h3>
              <p className="text-gray-600">Work with your team in real-time, incorporate feedback, and polish your project to perfection.</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
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
                  <div className="p-4 bg-sky-50">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-yellow-50 py-20 rounded-lg">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Ready to fast track your work?</h2>
            <p className="text-xl text-gray-600 mb-8">Join thousands of professionals already using Fastrk.AI to streamline their content creation.</p>
            <Link href="/chat">
              <button className="bg-yellow-400 text-white px-6 py-3 rounded-md text-lg hover:bg-yellow-500 transition duration-300">
                Start Your Free Trial
              </button>
            </Link>
          </div>
        </section>
        <style jsx>{`
          @keyframes cycle {
            0%, 20% { transform: translateY(0); }
            25%, 45% { transform: translateY(-1.25em); }
            50%, 70% { transform: translateY(-2.5em); }
            75%, 95% { transform: translateY(-3.75em); }
            100% { transform: translateY(-5em); }
          }
          .highlight {
            background: linear-gradient(120deg, rgba(255,215,0,0.2) 0%, rgba(255,215,0,0.3) 100%);
            border-radius: 4px;
            padding: 2px 4px;
            margin: 0 -4px;
            transition: all 0.3s ease;
            font-weight: 600;
            color: #1a202c;
          }
          .highlight:hover {
            background: linear-gradient(120deg, rgba(255,215,0,0.3) 0%, rgba(255,215,0,0.4) 100%);
            transform: translateY(-1px);
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
        `}</style>
      </main>
      <FooterComponent />
    </div>
  )
}