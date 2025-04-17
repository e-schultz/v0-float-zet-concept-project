"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, MessageSquare, MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import type { Note } from "@/lib/types"
import { getNoteReplies } from "@/lib/data"

interface AnimatedNoteCardProps {
  note: Note
  showThreadControls?: boolean
  index: number
}

export default function AnimatedNoteCard({ note, showThreadControls = true, index }: AnimatedNoteCardProps) {
  // Process content to highlight hashtags and mentions
  const processedContent = note.content
    .replace(/#(\w+)/g, '<span class="text-primary font-medium">#$1</span>')
    .replace(/@(\w+)/g, '<span class="text-blue-500 font-medium">@$1</span>')

  const replies = getNoteReplies(note.id)
  const hasReplies = replies.length > 0
  const isThreadStarter = note.threadId && note.position === 0
  const isPartOfThread = note.threadId !== undefined

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{ scale: 1.01 }}
      className={`rounded-lg border border-primary/20 overflow-hidden ${
        isPartOfThread && !isThreadStarter ? "ml-3 sm:ml-6 border-l-4 border-l-primary/20" : ""
      }`}
    >
      <motion.div className="p-4 bg-background" whileTap={{ scale: 0.98 }}>
        <Link href={`/notes/${note.id}`}>
          <div
            dangerouslySetInnerHTML={{ __html: processedContent }}
            className="hover:text-primary transition-colors text-base sm:text-lg"
          />
        </Link>

        <div className="flex flex-col items-start gap-2 pt-3">
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
        </div>
      </motion.div>
    </motion.div>
  )
}
