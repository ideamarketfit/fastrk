'use client'

import React, { useEffect, useRef } from 'react'
import Reveal from 'reveal.js'
import type { Api as RevealApi } from 'reveal.js'
import 'reveal.js/dist/reveal.css'
import 'reveal.js/dist/theme/white.css'

interface RevealSlideProps {
  content: string;
}

export function RevealSlideComponent({ content }: RevealSlideProps) {
  const deckDivRef = useRef<HTMLDivElement>(null)
  const deckRef = useRef<RevealApi | null>(null)

  useEffect(() => {
    console.log('reveal js init start')
    // Prevents double initialization in strict mode
    if (deckRef.current) {
      deckRef.current.destroy()
      deckRef.current = null
    }

    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (deckDivRef.current) {
        try {
          deckRef.current = new Reveal(deckDivRef.current, {
            embedded: true,
            hash: false,
            width: '100%',
            height: '100%',
            margin: 0,
            minScale: 0.2,
            maxScale: 2.0,
            controls: true,
            progress: true,
            center: true,
            transition: 'slide',
            // Add these options to help with initialization
            display: 'block',
            viewDistance: 3,
            mouseWheel: false,
          })

          deckRef.current.initialize().then(() => {
            console.log('Reveal.js initialized successfully')
          }).catch(error => {
            console.error('Reveal.js initialization failed:', error)
          })
        } catch (error) {
          console.error('Error creating Reveal instance:', error)
        }
      }
    }, 300)

    return () => {
      clearTimeout(timer)
      if (deckRef.current) {
        try {
          deckRef.current.destroy()
          deckRef.current = null
        } catch (e) {
          console.warn("Reveal.js destroy call failed:", e)
        }
      }
    }
  }, [content]) // Re-initialize when content changes

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
      <div 
        className="reveal" 
        ref={deckDivRef} 
        style={{ 
          width: '100%', 
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      >
        <div className="slides">
          {content ? (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            // Fallback content if no content is provided
            <section>
              <h2>No content available</h2>
              <p>Please provide slide content to display.</p>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}