import Link from "next/link"
import { ArrowLeft, Hash } from "lucide-react"
import { Button } from "@/components/ui/button"
import NoteCard from "@/components/note-card"
import { getNotesByTag } from "@/lib/data"

export default function TagPage({ params }: { params: { tag: string } }) {
  const notes = getNotesByTag(params.tag)

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

      <header className="mb-8">
        <div className="flex items-center gap-2">
          <Hash className="h-5 w-5 text-primary" />
          <h1 className="text-2xl font-bold">{params.tag}</h1>
        </div>
        <p className="text-muted-foreground mt-2">
          {notes.length} {notes.length === 1 ? "note" : "notes"} with this tag
        </p>
      </header>

      {notes.length > 0 ? (
        <div className="space-y-4">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border rounded-lg">
          <p className="text-muted-foreground">No notes found with this tag.</p>
        </div>
      )}
    </div>
  )
}
