export interface DragItem {
  id: string
  type: "hero" | "twoColumn" | "imageGrid"
  title: string
  preview?: string
}

export interface LayoutItem extends DragItem {
  order: number
}

export interface AppState {
  availableComponents: DragItem[]
  layoutItems: LayoutItem[]
  draggedItem: DragItem | null
  history: LayoutItem[][]
  historyIndex: number
  isDirty: boolean
  isSaving: boolean
}
