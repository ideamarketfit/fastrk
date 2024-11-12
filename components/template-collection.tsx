'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { HeaderComponent } from "@/components/header"
import { FooterComponent } from "@/components/footer"

interface Template {
  slug: string;
  title: string;
  description: string;
  categories: string[];
}

// Mock categories data
const categories = [
  { id: 1, name: "Flow Charts" },
  { id: 2, name: "Mind Maps" },
  { id: 3, name: "Org Charts" },
  { id: 4, name: "Network Diagrams" },
  { id: 5, name: "UML Diagrams" },
  { id: 6, name: "ERD" },
  { id: 7, name: "Sequence Diagrams" },
  { id: 8, name: "Gantt Charts" },
]

export function TemplateCollection({ templates }: { templates: Template[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-white to-blue-50">
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
                    placeholder="Search diagram templates"
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
                  <h1 className="mb-2 text-3xl font-bold">Diagram Templates for Clear Communication</h1>
                  <p className="text-purple-100">
                    Explore our collection of customizable diagram templates. Start with a professional design and tailor it to your needs.
                  </p>
                </div>
              </div>

              {/* Templates Grid */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {templates.map((template) => (
                  <Link key={template.slug} href={`/template/${template.slug}`}>
                    <Card className="group h-full overflow-hidden transition-shadow hover:shadow-lg">
                      <div className="aspect-video overflow-hidden bg-gray-100">
                        <Image
                          src="/placeholder.svg"
                          alt={template.title}
                          width={400}
                          height={225}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
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
                  Load More Templates
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