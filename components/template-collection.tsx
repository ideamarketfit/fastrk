'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { HeaderComponent } from "@/components/header"
import { FooterComponent } from "@/components/footer"
import dynamic from 'next/dynamic'
import useTranslation from '@/hooks/useTranslation'
import { useLocalizedNavigate } from '@/hooks/useLocalizedNavigate';
import { ParticlesEffect } from '@/components/mouse-particles'

interface Template {
  slug: string;
  title: string;
  description: string;
  categories: string[];
  artifact: {
    title: string;
    content: string;
    type: 'diagram' | 'doc' | 'reveal-slides';
  };
}

// Dynamic import of ArtifactPanel with SSR disabled
const ArtifactPanel = dynamic(() => import('@/components/artifact-panel'), {
  ssr: false,
})

export function TemplateCollection({ templates }: { templates: Template[] }) {
  const { t } = useTranslation()
  const { getLocalizedPath } = useLocalizedNavigate();

  // Move categories here
  const categories = [
    { id: 1, name: t('flowCharts') },
    { id: 2, name: t('mindMaps') },
    { id: 3, name: t('orgCharts') },
    { id: 4, name: t('networkDiagrams') },
    { id: 5, name: t('umlDiagrams') },
    { id: 6, name: t('erd') },
    { id: 7, name: t('sequenceDiagrams') },
    { id: 8, name: t('ganttCharts') },
  ]

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true);

  // Add useEffect to handle loading state
  useEffect(() => {
    setIsLoading(false);
  }, []);

  // Filter templates based on selected category
  const filteredTemplates = selectedCategory
    ? templates.filter(template => template.categories.includes(selectedCategory))
    : templates;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <ParticlesEffect />
      <HeaderComponent />

      <main className="flex-grow container mx-auto px-4 py-12 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-[280px,1fr]">
            {/* Left Sidebar */}
            <div className="space-y-6">
              <div className="sticky top-24 space-y-6">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder={t('searchDiagramTemplates')}
                    className="pl-10"
                  />
                </div>
                
                <div className="hidden lg:block space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(
                        selectedCategory === category.name ? null : category.name
                      )}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                        selectedCategory === category.name
                          ? "bg-purple-100 text-purple-900"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <span>{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-8">
              {/* Hero Section */}
              <div className="rounded-xl bg-purple-500 p-8 text-white">
                <div>
                  <h1 className="mb-2 text-3xl font-bold">{t('diagramTemplatesTitle')}</h1>
                  <p className="text-purple-100">
                    {t('diagramTemplatesDescription')}
                  </p>
                </div>
              </div>

              {/* Templates Grid */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredTemplates.map((template) => (
                  <Link 
                    key={template.slug} 
                    href={getLocalizedPath(`/template/${template.slug}`)}
                  >
                    <Card className="group h-full overflow-hidden transition-shadow hover:shadow-lg">
                      <div className="aspect-video overflow-hidden bg-gray-100">
                        {!isLoading && (
                          <ArtifactPanel
                            title=""
                            onClose={() => {}}
                            showHeader={false}
                            artifactContent={template.artifact.content}
                            type={template.artifact.type}
                            avoidDiagramSvgPanZoom={true}
                            className="!m-0 !shadow-none !bg-transparent"
                          />
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold">{template.title}</h3>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>

              {/* Load More Button */}
              <div className="flex justify-center pt-8">
                <Button
                  variant="outline"
                  size="lg"
                  className="min-w-[200px]"
                >
                  {t('loadMoreTemplates')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <FooterComponent />
    </div>
  )
}