"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { getNotes } from "@/lib/data"
import Link from "next/link"

export default function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const [searchResults, setSearchResults] = useState<ReturnType<typeof getNotes>>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (query.length > 1) {
      const notes = getNotes()
      const filtered = notes
        .filter(
          (note) =>
            note.content.toLowerCase().includes(query.toLowerCase()) ||
            note.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())),
        )
        .slice(0, 5) // Limit to 5 results
      setSearchResults(filtered)
    } else {
      setSearchResults([])
    }
  }, [query])

  const handleSearch = () => {
    onSearch(query)
    setIsFocused(false)
  }

  const clearSearch = () => {
    setQuery("")
    onSearch("")
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div className="relative w-full">
      <div className="relative">
        <motion.div
          initial={false}
          animate={{
            width: isFocused ? "100%" : "100%",
            borderColor: isFocused ? "rgba(255, 105, 180, 0.5)" : "rgba(255, 105, 180, 0.2)",
          }}
          className="flex items-center border rounded-full overflow-hidden bg-background/50 backdrop-blur-sm"
        >
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="search"
            placeholder="Search notes..."
            className="border-0 pl-10 pr-10 py-6 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch()
              }
            }}
          />
          {query && (
            <Button variant="ghost" size="icon" className="absolute right-1 h-8 w-8" onClick={clearSearch}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {isFocused && searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: 10, height: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 mt-2 rounded-lg border border-primary/20 bg-background/95 backdrop-blur-sm shadow-lg z-50 overflow-hidden"
          >
            <div className="py-2">
              {searchResults.map((note) => (
                <Link key={note.id} href={`/notes/${note.id}`}>
                  <motion.div
                    whileHover={{ backgroundColor: "rgba(255, 105, 180, 0.1)" }}
                    className="px-4 py-2 cursor-pointer"
                  >
                    <p className="text-sm line-clamp-1">{note.content}</p>
                    {note.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {note.tags.map((tag) => (
                          <span key={tag} className="text-xs text-primary">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
