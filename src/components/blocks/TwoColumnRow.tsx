import Image from "next/image"
import type { TwoColumnRowContent } from "../../types/contentful"
import styles from "./TwoColumnRow.module.css"

interface TwoColumnRowProps {
  content: TwoColumnRowContent
}

export default function TwoColumnRow({ content }: TwoColumnRowProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.heading}>{content.leftHeading}</h2>
          <p className={styles.subtitle}>{content.leftSubtitle}</p>
          <button className={styles.cta}>{content.leftCta}</button>
        </div>
        <div className={styles.imageWrapper}>
          <Image
            src={content.rightImage.url || "/placeholder.svg"}
            alt={content.rightImage.description || "Two column image"}
            width={content.rightImage.width || 600}
            height={content.rightImage.height || 400}
            className={styles.image}
          />
        </div>
      </div>
    </section>
  )
}
