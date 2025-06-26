"use client"

import { useEffect, useState, type ReactNode } from "react"
import { Provider } from "react-redux"
import { store } from "../../store"

/**
 * Generic provider wrapper used by the public pages (not the Contentful iframe).
 */
export default function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return null
  return <Provider store={store}>{children}</Provider>
}
