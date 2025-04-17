import type { Note, Thread } from "./types"

// Local storage keys
const STORAGE_KEYS = {
  NOTES: "zetteltweet-notes",
  THREADS: "zetteltweet-threads",
  LAST_SYNC: "zetteltweet-last-sync",
}

// Initialize local storage with default data if empty
export function initializeStorage(): void {
  if (!localStorage.getItem(STORAGE_KEYS.NOTES)) {
    const defaultNotes: Note[] = [
      {
        id: "1",
        content:
          "Just learned about the #zettelkasten method for note-taking. It's a game-changer for organizing thoughts and ideas! #productivity",
        createdAt: "2023-05-15T10:30:00Z",
        tags: ["zettelkasten", "productivity"],
        threadId: "thread1",
        position: 0,
      },
      {
        id: "2",
        content:
          "Reading 'How to Take Smart Notes' by Sönke Ahrens. Highly recommend for anyone interested in #zettelkasten and #PKM (Personal Knowledge Management).",
        createdAt: "2023-05-16T14:20:00Z",
        tags: ["books", "zettelkasten", "PKM"],
      },
      {
        id: "3",
        content:
          "The key to effective note-taking is to focus on connections between ideas rather than categorization. This is why #zettelkasten works so well. @note1",
        createdAt: "2023-05-17T09:15:00Z",
        tags: ["zettelkasten", "ideas"],
        threadId: "thread1",
        parentId: "1",
        position: 1,
      },
      {
        id: "4",
        content:
          "Started a new #research project on cognitive biases. Will be collecting notes and examples over the next few weeks.",
        createdAt: "2023-05-18T16:45:00Z",
        tags: ["research", "psychology"],
      },
      {
        id: "5",
        content:
          "Atomic notes should be self-contained and focused on a single idea. This makes them more reusable across different contexts. #PKM #productivity",
        createdAt: "2023-05-19T11:10:00Z",
        tags: ["PKM", "productivity"],
      },
      {
        id: "6",
        content:
          "Working on a new #project to visualize the connections between my notes. Thinking of using D3.js for the visualization. #coding",
        createdAt: "2023-05-20T13:25:00Z",
        tags: ["project", "coding", "visualization"],
      },
      {
        id: "7",
        content:
          "Found an interesting connection between my notes on #psychology and #productivity. The way we structure information affects how we process it.",
        createdAt: "2023-05-21T10:05:00Z",
        tags: ["psychology", "productivity", "connections"],
      },
      {
        id: "8",
        content:
          "Building on this idea, I've started categorizing my notes based on mental models rather than traditional categories. #PKM",
        createdAt: "2023-05-21T10:15:00Z",
        tags: ["PKM", "mental-models"],
        threadId: "thread1",
        parentId: "3",
        position: 2,
      },
      {
        id: "9",
        content:
          "This approach has helped me discover unexpected connections between seemingly unrelated topics. #connections #insights",
        createdAt: "2023-05-21T10:25:00Z",
        tags: ["connections", "insights"],
        threadId: "thread1",
        parentId: "8",
        position: 3,
      },
    ]

    const defaultThreads: Thread[] = [
      {
        id: "thread1",
        title: "Zettelkasten Method Exploration",
        createdAt: "2023-05-15T10:30:00Z",
        updatedAt: "2023-05-21T10:25:00Z",
        noteCount: 4,
      },
    ]

    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(defaultNotes))
    localStorage.setItem(STORAGE_KEYS.THREADS, JSON.stringify(defaultThreads))
    localStorage.setItem(STORAGE_KEYS.LAST_SYNC, JSON.stringify(new Date().toISOString()))
  }
}

// Get all notes from local storage
export function getNotes(): Note[] {
  try {
    const notesJson = localStorage.getItem(STORAGE_KEYS.NOTES)
    if (!notesJson) return []

    const notes: Note[] = JSON.parse(notesJson)
    return notes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  } catch (error) {
    console.error("Error retrieving notes from local storage:", error)
    return []
  }
}

// Get a specific note by ID
export function getNoteById(id: string): Note | undefined {
  try {
    const notes = getNotes()
    return notes.find((note) => note.id === id)
  } catch (error) {
    console.error("Error retrieving note by ID from local storage:", error)
    return undefined
  }
}

// Get notes by tag
export function getNotesByTag(tag: string): Note[] {
  try {
    const notes = getNotes()
    return notes
      .filter((note) => note.tags.includes(tag))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  } catch (error) {
    console.error("Error retrieving notes by tag from local storage:", error)
    return []
  }
}

// Get all threads from local storage
export function getThreads(): Thread[] {
  try {
    const threadsJson = localStorage.getItem(STORAGE_KEYS.THREADS)
    if (!threadsJson) return []

    const threads: Thread[] = JSON.parse(threadsJson)
    return threads.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
  } catch (error) {
    console.error("Error retrieving threads from local storage:", error)
    return []
  }
}

// Get a specific thread by ID
export function getThreadById(id: string): Thread | undefined {
  try {
    const threads = getThreads()
    return threads.find((thread) => thread.id === id)
  } catch (error) {
    console.error("Error retrieving thread by ID from local storage:", error)
    return undefined
  }
}

// Get notes that belong to a specific thread
export function getThreadNotes(threadId: string): Note[] {
  try {
    const notes = getNotes()
    return notes.filter((note) => note.threadId === threadId).sort((a, b) => (a.position || 0) - (b.position || 0))
  } catch (error) {
    console.error("Error retrieving thread notes from local storage:", error)
    return []
  }
}

// Get replies to a specific note
export function getNoteReplies(noteId: string): Note[] {
  try {
    const notes = getNotes()
    return notes.filter((note) => note.parentId === noteId).sort((a, b) => (a.position || 0) - (b.position || 0))
  } catch (error) {
    console.error("Error retrieving note replies from local storage:", error)
    return []
  }
}

// Check if a note is part of a thread
export function isNotePartOfThread(noteId: string): boolean {
  const note = getNoteById(noteId)
  return note?.threadId !== undefined
}

// Get all thread starter notes
export function getThreadStarters(): Note[] {
  try {
    const notes = getNotes()
    return notes
      .filter((note) => note.threadId && note.position === 0)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  } catch (error) {
    console.error("Error retrieving thread starters from local storage:", error)
    return []
  }
}

// Create a new note
export function createNote(note: Omit<Note, "id" | "createdAt">): Note {
  try {
    const notes = getNotes()

    const newNote: Note = {
      id: `note-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...note,
    }

    const updatedNotes = [newNote, ...notes]
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(updatedNotes))

    // Update last sync time
    localStorage.setItem(STORAGE_KEYS.LAST_SYNC, JSON.stringify(new Date().toISOString()))

    return newNote
  } catch (error) {
    console.error("Error creating note in local storage:", error)
    throw new Error("Failed to create note")
  }
}

// Create a note as part of a thread
export function createThreadNote(parentNoteId: string, content: string, tags: string[]): Note {
  try {
    const parentNote = getNoteById(parentNoteId)
    if (!parentNote) throw new Error("Parent note not found")

    const notes = getNotes()
    const threads = getThreads()

    // Get or create thread ID
    const threadId = parentNote.threadId || `thread-${Date.now()}`
    const notesInThread = notes.filter((note) => note.threadId === threadId)
    const position = notesInThread.length

    // Create the new note
    const newNote: Note = {
      id: `note-${Date.now()}`,
      content,
      createdAt: new Date().toISOString(),
      tags,
      threadId,
      parentId: parentNoteId,
      position,
    }

    // Update notes in local storage
    const updatedNotes = [newNote, ...notes]
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(updatedNotes))

    // Update or create thread
    const existingThread = threads.find((thread) => thread.id === threadId)

    if (existingThread) {
      // Update existing thread
      const updatedThreads = threads.map((thread) => {
        if (thread.id === threadId) {
          return {
            ...thread,
            updatedAt: new Date().toISOString(),
            noteCount: thread.noteCount + 1,
          }
        }
        return thread
      })
      localStorage.setItem(STORAGE_KEYS.THREADS, JSON.stringify(updatedThreads))
    } else {
      // Create new thread
      const newThread: Thread = {
        id: threadId,
        title: content.substring(0, 50) + (content.length > 50 ? "..." : ""),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        noteCount: 1,
      }

      const updatedThreads = [newThread, ...threads]
      localStorage.setItem(STORAGE_KEYS.THREADS, JSON.stringify(updatedThreads))

      // If this is a new thread, update the parent note with the thread ID
      if (!parentNote.threadId) {
        const updatedParentNotes = updatedNotes.map((note) => {
          if (note.id === parentNoteId) {
            return {
              ...note,
              threadId,
              position: 0,
            }
          }
          return note
        })
        localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(updatedParentNotes))
      }
    }

    // Update last sync time
    localStorage.setItem(STORAGE_KEYS.LAST_SYNC, JSON.stringify(new Date().toISOString()))

    return newNote
  } catch (error) {
    console.error("Error creating thread note in local storage:", error)
    throw new Error("Failed to create thread note")
  }
}

// Start a new thread
export function startNewThread(content: string, tags: string[]): Note {
  try {
    const notes = getNotes()
    const threads = getThreads()

    const threadId = `thread-${Date.now()}`

    // Create the new note
    const newNote: Note = {
      id: `note-${Date.now()}`,
      content,
      createdAt: new Date().toISOString(),
      tags,
      threadId,
      position: 0,
    }

    // Update notes in local storage
    const updatedNotes = [newNote, ...notes]
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(updatedNotes))

    // Create new thread
    const newThread: Thread = {
      id: threadId,
      title: content.substring(0, 50) + (content.length > 50 ? "..." : ""),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      noteCount: 1,
    }

    const updatedThreads = [newThread, ...threads]
    localStorage.setItem(STORAGE_KEYS.THREADS, JSON.stringify(updatedThreads))

    // Update last sync time
    localStorage.setItem(STORAGE_KEYS.LAST_SYNC, JSON.stringify(new Date().toISOString()))

    return newNote
  } catch (error) {
    console.error("Error starting new thread in local storage:", error)
    throw new Error("Failed to start new thread")
  }
}

// Update a note
export function updateNote(id: string, updates: Partial<Omit<Note, "id" | "createdAt">>): Note {
  try {
    const notes = getNotes()
    const noteIndex = notes.findIndex((note) => note.id === id)

    if (noteIndex === -1) throw new Error("Note not found")

    const updatedNote = {
      ...notes[noteIndex],
      ...updates,
    }

    notes[noteIndex] = updatedNote
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes))

    // Update thread if this note is part of a thread
    if (updatedNote.threadId) {
      const threads = getThreads()
      const threadIndex = threads.findIndex((thread) => thread.id === updatedNote.threadId)

      if (threadIndex !== -1) {
        threads[threadIndex].updatedAt = new Date().toISOString()
        localStorage.setItem(STORAGE_KEYS.THREADS, JSON.stringify(threads))
      }
    }

    // Update last sync time
    localStorage.setItem(STORAGE_KEYS.LAST_SYNC, JSON.stringify(new Date().toISOString()))

    return updatedNote
  } catch (error) {
    console.error("Error updating note in local storage:", error)
    throw new Error("Failed to update note")
  }
}

// Delete a note
export function deleteNote(id: string): void {
  try {
    const notes = getNotes()
    const noteToDelete = notes.find((note) => note.id === id)

    if (!noteToDelete) throw new Error("Note not found")

    // Check if this note has replies
    const replies = getNoteReplies(id)
    if (replies.length > 0) {
      throw new Error("Cannot delete a note with replies")
    }

    // Remove the note
    const updatedNotes = notes.filter((note) => note.id !== id)
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(updatedNotes))

    // Update thread if this note is part of a thread
    if (noteToDelete.threadId) {
      const threads = getThreads()
      const threadIndex = threads.findIndex((thread) => thread.id === noteToDelete.threadId)

      if (threadIndex !== -1) {
        // If this is the last note in the thread, delete the thread
        const notesInThread = getThreadNotes(noteToDelete.threadId)

        if (notesInThread.length <= 1) {
          const updatedThreads = threads.filter((thread) => thread.id !== noteToDelete.threadId)
          localStorage.setItem(STORAGE_KEYS.THREADS, JSON.stringify(updatedThreads))
        } else {
          // Otherwise, update the thread
          threads[threadIndex].noteCount = Math.max(0, threads[threadIndex].noteCount - 1)
          threads[threadIndex].updatedAt = new Date().toISOString()
          localStorage.setItem(STORAGE_KEYS.THREADS, JSON.stringify(threads))
        }
      }
    }

    // Update last sync time
    localStorage.setItem(STORAGE_KEYS.LAST_SYNC, JSON.stringify(new Date().toISOString()))
  } catch (error) {
    console.error("Error deleting note from local storage:", error)
    throw new Error("Failed to delete note")
  }
}

// Get the last sync time
export function getLastSyncTime(): string | null {
  return localStorage.getItem(STORAGE_KEYS.LAST_SYNC)
}

// Export all data (for backup or migration)
export function exportData(): { notes: Note[]; threads: Thread[]; lastSync: string | null } {
  return {
    notes: getNotes(),
    threads: getThreads(),
    lastSync: getLastSyncTime(),
  }
}

// Import data (from backup or migration)
export function importData(data: { notes: Note[]; threads: Thread[]; lastSync?: string }): void {
  try {
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(data.notes))
    localStorage.setItem(STORAGE_KEYS.THREADS, JSON.stringify(data.threads))

    if (data.lastSync) {
      localStorage.setItem(STORAGE_KEYS.LAST_SYNC, JSON.stringify(data.lastSync))
    } else {
      localStorage.setItem(STORAGE_KEYS.LAST_SYNC, JSON.stringify(new Date().toISOString()))
    }
  } catch (error) {
    console.error("Error importing data to local storage:", error)
    throw new Error("Failed to import data")
  }
}

// Clear all data (for testing or reset)
export function clearData(): void {
  localStorage.removeItem(STORAGE_KEYS.NOTES)
  localStorage.removeItem(STORAGE_KEYS.THREADS)
  localStorage.removeItem(STORAGE_KEYS.LAST_SYNC)
}

// Check storage usage
export function getStorageUsage(): { used: number; total: number; percentage: number } {
  try {
    let totalSize = 0
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key) {
        const value = localStorage.getItem(key)
        if (value) {
          totalSize += key.length + value.length
        }
      }
    }

    // Convert to KB
    const usedKB = totalSize / 1024

    // Estimate total available (typically 5-10MB)
    const totalKB = 5 * 1024 // 5MB

    return {
      used: usedKB,
      total: totalKB,
      percentage: (usedKB / totalKB) * 100,
    }
  } catch (error) {
    console.error("Error calculating storage usage:", error)
    return { used: 0, total: 5 * 1024, percentage: 0 }
  }
}

// Check if local storage is available
export function isStorageAvailable(): boolean {
  try {
    const test = "__storage_test__"
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch (e) {
    return false
  }
}
