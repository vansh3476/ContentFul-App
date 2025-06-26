"use client"

import { useState } from "react"
import HeroBlock from "@/components/blocks/HeroBlock"
import TwoColumnRow from "@/components/blocks/TwoColumnRow"
import ImageGrid from "@/components/blocks/ImageGrid"
import type { HeroBlockContent, TwoColumnRowContent, ImageGridContent } from "@/types/contentful"
import styles from "./preview.module.css"

// Mock data for different layouts
const mockHeroContent: HeroBlockContent = {
  heading: "Welcome",
  subtitle: "Build amazing pages with our drag-and-drop interface. Create stunning layouts in minutes, not hours.",
  cta: "Get Started",
  backgroundImage: {
    sys: { id: "mock-hero-bg" },
    title: "Hero Background",
    url: "https://images.ctfassets.net/c4szsnjjqoyf/1APQE8wBpdOYDYAyxBf05l/ff33c21301462b1fa290877e60aed10c/dummy_image.jpg",
    width: 1200,
    height: 600,
    description: "Hero background image",
  },
}

const mockTwoColumnContent: TwoColumnRowContent = {
  leftHeading: "Powerful Features",
  leftSubtitle:
    "Our platform provides everything you need to create stunning landing pages with ease. Drag, drop, and publish in minutes.",
  leftCta: "Learn More",
  rightImage:{
    "sys": {
        "id": "39LPcKFrYdXwR4eJULzHCm"
    },
    "url": "https://images.ctfassets.net/c4szsnjjqoyf/39LPcKFrYdXwR4eJULzHCm/aa04f233847fe4f176fb2f9b62a3b677/beautiful_image.jpg",
    "width": 640,
    "height": 427,
    "title": "Vacances21 210030",
    "description": ""
},
}

const mockImageGridContent: ImageGridContent = {
  images: [
    {
        "sys": {
            "id": "7M67ChgQZMYDSoGQiad0th"
        },
        "url": "https://images.ctfassets.net/c4szsnjjqoyf/7M67ChgQZMYDSoGQiad0th/8ccb65c7ae704f84faab7dbc49a3010c/beautiful.jpg",
        "width": 640,
        "height": 566,
        "title": "Grand Canyon (52931490880)",
        "description": ""
    },
    {
        "sys": {
            "id": "6p8bPTLuHRu2KNAtDGbhcv"
        },
        "url": "https://images.ctfassets.net/c4szsnjjqoyf/6p8bPTLuHRu2KNAtDGbhcv/4d3eebe7b65deba78e3b804f737c6617/Country_music_hall_of_fame2.jpg",
        "width": 1000,
        "height": 600,
        "title": "Country music hall of fame2",
        "description": ""
    },
    {
        "sys": {
            "id": "1XC6XMXoPtc7FiZwgEgJdE"
        },
        "url": "https://images.ctfassets.net/c4szsnjjqoyf/1XC6XMXoPtc7FiZwgEgJdE/f0f9f437dde11abe736b8fc588a5bc58/NGC_4414__NASA-med_.jpg",
        "width": 1730,
        "height": 1428,
        "title": "NGC 4414 (NASA-med)",
        "description": ""
    },
    {
        "sys": {
            "id": "5tdYQaPDJqAar7CZARWAst"
        },
        "url": "https://images.ctfassets.net/c4szsnjjqoyf/5tdYQaPDJqAar7CZARWAst/0b4452c287bf129bcee0cd5a92f9a47c/beautiful.jpg",
        "width": 640,
        "height": 480,
        "title": "Beautiful Fall Reflection",
        "description": ""
    }
],
}

const layouts = [
  {
    name: "Hero + Two Column + Gallery",
    components: ["hero", "twoColumn", "imageGrid"],
  },
  {
    name: "Two Column + Hero + Gallery",
    components: ["twoColumn", "hero", "imageGrid"],
  },
  {
    name: "Gallery + Hero + Two Column",
    components: ["imageGrid", "hero", "twoColumn"],
  },
  {
    name: "Hero Only",
    components: ["hero"],
  },
  {
    name: "Two Column + Gallery",
    components: ["twoColumn", "imageGrid"],
  },
]

export default function PreviewPage() {
  const [selectedLayout, setSelectedLayout] = useState(0)

  const renderComponent = (type: string, index: number) => {
    switch (type) {
      case "hero":
        return <HeroBlock key={`hero-${index}`} content={mockHeroContent} isPreview />
      case "twoColumn":
        return <TwoColumnRow key={`twoColumn-${index}`} content={mockTwoColumnContent} />
      case "imageGrid":
        return <ImageGrid key={`imageGrid-${index}`} content={mockImageGridContent.images} />
      default:
        return null
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Page Builder Preview</h1>
        <p>See how different component layouts look when rendered</p>

        <div className={styles.layoutSelector}>
          <label htmlFor="layout-select">Choose Layout:</label>
          <select
            id="layout-select"
            value={selectedLayout}
            onChange={(e) => setSelectedLayout(Number(e.target.value))}
            className={styles.select}
          >
            {layouts.map((layout, index) => (
              <option key={index} value={index}>
                {layout.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.preview}>
        <div className={styles.previewHeader}>
          <h2>Preview: {layouts[selectedLayout].name}</h2>
          <div className={styles.componentList}>Components: {layouts[selectedLayout].components.join(" → ")}</div>
        </div>

        <div className={styles.previewContent}>
          {layouts[selectedLayout].components.map((componentType, index) => renderComponent(componentType, index))}
        </div>
      </div>

      <div className={styles.features}>
        <h2>Key Features</h2>
        <div className={styles.featureGrid}>
          <div className={styles.feature}>
            <h3>🎨 Drag & Drop Interface</h3>
            <p>Intuitive visual editor within Contentful CMS</p>
          </div>
          <div className={styles.feature}>
            <h3>⚡ Real-time Preview</h3>
            <p>See changes instantly as you build your pages</p>
          </div>
          <div className={styles.feature}>
            <h3>🔄 Undo/Redo</h3>
            <p>Full state history with undo and redo functionality</p>
          </div>
          <div className={styles.feature}>
            <h3>💾 Auto-save</h3>
            <p>Automatic saving to Contentful after 2 seconds</p>
          </div>
          <div className={styles.feature}>
            <h3>📱 Responsive Design</h3>
            <p>All components are mobile-first and responsive</p>
          </div>
          <div className={styles.feature}>
            <h3>🚀 Performance Optimized</h3>
            <p>Next.js SSG with optimized images and SEO</p>
          </div>
        </div>
      </div>
    </div>
  )
}
