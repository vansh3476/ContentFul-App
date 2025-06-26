import Link from "next/link"
import styles from "./Navigation.module.css"

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Page Builder
        </Link>
        <div className={styles.links}>
          <Link href="/contentful-app" className={styles.link}>
            Page Builder App
          </Link>
          <Link href="/landing/page-1" className={styles.link}>
            Page 1
          </Link>
          <Link href="/landing/page-2" className={styles.link}>
            Page 2
          </Link>
          <Link href="/preview" className={styles.link}>
            Preview
          </Link>
        </div>
      </div>
    </nav>
  )
}
