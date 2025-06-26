import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AppState, DragItem, LayoutItem } from "../types/redux"

const initialState: AppState = {
  availableComponents: [
    {
      id: "hero-template",
      type: "hero",
      title: "Hero Block",
      preview: "/previews/hero.png",
    },
    {
      id: "two-column-template",
      type: "twoColumn",
      title: "Two Column Row",
      preview: "/previews/two-column.png",
    },
    {
      id: "image-grid-template",
      type: "imageGrid",
      title: "2x2 Image Grid",
      preview: "/previews/image-grid.png",
    },
  ],
  layoutItems: [],
  draggedItem: null,
  history: [[]],
  historyIndex: 0,
  isDirty: false,
  isSaving: false,
}

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setDraggedItem: (state, action: PayloadAction<DragItem | null>) => {
      state.draggedItem = action.payload
    },
    addLayoutItem: (state, action: PayloadAction<DragItem>) => {
      const newItem: LayoutItem = {
        ...action.payload,
        id: `${action.payload.type}-${Date.now()}`,
        order: state.layoutItems.length,
      }
      state.layoutItems.push(newItem)
      state.isDirty = true

      // Add to history
      state.history = state.history.slice(0, state.historyIndex + 1)
      state.history.push([...state.layoutItems])
      state.historyIndex = state.history.length - 1
    },
    reorderLayoutItems: (state, action: PayloadAction<LayoutItem[]>) => {
      state.layoutItems = action.payload.map((item, index) => ({
        ...item,
        order: index,
      }))
      state.isDirty = true

      // Add to history
      state.history = state.history.slice(0, state.historyIndex + 1)
      state.history.push([...state.layoutItems])
      state.historyIndex = state.history.length - 1
    },
    removeLayoutItem: (state, action: PayloadAction<string>) => {
      state.layoutItems = state.layoutItems
        .filter((item) => item.id !== action.payload)
        .map((item, index) => ({ ...item, order: index }))
      state.isDirty = true

      // Add to history
      state.history = state.history.slice(0, state.historyIndex + 1)
      state.history.push([...state.layoutItems])
      state.historyIndex = state.history.length - 1
    },
    undo: (state) => {
      if (state.historyIndex > 0) {
        state.historyIndex -= 1
        state.layoutItems = [...state.history[state.historyIndex]]
        state.isDirty = true
      }
    },
    redo: (state) => {
      if (state.historyIndex < state.history.length - 1) {
        state.historyIndex += 1
        state.layoutItems = [...state.history[state.historyIndex]]
        state.isDirty = true
      }
    },
    setSaving: (state, action: PayloadAction<boolean>) => {
      state.isSaving = action.payload
    },
    setSaved: (state) => {
      state.isDirty = false
      state.isSaving = false
    },
    loadLayout: (state, action: PayloadAction<LayoutItem[]>) => {
      state.layoutItems = action.payload
      state.history = [action.payload]
      state.historyIndex = 0
      state.isDirty = false
    },
  },
})

export const {
  setDraggedItem,
  addLayoutItem,
  reorderLayoutItems,
  removeLayoutItem,
  undo,
  redo,
  setSaving,
  setSaved,
  loadLayout,
} = layoutSlice.actions

export default layoutSlice.reducer
