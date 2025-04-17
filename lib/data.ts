// This file now re-exports from storage.ts to maintain backward compatibility
// This approach allows for a smooth transition to Supabase later

import {
  getNotes,
  getNoteById,
  getNotesByTag,
  getThreadById,
  getThreadNotes,
  getThreads,
  getNoteReplies,
  isNotePartOfThread,
  getThreadStarters,
  createThreadNote,
  startNewThread,
  updateNote,
  deleteNote,
  createNote,
} from "./storage"

export {
  getNotes,
  getNoteById,
  getNotesByTag,
  getThreadById,
  getThreadNotes,
  getThreads,
  getNoteReplies,
  isNotePartOfThread,
  getThreadStarters,
  createThreadNote,
  startNewThread,
  updateNote,
  deleteNote,
  createNote,
}
