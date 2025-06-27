"use client"

import type React from "react"

import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../../store"
import {
  setDraggedItem,
  addLayoutItem,
  reorderLayoutItems,
  removeLayoutItem,
  undo,
  redo,
} from "../../store/layoutSlice"
import type { DragItem, LayoutItem } from "../../types/redux"
import styles from "./DragDropInterface.module.css"
import HeroBlock from "../blocks/HeroBlock"
import {  staticContent } from "@/lib/constant"

export default function DragDropInterface() {
  const dispatch = useDispatch()
  const { availableComponents, layoutItems, draggedItem, historyIndex, history, isDirty, isSaving } = useSelector(
    (state: RootState) => state.layout,
  )

  const handleDragStart = (item: DragItem) => {
    dispatch(setDraggedItem(item))
  }

  const handleDragEnd = () => {
    dispatch(setDraggedItem(null))
  }

  console.log(layoutItems,"state.layoutItems")

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (draggedItem && !layoutItems.find((item:any) => item.id === draggedItem.id)) {
      dispatch(addLayoutItem(draggedItem))
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleReorder = (dragIndex: number, dropIndex: number) => {
    const newItems = [...layoutItems]
    const draggedItem = newItems[dragIndex]
    newItems.splice(dragIndex, 1)
    newItems.splice(dropIndex, 0, draggedItem)
    dispatch(reorderLayoutItems(newItems))
  }

  const handleRemove = (id: string) => {
    dispatch(removeLayoutItem(id))
  }

  const canUndo = historyIndex > 0
  const canRedo = historyIndex < history.length - 1

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Page Layout Builder</h1>
        <div className={styles.controls}>
          <button onClick={() => dispatch(undo())} disabled={!canUndo} className={styles.button}>
            Undo
          </button>
          <button onClick={() => dispatch(redo())} disabled={!canRedo} className={styles.button}>
            Redo
          </button>
          {isSaving && <span className={styles.saving}>Saving...</span>}
          {isDirty && !isSaving && <span className={styles.dirty}>Unsaved changes</span>}
        </div>
      </div>

      <div className={styles.workspace}>
        <div className={styles.sidebar}>
          <h3>Available Components</h3>
          <div className={styles.componentList}>
            {availableComponents.map((component:DragItem) => (
              <div
                key={component.id}
                className={styles.componentItem}
                draggable
                onDragStart={() => handleDragStart(component)}
                onDragEnd={handleDragEnd}
              >
                <span>{component.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.canvas}>
          <div className={styles.dropZone} onDrop={handleDrop} onDragOver={handleDragOver}>
            {layoutItems.length === 0 ? (
              <div className={styles.emptyState}>Drag components here to build your page</div>
            ) : (
              layoutItems.map((item:LayoutItem, index:number) => (
                <LayoutItemComponent
                  key={item.id}
                  item={item}
                  index={index}
                  onReorder={handleReorder}
                  onRemove={handleRemove}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

interface LayoutItemProps {
  item: LayoutItem
  index: number
  onReorder: (dragIndex: number, dropIndex: number) => void
  onRemove: (id: string) => void
}

function LayoutItemComponent({ item, index, onReorder, onRemove }: LayoutItemProps) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", index.toString())
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const dragIndex = Number.parseInt(e.dataTransfer.getData("text/plain"))
    if (dragIndex !== index) {
      onReorder(dragIndex, index)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  return (
    <div
      className={styles.layoutItem}
      draggable
      onDragStart={handleDragStart}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className={styles.layoutItemHeader}>
        <span>{item.title}</span>
        <button onClick={() => onRemove(item.id)} className={styles.removeButton}>
          ×
        </button>
      </div>
      <div className={styles.layoutItemPreview}>{getComponentPreview(item.type)}</div>
    </div>
  )
}

function getComponentPreview(type: string) {
  switch (type) {
    case "hero":
      return <HeroBlock  content={staticContent.heroBlocksCollection.items[0]} isPreview/>
    case "twoColumn":
      return <div className={styles.twoColumnPreview}>Two Column Row</div>
    case "imageGrid":
      return <div className={styles.imageGridPreview}>2x2 Image Grid</div>
    default:
      return <div>Component</div>
  }
}
