import Image from "next/image"
import type { ImageGridContent } from "../../types/contentful"
import styles from "./ImageGrid.module.css"

export default function ImageGrid({ content }: any) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {(content || []).slice(0, 4).map((image:any, index:number) => (
            <div key={image.sys.id} className={styles.imageWrapper}>
              <Image
                src={image.url || "/placeholder.svg"}
                alt={image.description || `Grid image ${index + 1}`}
                width={image.width || 400}
                height={image.height || 400}
                className={styles.image}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
