import Image from "next/image"
import type { HeroBlockContent } from "../../types/contentful"
import classNames from 'classnames'
import styles from "./HeroBlock.module.css"

interface HeroBlockProps {
  content: HeroBlockContent
  isPreview?:boolean
}

export default function  HeroBlock({ content ,isPreview}: HeroBlockProps) {
  return (
    <section className={classNames(styles.hero,{[styles.previewHero]:isPreview})}>
      <div className={styles.background}>
        <Image
          src={content.backgroundImage.url || "/placeholder.svg"}
          alt={content.backgroundImage.description || "Hero background"}
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div className={styles.overlay} />
      </div>
      <div className={styles.content}>
        <h1 className={styles.heading}>{content.heading}</h1>
        <p className={styles.subtitle}>{content.subtitle}</p>
        <button className={styles.cta}>{content.cta}</button>
      </div>
    </section>
  )
}
