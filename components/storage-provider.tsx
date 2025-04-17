"use client"

import type React from "react"

import { useEffect, useState, createContext, useContext } from "react"
import { initializeStorage, isStorageAvailable, getStorageUsage } from "@/lib/storage"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

type StorageContextType = {
  isAvailable: boolean
  usage: {
    used: number
    total: number
    percentage: number
  }
}

const StorageContext = createContext<StorageContextType>({
  isAvailable: true,
  usage: {
    used: 0,
    total: 5 * 1024, // 5MB
    percentage: 0,
  },
})

export const useStorage = () => useContext(StorageContext)

export function StorageProvider({ children }: { children: React.ReactNode }) {
  const [isAvailable, setIsAvailable] = useState(true)
  const [usage, setUsage] = useState({ used: 0, total: 5 * 1024, percentage: 0 })
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Check if localStorage is available
    const storageAvailable = isStorageAvailable()
    setIsAvailable(storageAvailable)

    if (storageAvailable) {
      // Initialize storage with default data if needed
      initializeStorage()

      // Get current storage usage
      const currentUsage = getStorageUsage()
      setUsage(currentUsage)
    }

    setIsInitialized(true)
  }, [])

  if (!isInitialized) {
    return null // Don't render anything until we've checked storage
  }

  if (!isAvailable) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Storage Unavailable</AlertTitle>
          <AlertDescription>
            Local storage is not available in your browser. This application requires local storage to function
            properly. Please enable local storage or try a different browser.
          </AlertDescription>
        </Alert>
        {children}
      </div>
    )
  }

  // Show warning if storage is getting full (over 80%)
  if (usage.percentage > 80) {
    return (
      <StorageContext.Provider value={{ isAvailable, usage }}>
        <div className="container mx-auto p-4">
          <Alert variant="warning" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Storage Almost Full</AlertTitle>
            <AlertDescription>
              Your local storage is {usage.percentage.toFixed(1)}% full. Consider exporting and backing up your data.
            </AlertDescription>
          </Alert>
          {children}
        </div>
      </StorageContext.Provider>
    )
  }

  return <StorageContext.Provider value={{ isAvailable, usage }}>{children}</StorageContext.Provider>
}
