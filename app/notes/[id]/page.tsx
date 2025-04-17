"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Tag, MessageSquare, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { getNoteById, getNotes, getNoteReplies, createThreadNote } from "@/lib/storage"
import { formatDate } from "@/lib/utils"
import NoteCard from "@/components/note-card"
import { useToast } from "@/components/ui/use-toast"

export default function NotePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const note = getNoteById(params.id)
  const replies = getNoteReplies(note?.id || "")
  const relatedNotes = getNotes()
    .filter(
      (n) =>
        n.id !== params.id && !replies.some((r) => r.id === n.id) && n.tags.some((tag) => note?.tags.includes(tag)),
    )
    .slice(0, 3)

  const [isReplying, setIsReplying] = useState(false)
  const [replyContent, setReplyContent] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddReply = async () => {
    if (!note || !replyContent.trim()) return

    setIsSubmitting(true)

    try {
      // Create the thread note
      await createThreadNote(note.id, replyContent, selectedTags)

      // Reset form
      setReplyContent("")
      setSelectedTags([])
      setIsReplying(false)

      toast({
        title: "Reply added",
        description: "Your reply has been added to the thread.",
      })

      // Refresh the page to show the new reply
      router.refresh()
    } catch (error) {
      console.error("Error adding reply:", error)
      toast({
        title: "Error",
        description: "There was a problem adding your reply. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  if (!note) {
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
          <h1 className="text-2xl font-bold mb-2">Note not found</h1>
          <p className="text-muted-foreground">The note you're looking for doesn't exist or has been deleted.</p>
        </div>
      </div>
    )
  }

  // Process content to highlight hashtags and mentions
  const processedContent = note.content
    .replace(/#(\w+)/g, '<span class="text-primary font-medium">#$1</span>')
    .replace(/@(\w+)/g, '<span class="text-blue-500 font-medium">@$1</span>')

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

      <article className="space-y-6">
        {note.threadId && note.position !== 0 && (
          <div className="mb-4">
            <Link href={`/threads/${note.threadId}`}>
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                View Full Thread
              </Button>
            </Link>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <time dateTime={note.createdAt}>{formatDate(note.createdAt)}</time>
        </div>

        <div className="prose prose-sm max-w-none">
          <div dangerouslySetInnerHTML={{ __html: processedContent }} className="text-lg" />
        </div>

        {note.tags.length > 0 && (
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <div className="flex flex-wrap gap-1">
              {note.tags.map((tag) => (
                <Link key={tag} href={`/tags/${tag}`}>
                  <Badge variant="secondary">#{tag}</Badge>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="pt-4">
          {!isReplying ? (
            <Button onClick={() => setIsReplying(true)} variant="outline" className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Continue this thread
            </Button>
          ) : (
            <div className="space-y-4 border rounded-lg p-4">
              <h3 className="font-medium">Add to this thread</h3>
              <Textarea
                placeholder="Continue the conversation..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="min-h-[100px]"
              />

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Tags</h4>
                <div className="flex flex-wrap gap-1">
                  {note.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleTag(tag)}
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setIsReplying(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddReply} disabled={!replyContent.trim() || isSubmitting}>
                  {isSubmitting ? "Adding..." : "Add to Thread"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </article>

      {replies.length > 0 && (
        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold">Replies</h2>
          <div className="space-y-4 pl-4 border-l-2 border-muted">
            {replies.map((reply) => (
              <NoteCard key={reply.id} note={reply} showThreadControls={false} />
            ))}
          </div>
        </div>
      )}

      {relatedNotes.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Related Notes</h2>
          <div className="grid grid-cols-1 gap-4">
            {relatedNotes.map((relatedNote) => (
              <Link key={relatedNote.id} href={`/notes/${relatedNote.id}`}>
                <div className="border rounded-lg p-4 hover:bg-muted transition-colors">
                  <p className="line-clamp-2">{relatedNote.content}</p>
                  <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <time dateTime={relatedNote.createdAt}>{formatDate(relatedNote.createdAt)}</time>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
