import Link from "next/link"
import styles from "./page.module.css"

export default function HomePage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Contentful Page Builder</h1>
        <p className={styles.description}>
          Dynamic page builder with drag-and-drop interface powered by Contentful CMS
        </p>
        <div className={styles.links}>
          <Link href="/contentful-app" className={styles.link}>
            Open Page Builder
          </Link>
          <Link href="/preview" className={styles.linkSecondary}>
            View Preview
          </Link>
          {/* Landing pages temporarily hidden until Contentful is configured */}
          <div className={styles.note}>
            <p>📝 Landing pages will be available once Contentful is properly configured</p>
            <p>Use the Page Builder above to create your layouts!</p>
          </div>
        </div>
      </div>
    </main>
  )
}
