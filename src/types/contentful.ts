export interface ContentfulAsset {
  sys: {
    id: string
  }
  title: string
  url: string
  width?: number
  height?: number
  description?: string
}

export interface HeroBlockContent {
  heading: string
  subtitle?: string
  cta: string
  backgroundImage: ContentfulAsset
}

export interface TwoColumnRowContent {
  leftHeading: string
  leftSubtitle: string
  leftCta: string
  rightImage: ContentfulAsset
}

export interface ImageGridContent {
  images: ContentfulAsset[]
}

export interface ComponentConfig {
  id: string
  type: "hero" | "twoColumn" | "imageGrid"
  order: number
}

export interface LayoutConfig {
  components: ComponentConfig[]
}

export interface PageContent {
  sys: {
    id: string
  }
  title: string
  slug: string
  layoutConfig: LayoutConfig
  heroBlocks: HeroBlockContent[]
  twoColumnRows: TwoColumnRowContent[]
  imageGrids: ImageGridContent[]
}
