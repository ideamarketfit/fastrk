'use client'

import Link from 'next/link'
import { MapPin, Mail } from 'lucide-react'

export function FooterComponent() {
  return (
    <footer className="block">
      <div className="py-16 md:py-20 mx-auto w-full max-w-7xl px-5 md:px-10">
        <div className="sm:flex-row flex justify-between flex-col">
          <h2 className="font-bold text-3xl md:text-5xl w-full max-w-xl">
            Fast Track Your Work with AI
          </h2>
          <div className="mt-8 md:mt-0">
            <div className="mb-4 flex max-w-72 items-start justify-start">
              <MapPin className="inline-block mr-3 text-yellow-400" />
              <p className="text-gray-500 text-sm sm:text-base">
              made with 🫶 from San Francisco, California 94107, USA
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
  )
}