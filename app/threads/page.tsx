import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getThreads, getThreadStarters } from "@/lib/data"
import { formatDate } from "@/lib/utils"

export default function ThreadsPage() {
  const threads = getThreads()
  const threadStarters = getThreadStarters()

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6">All Threads</h1>

      <div className="space-y-4">
        {threadStarters.map((note) => (
          <Link key={note.id} href={`/threads/${note.threadId}`} className="block">
            <div className="border rounded-lg p-4 hover:bg-muted transition-colors">
              <p className="font-medium">{note.content.substring(0, 100)}...</p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex flex-wrap gap-1">
                  {note.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs text-primary font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">{formatDate(note.createdAt)}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
