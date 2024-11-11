'use client'

import { useState, useMemo } from "react"
import { Star, Download, Share2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { HeaderComponent } from "@/components/header"
import { FooterComponent } from "@/components/footer"
import dynamic from 'next/dynamic'

const ArtifactPanel = dynamic(() => import('@/components/artifact-panel'), {
  ssr: false,
})

export function TemplatePage() {
  const [rating, setRating] = useState<number>(0)
  const templateScore = useMemo(() => (Math.random() * (5 - 4) + 4).toFixed(1), [])

  // Example diagram content - replace with your actual template content
  const templateContent = `
    graph TD
      A[Start] --> B[Process]
      B --> C{Decision}
      C -->|Yes| D[Action 1]
      C -->|No| E[Action 2]
      D --> F[End]
      E --> F
  `

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-none">
        <HeaderComponent />
      </div>
      <div className="flex-1 overflow-auto pt-16">
        <div className="min-h-full bg-gradient-to-br from-purple-50 via-white to-blue-50">
          <div className="container mx-auto px-4 py-8">
            <div className="grid gap-8 lg:grid-cols-[1fr,400px]">
              {/* Left Column - Template Preview and About Template */}
              <div className="space-y-8">
                <Card className="relative bg-gray-100 shadow-xl h-[600px]">
                  <ArtifactPanel
                    title="Flow Chart Template"
                    onClose={() => {}}
                    showHeader={false}
                    artifactContent={templateContent}
                    type="diagram"
                    className="!m-0 !rounded-none h-full"
                  />
                </Card>

                {/* About Template Section */}
                <div className="space-y-6">
                  <h2 className="text-xl font-bold">About Template</h2>
                  <div className="prose max-w-none">
                    <p>
                      This flow chart template is designed to help you create professional diagrams and process flows with ease.
                      Perfect for business processes, decision trees, and workflow documentation. The template includes:
                    </p>
                    <ul>
                      <li>Pre-built shapes and connectors</li>
                      <li>Customizable styles and colors</li>
                      <li>Smart layout suggestions</li>
                      <li>Export options in multiple formats</li>
                    </ul>
                    <p>
                      Our AI assistant can help you optimize your flow charts and suggest improvements based on best practices.
                      You can customize this template using our intuitive editor - add your branding, modify the layout, and make it
                      your own.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column - CTA and Info */}
              <div className="space-y-6">
                <div className="sticky top-4 space-y-6">
                  <Input
                    type="search"
                    placeholder="Search in PDF Templates"
                    className="w-full"
                  />

                  <div className="space-y-4">
                    <h1 className="text-2xl font-bold">Flow Chart Template</h1>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>Used 4,872 times</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Sparkles className="h-4 w-4 text-purple-600" />
                        <span>AI assistant included</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-5 w-5 ${
                              star <= Math.floor(parseFloat(templateScore))
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium">{templateScore}</span>
                    </div>

                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      Use this template — free
                    </Button>

                    <div className="space-y-2">
                      <p className="text-sm">Care to rate this template?</p>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setRating(star)}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`h-6 w-6 ${
                                rating >= star
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Flow Charts</Badge>
                      <Badge variant="secondary">Business</Badge>
                      <Badge variant="secondary">Process</Badge>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" className="flex-1">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterComponent />
      </div>
    </div>
  )
}