'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Zap, ChevronDown, ChevronUp, FileText, MapIcon as Diagram, Presentation, Repeat, Sparkles, Users, Clock, Download, MapPin, Mail } from 'lucide-react'

export function LandingPageComponent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      question: "How does Fastrk.AI work?",
      answer: "Fastrk.AI uses advanced AI to help you create documents, diagrams, and slides through an iterative process. Simply start with your ideas, and our AI will help you refine and improve your work step by step."
    },
    {
      question: "Can I collaborate with my team in real-time?",
      answer: "Yes! Fastrk.AI supports real-time collaboration. Multiple team members can work on the same project simultaneously, discussing ideas and seeing changes instantly."
    },
    {
      question: "What types of content can I create with Fastrk.AI?",
      answer: "You can create a wide variety of content including documents, diagrams, and presentation slides. Our AI assists you in creating and refining your content iteratively."
    },
    {
      question: "How can I export my work from Fastrk.AI?",
      answer: "Fastrk.AI allows you to export your work in multiple formats including PDF, PNG, and editable file formats compatible with popular office suites. You can also integrate with your favorite productivity tools."
    }
  ]

  const features = [
    {
      icon: FileText,
      title: "Documents",
      description: "Create professional documents with AI-assisted writing and formatting."
    },
    {
      icon: Diagram,
      title: "Diagrams",
      description: "Design clear and impactful diagrams with intelligent suggestions."
    },
    {
      icon: Presentation,
      title: "Slides",
      description: "Build engaging presentations with AI-powered design assistance."
    },
    {
      icon: Repeat,
      title: "Iterative Process",
      description: "Refine your work step-by-step with AI guidance for continuous improvement."
    },
    {
      icon: Sparkles,
      title: "AI Enhancement",
      description: "Leverage AI to polish your content and suggest improvements."
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Work together in real-time with your team for seamless productivity."
    },
    {
      icon: Clock,
      title: "Time-Saving",
      description: "Accelerate your workflow with AI-powered shortcuts and automations."
    },
    {
      icon: Download,
      title: "Easy Export",
      description: "Export your work in various formats for easy sharing and presentation."
    }
  ]

  return (
    <div className="min-h-screen bg-sky-50">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-yellow-400" />
            <span className="text-2xl font-bold text-gray-800">Fastrk.AI</span>
          </div>
          <button className="bg-yellow-400 text-white px-4 py-2 rounded-md hover:bg-yellow-500 transition duration-300">
            Get Started
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-20 relative">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Fast Track Your Work with AI</h1>
          <p className="text-lg md:text-xl text-gray-600 mb-12">
            Create <span className="highlight">documents</span>, <span className="highlight">diagrams</span>, and <span className="highlight">slides</span> using an AI-powered iterative process. Refine your work step-by-step for optimal results.
          </p>
          <Link href="/chat">
            <button className="bg-yellow-400 text-white px-6 py-3 rounded-md text-lg hover:bg-yellow-500 transition duration-300 mb-4">
              Start Creating
            </button>
          </Link>
          <p className="text-sm text-gray-500 mb-16">No credit card required, start for free</p>

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
                src="/public/chat-diagram-demo.png" 
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

      <footer className="block">
        {/* Container */}
        <div className="py-16 md:py-20 mx-auto w-full max-w-7xl px-5 md:px-10">
          {/* Component */}
          <div className="sm:flex-row flex justify-between flex-col">
            <h2 className="font-bold text-3xl md:text-5xl w-full max-w-xl">
              Fast Track Your Work with AI
            </h2>
            <div className="mt-8 md:mt-0">
              <div className="mb-4 flex max-w-72 items-start justify-start">
                <MapPin className="inline-block mr-3 text-yellow-400" />
                <p className="text-gray-500 text-sm sm:text-base">
                  123 AI Avenue, Innovation City, TC 54321, USA
                </p>
              </div>
              <div className="mb-4 flex max-w-72 items-start justify-start">
                <Mail className="inline-block mr-3 text-yellow-400" />
                <p className="text-gray-500 text-sm sm:text-base">
                  support@fastrk.ai
                </p>
              </div>
            </div>
          </div>
          <div className="mb-14 w-full border-b border-gray-200 mt-16"></div>
          <div className="md:flex-row flex justify-between sm:items-center sm:flex-col items-start flex-col-reverse">
            <div className="font-semibold mb-4 sm:mb-0 py-1 text-center sm:text-center">
              <Link
                href="#"
                className="inline-block font-normal text-gray-500 transition hover:text-yellow-400 sm:pr-6 lg:pr-12 py-1.5 sm:py-2 pr-6"
              >
                About
              </Link>
              <Link
                href="#"
                className="inline-block font-normal text-gray-500 transition hover:text-yellow-400 sm:pr-6 lg:pr-12 py-1.5 sm:py-2 pr-6"
              >
                Features
              </Link>
              <Link
                href="#"
                className="inline-block font-normal text-gray-500 transition hover:text-yellow-400 sm:pr-6 lg:pr-12 py-1.5 sm:py-2 pr-6"
              >
                How It Works
              </Link>
              <Link
                href="#"
                className="inline-block font-normal text-gray-500 transition hover:text-yellow-400 sm:pr-6 lg:pr-12 py-1.5 sm:py-2 pr-6"
              >
                Support
              </Link>
              <Link
                href="#"
                className="inline-block font-normal text-gray-500 transition hover:text-yellow-400 sm:pr-6 lg:pr-12 py-1.5 sm:py-2 pr-6"
              >
                Contact
              </Link>
            </div>
            <p className="text-gray-500 text-sm sm:text-base">
              © {new Date().getFullYear()} Fastrk.AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}