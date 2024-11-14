'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MessageSquare } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { usePathname } from 'next/navigation'
import { useTranslation } from '@/hooks/useTranslation'
import { useLocalizedNavigate } from '@/hooks/useLocalizedNavigate'

export function HeaderComponent() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { t } = useTranslation()
  const { getLocalizedPath } = useLocalizedNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isChat = pathname === '/chat'
  const navItems = [
    { key: 'tools' as const, href: '/tool' },
    { key: 'templates' as const, href: '/template' },
    // { key: 'blogs' as const, href: '#' }
  ]

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white ${
      isScrolled ? 'shadow-lg' : 'shadow-md'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link href={getLocalizedPath('/')} className="flex items-center space-x-2 group">
              <MessageSquare className="h-9 w-9 text-yellow-400 group-hover:text-yellow-500 transition-colors duration-300" />
              <span className="text-xl sm:text-2xl font-bold text-gray-800">
                Chat Diagram
              </span>
            </Link>
            {!isChat && (
              <nav className="hidden md:block">
                <ul className="flex space-x-8">
                  {navItems.map(({ key, href }) => (
                    <li key={key}>
                      <Link 
                        href={getLocalizedPath(href)}
                        className="text-lg text-gray-600 hover:text-yellow-400 transition-colors duration-300 relative group"
                      >
                        {t(key)}
                        <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
          {!isChat && (
            <div className="flex items-center space-x-6">
              <Button 
                variant="ghost" 
                className="hidden md:flex items-center text-lg text-gray-600 hover:text-yellow-400 hover:bg-transparent transition-colors duration-300 relative group h-auto py-2"
              >
                {t('login')}
                <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Button>
              <Link href="/chat">
                <Button className="bg-yellow-400 text-white px-3 py-3 rounded-md text-lg hover:bg-yellow-500 transition duration-300">
                  {t('getStarted')}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}