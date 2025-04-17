"use client"

import { useEffect, useState } from "react"
import { WifiOff } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function OfflineDetector() {
  const [isOffline, setIsOffline] = useState(false)

  useEffect(() => {
    // Check initial online status
    setIsOffline(!navigator.onLine)

    // Add event listeners for online/offline events
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  if (!isOffline) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <Alert variant="warning">
        <WifiOff className="h-4 w-4" />
        <AlertTitle>You are offline</AlertTitle>
        <AlertDescription>
          You can still view and create notes, but changes will be stored locally until you reconnect.
        </AlertDescription>
      </Alert>
    </div>
  )
}
