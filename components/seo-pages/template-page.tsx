'use client'

import { useState } from "react"
import { Star, Download, Share2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { HeaderComponent } from "@/components/seo-pages/header"
import { FooterComponent } from "@/components/seo-pages/footer"
import dynamic from 'next/dynamic'
import ReactMarkdown from 'react-markdown'
import useTranslation from '@/hooks/useTranslation';
import { useRouter } from 'next/navigation';
import { setTemplateArtifact } from '@/lib/chat';

const ArtifactPanel = dynamic(() => import('@/components/artifact/artifact-panel'), {
  ssr: false,
})

interface TemplatePageProps {
  name: string;
  rating?: {
    score: number;
    totalRatings: number;
  };
  categories?: string[];
  aboutTemplate: string;
  artifact: {
    title: string;
    type: 'diagram' | 'doc' | 'reveal-slides';
    content: string;
  };
}

interface Artifact {
  title: string;
  content: string;
  type: 'diagram' | 'doc' | 'reveal-slides';
}

export function TemplatePage({
  name,
  rating = { score: 0, totalRatings: 0 },
  categories = [],
  aboutTemplate,
  artifact
}: TemplatePageProps) {
  const [userRating, setUserRating] = useState<number>(0)
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-none">
        <HeaderComponent />
      </div>
      <div className="flex-1 overflow-auto pt-16">
        <div className="min-h-full bg-gradient-to-br from-yellow-50 via-white to-green-50">
          <div className="container mx-auto px-4 py-8">
            <div className="grid gap-8 lg:grid-cols-[1fr,400px]">
              {/* Left Column - Template Preview and About Template */}
              <div className="space-y-8">
                <Card className="relative bg-gray-100 shadow-xl h-[60vh]">
                  <ArtifactPanel
                    title={artifact.title}
                    onClose={() => {}}
                    showHeader={false}
                    artifactContent={artifact.content}
                    type={artifact.type}
                    className="!m-0 !rounded-none h-full"
                  />
                </Card>

                {/* About Template Section */}
                <div className="space-y-6">
                  <div className="prose max-w-none">
                    <ReactMarkdown>
                      {aboutTemplate}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>

              {/* Right Column - CTA and Info */}
              <div className="space-y-6">
                <div className="sticky top-4 space-y-6">
                  <Input
                    type="search"
                    placeholder={t('searchInTemplates')}
                    className="w-full"
                  />

                  <div className="space-y-4">
                    <h1 className="text-2xl font-bold">{name}</h1>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>{t('usedXTimes').replace('{count}', '4,872')}</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Sparkles className="h-4 w-4 text-yellow-500" />
                        <span>{t('aiAssistantIncluded')}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-5 w-5 ${
                              star <= Math.floor(rating?.score || 0)
                                ? "fill-yellow-500 text-yellow-500"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium">{rating?.score || 0}</span>
                      <span className="text-sm text-gray-500">
                        ({t('ratingsCount').replace('{count}', rating?.totalRatings?.toLocaleString() || '0')})
                      </span>
                    </div>

                    <Button 
                      className="w-full bg-yellow-500 hover:bg-yellow-600"
                      onClick={() => {
                        const artifactToSave: Artifact = {
                          title: artifact.title,
                          content: artifact.content,
                          type: artifact.type,
                        };
                        setTemplateArtifact(artifactToSave);
                        router.push('/chat?cid=new');
                      }}
                    >
                      {t('useTemplateFree')}
                    </Button>

                    <div className="space-y-2">
                      <p className="text-sm">{t('rateTemplatePrompt')}</p>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setUserRating(star)}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`h-6 w-6 ${
                                userRating >= star
                                  ? "fill-yellow-500 text-yellow-500"
                                  : "text-gray-300"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {(categories || []).map((category) => (
                        <Badge 
                          key={category} 
                          variant="secondary"
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" className="flex-1 border-yellow-500">
                        <Download className="mr-2 h-4 w-4 text-yellow-500" />
                        {t('download')}
                      </Button>
                      <Button variant="outline" className="flex-1 border-yellow-500">
                        <Share2 className="mr-2 h-4 w-4 text-yellow-500" />
                        {t('share')}
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