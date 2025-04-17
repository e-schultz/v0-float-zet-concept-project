import type React from "react"
import "@/app/globals.css"
import { Inter, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { StorageProvider } from "@/components/storage-provider"
import { Toaster } from "@/components/ui/toaster"
import OfflineDetector from "./offline"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${mono.variable} font-sans`}>
        <ThemeProvider defaultTheme="pink-black">
          <StorageProvider>
            <main className="min-h-screen bg-background">{children}</main>
            <OfflineDetector />
            <Toaster />
          </StorageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
