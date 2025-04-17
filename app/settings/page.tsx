import Link from "next/link"
import { ArrowLeft, Database, HardDrive } from "lucide-react"
import { Button } from "@/components/ui/button"
import StorageStatus from "@/components/storage-status"

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <HardDrive className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Local Storage</h2>
          </div>
          <p className="text-muted-foreground">
            Your notes are currently stored in your browser's local storage. This means they are only available on this
            device and browser.
          </p>
          <StorageStatus />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Cloud Storage</h2>
          </div>
          <p className="text-muted-foreground">
            Cloud storage with Supabase will be available soon. This will allow you to access your notes from any device
            and keep them synchronized.
          </p>
          <div className="p-4 border rounded-lg bg-muted/50">
            <p className="text-sm">Coming soon: Supabase integration for cloud storage and synchronization.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
