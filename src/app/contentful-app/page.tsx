"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

// Dynamically import with no SSR
const ContentfulApp = dynamic(() => import("../../components/contentful-app/ContentfulApp"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        padding: "2rem",
        textAlign: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>Loading Contentful App...</div>
    </div>
  ),
})

export default function ContentfulAppPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div
        style={{
          padding: "2rem",
          textAlign: "center",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>Initializing...</div>
      </div>
    )
  }

  return <ContentfulApp />
}
