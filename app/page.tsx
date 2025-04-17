"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Plus, Hash, BarChart2, MessageSquare, Settings, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getNotes, getThreadStarters } from "@/lib/storage"
import CyberpunkNoteCard from "@/components/cyberpunk-note-card"
import MobileNav from "@/components/mobile-nav"
import ThemeSwitcher from "@/components/theme-switcher"

export default function Home() {
  const [notes, setNotes] = useState<ReturnType<typeof getNotes>>([])
  const [threadStarters, setThreadStarters] = useState<ReturnType<typeof getThreadStarters>>([])
  const [searchQuery, setSearchQuery] = useState("")

  // Load data from local storage
  useEffect(() => {
    setNotes(getNotes())
    setThreadStarters(getThreadStarters())
  }, [])

  // Filter notes based on search query
  const filteredNotes = searchQuery
    ? notes.filter(
        (note) =>
          note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    : notes

  const filteredThreads = searchQuery
    ? threadStarters.filter(
        (note) =>
          note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    : threadStarters

  return (
    <>
      <MobileNav />

      <div className="container mx-auto px-4 py-6">
        {/* Desktop Header */}
        <header className="hidden md:flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <motion.h1
            className="text-3xl font-bold text-primary glitch-text font-mono"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            ZettelTweet
          </motion.h1>
          <div className="flex items-center w-full md:w-auto gap-2">
            <div className="relative w-full md:w-64">
              <input
                type="search"
                placeholder="Search notes..."
                className="w-full px-4 py-2 rounded-full border border-primary/30 bg-background focus:border-primary/60 focus:outline-none font-mono"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <ThemeSwitcher />
            <Link href="/create">
              <Button className="font-mono">
                <Plus className="h-4 w-4 mr-2" />
                New Note
              </Button>
            </Link>
          </div>
        </header>

        {/* Mobile Search */}
        <div className="md:hidden mb-6 mt-2">
          <input
            type="search"
            placeholder="Search notes..."
            className="w-full px-4 py-2 rounded-full border border-primary/30 bg-background focus:border-primary/60 focus:outline-none font-mono"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <motion.nav
              className="space-y-2 sticky top-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/">
                <Button variant="ghost" className="w-full justify-start font-mono">
                  <BarChart2 className="h-4 w-4 mr-2" />
                  Timeline
                </Button>
              </Link>
              <Link href="/graph">
                <Button variant="ghost" className="w-full justify-start font-mono">
                  <Hash className="h-4 w-4 mr-2" />
                  Graph View
                </Button>
              </Link>
              <Link href="/threads">
                <Button variant="ghost" className="w-full justify-start font-mono">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Threads
                </Button>
              </Link>
              <Link href="/settings">
                <Button variant="ghost" className="w-full justify-start font-mono">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </Link>
              <Link href="https://github.com/yourusername/zetteltweet#readme" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" className="w-full justify-start font-mono">
                  <FileText className="h-4 w-4 mr-2" />
                  Documentation
                </Button>
              </Link>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <h3 className="font-medium text-sm text-muted-foreground mt-6 mb-2 px-4 font-mono">Popular Tags</h3>
                <div className="space-y-1">
                  {["productivity", "ideas", "research", "books", "projects"].map((tag) => (
                    <Link key={tag} href={`/tags/${tag}`}>
                      <Button variant="ghost" size="sm" className="w-full justify-start font-mono">
                        <Hash className="h-3 w-3 mr-1" />
                        {tag}
                      </Button>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </motion.nav>
          </div>

          <div className="lg:col-span-3">
            <Tabs defaultValue="timeline" className="w-full">
              <TabsList className="mb-4 w-full justify-start terminal">
                <TabsTrigger value="timeline" className="flex-1 sm:flex-none font-mono">
                  Timeline
                </TabsTrigger>
                <TabsTrigger value="threads" className="flex-1 sm:flex-none font-mono">
                  Threads
                </TabsTrigger>
              </TabsList>

              <TabsContent value="timeline" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold font-mono text-primary">Timeline</h2>
                  <Button variant="outline" size="sm" className="font-mono">
                    Latest
                  </Button>
                </div>

                {filteredNotes.length > 0 ? (
                  <div className="space-y-4">
                    {filteredNotes.map((note, index) => (
                      <CyberpunkNoteCard key={note.id} note={note} index={index} />
                    ))}
                  </div>
                ) : (
                  <motion.div
                    className="text-center py-12 border border-primary/20 rounded-lg terminal"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="text-muted-foreground font-mono">
                      {searchQuery ? "No notes found matching your search." : "No notes yet. Create your first note!"}
                    </p>
                    {!searchQuery && (
                      <Link href="/create" className="mt-4 inline-block">
                        <Button className="font-mono">
                          <Plus className="h-4 w-4 mr-2" />
                          New Note
                        </Button>
                      </Link>
                    )}
                  </motion.div>
                )}
              </TabsContent>

              <TabsContent value="threads" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold font-mono text-primary">Threads</h2>
                  <Button variant="outline" size="sm" className="font-mono">
                    Latest
                  </Button>
                </div>

                {filteredThreads.length > 0 ? (
                  <div className="space-y-4">
                    {filteredThreads.map((note, index) => (
                      <CyberpunkNoteCard key={note.id} note={note} index={index} />
                    ))}
                  </div>
                ) : (
                  <motion.div
                    className="text-center py-12 border border-primary/20 rounded-lg terminal"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="text-muted-foreground font-mono">
                      {searchQuery
                        ? "No threads found matching your search."
                        : "No threads yet. Start your first thread!"}
                    </p>
                    {!searchQuery && (
                      <Link href="/create" className="mt-4 inline-block">
                        <Button className="font-mono">
                          <Plus className="h-4 w-4 mr-2" />
                          New Thread
                        </Button>
                      </Link>
                    )}
                  </motion.div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  )
}
