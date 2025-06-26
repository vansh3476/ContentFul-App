"use client"

import { useEffect, useState } from "react"
import { Provider } from "react-redux"
import { store } from "../../store"
import DragDropInterface from "./DragDropInterface"

/**
 * Full-screen Contentful App wrapper.
 * - No redux-persist / PersistGate (fixes thenable crashes)
 * - Works both inside Contentful and in local dev.
 */
export default function ContentfulApp() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // In the Contentful iframe the SDK injects `contentfulExtension`
    if (typeof window === "undefined") return
    if ((window as any).contentfulExtension) {
      (window as any).contentfulExtension.window.startAutoResizer()
    }
    // Small delay so the SDK is fully initialised
    const t = setTimeout(() => setReady(true), 50)
    return () => clearTimeout(t)
  }, [])

  if (!ready) {
    return <div style={{ padding: "2rem", textAlign: "center" }}>Loading Contentful App…</div>
  }

  return (
    <Provider store={store}>
      <DragDropInterface />
    </Provider>
  )
}
