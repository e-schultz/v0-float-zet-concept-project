export interface Note {
  id: string
  content: string
  createdAt: string
  tags: string[]
  threadId?: string // ID of the thread this note belongs to
  parentId?: string // ID of the parent note in a thread
  position?: number // Position in the thread (0 for thread starter)
}

export interface Thread {
  id: string
  title?: string // Optional title for the thread
  createdAt: string
  updatedAt: string
  noteCount: number
}
