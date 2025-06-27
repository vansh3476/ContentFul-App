"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Provider } from "react-redux"
import { store } from "../../store"

interface ClientWrapperProps {
  children: React.ReactNode
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div>Loading...</div>
  }

  return (
    <Provider store={store}>
        {children}
    </Provider>
  )
}
