import Link from "next/link"
import { Calendar, MessageSquare, MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import type { Note } from "@/lib/types"
import { getNoteReplies } from "@/lib/data"

interface NoteCardProps {
  note: Note
  showThreadControls?: boolean
}

export default function NoteCard({ note, showThreadControls = true }: NoteCardProps) {
  // Process content to highlight hashtags and mentions
  const processedContent = note.content
    .replace(/#(\w+)/g, '<span class="text-primary font-medium">#$1</span>')
    .replace(/@(\w+)/g, '<span class="text-blue-500 font-medium">@$1</span>')

  const replies = getNoteReplies(note.id)
  const hasReplies = replies.length > 0
  const isThreadStarter = note.threadId && note.position === 0
  const isPartOfThread = note.threadId !== undefined

  return (
    <Card className={isPartOfThread && !isThreadStarter ? "ml-6 border-l-4 border-l-primary/20" : ""}>
      <CardContent className="pt-6">
        <Link href={`/notes/${note.id}`}>
          <div
            dangerouslySetInnerHTML={{ __html: processedContent }}
            className="hover:text-primary transition-colors"
          />
        </Link>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 pt-2 pb-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <time dateTime={note.createdAt}>{formatDate(note.createdAt)}</time>
          </div>

          {showThreadControls && (
            <div className="flex items-center gap-1">
              {hasReplies && (
                <Link
                  href={`/notes/${note.id}`}
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
                >
                  <MessageSquare className="h-3 w-3" />
                  <span>{replies.length}</span>
                </Link>
              )}

              {isPartOfThread && (
                <Link href={`/threads/${note.threadId}`}>
                  <Button variant="ghost" size="sm" className="h-6 px-2">
                    <MoreHorizontal className="h-3 w-3 mr-1" />
                    <span className="text-xs">View Thread</span>
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>

        {note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {note.tags.map((tag) => (
              <Link key={tag} href={`/tags/${tag}`}>
                <Badge variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
