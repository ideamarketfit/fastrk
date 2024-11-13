'use client'

import Link from 'next/link'

export function FooterComponent() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-purple-400 transition duration-300">Tool</Link></li>
              <li><Link href="#" className="hover:text-purple-400 transition duration-300">Template</Link></li>
              <li><Link href="#" className="hover:text-purple-400 transition duration-300">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Partners</h3>
            <ul className="space-y-2">
              <li><Link href="https://mymap.ai" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition duration-300">mymap.ai</Link></li>
              <li><Link href="https://mermaid.js.org" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition duration-300">mermaid.js</Link></li>
              <li><Link href="https://aisecret.us" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition duration-300">aisecret.us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li><Link href="mailto:hello@chatdiagram.com" className="hover:text-purple-400 transition duration-300">Email</Link></li>
              <li><Link href="https://twitter.com/chatdiagram" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition duration-300">Twitter</Link></li>
              <li><Link href="https://linkedin.com/company/chatdiagram" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition duration-300">LinkedIn</Link></li>
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
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Chat Diagram. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}