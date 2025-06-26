import type React from "react"
import type { Metadata } from "next"
import Navigation from "../components/layout/Navigation"
import "./globals.css"

export const metadata: Metadata = {
  title: "Contentful Page Builder",
  description: "Dynamic page builder with Contentful CMS",
  viewport: "width=device-width, initial-scale=1",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
