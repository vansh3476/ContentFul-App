import { configureStore } from "@reduxjs/toolkit"
import layoutReducer from "./layoutSlice"
import { autosaveMiddleware } from "./middleware"

/**
 * A plain Redux store (we removed redux-persist to avoid the previous
 * thenable/null errors).
 * Autosave middleware still syncs the layout to Contentful.
 */
export const store:any = configureStore({
  reducer: {
    layout: layoutReducer,
  },
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: false,
    }).concat(autosaveMiddleware),
  devTools: process.env.NODE_ENV !== "production",
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
