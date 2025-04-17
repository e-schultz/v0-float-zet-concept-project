"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, MessageSquare, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { createNote, startNewThread } from "@/lib/storage"
import { useToast } from "@/components/ui/use-toast"
import MobileNav from "@/components/mobile-nav"

export default function CreateNote() {
  const router = useRouter()
  const { toast } = useToast()
  const [content, setContent] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState("")
  const [isThread, setIsThread] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const maxLength = 280

  const handleAddTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag])
      setCurrentTag("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentTag) {
      e.preventDefault()
      handleAddTag()
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!content.trim()) return

    setIsSubmitting(true)

    try {
      if (isThread) {
        // Start a new thread
        await startNewThread(content, tags)
        toast({
          title: "Thread created",
          description: "Your new thread has been created successfully.",
        })
      } else {
        // Create a regular note
        await createNote({ content, tags })
        toast({
          title: "Note created",
          description: "Your note has been saved successfully.",
        })
      }

      // Redirect to home page
      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("Error creating note:", error)
      toast({
        title: "Error",
        description: "There was a problem creating your note. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const processContent = (text: string) => {
    // Highlight hashtags and mentions in the preview
    return text
      .replace(/#(\w+)/g, '<span class="text-primary font-medium">#$1</span>')
      .replace(/@(\w+)/g, '<span class="text-accent font-medium">@$1</span>')
  }

  return (
    <>
      <MobileNav />
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="font-mono">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>

        <motion.h1
          className="text-2xl font-bold mb-6 text-primary glitch-text font-mono"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Create New Note
        </motion.h1>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="space-y-2">
            <div className="flex justify-between">
              <label htmlFor="content" className="text-sm font-medium font-mono">
                Note Content
              </label>
              <span
                className={`text-sm font-mono ${
                  content.length > maxLength * 0.8 ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {content.length}/{maxLength}
              </span>
            </div>
            <Textarea
              id="content"
              placeholder="What's on your mind? Use #tags for categories and @mentions to link to other notes."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={maxLength}
              className="min-h-[150px] font-mono text-base terminal"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="tags" className="text-sm font-medium font-mono">
              Tags
            </label>
            <div className="flex gap-2">
              <Input
                id="tags"
                placeholder="Add a tag"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={handleKeyDown}
                className="font-mono terminal"
              />
              <Button type="button" onClick={handleAddTag} variant="outline" className="font-mono">
                Add
              </Button>
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="flex items-center gap-1 px-3 py-1 font-mono border-primary/30"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="rounded-full hover:bg-primary/20 p-1 h-4 w-4 inline-flex items-center justify-center"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="thread-mode" checked={isThread} onCheckedChange={setIsThread} />
            <Label htmlFor="thread-mode" className="flex items-center gap-2 font-mono">
              <MessageSquare className="h-4 w-4" />
              Start a thread
            </Label>
          </div>

          {content && (
            <motion.div
              className="space-y-2 border border-primary/30 rounded-lg p-4 terminal"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-sm font-medium font-mono">Preview</h3>
              <div className="text-sm font-mono" dangerouslySetInnerHTML={{ __html: processContent(content) }} />
            </motion.div>
          )}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.push("/")} className="font-mono">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!content.trim() || isSubmitting}
              className="relative overflow-hidden font-mono"
            >
              <span className={isSubmitting ? "opacity-0" : "opacity-100"}>
                {isThread ? "Start Thread" : "Save Note"}
              </span>
              {isSubmitting && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="h-4 w-4 border-2 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />
                </span>
              )}
            </Button>
          </div>
        </motion.form>
      </div>
    </>
  )
}
