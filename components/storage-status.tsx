"use client"

import { useStorage } from "@/components/storage-provider"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Download, Upload, Trash2 } from "lucide-react"
import { exportData, importData, clearData } from "@/lib/storage"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"

export default function StorageStatus() {
  const { isAvailable, usage } = useStorage()
  const { toast } = useToast()
  const [isExporting, setIsExporting] = useState(false)
  const [isImporting, setIsImporting] = useState(false)

  if (!isAvailable) {
    return null
  }

  const handleExport = () => {
    try {
      setIsExporting(true)
      const data = exportData()

      // Create a JSON file for download
      const dataStr = JSON.stringify(data, null, 2)
      const dataBlob = new Blob([dataStr], { type: "application/json" })
      const url = URL.createObjectURL(dataBlob)

      // Create a link and trigger download
      const a = document.createElement("a")
      a.href = url
      a.download = `zetteltweet-backup-${new Date().toISOString().split("T")[0]}.json`
      document.body.appendChild(a)
      a.click()

      // Clean up
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast({
        title: "Export successful",
        description: "Your data has been exported successfully.",
      })
    } catch (error) {
      console.error("Error exporting data:", error)
      toast({
        title: "Export failed",
        description: "There was a problem exporting your data.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  const handleImport = () => {
    try {
      // Create a file input
      const input = document.createElement("input")
      input.type = "file"
      input.accept = "application/json"

      input.onchange = (e) => {
        setIsImporting(true)
        const file = (e.target as HTMLInputElement).files?.[0]
        if (!file) {
          setIsImporting(false)
          return
        }

        const reader = new FileReader()
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target?.result as string)
            importData(data)

            toast({
              title: "Import successful",
              description: "Your data has been imported successfully.",
            })

            // Reload the page to reflect changes
            window.location.reload()
          } catch (error) {
            console.error("Error parsing import file:", error)
            toast({
              title: "Import failed",
              description: "The file format is invalid. Please select a valid backup file.",
              variant: "destructive",
            })
            setIsImporting(false)
          }
        }

        reader.onerror = () => {
          toast({
            title: "Import failed",
            description: "There was a problem reading the file.",
            variant: "destructive",
          })
          setIsImporting(false)
        }

        reader.readAsText(file)
      }

      // Trigger file selection
      input.click()
    } catch (error) {
      console.error("Error importing data:", error)
      toast({
        title: "Import failed",
        description: "There was a problem importing your data.",
        variant: "destructive",
      })
      setIsImporting(false)
    }
  }

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear all data? This action cannot be undone.")) {
      try {
        clearData()
        toast({
          title: "Data cleared",
          description: "All data has been cleared successfully.",
        })

        // Reload the page to reflect changes
        window.location.reload()
      } catch (error) {
        console.error("Error clearing data:", error)
        toast({
          title: "Clear failed",
          description: "There was a problem clearing your data.",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <h3 className="font-medium">Storage Status</h3>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Used: {usage.used.toFixed(2)} KB</span>
          <span>{usage.percentage.toFixed(1)}%</span>
        </div>
        <Progress value={usage.percentage} className="h-2" />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
          disabled={isExporting}
          className="flex items-center gap-1"
        >
          <Download className="h-4 w-4" />
          {isExporting ? "Exporting..." : "Export Data"}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleImport}
          disabled={isImporting}
          className="flex items-center gap-1"
        >
          <Upload className="h-4 w-4" />
          {isImporting ? "Importing..." : "Import Data"}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleClear}
          className="flex items-center gap-1 text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
          Clear Data
        </Button>
      </div>
    </div>
  )
}
