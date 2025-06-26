import type { Middleware } from "@reduxjs/toolkit"
import type { RootState } from "./index"
import { setSaving, setSaved } from "./layoutSlice"

let saveTimeout: NodeJS.Timeout

export const autosaveMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
  const result = next(action)

  // Only run on client side
  if (typeof window === "undefined") {
    return result
  }

  // Check if layout was modified
  const state = store.getState()
  if (state.layout.isDirty && !state.layout.isSaving) {
    // Clear existing timeout
    if (saveTimeout) {
      clearTimeout(saveTimeout)
    }

    // Set new timeout for autosave
    saveTimeout = setTimeout(async () => {
      store.dispatch(setSaving(true))

      try {
        // Save to Contentful
        await saveLayoutToContentful(state.layout.layoutItems)
        store.dispatch(setSaved())
      } catch (error) {
        console.error("Autosave failed:", error)
        store.dispatch(setSaving(false))
      }
    }, 2000) // 2 second delay
  }

  return result
}

async function saveLayoutToContentful(layoutItems: any[]) {
  // Check if we're in Contentful app context
  if (typeof window !== "undefined" && (window as any).contentfulExtension) {
    try {
      const sdk = (window as any).contentfulExtension
      const layoutConfig = {
        components: layoutItems.map((item, index) => ({
          id: item.id,
          type: item.type,
          order: index,
        })),
      }

      await sdk.entry.fields.layoutConfig.setValue(layoutConfig)
      return
    } catch (error) {
      console.error("Failed to save to Contentful:", error)
    }
  }

  // Fallback simulation for development
  return new Promise((resolve) => {
    setTimeout(resolve, 500)
  })
}
