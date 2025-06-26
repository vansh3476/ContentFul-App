import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import DragDropInterface from "../../components/contentful-app/DragDropInterface"
import layoutReducer from "../../store/layoutSlice"

const createTestStore = () => {
  return configureStore({
    reducer: {
      layout: layoutReducer,
    },
  })
}

describe("DragDropInterface", () => {
  it("renders available components", () => {
    const store = createTestStore()

    render(
      <Provider store={store}>
        <DragDropInterface />
      </Provider>,
    )

    expect(screen.getByText("Hero Block")).toBeInTheDocument()
    expect(screen.getByText("Two Column Row")).toBeInTheDocument()
    expect(screen.getByText("2x2 Image Grid")).toBeInTheDocument()
  })

  it("shows empty state when no components are added", () => {
    const store = createTestStore()

    render(
      <Provider store={store}>
        <DragDropInterface />
      </Provider>,
    )

    expect(screen.getByText("Drag components here to build your page")).toBeInTheDocument()
  })

  it("enables undo/redo buttons correctly", () => {
    const store = createTestStore()

    render(
      <Provider store={store}>
        <DragDropInterface />
      </Provider>,
    )

    const undoButton = screen.getByText("Undo")
    const redoButton = screen.getByText("Redo")

    expect(undoButton).toBeDisabled()
    expect(redoButton).toBeDisabled()
  })
})
