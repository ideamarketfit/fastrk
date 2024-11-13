# App Directory Structure

## Overview
Next.js 13+ application with app router, focusing on AI-powered diagram and document generation with multilingual support.

## Directory Structure

### Root Level
- `page.tsx` - Landing page
- `layout.tsx` - Root layout with providers
- `error.tsx` - Global error handling
- `loading.tsx` - Loading states

### Non-Localized Routes
- `/tool` - Tool collection page
- `/template` - Template gallery
- `/chat` - Chat interface

### Localized Routes (`/[locale]`)
- `/[locale]/tool/[slug]` - Individual tool pages
- `/[locale]/template/[slug]` - Template pages
- `/[locale]/chat` - Localized chat interface

## Key Features

### Server Components
- SEO optimization
- Static page generation
- Data prefetching

### Internationalization
- 11 supported languages
- Automatic locale detection
- Fallback handling

### Dynamic Routes
- Tool/template slugs
- Language parameters
- Static path generation

## Development Guidelines

### Adding New Pages
1. Create base page in root directory
2. Add localized version in `/[locale]`
3. Implement `generateStaticParams` for static paths
4. Add metadata for SEO

Example structure:
