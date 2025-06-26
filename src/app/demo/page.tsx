import HeroBlock from "@/components/blocks/HeroBlock"
import TwoColumnRow from "@/components/blocks/TwoColumnRow"
import ImageGrid from "@/components/blocks/ImageGrid"
import type { HeroBlockContent, TwoColumnRowContent, ImageGridContent } from "@/types/contentful"

// Mock data for demonstration
const mockHeroContent: HeroBlockContent = {
  heading: "Welcome to Our Platform",
  subtitle: "Build amazing pages with our drag-and-drop interface",
  cta: "Get Started",
  backgroundImage: {
    sys: { id: "mock-hero-bg" },
    title: "Hero Background",
    url: "/placeholder.svg?height=600&width=1200",
    width: 1200,
    height: 600,
    description: "Hero background image",
  },
}

const mockTwoColumnContent: TwoColumnRowContent = {
  leftHeading: "Powerful Features",
  leftSubtitle: "Our platform provides everything you need to create stunning landing pages with ease.",
  leftCta: "Learn More",
  rightImage: {
    sys: { id: "mock-feature-img" },
    title: "Features Image",
    url: "/placeholder.svg?height=400&width=600",
    width: 600,
    height: 400,
    description: "Features illustration",
  },
}

const mockImageGridContent: ImageGridContent = {
  images: [
    {
      sys: { id: "mock-img-1" },
      title: "Gallery Image 1",
      url: "/placeholder.svg?height=400&width=400",
      width: 400,
      height: 400,
      description: "Gallery image 1",
    },
    {
      sys: { id: "mock-img-2" },
      title: "Gallery Image 2",
      url: "/placeholder.svg?height=400&width=400",
      width: 400,
      height: 400,
      description: "Gallery image 2",
    },
    {
      sys: { id: "mock-img-3" },
      title: "Gallery Image 3",
      url: "/placeholder.svg?height=400&width=400",
      width: 400,
      height: 400,
      description: "Gallery image 3",
    },
    {
      sys: { id: "mock-img-4" },
      title: "Gallery Image 4",
      url: "/placeholder.svg?height=400&width=400",
      width: 400,
      height: 400,
      description: "Gallery image 4",
    },
  ],
}

export default function DemoPage() {
  return (
    <main>
      <HeroBlock content={mockHeroContent} />
      <TwoColumnRow content={mockTwoColumnContent} />
      <ImageGrid content={mockImageGridContent} />
    </main>
  )
}
