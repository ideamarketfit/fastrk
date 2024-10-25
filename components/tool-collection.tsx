'use client'

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MessageSquare, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"

interface Tool {
  slug: string; // Add this line
  name: string;
  description: string;
  image: string;
  category: string;
}

export function AiDiagrammingTools({ tools }: { tools: Tool[] }) {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null)

  const faqs = [
    {
      question: "How do AI-powered diagramming tools work?",
      answer: "AI-powered diagramming tools use artificial intelligence to convert text descriptions or voice input into visual diagrams. They analyze your input, understand the relationships between elements, and automatically generate professional-looking diagrams based on that understanding."
    },
    {
      question: "Can I edit the generated diagrams?",
      answer: "Yes! Most AI-powered diagramming tools allow you to edit and refine the automatically generated diagrams. You can typically adjust layouts, add or remove elements, and customize styles to suit your needs."
    },
    {
      question: "What types of diagrams can I create with these tools?",
      answer: "These AI-powered tools can create various types of diagrams including flow charts, mind maps, entity-relationship diagrams, process flows, network diagrams, organizational charts, and more. The specific types may vary depending on the tool you choose."
    },
    {
      question: "How can I export my diagrams?",
      answer: "Most AI diagramming tools offer multiple export options. You can typically export your diagrams in formats such as PNG, SVG, and PDF. Many tools also allow you to share your diagrams directly with team members or integrate them into other productivity tools."
    }
  ]

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
  <section className="bg-gradient-to-b from-gray-50 to-white py-12">
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-900">AI-Powered Diagramming Tools</h1>
      <p className="text-xl text-center text-gray-600 mb-12">Discover the best AI tools for creating diagrams and visualizations</p>
    </div>
  </section>

  <section className="bg-white py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <Card key={index} className="flex flex-col overflow-hidden transition duration-300 hover:shadow-lg">
            <Image src={tool.image} alt={tool.name} width={300} height={200} className="w-full h-48 object-cover" />
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
                  Try Now
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
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Frequently Asked Questions</h2>
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
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-purple-400 transition duration-300">Blog</Link></li>
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
