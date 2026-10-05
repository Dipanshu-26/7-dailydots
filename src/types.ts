export const MOODS = [
  { value: 'bright', label: 'Bright', emoji: '☀️' },
  { value: 'good', label: 'Good', emoji: '🌿' },
  { value: 'steady', label: 'Steady', emoji: '🌙' },
  { value: 'low', label: 'Low', emoji: '🌧️' },
  { value: 'tough', label: 'Tough', emoji: '🪨' },
] as const

export type Mood = (typeof MOODS)[number]['value']

export interface JournalEntry {
  id: string
  date: string
  mood: Mood
  text: string
  createdAt: string
  updatedAt: string
}

export type JournalDraft = Pick<JournalEntry, 'date' | 'mood' | 'text'>
