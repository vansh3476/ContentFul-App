# Contentful Page Builder

A fullstack application that enables editors to visually arrange components via drag-and-drop for landing pages. Built with Next.js 15.3+, TypeScript, React + Redux, and Contentful CMS.

## Features

- **Contentful App Extension**: Fullscreen drag-and-drop interface within Contentful
- **Component Library**: Hero Block, Two Column Row, and 2x2 Image Grid components
- **Redux State Management**: Undo/redo functionality, autosave, and persistence
- **Next.js Frontend**: SSG with App Router, optimized performance and SEO
- **TypeScript**: Full type safety throughout the application
- **CSS Modules**: Scoped styling without external UI libraries

## Tech Stack

- Next.js 15.3+ (App Router, SSG)
- TypeScript
- React + Redux Toolkit
- Contentful App SDK
- Contentful GraphQL API
- CSS Modules
- Vercel (deployment)

## Setup Instructions

### Prerequisites

- Node.js 18+ 
- Contentful account with space setup
- Vercel account for deployment

### 1. Clone and Install

\`\`\`bash
git clone <repository-url>
cd contentful-page-builder
npm install
\`\`\`

### 2. Environment Configuration

Copy `.env.example` to `.env.local` and fill in your Contentful credentials:

\`\`\`bash
cp .env.example .env.local
\`\`\`

Required environment variables:
- `CONTENTFUL_SPACE_ID`: Your Contentful space ID
- `CONTENTFUL_ACCESS_TOKEN`: Content Delivery API token
- `CONTENTFUL_PREVIEW_ACCESS_TOKEN`: Content Preview API token
- `CONTENTFUL_MANAGEMENT_TOKEN`: Content Management API token
- `NEXT_PUBLIC_VERCEL_URL`: Your Vercel deployment URL
- `NEXT_PUBLIC_APP_URL`: Your application URL

### 3. Contentful Setup

#### Content Models

Create the following content models in Contentful:

**Page Model:**
- Title (Short text)
- Slug (Short text, unique)
- Layout Config (JSON object)
- Hero Blocks (References, multiple)
- Two Column Rows (References, multiple)
- Image Grids (References, multiple)

**Hero Block Model:**
- Heading (Short text)
- Subtitle (Long text)
- CTA (Short text)
- Background Image (Media)

**Two Column Row Model:**
- Left Heading (Short text)
- Left Subtitle (Long text)
- Left CTA (Short text)
- Right Image (Media)

**Image Grid Model:**
- Images (Media, multiple, max 4)

#### App Installation

1. Go to Apps section in Contentful
2. Create new app
3. Set app URL to: `https://your-domain.vercel.app/contentful-app`
4. Configure as fullscreen app
5. Assign to Page content type's Layout Config field

### 4. Development

\`\`\`bash
npm run dev
\`\`\`

Visit:
- `http://localhost:3000` - Main application
- `http://localhost:3000/contentful-app` - Contentful app interface
- `http://localhost:3000/landing/page-1` - Sample landing page
- `http://localhost:3000/landing/page-2` - Sample landing page

### 5. Build and Deploy

\`\`\`bash
npm run build
\`\`\`

Deploy to Vercel:
\`\`\`bash
vercel --prod
\`\`\`

## Project Structure

\`\`\`
src/
├── app/                    # Next.js App Router pages
│   ├── contentful-app/     # Contentful app interface
│   ├── landing/[slug]/     # Dynamic landing pages
│   └── globals.css         # Global styles
├── components/
│   ├── blocks/             # Page building blocks
│   ├── contentful-app/     # Contentful app components
│   └── layout/             # Layout components
├── lib/                    # Utilities and configurations
├── store/                  # Redux store and slices
└── types/                  # TypeScript type definitions
\`\`\`

## Key Features

### Drag-and-Drop Interface
- Visual component arrangement
- Real-time preview
- Intuitive UX within Contentful

### Redux State Management
- **Undo/Redo**: Full state history tracking
- **Autosave**: Automatic saving after 2-second delay
- **Persistence**: Layout survives page refreshes

### Performance Optimizations
- Next.js Image optimization
- Static Site Generation (SSG)
- CSS Modules for scoped styling
- Lighthouse score ≥90

### SEO Features
- Dynamic metadata generation
- JSON-LD structured data
- Semantic HTML structure
- Optimized images with alt text

## Testing

\`\`\`bash
npm test
npm run test:watch
\`\`\`

## Deployment

The application is configured for Vercel deployment with:
- Automatic builds on push
- Environment variable management
- Edge optimization
- Image optimization

## Git Workflow

Tagged as `v1.0.0` for production release:

\`\`\`bash
git tag v1.0.0
git push origin v1.0.0
\`\`\`

## Bonus Features Implemented

- ✅ Preview button in Contentful App
- ✅ Component thumbnails in drag-drop list
- ✅ Fade-in animations and transitions
- ✅ Unit tests setup
- ✅ Responsive design
- ✅ Accessibility features

## Performance Metrics

Target Lighthouse scores:
- Performance: ≥90
- SEO: ≥90
- Accessibility: ≥90
- Best Practices: ≥90

## Support

For issues or questions, please check the documentation or create an issue in the repository.
