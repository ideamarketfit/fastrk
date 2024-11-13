# Components Directory Documentation

## Overview
This directory contains React components organized by their primary functions: SEO pages, artifact handling, and chat interface components.

## Component Structure

### SEO Pages (`/seo-pages`)
Landing and collection pages optimized for search engines:
- Tool Landing Page: Individual tool descriptions and demos
- Tool Collection: Gallery of available tools
- Template Collection: Gallery of diagram templates
- Landing Page: Main site landing page

Key features:
- Server-side rendering
- Multilingual content
- SEO metadata
- Interactive examples

### Artifact Components (`/artifact`)
Components for displaying generated content:
- Diagram viewer (Mermaid.js)
- Document viewer
- Presentation viewer (Reveal.js)
- Shared artifact controls

### Chat Interface Components
Interactive components for AI communication:
- Chat window
- Message history
- Input controls
- File upload handling

## Component Guidelines

### SEO Pages
- Use Next.js SSR capabilities
- Include metadata
- Support all languages
- Maintain accessibility

### Artifact Components
- Support multiple formats
- Handle loading states
- Include error boundaries
- Maintain responsive design

### Chat Interface
- Real-time updates
- File upload preview
- Model selection
- Progress indication

## Development Notes
1. SEO components use translations from `/lib/translate`
2. Artifact components support three types: diagram, doc, reveal-slides
3. Chat components integrate with `/lib/chat` for state management
4. All components should handle loading and error states

## Extension Points
1. New artifact types can be added to `/artifact`
2. Additional SEO pages can be created in `/seo-pages`
3. Chat interface can be extended with new features
4. New language support can be added through i18n system