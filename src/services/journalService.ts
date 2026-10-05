import type { JournalDraft, JournalEntry, Mood } from '../types'

const STORAGE_KEY = 'daily-journal.entries'

function isMood(value: unknown): value is Mood {
  return ['bright', 'good', 'steady', 'low', 'tough'].includes(value as string)
}

function isEntry(value: unknown): value is JournalEntry {
  if (!value || typeof value !== 'object') return false
  const entry = value as Record<string, unknown>
  return typeof entry.id === 'string'
    && typeof entry.date === 'string'
    && isMood(entry.mood)
    && typeof entry.text === 'string'
    && typeof entry.createdAt === 'string'
    && typeof entry.updatedAt === 'string'
}

function readEntries(): JournalEntry[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    const parsed: unknown = JSON.parse(stored)
    return Array.isArray(parsed) ? parsed.filter(isEntry) : []
  } catch {
    return []
  }
}

function writeEntries(entries: JournalEntry[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

export const journalService = {
  getAll(): JournalEntry[] {
    return readEntries().sort((a, b) => b.date.localeCompare(a.date))
  },
  getByDate(date: string): JournalEntry | undefined {
    return readEntries().find((entry) => entry.date === date)
  },
  save(draft: JournalDraft): JournalEntry {
    const entries = readEntries()
    const existing = entries.find((entry) => entry.date === draft.date)
    const now = new Date().toISOString()
    const entry: JournalEntry = existing
      ? { ...existing, ...draft, updatedAt: now }
      : { ...draft, id: crypto.randomUUID(), createdAt: now, updatedAt: now }
    writeEntries([...entries.filter((item) => item.date !== draft.date), entry])
    return entry
  },
  delete(id: string): void {
    writeEntries(readEntries().filter((entry) => entry.id !== id))
  },
}
