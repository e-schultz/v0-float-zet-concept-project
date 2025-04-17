import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import NoteCard from "@/components/note-card"
import { getThreadById, getThreadNotes } from "@/lib/data"
import { formatDate } from "@/lib/utils"

export default function ThreadPage({ params }: { params: { id: string } }) {
  const thread = getThreadById(params.id)
  const notes = getThreadNotes(params.id)

  if (!thread || notes.length === 0) {
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
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-2">Thread not found</h1>
          <p className="text-muted-foreground">The thread you're looking for doesn't exist or has been deleted.</p>
        </div>
      </div>
    )
  }

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

      <header className="mb-8">
        <h1 className="text-2xl font-bold">{thread.title || "Thread"}</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
          <span>Started {formatDate(thread.createdAt)}</span>
          <span>•</span>
          <span>
            {thread.noteCount} {thread.noteCount === 1 ? "note" : "notes"}
          </span>
        </div>
      </header>

      <div className="space-y-4">
        {notes.map((note, index) => (
          <div key={note.id} className={index > 0 ? "pl-0" : ""}>
            <NoteCard note={note} showThreadControls={false} />
            {index < notes.length - 1 && <div className="h-6 w-0.5 bg-border ml-6 my-1"></div>}
          </div>
        ))}
      </div>
    </div>
  )
}
